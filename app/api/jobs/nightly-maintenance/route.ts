import { Receiver } from "@upstash/qstash";
import { redis } from "@/lib/redis";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export async function POST(req: Request) {
  const signature = req.headers.get("Upstash-Signature") || "";
  const bodyText = await req.text();

  try {
    await receiver.verify({ signature, body: bodyText });
  } catch {
    return new Response("invalid signature", { status: 401 });
  }

  const payload = bodyText ? JSON.parse(bodyText) : {};

  const dayKey = `lock:nightly:${new Date().toISOString().slice(0, 10)}`;
  const gotLock = await redis.set(dayKey, "1", { nx: true, ex: 3600 });
  if (!gotLock) return new Response("duplicate-run", { status: 200 });

  const now = new Date().toISOString();
  await redis.set("virdato:lastNightly", now);

  return new Response(JSON.stringify({ ok: true, at: now, payload }), { status: 200 });
}
