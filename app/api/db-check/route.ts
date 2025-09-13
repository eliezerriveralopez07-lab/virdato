// app/api/db-check/route.ts
export async function GET() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return new Response(JSON.stringify({ ok:false, error:"Missing Supabase env vars" }), { status:500 })

  const r = await fetch(`${url}/rest/v1/test_items?select=*&limit=5`, {
    headers: { apikey: anon, Authorization: `Bearer ${anon}` },
  })

  const body = await r.text()
  if (!r.ok) return new Response(JSON.stringify({ ok:false, supabaseReachable:false, status:r.status, body }), { status:r.status })

  return new Response(JSON.stringify({ ok:true, supabaseReachable:true, rows: JSON.parse(body) }), { status:200 })
}
