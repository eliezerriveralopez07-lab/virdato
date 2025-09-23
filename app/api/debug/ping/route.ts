// app/api/debug/ping/route.ts
export const runtime = "edge";

export async function GET() {
  return new Response(JSON.stringify({ pong: "PONG" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

