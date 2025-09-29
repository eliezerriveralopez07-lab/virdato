// app/providers.tsx
'use client'

import { useEffect, type ReactNode } from 'react'
import { initPosthog } from '../lib/posthog'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // fire-and-forget; it’s async
    initPosthog()
  }, [])

  return <>{children}</>
}
