# Virdato
Monorepo for the Virdato token, app, backend, and ops automation.

---

## 🔎 Proof Pack — Phase 2 (Current Status)

This section provides **verifiable evidence** that Virdato already has a deployed utility token and an operational on-chain rewards infrastructure.

### Network
- **Ethereum Sepolia (testnet)**

### Utility Token
- **Contract address:**  
  `0x57E742384F86cDB4FdbD0D78A4bD3f3D815da42F`
- **Standard:** ERC-20
- **Purpose:** Utility token for rewards, bonding, and slashing
- **Status:** ✅ Deployed and tested on Sepolia
- **Transferability:** Enabled (testnet)

### Rewards Infrastructure
- **Merkle-based rewards:** `MerkleRewardsV2`
- **Distributor:** `RewardDistributorDev`
- **Slashing / bonding:** `SlashingModuleV2`
- **Epoch-based claims:** Yes
- **Double-claim protection:** Yes
- **DAO-controlled actions:** Yes

### Governance (Development Phase)
- **DAO:** EOA
- **Treasury:** EOA  
  > Multisig migration planned before mainnet deployment

### Evidence
- Foundry tests passing locally and in CI
- GitHub Actions: `forge test -vv`
- Release tag: `v0.1-token-rewards`

This confirms that **Virdato currently operates a functional utility token and rewards mechanism**, suitable for incentivizing data contribution and integrity.

---

## Structure
- `contracts/` – Foundry (Solidity) contracts & tests  
- `backend/` – Node/TypeScript API (Covalent, Etherscan, Push)  
- `frontend/` – Next.js dapp (WalletConnect + MetaMask)  
- `ops/` – Gelato Automate tasks & scripts  
