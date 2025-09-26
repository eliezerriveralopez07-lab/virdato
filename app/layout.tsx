// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";

export const metadata: Metadata = {
  other: { ...Sentry.getTraceData() },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}

