'use client';

import * as Sentry from '@sentry/nextjs';

// Runs once in the browser before any client components mount.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,            // tune for production
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  // replaysSessionSampleRate: 0.1,  // optional if using @sentry/replay
  // replaysOnErrorSampleRate: 1.0,
});
