import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET_missing" }, { status: 500 });
  }

  const expected = `Bearer ${secret}`;
  if (auth !== expected) {
    return NextResponse.json(
      {
        error: "unauthorized",
        debug: {
          hasSecret: true,
          authPrefix: auth.startsWith("Bearer ") ? "Bearer " : "missing",
          authLen: auth.length,
          expectedLen: expected.length
        }
      },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true, message: "cron route live" });
}
