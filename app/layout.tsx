// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* PostHog client init */}
        <Script id="posthog-init" strategy="afterInteractive">
          {`
            (function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags group".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1,(o=t.createElement("script")).type="text/javascript",o.async=!0,o.src="https://cdn.posthog.com/lib/latest/posthog-latest.js",(n=t.getElementsByTagName("script")[0]).parentNode.insertBefore(o,n))})(document,window.posthog||[]);
            posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', {
              api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'}',
              autocapture: true,
              capture_pageview: true,
              capture_pageleave: true
            });
            window.posthog = posthog; // expose for DevTools
            console.log('[PH] initialized via <Script>');
          `}
        </Script>
      </body>
    </html>
  )
}
