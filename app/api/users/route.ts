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

  if (error) return NextResponse.json({ ok:false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok:true, users: data });
}

export async function POST(req: Request) {
  const { name, email, age } = await req.json();
  if (!name || !email) return NextResponse.json({ ok:false, error:'name and email required' }, { status:400 });
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, age: age != null ? Number(age) : null }])
    .select('*')
    .single();
  if (error) return NextResponse.json({ ok:false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok:true, user: data }, { status: 201 });
}
