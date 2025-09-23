// lib/redis.ts
import "server-only";
import { Redis } from "@/lib/redis";

export const redis = Redis.fromEnv();
