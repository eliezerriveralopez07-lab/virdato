import { ethers } from "ethers";

export function buildCreatorMessage({ wallet, platform, handle, timestamp }) {
  return [
    "VIRDATO CREATOR REGISTRATION",
    `wallet=${wallet}`,
    `platform=${platform}`,
    `handle=${handle}`,
    `timestamp=${timestamp}`,
    "By signing, I attest I control this wallet and claim this handle for Virdato rewards."
  ].join("\n");
}

export function verifyCreatorSignature({ wallet, platform, handle, timestamp, signature }) {
  const msg = buildCreatorMessage({ wallet, platform, handle, timestamp });
  const recovered = ethers.verifyMessage(msg, signature);
  return recovered.toLowerCase() === wallet.toLowerCase();
}
