import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { walletAddress } = await req.json();

    if (!walletAddress || typeof walletAddress !== "string") {
      return NextResponse.json(
        { error: "walletAddress_required" },
        { status: 400 }
      );
    }

    if (!/^0x[0-9a-fA-F]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: "invalid_wallet_address" },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : "";

    if (!token) {
      return NextResponse.json(
        { error: "missing_auth_token" },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { persistSession: false },
      }
    );

    const { data: userData, error: userErr } =
      await supabase.auth.getUser();

    if (userErr || !userData?.user) {
      return NextResponse.json(
        { error: "invalid_session" },
        { status: 401 }
      );
    }

    const userId = userData.user.id;

    const { error: updErr } = await supabase
      .from("creators")
      .update({ wallet_address: walletAddress })
      .eq("user_id", userId);

    if (updErr) {
      return NextResponse.json(
        { error: updErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, walletAddress });
  } catch {
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}
