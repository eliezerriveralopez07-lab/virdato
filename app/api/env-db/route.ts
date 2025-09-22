export const runtime = "nodejs";
export async function GET() {
  const raw = process.env.DATABASE_URL || "";
  const env = process.env.VERCEL_ENV || null; // 'production' or 'preview'
  if (!raw) return Response.json({ vercelEnv: env, haveDB: false });
  const u = new URL(raw);
  return Response.json({
    vercelEnv: env,
    haveDB: true,
    user: u.username,
    host: u.hostname,
    db: u.pathname,
    hasPooler: u.hostname.includes("-pooler"),
    scheme: u.protocol
  });
}

