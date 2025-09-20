import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function GET() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, users: data });
}

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 }); }

  const { name, email, age } = body || {};
  if (!name || !email)
    return NextResponse.json({ ok: false, error: 'name and email required' }, { status: 400 });

  const { data, error } = await supabase
    .from('users')
    .insert([{ name: String(name), email: String(email), age: age != null ? Number(age) : null }])
    .select('*')
    .single();

  if (error) {
    if ((error as any).code === '23505' || /duplicate key/i.test(error.message))
      return NextResponse.json({ ok: false, error: 'email already exists' }, { status: 409 });
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, user: data }, { status: 201 });
}

// CORS/preflight (safe to keep)
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: 'GET, POST, OPTIONS' } });
}
