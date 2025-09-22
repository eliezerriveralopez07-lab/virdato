import { NextResponse } from "next/server";
import { getDb } from "../../../src/db/client";
import { users } from "../../../src/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = getDb();
    const rows = await db.select().from(users);
    return NextResponse.json(rows);
  } catch (e: any) {
    const msg = e?.cause?.message || e?.message || String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = getDb();
    const body = await req.json();
    await db.insert(users).values({ name: body.name, age: body.age, email: body.email });
    const [created] = await db.select().from(users).where(eq(users.email, body.email));
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    const msg = e?.cause?.message || e?.message || String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

