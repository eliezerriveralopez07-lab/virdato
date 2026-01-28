import fs from "fs";
import path from "path";
import { verifyCreatorSignature } from "./verifySignature.js";

const REG_PATH = path.join(process.cwd(), "backend/creators/registry.json");

export function registerCreator(payload) {
  if (!verifyCreatorSignature(payload)) {
    throw new Error("Invalid signature");
  }

  const reg = JSON.parse(fs.readFileSync(REG_PATH, "utf-8"));
  const exists = reg.creators.some(
    (c) =>
      c.wallet.toLowerCase() === payload.wallet.toLowerCase() &&
      c.platform === payload.platform &&
      c.handle === payload.handle
  );

  if (!exists) {
    reg.creators.push({
      wallet: payload.wallet,
      platform: payload.platform,
      handle: payload.handle,
      timestamp: payload.timestamp,
      signature: payload.signature
    });
    fs.writeFileSync(REG_PATH, JSON.stringify(reg, null, 2));
  }

  return { ok: true, creators: reg.creators.length };
}
