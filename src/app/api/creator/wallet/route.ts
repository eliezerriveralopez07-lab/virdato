import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Magic } from "@magic-sdk/admin";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const magic = new Magic(process.env.MAGIC_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    // 1) Validate wallet payload
    const { walletAddress } = await req.json();

    if (!walletAddress || typeof walletAddress !== "string") {
      return NextResponse.json({ error: "walletAddress_required" }, { status: 400 });
    }

    if (!/^0x[0-9a-fA-F]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: "invalid_wallet_address" }, { status: 400 });
    }

    // 2) Extract Magic DID token
    const authHeader = req.headers.get("authorization") || "";
    const didToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!didToken) {
      return NextResponse.json({ error: "missing_magic_token" }, { status: 401 });
    }

    if (!process.env.MAGIC_SECRET_KEY) {
      return NextResponse.json({ error: "MAGIC_SECRET_KEY_missing" }, { status: 500 });
    }

    // 3) Validate DID token + get Magic user metadata
    await magic.token.validate(didToken);
    const metadata = await magic.users.getMetadataByToken(didToken);

    const issuer = metadata.issuer; // stable user id in Magic
    if (!issuer) {
      return NextResponse.json({ error: "magic_issuer_missing" }, { status: 401 });
    }

    // 4) Server-side Supabase client (service role)
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    // 5) Find existing creator by magic_issuer
    const { data: existing, error: selErr } = await supabase
      .from("creators")
      .select("id,user_id")
      .eq("magic_issuer", issuer)
      .maybeSingle();

    if (selErr) {
      return NextResponse.json({ error: selErr.message }, { status: 500 });
    }

    // 6) Update if exists, else insert new creator
    if (existing?.id) {
      const { error: updErr } = await supabase
        .from("creators")
        .update({ wallet_address: walletAddress })
        .eq("id", existing.id);

      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

      return NextResponse.json({ ok: true, walletAddress, issuer, mode: "updated" });
    }

    // Insert new creator row
    const newUserId = crypto.randomUUID(); // satisfies NOT NULL user_id constraint
    const displayName = metadata.email || "Creator";

    const { error: insErr } = await supabase.from("creators").insert({
      user_id: newUserId,
      display_name: displayName,
      magic_issuer: issuer,
      wallet_address: walletAddress,
    });

    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

    return NextResponse.json({ ok: true, walletAddress, issuer, mode: "inserted" });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "server_error" }, { status: 500 });
  }
}
