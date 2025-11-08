import { ethers } from "ethers";

export function getProvider() {
  return new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!);
}

export function getVirdContract() {
  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint256)",
  ];
  return new ethers.Contract(process.env.NEXT_PUBLIC_VIRD_ADDRESS!, abi, getProvider());
}
