// app/layout.tsx
import "./globals.css"; // <-- keep this at the very top
import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";

export const metadata: Metadata = {
  // add your own title/description if needed
  other: { ...Sentry.getTraceData() },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Tailwind classes can go on <body> if you want (e.g., "min-h-screen bg-white") */}
      <body>{children}</body>
    </html>
  );
}

