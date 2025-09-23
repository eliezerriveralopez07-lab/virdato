import { redis } from "@/lib/redis";
export const runtime = "edge";

export async function GET() {
  const pong = await redis.ping();
  return new Response(JSON.stringify({ pong }), { status: 200 });
}
