'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { PropsWithChildren, useEffect } from 'react';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY; // public, must exist
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

export default function PHProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // no key? don't try to init
    if (!KEY) {
      console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY missing; client not initialized.');
      return;
    }

    // avoid double-init during Fast Refresh
    if ((posthog as any).__initialized) return;

    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false, // pageviews handled in PostHogPageview
      person_profiles: 'identified_only',
      // debug: true, // uncomment to see verbose logs
    });

    // expose for console debugging so window.posthog works
    (window as any).posthog = posthog;
    (posthog as any).__initialized = true;
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
