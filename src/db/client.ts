import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  let url = process.env.DATABASE_URL || "";
  if (!url) throw new Error("DATABASE_URL is not set");
  // <-- fix the scheme Neon/Vercel often provide
  if (url.startsWith("postgresql://")) {
    url = "postgres://" + url.slice("postgresql://".length);
  }
  if (!_client) {
    _client = postgres(url, { prepare: false, max: 1 });
    _db = drizzle(_client, { schema });
  }
  return _db!;
}
