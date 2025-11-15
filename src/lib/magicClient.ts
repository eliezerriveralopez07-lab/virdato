'use client';

import { Magic } from 'magic-sdk';

let magic: Magic | null = null;

/** Only returns a Magic instance in the browser. Never during SSR/SSG. */
export function getMagic(): Magic | null {
  if (typeof window === 'undefined') return null; // block on server/prerender
  const key = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
  if (!key) return null; // don't crash builds if key missing in CI
  return (magic ??= new Magic(key));
}
