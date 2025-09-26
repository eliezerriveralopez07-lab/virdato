'use client'

import posthog from 'posthog-js'
import { useEffect, PropsWithChildren } from 'react'

export default function PHProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((posthog as any).__isInitialized) return

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com'
    if (!key) {
      console.warn('PostHog: missing NEXT_PUBLIC_POSTHOG_KEY')
      return
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: false, // we'll send pageviews on route changes
    } as any)

    ;(posthog as any).__isInitialized = true
    ;(window as any).posthog = posthog // so you can use it from DevTools
    console.log('PostHog initialized', { host })
  }, [])

  return <>{children}</>
}
