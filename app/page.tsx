// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

type State = {
  mounted: boolean
  keyPresent: boolean
  host: string
  hasWindowPH: boolean
}

export default function Home() {
  const [s, setS] = useState<State>({
    mounted: false,
    keyPresent: false,
    host: '',
    hasWindowPH: false,
  })

  useEffect(() => {
    // expose for console testing
    ;(window as any).posthog = posthog

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    console.log('[PH debug] page mounted', { keyPresent: !!key, host })

    setS({
      mounted: true,
      keyPresent: !!key,
      host,
      hasWindowPH: typeof (window as any).posthog !== 'undefined',
    })
  }, [])

  const initPH = () => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    if (!key) {
      alert('Missing NEXT_PUBLIC_POSTHOG_KEY (.env.local)')
      return
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    })
    alert('posthog.init called')
  }

  const sendEvent = () => {
    ;(window as any).posthog?.capture('hello_from_button', { source: 'home' })
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="p-6 rounded-2xl shadow space-y-3">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind is working ✅
        </h1>
        <p className="text-sm opacity-70">
          If this looks styled, your setup is correct.
        </p>

        {/* DEBUG PANEL */}
        <div className="mt-4 p-3 rounded-xl border">
          <div className="font-semibold">PostHog Debug</div>
          <div>mounted: {String(s.mounted)}</div>
          <div>keyPresent: {String(s.keyPresent)}</div>
          <div>host: {s.host || '(empty)'}</div>
          <div>typeof window.posthog: {typeof (window as any).posthog}</div>

          <div className="mt-3 flex gap-2">
            <button onClick={initPH} className="px-3 py-2 rounded-lg border">
              Init PostHog
            </button>
            <button onClick={sendEvent} className="px-3 py-2 rounded-lg border">
              Send test event
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
