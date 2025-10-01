'use client'

import { useEffect } from 'react'

export default function PhBoot() {
  useEffect(() => {
    (async () => {
      console.log('[PH] boot starting')

      // SSR-safe: only load on the client
      const { default: posthog } = await import('posthog-js')

      // expose so DevTools can use it
      ;(window as any).posthog = posthog

      const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
      console.log('[PH] init params', { keyPresent: !!key, host })

      if (!key) { console.warn('[PH] Missing NEXT_PUBLIC_POSTHOG_KEY'); return }

      posthog.init(key, {
        api_host: host,
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
      })

      console.log('[PH] initialized')
    })()
  }, [])

  // temporary badge so we KNOW this ran
  return (
    <div style={{
      position:'fixed', bottom:8, right:8, padding:'4px 8px',
      borderRadius:8, fontSize:12, background:'rgba(16,185,129,.15)', zIndex:99999
    }}>
      PH Boot active
    </div>
  )
}
