'use client';

import { Contract, JsonRpcProvider } from 'ethers';

// Minimal ABI for a standard ERC-20 balanceOf
const VIRD_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
] as const;

/**
 * Returns a read-only Contract for VIRD using a public RPC URL.
 * Expects env:
 *   NEXT_PUBLIC_RPC_URL
 *   NEXT_PUBLIC_VIRD_ADDRESS
 */
export function getVirdContract(): Contract {
  const url = process.env.NEXT_PUBLIC_RPC_URL;
  const addr = process.env.NEXT_PUBLIC_VIRD_ADDRESS;

  if (!url) throw new Error('NEXT_PUBLIC_RPC_URL is not set');
  if (!addr) throw new Error('NEXT_PUBLIC_VIRD_ADDRESS is not set');

  const provider = new JsonRpcProvider(url);
  return new Contract(addr, VIRD_ABI, provider);
}
