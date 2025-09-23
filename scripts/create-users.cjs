require("dotenv").config({ override:true });
const url = process.env.DATABASE_URL;
if (!url) { console.error("NO_DB_URL"); process.exit(1); }
const sql = require("postgres")(url, { prepare:false });

(async () => {
  try {
    console.log("ping:", await sql`select 1 as ok`);
    await sql`create schema if not exists public`;
    await sql`create table if not exists public.users (
      id serial primary key,
      name text not null,
      age integer not null,
      email text not null unique,
      created_at timestamp not null default now()
    )`;
    const ex = await sql`select to_regclass('public.users') as exists`;
    console.log("exists:", ex); // expect public.users
  } catch (e) {
    console.error("ERR:", e.stack || e.message || e);
  } finally {
    process.exit(0);
  }
})();
