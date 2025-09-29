// app/page.tsx
'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // expose for console testing
    ;(window as any).posthog = posthog

    // avoid double init during fast refresh
    if ((posthog as any).__loaded) return

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
    console.log('[PH page] init', { keyPresent: !!key, host })

    if (!key) {
      console.warn('[PH page] Missing NEXT_PUBLIC_POSTHOG_KEY')
      return
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    })
  }, [])

  const send = () =>
    (window as any).posthog?.capture('hello_from_button', { source: 'home' })

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind is working ✅
        </h1>
        <p className="mt-2 text-sm opacity-70">
          If this looks styled, your setup is correct.
        </p>

        <button
          onClick={send}
          className="mt-4 px-4 py-2 rounded-xl border"
        >
          Send PostHog test event
        </button>
      </div>
    </main>
  )
}
