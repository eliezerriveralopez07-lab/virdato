// app/layout.tsx  (or src/app/layout.tsx)
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
          src="https://app.termly.io/resource-blocker/1842f9f9-468d-4578-a354-2933902e853b?autoBlock=on"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
