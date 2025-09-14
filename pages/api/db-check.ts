// pages/api/db-check.ts
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    return res.status(500).json({ ok: false, error: "Missing Supabase env vars" })
  }

  // Query Supabase REST for up to 5 rows from your table
  const r = await fetch(`${url}/rest/v1/test_items?select=*&limit=5`, {
    headers: {
      apikey: anon,
      Authorization: `Bearer ${anon}`,
    },
  })

  const body = await r.text()

  if (!r.ok) {
    return res
      .status(r.status)
      .json({ ok: false, supabaseReachable: false, status: r.status, body })
  }

  return res.status(200).json({
    ok: true,
    supabaseReachable: true,
    rows: JSON.parse(body),
  })
}
