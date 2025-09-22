export const runtime = "nodejs";

export async function GET() {
  const raw = process.env.DATABASE_URL || "";
  const env = process.env.VERCEL_ENV || null;
  if (!raw) return Response.json({ vercelEnv: env, haveDB: false });

  const effective =
    raw.startsWith("postgresql://") ? "postgres://" + raw.slice(12) : raw;

  const uRaw = new URL(raw);
  const uEff = new URL(effective);
  return Response.json({
    vercelEnv: env,
    haveDB: true,
    rawScheme: uRaw.protocol,         // will show "postgresql:"
    effectiveScheme: uEff.protocol,   // should show "postgres:"
    host: uEff.hostname,
    db: uEff.pathname,
    hasPooler: uEff.hostname.includes("-pooler"),
  });
}

