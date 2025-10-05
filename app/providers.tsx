'use client'
import { useEffect, type ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async () => {
      console.log('[PH] provider mounted')

      const { default: posthog } = await import('posthog-js') // SSR-safe
      ;(window as any).posthog = posthog                      // expose for Console

      const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
      console.log('[PH] init params', { keyPresent: !!key, host })

      if (!key) { console.warn('[PH] missing NEXT_PUBLIC_POSTHOG_KEY'); return }

      posthog.init(key, {
        api_host: host,
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
      })
      console.log('[PH] initialized')
    })()
  }, [])

  // TEMP badge so we can see it's running; remove later
  return (
    <>
      {children}
      <div style={{
        position:'fixed', bottom:8, right:8, padding:'4px 8px',
        borderRadius:8, fontSize:12, background:'rgba(16,185,129,.15)', zIndex:99999
      }}>PH ON</div>
    </>
  )
}
