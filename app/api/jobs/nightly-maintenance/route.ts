// app/api/jobs/nightly-maintenance/route.ts
import { redis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple GET so we can verify we're hitting THIS file
export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      route: "/api/jobs/nightly-maintenance",
      version: "dev-no-verify",
      nodeEnv: process.env.NODE_ENV,
      vercel: process.env.VERCEL ?? null,
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

export async function POST(req: Request) {
  let payload: any = {};
  try { payload = await req.json(); } catch {}

  const now = new Date().toISOString();
  await redis.set("virdato:lastNightly", now);

  return new Response(
    JSON.stringify({ ok: true, at: now, payload, version: "dev-no-verify" }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
