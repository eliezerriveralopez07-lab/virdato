// src/lib/provider.ts (or wherever this lives)
import { JsonRpcProvider } from 'ethers';

export function getProvider() {
  return new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!);
}
