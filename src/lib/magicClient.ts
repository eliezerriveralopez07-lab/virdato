'use client';

import { Magic } from 'magic-sdk';

let singleton: Magic | null = null;

/**
 * Returns a Magic instance in the browser; returns null on server/SSG
 * so builds don’t crash and prerendering doesn’t try to touch window.
 */
export function getMagic(): Magic | null {
  if (typeof window === 'undefined') return null;
  const key = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
  if (!key) return null;
  if (!singleton) singleton = new Magic(key);
  return singleton;
}

export default getMagic;
