"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useReadContract, useWriteContract } from "wagmi";
import { formatEther, parseEther } from "viem";
import SaveWalletButton from "@/components/SaveWalletButton";

const tokenAbi = [
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

const tokenAddress = process.env.NEXT_PUBLIC_VIRDTOKEN_ADDRESS as `0x${string}`;

export default function HomePage() {
  const { address, isConnected } = useAccount();

  const { data: nativeBalance } = useBalance({ address });

  const { data: tokenName } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "name",
  });

  const { data: tokenSymbol } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "symbol",
  });

  const { data: tokenDecimals } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "decimals",
  });

  const { data: tokenBalance } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const { writeContract, isPending } = useWriteContract();

  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const handleTransfer = async () => {
    if (!address || !transferTo || !transferAmount) return;

    // NOTE: this assumes 18 decimals. If your token uses different decimals,
    // switch to parseUnits(transferAmount, Number(tokenDecimals ?? 18))
    const amountBigInt = parseEther(transferAmount);

    try {
      await writeContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: "transfer",
        args: [transferTo as `0x${string}`, amountBigInt],
      });
      setTransferAmount("");
      setTransferTo("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center p-6">
      <header className="w-full max-w-3xl flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold">Virdato Wallet Dashboard</h1>
          <p className="text-sm text-slate-400">
            Polygon Amoy · Manage your VirdToken holdings.
          </p>

          {/* ✅ Save wallet for rewards (shows only after wallet is connected) */}
          <div className="mt-4">
            <SaveWalletButton />
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <ConnectButton />
        </div>
      </header>

      {!isConnected ? (
        <p className="text-slate-400">Connect your wallet to view balances.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {/* Overview card */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-semibold">Account Overview</h2>
            <p className="text-sm text-slate-400 break-all">
              Address: <span className="text-slate-100">{address}</span>
            </p>
            <p className="text-sm text-slate-400">
              Native MATIC:{" "}
              <span className="text-slate-100">
                {nativeBalance ? Number(formatEther(nativeBalance.value)).toFixed(4) : "--"} MATIC
              </span>
            </p>
          </section>

          {/* Token balance card */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-semibold">Virdato Token</h2>
            <p className="text-sm text-slate-400">
              Token: <span className="text-slate-100">{tokenName ?? "..."}</span> (
              <span className="text-slate-100">{tokenSymbol ?? "VDT"}</span>)
            </p>
            <p className="text-sm text-slate-400">
              Decimals: <span className="text-slate-100">{tokenDecimals?.toString() ?? "..."}</span>
            </p>
            <p className="text-sm text-slate-400">
              Your balance:{" "}
              <span className="text-emerald-400 font-semibold">
                {tokenBalance ? Number(formatEther(tokenBalance as bigint)).toLocaleString() : "0"}{" "}
                {tokenSymbol ?? "VDT"}
              </span>
            </p>
          </section>

          {/* Transfer form */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Send VirdToken</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Recipient address</label>
                <input
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  placeholder="0x..."
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.0001"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  placeholder="100"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>

              <button
                disabled={isPending || !transferTo || !transferAmount}
                onClick={handleTransfer}
                className="px-4 py-2 rounded-lg bg-emerald-500 disabled:opacity-40 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                {isPending ? "Sending..." : "Send VDT"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
