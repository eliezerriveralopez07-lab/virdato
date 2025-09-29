// app/layout.tsx
'use client'

import { useEffect } from 'react'
import { initPosthog } from '../lib/posthog' // note the relative path

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPosthog()
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


