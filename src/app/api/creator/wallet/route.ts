import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyMessage } from "viem";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// message must be recent (replay protection)
const MAX_AGE_SECONDS = 5 * 60;

function parseIssuedAt(message: string) {
  const match = message.match(/issuedAt:(\d+)/);
  if (!match) return null;
  return Number(match[1]);
}

export async function POST(req: Request) {
  try {
    const { walletAddress, message, signature } = await req.json();

    if (!walletAddress || typeof walletAddress !== "string") {
      return NextResponse.json({ error: "walletAddress_required" }, { status: 400 });
    }
    if (!/^0x[0-9a-fA-F]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: "invalid_wallet_address" }, { status: 400 });
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message_required" }, { status: 400 });
    }
    if (!signature || typeof signature !== "string") {
      return NextResponse.json({ error: "signature_required" }, { status: 400 });
    }

    const issuedAt = parseIssuedAt(message);
    if (!issuedAt) {
      return NextResponse.json({ error: "message_missing_issuedAt" }, { status: 400 });
    }
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - issuedAt) > MAX_AGE_SECONDS) {
      return NextResponse.json({ error: "message_expired" }, { status: 400 });
    }

    const ok = await verifyMessage({
      address: walletAddress as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });

    if (!ok) {
      return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { error } = await supabase.from("creators").upsert(
      {
        user_id: crypto.randomUUID(),
        display_name: "Creator",
        wallet_address: walletAddress,
        wallet_verified_at: new Date().toISOString(),
      },
      { onConflict: "wallet_address" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, walletAddress });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "server_error" }, { status: 500 });
  }
}
