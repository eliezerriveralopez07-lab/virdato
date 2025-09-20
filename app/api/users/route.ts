import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Create client lazily so build doesn't throw if envs aren't injected yet.
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !svc) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, svc, { auth: { persistSession: false } });
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, users: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Server misconfigured' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const { name, email, age } = await req.json();
    if (!name || !email)
      return NextResponse.json({ ok: false, error: 'name and email required' }, { status: 400 });

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, age: age != null ? Number(age) : null }])
      .select('*')
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, user: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Server misconfigured' }, { status: 500 });
  }
}

// Optional, harmless CORS/preflight
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: 'GET, POST, OPTIONS' } });
}
