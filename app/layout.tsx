// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import * as Sentry from '@sentry/nextjs'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Force client-side execution of these components
const PHProvider = dynamic(() => import('./providers/PostHogProviders'), { ssr: false })
const PostHogPageview = dynamic(() => import('./providers/PostHogPageview'), { ssr: false })

export const metadata: Metadata = {
  other: { ...Sentry.getTraceData() },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <PHProvider>
          <Suspense fallback={null}>
            <PostHogPageview />
          </Suspense>
          {children}
        </PHProvider>
      </body>
    </html>
  )
}

