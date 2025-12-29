import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const startedAt = Date.now();

  try {
    // -------------------------
    // 1) Auth check
    // -------------------------
    const auth = req.headers.get("authorization") || "";
    const secret = process.env.CRON_SECRET;

    if (!secret) {
      Sentry.captureException(new Error("cron_failed_auth: CRON_SECRET_missing"));
      return NextResponse.json({ error: "CRON_SECRET_missing" }, { status: 500 });
    }

    const expected = `Bearer ${secret}`;
    if (auth !== expected) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // -------------------------
    // 2) Init Supabase (service role)
    // -------------------------
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    // -------------------------
    // 3) Resolve execution date
    // -------------------------
    const offsetDays = Number(process.env.VIRDATO_DATE_OFFSET_DAYS ?? "1");
    const dailyPool = Number(process.env.VIRDATO_DAILY_POOL ?? "300");
    const creatorCap = Number(process.env.VIRDATO_CREATOR_CAP ?? "50");

    const d = new Date();
    d.setUTCDate(d.getUTCDate() - offsetDays);
    const pDate = d.toISOString().slice(0, 10); // YYYY-MM-DD

    // -------------------------
    // 4) Step 1: Rollup metrics
    // -------------------------
    const rollup = await supabase.rpc("rollup_creator_daily", { p_date: pDate });
    if (rollup.error) {
      Sentry.captureException(
        new Error(`cron_failed_rollup: ${rollup.error.message}`)
      );
      return NextResponse.json(
        { step: "rollup", error: rollup.error.message },
        { status: 500 }
      );
    }

    // -------------------------
    // 5) Step 2: Compute virality
    // -------------------------
    const virality = await supabase.rpc("compute_virality", { p_date: pDate });
    if (virality.error) {
      Sentry.captureException(
        new Error(`cron_failed_virality: ${virality.error.message}`)
      );
      return NextResponse.json(
        { step: "virality", error: virality.error.message },
        { status: 500 }
      );
    }

    // -------------------------
    // 6) Step 3: Allocate rewards
    // -------------------------
    const allocate = await supabase.rpc("allocate_rewards", {
      p_date: pDate,
      p_daily_pool: dailyPool,
      p_creator_cap: creatorCap,
    });

    if (allocate.error) {
      Sentry.captureException(
        new Error(`cron_failed_allocate: ${allocate.error.message}`)
      );
      return NextResponse.json(
        { step: "allocate", error: allocate.error.message },
        { status: 500 }
      );
    }

    // -------------------------
    // 7) Success telemetry
    // -------------------------
    const durationMs = Date.now() - startedAt;

    Sentry.captureMessage(`cron_success_${pDate}`, {
      level: "info",
      extra: {
        date: pDate,
        pool: dailyPool,
        cap: creatorCap,
        durationMs,
      },
    });

    return NextResponse.json({
      ok: true,
      date: pDate,
      pool: dailyPool,
      cap: creatorCap,
      durationMs,
    });
  } catch (err: any) {
    // -------------------------
    // 8) Hard crash catch-all
    // -------------------------
    Sentry.captureException(err);
    return NextResponse.json(
      { error: "cron_unhandled_exception" },
      { status: 500 }
    );
  }
}
