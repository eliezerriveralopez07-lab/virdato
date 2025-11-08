"use client";

import { useEffect, useState } from "react";
import { magic } from "@/lib/magicClient";
import { getVirdContract } from "@/lib/vird";

export default function Home() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  async function signIn() {
    await magic.auth.loginWithEmailOTP({ email }); // Magic’s email flow
    // Magic injects an EIP-1193 provider; ask it for the address
    const accounts = await (magic.rpcProvider as any).request({ method: "eth_requestAccounts" });
    setAddress(accounts[0]);
  }

  async function signOut() {
    await magic.user.logout();
    setAddress("");
    setBalance("");
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
    <main className="min-h-screen grid place-items-center p-8">
      <div className="w-full max-w-md rounded-2xl p-6 shadow border">
        <h1 className="text-2xl font-bold">VIRD (Amoy) Dashboard</h1>

        {!address ? (
          <div className="mt-6 space-y-3">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={signIn}
              className="w-full rounded bg-black text-white py-2"
            >
              Sign in with Magic
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <div className="text-sm text-gray-600 break-all">
              Connected: <span className="font-mono">{address}</span>
            </div>
            <div className="text-lg">
              Balance: <span className="font-semibold">{balance || "…"}</span> VIRD
            </div>
            <button
              onClick={signOut}
              className="w-full rounded border py-2"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
