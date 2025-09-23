// app/api/jobs/nightly-maintenance/route.ts
import { redis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // DEV ONLY: no signature verification
  const raw = await req.text();
  const payload = raw ? JSON.parse(raw) : {};

  const now = new Date().toISOString();
  await redis.set("virdato:lastNightly", now);

  return new Response(JSON.stringify({ ok: true, at: now, payload }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

