// api/db-check.ts
import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anon) {
      return res.status(500).json({ ok: false, error: "Missing Supabase env vars" })
    }

    // Query your Supabase table
    const r = await fetch(`${url}/rest/v1/test_items?select=*&limit=5`, {
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
      },
    })

    if (!r.ok) {
      const text = await r.text()
      return res.status(r.status).json({ ok: false, supabaseReachable: false, status: r.status, body: text })
    }

    const data = await r.json()
    return res.status(200).json({ ok: true, supabaseReachable: true, rows: data })
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err?.message || String(err) })
  }
}
