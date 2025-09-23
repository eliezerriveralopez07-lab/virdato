// app/api/debug/ping/route.ts
export const runtime = "nodejs"; // safest in dev; you can switch to "edge" later

export async function GET() {
  return new Response(JSON.stringify({ pong: "PONG" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

