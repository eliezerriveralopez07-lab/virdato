// instrumentation.ts (project root)
// Runs before the app starts on the server and the edge runtime.
// Do NOT import './sentry.server.config' – initialize here directly.

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  // Server (Node.js) runtime
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn,
      enabled: Boolean(dsn),
      tracesSampleRate: 1.0, // tune for prod
      // options: { telemetry: false } // uncomment to silence SDK telemetry
    });
  }

  // Edge runtime
  if (process.env.NEXT_RUNTIME === 'edge') {
    const SentryEdge = await import('@sentry/nextjs/edge');
    SentryEdge.init({
      dsn,
      enabled: Boolean(dsn),
      tracesSampleRate: 1.0,
    });
  }
}
