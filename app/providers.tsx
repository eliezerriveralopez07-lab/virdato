// app/providers.tsx
'use client'

import { useEffect, ReactNode } from 'react'
import { initPosthog } from '../lib/posthog'

type Props = { children: ReactNode }

export default function Providers({ children }: Props) {
  useEffect(() => {
    console.log('[PH] Providers mounted')
    initPosthog()
  }, [])

  return <>{children}</>
}
