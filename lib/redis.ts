// lib/redis.ts
import "server-only";
import { Redis } from "@upstash/redis";  // <-- correct package import

export const redis = Redis.fromEnv();
