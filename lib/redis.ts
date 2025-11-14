// lib/redis.ts
import 'server-only';
import { Redis } from '@upstash/redis';

export function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Don't throw at import/build time; fail lazily when actually used.
  if (!url || !token) {
    // Return a proxy that throws only when a method is called
    return new Proxy({} as Redis, {
      get() {
        throw new Error(
          'Upstash Redis env vars are missing: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN'
        );
      },
    }) as unknown as Redis;
  }

  return new Redis({ url, token });
}
