# VIRD Token — Polygon Amoy Testnet

**Contract Address:** `0x991eD8399AE768f45d8128b7D42100452fc54375`  
**Network:** Polygon PoS (Amoy Testnet — Chain ID 80002)  
**Deployer:** 0x7E9a586aEC698646108A4d598289Ff1EEfd4C126  
**Verified on:** [Polygonscan](https://amoy.polygonscan.com/address/0x991eD8399AE768f45d8128b7D42100452fc54375)

---

### ABI
Located at `out/VIRD.sol/VIRD.json`.

---

### Minimal Ethers.js Snippet
```ts
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/YOUR_KEY");
const vird = new ethers.Contract(
  "0x991eD8399AE768f45d8128b7D42100452fc54375",
  [ "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint256)" ],
  provider
);

const name = await vird.name();
console.log("Token name:", name);
