import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { polygonAmoy } from 'wagmi/chains';

export const walletConfig = getDefaultConfig({
  appName: 'Virdato Dashboard',
  projectId: 'VIRDATO-FRONTEND-DEV', // can be any string if not using WalletConnect cloud
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
  },
});
