export const runtime = "nodejs";

export async function GET() {
  return new Response(JSON.stringify({ pong: "PONG" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
