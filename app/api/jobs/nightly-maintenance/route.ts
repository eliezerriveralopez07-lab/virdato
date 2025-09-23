// app/api/jobs/nightly-maintenance/route.ts
import { redis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(JSON.stringify({
    ok: true,
    route: "/api/jobs/nightly-maintenance",
    version: "dev-no-verify-debug",
    nodeEnv: process.env.NODE_ENV,
    vercel: process.env.VERCEL ?? null,
  }), { status: 200, headers: { "content-type": "application/json" } });
}

export async function POST(req: Request) {
  let payload: any = {};
  try { payload = await req.json(); } catch {}

  const now = new Date().toISOString();
  try {
    const res = await redis.set("virdato:lastNightly", now);
    return new Response(JSON.stringify({ ok: true, at: now, payload, redisSet: res }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      ok: false,
      error: err?.message ?? String(err),
      envSeenByServer: {
        UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      }
    }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
