# Virdato Tokenomics (Draft v0.1)

This document defines the economic model for VIRD (utility token). It is a working draft intended to guide implementation and mainnet readiness.

---

## 1) Token Purpose (Utility)
VIRD is designed to:
1. Reward valuable participation in Virdato’s data infrastructure (contributors/operators).
2. Provide a staking/bonding collateral for integrity (slashing for misbehavior).
3. Align incentives between data quality, uptime, and honest reporting.

---

## 2) Supply Model (Recommended)
### 2.1 Total Supply
- Model: **Fixed max supply**
- Rationale: predictable economics, easier governance, fewer regulatory/market surprises.

### 2.2 Emissions
- Emission mechanism: **Epoch-based distributions**
- Implementation alignment: MerkleRewardsV2 publishes an epoch root and users claim.

---

## 3) Distribution Buckets (Initial Proposal)
Percentages are placeholders until final governance approval.

- **Contributor Rewards**: 50%
  - Data contributions, labeling, validation, reporting, etc.
- **Operator / Infrastructure Rewards**: 20%
  - Indexing, uptime, monitoring, integrity participation.
- **Treasury**: 20%
  - Long-term development, audits, grants, ecosystem.
- **Community / Programs**: 10%
  - Partnerships, campaigns, onboarding programs.

---

## 4) Reward Eligibility (High-level)
Rewards are based on an off-chain scoring pipeline that outputs a Merkle root per epoch.

Example scoring inputs:
- Quality score (accuracy / consistency / verification success)
- Participation volume
- Anti-sybil weighting
- Uptime / reliability (if applicable)
- Penalty history (slashing, disputes)

---

## 5) Slashing & Enforcement (High-level)
Slashing is used to enforce integrity:
- Users bond VIRD to participate in sensitive roles (operator/validator roles).
- DAO can slash bonded amounts when misbehavior is proven.

Misbehavior examples:
- Fraudulent reporting
- Manipulation of scoring/claims
- Repeated invalid submissions

---

## 6) Governance Controls
Before mainnet:
- DAO must be a multisig (Safe) with threshold approvals.
- Sensitive actions require DAO:
  - publishing epoch roots
  - sweeping rewards to treasury
  - slashing
  - updating treasury address
  - updating DAO address

---

## 7) Open Decisions (to finalize)
1. Final max supply number
2. Epoch length (daily/weekly/etc.)
3. Reward schedule per epoch (flat, decaying, performance-based)
4. Eligibility and sybil resistance details
5. Whether token is transferable immediately on mainnet or phased

---

## 8) Next Step
Finalize this document into v1 tokenomics and only then implement:
- production token contract parameters
- mainnet deployments
- governance hardening
