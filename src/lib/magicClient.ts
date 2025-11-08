import { Magic } from "magic-sdk";

export const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, {
  network: {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    chainId: 80002, // Polygon Amoy
  },
});
