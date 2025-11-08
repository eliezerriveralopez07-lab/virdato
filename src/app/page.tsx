"use client";

import { useEffect, useState } from "react";
import { magic } from "@/lib/magicClient";
import { getVirdContract } from "@/lib/vird";

export default function Home() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  async function signIn() {
    await magic.auth.loginWithEmailOTP({ email });
    const accounts = await (magic.rpcProvider as any).request({ method: "eth_requestAccounts" });
    setAddress(accounts[0]);
  }

  useEffect(() => {
    if (!address) { setBalance(""); return; }
    (async () => {
      const vird = getVirdContract();
      const bal = await vird.balanceOf(address);
      setBalance((Number(bal) / 1e18).toFixed(4));
    })();
  }, [address]);

  return (
    <main style={{ padding: 24 }}>
      <h1>VIRD (Amoy) Dashboard</h1>

      {!address ? (
        <div style={{ marginTop: 12 }}>
          <input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 8, width: 320, marginRight: 8 }}
          />
          <button onClick={signIn} style={{ padding: "8px 12px" }}>Sign in with Magic</button>
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <div>Address: {address}</div>
          <div>Balance: {balance || "…"} VIRD</div>
        </div>
      )}
    </main>
  );
}
