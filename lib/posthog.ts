// lib/posthog.ts
import posthog from 'posthog-js'

// Make it available in DevTools even if init fails
if (typeof window !== 'undefined') {
  (window as any).posthog = posthog
}

export function initPosthog() {
  if (typeof window === 'undefined') return;
  // avoid double init during fast refresh/navigation
  if ((posthog as any).__loaded) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  console.log('[PH] init:', { keyPresent: !!key, host });

  try {
    posthog.init(key as string, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    });
  } catch (e) {
    console.error('[PH] init error', e);
  }
}

