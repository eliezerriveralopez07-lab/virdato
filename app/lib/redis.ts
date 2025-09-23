// lib/redis.ts
import "server-only";                 // prevents accidental client bundling
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv(); // uses UPSTASH_REDIS_REST_URL/TOKEN
