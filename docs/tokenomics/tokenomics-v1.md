# Virdato Tokenomics v1 (Sign-Off)

**Token name:** Virdato  
**Symbol:** VIRD  
**Decimals:** 18  
**Type:** ERC-20 utility token  
**Primary use:** rewards for participation + integrity bonding/slashing

> This is a governance sign-off document. The token is intended for consumptive/utility use in the Virdato ecosystem.
> This is not financial advice.

---

## 1) Purpose & Utility
VIRD is designed to:
1) Reward valuable participation in Virdato’s data infrastructure.
2) Provide bonding collateral for integrity-sensitive roles (slashing for misbehavior).
3) Align incentives around data quality, uptime, and honest reporting.

---

## 2) Supply Model
### 2.1 Fixed Supply
- Model: fixed total supply (minted at deployment, no further minting after ownership transferred to DAO)
- Rationale: predictable economics + fewer governance surprises.

### 2.2 Distribution Mechanism
- Epoch-based distributions using Merkle root publication.
- Claim model:
  - DAO publishes epoch Merkle root on distributor.
  - Users claim from MerkleRewards contract using (epoch, amount, proof).
- Unclaimed rewards:
  - remain in rewards contract or may be swept to treasury by DAO based on policy.

---

## 3) Distribution Buckets (v1)
These are the v1 “buckets.” Exact emissions per epoch are decided by DAO policy (and may evolve via governance).

- Contributor rewards: 50%
- Operator / infrastructure rewards: 20%
- Treasury: 20%
- Community / programs: 10%

---

## 4) Reward Eligibility (v1 policy)
Eligibility is computed off-chain and results in a Merkle tree per epoch.
Inputs may include:
- quality score
- participation volume
- anti-sybil weighting
- uptime/reliability
- penalty history (slashing/disputes)

### 4.1 Anti-AI policy (v1)
Content declared or detected as AI-generated may receive:
- hard block (0 rewards) for declared AI or high confidence AI
- reduced multiplier for medium confidence AI
Rules are implemented off-chain and MUST be documented + reproducible.

---

## 5) Slashing & Integrity
- Integrity-sensitive roles require bonding VIRD.
- DAO can slash bonded amounts when misbehavior is proven.
Examples:
- fraudulent reporting
- manipulation attempts
- repeated invalid submissions
- signing/verifications abuse

---

## 6) Governance Controls
- DAO is a Safe multisig.
- Treasury is the DAO Safe (or a Safe-controlled treasury).
- DAO-only actions include:
  - publish/finalize epoch roots
  - sweep rewards to treasury
  - slash
  - update treasury / DAO (before freeze)
  - freeze contracts (final hardening)

---

## 7) Sign-Off Checklist (must be true)
- [ ] Token contract ownership is DAO Safe
- [ ] MerkleRewards DAO + treasury = DAO Safe
- [ ] Slashing DAO + treasury = DAO Safe
- [ ] Contracts frozen (if using Freezable V3)
- [ ] CI green (tests + format)
- [ ] Incident response runbook exists
- [ ] Legal drafts published (ToS, Privacy, Risk)

---

## 8) Sign-Off
**Approved by:** ___________________________________  
**DAO proposal / Tx hashes:** _________________________  
**Date:** ___________________________________________
