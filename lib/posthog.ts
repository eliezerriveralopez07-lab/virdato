// lib/posthog.ts
import posthog from 'posthog-js'

export function initPosthog() {
  // Only run in the browser
  if (typeof window === 'undefined') return;

  // avoid double init during fast refresh/navigation
  // @ts-ignore - internal flag
  if (posthog.__loaded) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });

  // expose it so you can test from DevTools
  (window as any).posthog = posthog;
}
