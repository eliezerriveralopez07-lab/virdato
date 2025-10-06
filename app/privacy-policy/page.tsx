// app/privacy-policy/page.tsx
import Script from "next/script";

export default function PrivacyPolicy() {
  return (
    <main className="prose max-w-3xl mx-auto px-4 py-12">
      {/* Paste Termly’s snippet EXACTLY between the backticks */}
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `<div name="termly-embed" data-id="PASTE-YOUR-DATA-ID-HERE"></div>`,
        }}
      />
      {/* If Termly also shows an embed loader script, include it: */}
      <Script
        id="termly-embed-loader"
        src="https://app.termly.io/embed.min.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
