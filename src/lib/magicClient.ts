// src/lib/magicClient.ts
'use client';

import { Magic } from 'magic-sdk';

let magic: Magic | null = null;

/** Returns Magic in the browser; null on server/SSG. */
export function getMagic(): Magic | null {
  if (typeof window === 'undefined') return null;
  const key = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
  if (!key) return null;
  return (magic ??= new Magic(key));
}
