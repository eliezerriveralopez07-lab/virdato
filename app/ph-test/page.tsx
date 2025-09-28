'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function PHTest() {
  useEffect(() => {
    const KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

    // expose to window so console checks never crash
    (window as any).posthog = posthog;

    console.log('[PH TEST] keyPresent:', !!KEY, 'host:', HOST);
    if (!KEY) {
      console.warn('[PH TEST] Missing NEXT_PUBLIC_POSTHOG_KEY');
      return;
    }

    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false,
      debug: true, // temporary; shows verbose logs
    });

    posthog.capture('ph_test_page_loaded', { route: '/ph-test' });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>PostHog Smoke Test</h1>
      <p>Open DevTools → Console & Network. This page calls posthog.init() and sends an event.</p>
    </main>
  );
}
