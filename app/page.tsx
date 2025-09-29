// app/page.tsx
'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

// Assign immediately when the module loads (so DevTools can see it)
if (typeof window !== 'undefined') {
  ;(window as any).posthog = posthog
  console.log('[PH page] module evaluated — window.posthog set')
}

export default function Home() {
  useEffect(() => {
    console.log('[PH page] useEffect ran')

    const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
    console.log('[PH page] init about to run', { keyPresent: !!key, host })

    if (key) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      })
      console.log('[PH page] posthog.init called')
    } else {
      console.warn('[PH page] MISSING NEXT_PUBLIC_POSTHOG_KEY')
    }
  }, [])

  const send = () =>
    (window as any).posthog?.capture('hello_from_button', { source: 'home' })

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-blue-600">Tailwind is working ✅</h1>
        <p className="mt-2 text-sm opacity-70">If this looks styled, your setup is correct.</p>

        <button onClick={send} className="mt-4 px-4 py-2 rounded-xl border">
          Send PostHog test event
        </button>
      </div>
    </main>
  )
}
