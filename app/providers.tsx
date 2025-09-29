'use client'

import { useEffect, ReactNode } from 'react'
import { initPosthog } from '../lib/posthog'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log('[PH] Providers mounted')
    initPosthog()
  }, [])

  return <>{children}</>
}

