// lib/redis.ts
import "server-only";
import { Redis } from "@upstash/redis";   // <-- THIS is the correct import

export const redis = Redis.fromEnv();
