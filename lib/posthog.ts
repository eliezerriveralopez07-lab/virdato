import posthog from 'posthog-js'

declare global { interface Window { posthog?: any } }

// expose for console testing
if (typeof window !== 'undefined') {
  window.posthog = posthog
}

export function initPosthog() {
  if (typeof window === 'undefined') return
  if ((posthog as any).__loaded) return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  console.log('[PH] init', { keyPresent: !!key, host })
  if (!key) return

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  })
}

