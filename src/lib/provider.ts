import { JsonRpcProvider } from 'ethers';

export function getProvider() {
  const url = process.env.NEXT_PUBLIC_RPC_URL;
  if (!url || url.trim().length === 0) {
    // Throwing here produces a clear build-time message instead of a vague JSON.parse error
    throw new Error('NEXT_PUBLIC_RPC_URL is not set');
  }
  return new JsonRpcProvider(url);
}
