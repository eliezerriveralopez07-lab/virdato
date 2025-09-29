// lib/posthog.ts
import posthog from 'posthog-js'

export function initPosthog() {
  if (typeof window === 'undefined') return;     // SSR guard
  // @ts-ignore private flag used to avoid double init
  if (posthog.__loaded) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });

  // expose to window so you can test in the console
  (window as any).posthog = posthog;
}
