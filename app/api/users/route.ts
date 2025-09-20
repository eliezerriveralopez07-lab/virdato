import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ ok: true, users: [] });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { ok: false, error: 'name and email required' },
        { status: 400 }
      );
    }
    // TODO: insert into DB
    return NextResponse.json({ ok: true, received: body }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
