// src/db/smoke.ts
import { eq } from "drizzle-orm";
import { getDb } from "./client";   // <-- use getDb()
import { users } from "./schema";

async function main() {
  try {
    const db = getDb();                             // <-- get an instance here
    const email = `smoke+${Date.now()}@test.local`;
    await db.insert(users).values({ name: "Smoke", age: 1, email });
    const [row] = await db.select().from(users).where(eq(users.email, email));
    console.log({ ok: true, row });
    process.exit(0);
  } catch (e: any) {
    const msg = e?.cause?.message || e?.message || String(e);
    console.error({ ok: false, error: msg });
    process.exit(1);
  }
}

main();
