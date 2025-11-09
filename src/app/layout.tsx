// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIRD",
  description: "VIRD app",
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

