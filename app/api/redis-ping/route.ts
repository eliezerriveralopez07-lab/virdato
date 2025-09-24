// app/api/redis-ping/route.ts
import { redis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const pong = await redis.ping();
  return new Response(JSON.stringify({ pong }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
