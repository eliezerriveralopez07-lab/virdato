import Script from "next/script";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Script
          id="termly-cmp"
          strategy="beforeInteractive"
          src={`https://app.termly.io/resource-blocker/${process.env.NEXT_PUBLIC_TERMLY_WEBSITE_UUID}?autoBlock=on`}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

