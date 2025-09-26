'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { PropsWithChildren, useEffect } from 'react'

export default function PHProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // prevent double init on hot reload
    if (!posthog.__isInitialized) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
        capture_pageview: false, // we'll send pageviews on route change
      } as any)
      ;(posthog as any).__isInitialized = true
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
