// Root layout for App Router (Next.js 13/14)
import Script from "next/script";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // This must be defined at runtime (dev: via .env.op + op run; prod: Vercel env)
  const uuid = process.env.NEXT_PUBLIC_TERMLY_WEBSITE_UUID;
  const termlySrc = `https://app.termly.io/resource-blocker/${uuid ?? "MISSING_UUID"}?autoBlock=on`;

  return (
    <html lang="en">
      {/* Let Next manage <head> entries from pages/components */}
      <head />
      <body>
        {/* Termly CMP – load before anything else to enforce autoblocking */}
        <Script id="termly-cmp" strategy="beforeInteractive" src={termlySrc} />
        {/* Optional debug if UUID is missing */}
        {!uuid && (
          <Script id="termly-cmp-debug" strategy="afterInteractive">
            {`console.warn("NEXT_PUBLIC_TERMLY_WEBSITE_UUID is missing – banner will not load.");`}
          </Script>
        )}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
