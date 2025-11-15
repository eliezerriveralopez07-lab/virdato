import * as Sentry from '@sentry/nextjs';

// Runs on the server during app bootstrap / edge runtime where applicable
export async function register() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN, // server DSN
    tracesSampleRate: 1.0,
  });
}
