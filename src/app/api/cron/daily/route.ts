import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const offsetDays = Number(process.env.VIRDATO_DATE_OFFSET_DAYS ?? "1");
  const pool = Number(process.env.VIRDATO_DAILY_POOL ?? "300");
  const cap = Number(process.env.VIRDATO_CREATOR_CAP ?? "50");

  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offsetDays);
  const pDate = d.toISOString().slice(0, 10); // YYYY-MM-DD

  const r1 = await supabase.rpc("rollup_creator_daily", { p_date: pDate });
  if (r1.error) return NextResponse.json({ step: "rollup", error: r1.error.message }, { status: 500 });

  const r2 = await supabase.rpc("compute_virality", { p_date: pDate });
  if (r2.error) return NextResponse.json({ step: "virality", error: r2.error.message }, { status: 500 });

  const r3 = await supabase.rpc("allocate_rewards", {
    p_date: pDate,
    p_daily_pool: pool,
    p_creator_cap: cap,
  });
  if (r3.error) return NextResponse.json({ step: "allocate", error: r3.error.message }, { status: 500 });

  return NextResponse.json({ ok: true, date: pDate, pool, cap });
}
