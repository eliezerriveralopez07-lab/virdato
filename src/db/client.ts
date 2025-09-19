import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

// Supabase transaction pooler (6543) ? prepared statements OFF
const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
export const db = drizzle(client, { schema });
