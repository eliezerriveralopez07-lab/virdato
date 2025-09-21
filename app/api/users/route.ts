// app/api/users/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../src/db/client";
import { users } from "../../../src/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  const rows = await db.select().from(users);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  await db.insert(users).values({
    name: body.name,
    age: body.age,
    email: body.email,
  });
  const [created] = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email));
  return NextResponse.json(created, { status: 201 });
}
