'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { PropsWithChildren, useEffect } from 'react';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY!;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

let initialized = false;

export default function PHProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!initialized) {
      posthog.init(KEY, {
        api_host: HOST,
        capture_pageview: false, // pageviews handled separately
        person_profiles: 'identified_only',
      });
      initialized = true;
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
