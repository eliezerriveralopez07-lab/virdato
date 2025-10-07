<<<<<<< HEAD
// Root layout for App Router (Next.js 13/14)
=======
>>>>>>> 073dabb (feat: add Termly CMP + app router)
import Script from "next/script";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
<<<<<<< HEAD
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

=======
  const uuid = process.env.NEXT_PUBLIC_TERMLY_WEBSITE_UUID; // must be set
  return (
    <html lang="en">
      <head />
      <body>
        {/* Termly CMP – loads before anything else */}
        <Script
          id="termly-cmp"
          strategy="beforeInteractive"
          src={`https://app.termly.io/resource-blocker/${uuid}?autoBlock=on`}
        />
>>>>>>> 073dabb (feat: add Termly CMP + app router)
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
