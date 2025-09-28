'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { PropsWithChildren, useEffect } from 'react';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY; // must be defined at build time
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

export default function PHProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // expose immediately so console checks won't crash
    (window as any).posthog = posthog;
    (window as any).__PH_DEBUG = { keyPresent: !!KEY, host: HOST, initialized: false };

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
      capture_pageview: false, // we capture manually elsewhere
      person_profiles: 'identified_only',
      // debug: true, // uncomment temporarily if you want verbose logs
      loaded: () => { (window as any).__PH_DEBUG.initialized = true; },
    });

    (posthog as any).__initialized = true;
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}


