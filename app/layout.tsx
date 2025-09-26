// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";

export const metadata: Metadata = {
  // keep your own title/description if you had them
  other: { ...Sentry.getTraceData() },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

