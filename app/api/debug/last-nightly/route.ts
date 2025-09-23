import { redis } from "@/lib/redis";
export const runtime = "edge";

export async function GET() {
  return new Response(JSON.stringify({
    last: await redis.get("virdato:lastNightly")
  }), { status: 200 });
}
