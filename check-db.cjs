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
      db: u.pathname,
      hasPooler: u.hostname.includes("-pooler"),
      scheme: u.protocol,
    });
  } catch (e:any) {
    return Response.json({ haveDB: true, parseError: String(e) });
  }
}
