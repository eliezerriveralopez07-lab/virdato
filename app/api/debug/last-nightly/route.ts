// app/api/debug/last-nightly/route.ts
import { redis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const last = await redis.get<string>("virdato:lastNightly");
  return new Response(JSON.stringify({ last }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
