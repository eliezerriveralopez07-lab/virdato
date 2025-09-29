// app/ph-boot.tsx
'use client'

import { useEffect } from 'react'

export default function PhBoot() {
  useEffect(() => {
    (async () => {
      console.log('[PH] Boot component mounted')

      // Dynamic import so SSR never touches window/posthog
      const { default: posthog } = await import('posthog-js')

      // Expose for DevTools testing
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
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      })

      console.log('[PH] initialized')
    })()
  }, [])

  // Visual badge so we KNOW this ran
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
