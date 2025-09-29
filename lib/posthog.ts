// lib/posthog.ts
export async function initPosthog() {
  // Only run in the browser
  if (typeof window === 'undefined') return;

  // Avoid double init across navigations/hot reloads
  if ((window as any).__phInitialized) return;

  // Dynamic import so SSR never loads posthog-js
  const { default: posthog } = await import('posthog-js');

  // Expose for DevTools testing
  (window as any).posthog = posthog;

  const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!key) {
    console.warn('[PH] Missing NEXT_PUBLIC_POSTHOG_KEY');
    return;
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });

  (window as any).__phInitialized = true;
  console.log('[PH] initialized', { host });
}

