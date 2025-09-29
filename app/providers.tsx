// app/providers.tsx
'use client'

import { useEffect } from 'react'
import { initPosthog } from '../lib/posthog'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPosthog()
  }, [])

  return <>{children}</>
}
