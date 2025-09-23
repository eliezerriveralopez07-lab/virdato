import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { redis } from "@/lib/redis";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function handler(req: Request) {
  let payload: any = {};
  try { payload = await req.json(); } catch {}

  // Example work
  const now = new Date().toISOString();
  await redis.set("virdato:lastNightly", now);

  return new Response(JSON.stringify({ ok: true, at: now, payload }), { status: 200 });
}

export const POST = verifySignatureAppRouter(handler);
