"use client";

import { useMemo, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export default function SaveWalletButton() {
  const { address, isConnected, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [status, setStatus] = useState<string>("");

  const message = useMemo(() => {
    const issuedAt = Math.floor(Date.now() / 1000);
    return `Link wallet to Virdato rewards
wallet:${address ?? ""}
chainId:${chain?.id ?? ""}
issuedAt:${issuedAt}`;
  }, [address, chain?.id]);

  const saveWallet = async () => {
    setStatus("Clicked ✅ opening signature…");

    try {
      if (!address) {
        setStatus("No wallet address detected.");
        return;
      }

      const signature = await signMessageAsync({ message });

      setStatus("Signed ✅ saving…");
      const res = await fetch("/api/creator/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          message,
          signature,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setStatus(`Server error: ${json.error || "failed"}`);
        return;
      }

      setStatus("Wallet saved ✅");
    } catch (e: any) {
      setStatus(`Client error: ${e?.message || "failed"}`);
    }
  };

  if (!isConnected || !address) return null;

  return (
    <div style={{ marginTop: 12 }}>
      <div>Connected wallet: {address}</div>

      {/* ✅ CRITICAL FIX: type="button" prevents page refresh */}
      <button
        type="button"
        onClick={saveWallet}
        style={{ marginTop: 8 }}
      >
        Save wallet for rewards
      </button>

      <div style={{ marginTop: 8 }}>{status}</div>
    </div>
  );
}
