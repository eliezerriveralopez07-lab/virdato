import postgres from "postgres";
export const runtime = "nodejs";
export async function GET() {
  try {
    const sql = postgres(process.env.DATABASE_URL!, { prepare: false });
    const [row] = await sql`select now() as now, current_user as user, current_database() as db`;
    return Response.json({ ok: true, row });
  } catch (e:any) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
