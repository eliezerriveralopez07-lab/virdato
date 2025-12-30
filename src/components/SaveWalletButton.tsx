"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { getMagic } from "@/lib/magicClient";

export default function SaveWalletButton() {
  const { address, isConnected } = useAccount();
  const [status, setStatus] = useState<string>("");

  const saveWallet = async () => {
    try {
      setStatus("Saving...");

      const magic = getMagic();
      if (!magic) {
        setStatus("Magic not initialized");
        return;
      }

      // Magic DID token
      const didToken = await magic.user.getIdToken();

      const res = await fetch("/api/creator/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify({ walletAddress: address }),
      });

      const json = await res.json();
      if (!res.ok) {
        setStatus(`Error: ${json.error || "failed"}`);
        return;
      }

      setStatus("Wallet saved ✅");
    } catch {
      setStatus("Error: request failed");
    }
  };

  if (!isConnected || !address) return null;

  return (
    <div style={{ marginTop: 12 }}>
      <div>Connected wallet: {address}</div>
      <button onClick={saveWallet} style={{ marginTop: 8 }}>
        Save wallet for rewards
      </button>
      <div style={{ marginTop: 8 }}>{status}</div>
    </div>
  );
}
