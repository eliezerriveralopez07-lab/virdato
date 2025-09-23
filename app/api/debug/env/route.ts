export const runtime = "nodejs";
export async function GET() {
  return new Response(JSON.stringify({
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL ?? null
  }), { status: 200, headers: { "content-type": "application/json" } });
}
