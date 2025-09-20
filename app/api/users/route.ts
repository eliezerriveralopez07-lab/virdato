import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,             // server-only
  { auth: { persistSession: false } }
)

const UserIn = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0).max(120).optional()
})

export async function GET() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return NextResponse.json({ ok:false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok:true, users: data })
}

export async function POST(req: Request) {
  try {
    const parsed = UserIn.parse(await req.json())
    const { data, error } = await supabase
      .from('users')
      .insert([parsed])
      .select('*')
      .single()

    if (error) return NextResponse.json({ ok:false, error: error.message }, { status: 500 })
    return NextResponse.json({ ok:true, user: data }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ ok:false, error: e?.message ?? 'Bad Request' }, { status: 400 })
  }
}

// CORS/preflight (optional)
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: 'GET, POST, OPTIONS' } })
}
