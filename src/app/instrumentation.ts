// Runs before the app starts on the server/edge.
// Do NOT import './sentry.server.config'. Initialize here.

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  // Node.js runtime (server)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,          // tune for production
      enabled: Boolean(dsn),
      // options.telemetry:false if you want to suppress Sentry SDK telemetry
      // integrations: [...]
    });
  }

  // Edge runtime
  if (process.env.NEXT_RUNTIME === 'edge') {
    const SentryEdge = await import('@sentry/nextjs/edge');
    SentryEdge.init({
      dsn,
      tracesSampleRate: 1.0,
      enabled: Boolean(dsn),
    });
  }
}
