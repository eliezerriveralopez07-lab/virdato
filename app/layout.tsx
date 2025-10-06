// app/layout.tsx
import Script from "next/script";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const uuid = process.env.NEXT_PUBLIC_TERMLY_WEBSITE_UUID; // must be defined at build/start
  return (
    <html lang="en">
      <head /> {/* Let Next.js manage <head> */}
      <body>
        {/* Termly CMP — load before anything else */}
        <Script
          id="termly-cmp"
          strategy="beforeInteractive"
          src={`https://app.termly.io/resource-blocker/${uuid}?autoBlock=on`}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
