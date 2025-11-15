// instrumentation.ts (project root)
// Unified Sentry init for all runtimes (server + edge).
// No imports from "./sentry.server.config" and no "@sentry/nextjs/edge".

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  const Sentry = await import('@sentry/nextjs');
  Sentry.init({
    dsn,
    enabled: Boolean(dsn),
    tracesSampleRate: 1.0, // TODO: tune for production
    // telemetry: false,    // uncomment to silence SDK telemetry warnings
  });
}

