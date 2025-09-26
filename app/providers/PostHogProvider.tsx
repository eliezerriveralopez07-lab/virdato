'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, PropsWithChildren } from 'react'

export default function PHProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // avoid double init on hot reload
    if (!(posthog as any).__isInitialized) {
      // sanity log — you should see real values in the console
      console.log('PH init', process.env.NEXT_PUBLIC_POSTHOG_KEY, process.env.NEXT_PUBLIC_POSTHOG_HOST)

      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
        capture_pageview: false, // we’ll track pageviews on route changes
      } as any)

      ;(posthog as any).__isInitialized = true
      ;(window as any).posthog = posthog // ensure global for console checks
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
