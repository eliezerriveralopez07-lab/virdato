'use client'
import { useEffect, type ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async () => {
      const { default: posthog } = await import('posthog-js')  // bundled, no CDN
      ;(window as any).posthog = posthog                       // expose for console

      const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
      console.log('[PH] provider init', { keyPresent: !!key, host })
      if (!key) return

      posthog.init(key, {
        api_host: host,
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
      })

      console.log('[PH] initialized via provider')
    })()
  }, [])

  // TEMP badge so we know this ran; delete later
  return (
    <>
      {children}
      <div style={{
        position:'fixed',bottom:8,right:8,padding:'4px 8px',
        borderRadius:8,fontSize:12,background:'rgba(16,185,129,.15)',zIndex:99999
      }}>PH Boot active</div>
    </>
  )
}
