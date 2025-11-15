'use client';

import * as Sentry from '@sentry/nextjs';

// Runs once in the browser before any client components mount
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // or hardcode your DSN
  tracesSampleRate: 1.0,                   // adjust for prod
  replaysOnErrorSampleRate: 1.0,           // optional if using @sentry/replay
  replaysSessionSampleRate: 0.1,           // optional
});
