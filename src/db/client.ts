import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  let url = (process.env.DATABASE_URL || "").trim();
  if (!url) throw new Error("DATABASE_URL is not set");

  // Strip accidental psql wrapper/quotes
  if (url.startsWith("psql ")) url = url.replace(/^psql\s+'?/, "").replace(/'$/, "");

  // Normalize scheme to postgres:
  if (url.startsWith("postgresql:")) url = "postgres:" + url.slice("postgresql:".length);

  // Enforce exactly two slashes after postgres:
  url = url.replace(/^postgres:(\/+)?/, "postgres://");

  if (!_client) {
    _client = postgres(url, { prepare: false, max: 1 });
    _db = drizzle(_client, { schema });
  }
  return _db!;
}
