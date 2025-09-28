// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import * as Sentry from '@sentry/nextjs'

import PHProvider from './providers/PostHogProviders'
import PostHogPageview from './providers/PostHogPageview'
import "./globals.css";
import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";
import { PostHogProvider } from "./providers/PostHogProvider";
9f8226d (chore: add posthog-js)

export const metadata: Metadata = {
  other: { ...Sentry.getTraceData() },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <PHProvider>
          <PostHogPageview />
          {children}
        </PHProvider>
      </body>
    </html>
  )
}


        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
9f8226d (chore: add posthog-js)
