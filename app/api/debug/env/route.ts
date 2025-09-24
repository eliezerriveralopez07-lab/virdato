export const runtime = "nodejs";
export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? null;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? null;
  return new Response(JSON.stringify({
    seen: {
      UPSTASH_REDIS_REST_URL: !!url,
      UPSTASH_REDIS_REST_TOKEN: !!token,
    },
    url,
    tokenLength: token?.length ?? 0
  }), { status: 200, headers: { "content-type": "application/json" } });
}
