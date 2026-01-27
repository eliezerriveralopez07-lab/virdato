# Virdato Token + Rewards Infrastructure (v0.1)

This document describes the current on-chain incentives layer for Virdato, including the utility token and rewards/slashing contracts. It is intended to be used as technical proof of implementation and a reference for contributors.

---

## 1) Utility Token (ERC-20)

**Purpose:** VIRD is the utility token used to distribute protocol rewards to participants (contributors/operators) within the Virdato data infrastructure.

**Current network:** Ethereum Sepolia (testnet)

**Token contract address (Sepolia):**
- `0x57E742384F86cDB4FdbD0D78A4bD3f3D815da42F`

**Evidence / Verification:**
- Token is deployed on-chain (Sepolia)
- Token transfers/minting work
- Contracts below integrate with the token for reward distribution and bonding/slashing

---

## 2) Incentives Layer Components (On-chain)

### 2.1 MerkleRewardsV2
**Role:** Epoch-based rewards claiming using Merkle roots.
- Rewards are prepared off-chain, then committed on-chain as a Merkle root.
- Users claim by submitting `(epoch, amount, proof)`.

**Key properties:**
- Prevents double claims
- Verifies claims against a published root
- Supports sweeping unclaimed funds to treasury (DAO-controlled)

### 2.2 RewardDistributorDev
**Role:** Governance-controlled distributor / epoch manager.
- Publishes or finalizes Merkle roots per epoch (DAO-controlled)
- Coordinates the reward lifecycle across epochs

**DAO control:** Only DAO can set critical parameters and finalize epochs.

### 2.3 SlashingModuleV2
**Role:** Bonding and slashing (penalties) for misbehavior.
- Users bond tokens (stake)
- DAO can slash bonded amounts based on defined reasons
- Intended to enforce integrity around data contributions / attestations

---

## 3) Governance & Control (Current)

**DAO (current):** EOA (development)
- `0x940fB2F978a9e987E6F72c98FDF37a77D0B26596`

**Planned next step:**
- Move DAO control to a multisig (Safe) for production governance.

---

## 4) What is “complete” today (v0.1)

✅ Deployed ERC-20 token on Sepolia  
✅ Deployed incentives contracts (Merkle rewards + distributor + slashing)  
✅ Local Foundry tests passing  
✅ GitHub Actions CI passing  
✅ Tagged release: `v0.1-token-rewards`

---

## 5) How to prove this exists today

If asked “do you have a utility token + rewards infrastructure?”, provide:

1. **GitHub repo** (source code + tests)
2. **Release tag:** `v0.1-token-rewards`
3. **Token address (Sepolia):** `0x57E742384F86cDB4FdbD0D78A4bD3f3D815da42F`
4. **CI logs:** GitHub Actions passing `forge test -vv`

---

## 6) Next steps (not yet finalized)

- Tokenomics specification (supply, emissions, utility rules)
- Governance upgrade (multisig / timelock)
- Mainnet deployment checklist and dry-run deployments
- Off-chain scoring pipeline → Merkle root generation automation
