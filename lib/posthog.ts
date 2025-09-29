import posthog from 'posthog-js'

declare global {
  interface Window { posthog?: any }
}

// expose immediately so DevTools can see it
if (typeof window !== 'undefined') {
  window.posthog = posthog
}

export function initPosthog() {
  if (typeof window === 'undefined') return

  // avoid double init
  if ((posthog as any).__loaded) return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  console.log('[PH] init', { keyPresent: !!key, host })

  if (!key) {
    console.warn('[PH] Missing NEXT_PUBLIC_POSTHOG_KEY')
    return
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  })
}

