'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { PropsWithChildren, useEffect } from 'react';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY; // must exist at build runtime
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

// Expose immediately so console access never crashes
if (typeof window !== 'undefined') {
  (window as any).posthog = posthog;
  (window as any).__PH_DEBUG = { keyPresent: !!KEY, host: HOST, initialized: false };
}

export default function PHProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!KEY) {
      console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY missing; client not initialized.');
      return;
    }
    if ((posthog as any).__initialized) {
      (window as any).__PH_DEBUG.initialized = true;
      return;
    }

    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false, // pageviews captured by PostHogPageview
      person_profiles: 'identified_only',
      // debug: true, // uncomment temporarily to see verbose logs
      loaded: () => { (window as any).__PH_DEBUG.initialized = true; },
    });

    (posthog as any).__initialized = true;
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}


