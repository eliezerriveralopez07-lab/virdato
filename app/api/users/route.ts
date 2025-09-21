// app/api/env-db/route.ts
export const runtime = "nodejs";

export async function GET() {
  const raw = process.env.DATABASE_URL || "";
  if (!raw) return Response.json({ haveDB: false });

  try {
    const u = new URL(raw);
    return Response.json({
      haveDB: true,
      user: u.username,
      host: u.hostname,
      db: u.pathname,              // should be /neondb
      hasPooler: u.hostname.includes("-pooler"),
      scheme: u.protocol           // should be 'postgres:'
    });
  } catch (e:any) {
    return Response.json({ haveDB: true, parseError: String(e) });
  }
}
