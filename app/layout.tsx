// app/layout.tsx
import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    // keep your title/description here if you had them
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

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
