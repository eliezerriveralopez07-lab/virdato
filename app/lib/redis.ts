// lib/redis.ts
import "server-only";
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();
