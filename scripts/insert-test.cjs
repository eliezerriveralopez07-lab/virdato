require("dotenv").config({ override:true });
const sql = require("postgres")(process.env.DATABASE_URL, { prepare:false });

(async () => {
  try {
    const email = `smoke+${Date.now()}@test.local`;
    await sql`insert into public.users (name, age, email, created_at) values ('Smoke', 1, ${email}, now())`;
    console.log("insert OK:", email);

    const rows = await sql`select id,name,age,email,created_at from public.users order by id desc limit 1`;
    console.log("latest:", rows);
    process.exit(0);
  } catch (e) {
    console.error("insert ERR:", e.message);
    process.exit(1);
  }
})();
