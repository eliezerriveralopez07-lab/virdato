'use client'

import { useEffect } from 'react'

export default function PhBoot() {
  useEffect(() => {
    (async () => {
      console.log('[PH] Boot component mounted')

      // SSR-safe: only load in the browser
      const { default: posthog } = await import('posthog-js')
      ;(window as any).posthog = posthog

      const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
      console.log('[PH] keyPresent:', !!key, 'host:', host)

      if (!key) {
        console.warn('[PH] Missing NEXT_PUBLIC_POSTHOG_KEY')
        return
      }

      posthog.init(key, {
        api_host: host,
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
      })

      console.log('[PH] initialized')
    })()
  }, [])

  // visible badge so we KNOW this ran
  return (
    <div
      style={{
        position: 'fixed', bottom: 8, right: 8, padding: '4px 8px',
        borderRadius: 8, fontSize: 12, background: 'rgba(16,185,129,.15)',
        zIndex: 99999
      }}
    >
      PH Boot active
    </div>
  )
}
