# Virdato Tokenomics (Draft v0.1)

This document defines the economic model for VIRD (utility token). It is a working draft intended to guide implementation and mainnet readiness.

> Status: **Draft**
> Scope: **Protocol incentives layer** (rewards + bonding + slashing + governance controls)
> Note: All numeric parameters are placeholders until governance approval.

---

## 0) Definitions (to avoid confusion)

**Epoch:** A fixed reward period (e.g., daily or weekly) where rewards are calculated off-chain and committed on-chain via a Merkle root.

**Contributor:** Any participant producing data, validations, labels, reports, or other measurable protocol value.

**Operator:** Any participant running infrastructure services (indexing, uptime monitoring, integrity verification, etc.) as defined by Virdato.

**Treasury:** The protocol-controlled wallet (eventually multisig) used for long-term protocol sustainability, audits, grants, and emergency response.

**Bond:** VIRD staked as collateral to enforce integrity rules; subject to slashing for proven misconduct.

---

## 1) Token Purpose (Utility)

VIRD is designed to:
1. Reward valuable participation in Virdato’s data infrastructure (contributors/operators).
2. Provide staking/bonding collateral for integrity (slashing for misbehavior).
3. Align incentives between data quality, uptime, and honest reporting.
4. Provide a governance mechanism (initially multisig, later DAO) to control incentive parameters.

---

## 2) Supply Model (Recommended)

### 2.1 Total Supply
- Model: **Fixed max supply**
- Rationale: predictable economics, easier governance, fewer market surprises.

**Open parameter:** `MAX_SUPPLY` (TBD)

### 2.2 Emissions
- Emission mechanism: **Epoch-based distributions**
- Implementation alignment: MerkleRewardsV2 publishes an epoch root and users claim.

**Open parameters:**
- `EPOCH_LENGTH` (e.g., daily vs weekly)
- `EPOCH_EMISSION` (VIRD distributed per epoch)
- `EMISSION_SCHEDULE` (flat, decaying, or performance-based)

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

### 3.1 Notes
- Early phases may overweight contributors to bootstrap participation.
- Treasury allocation is for protocol health and should be transparent and controlled by multisig.

---

## 4) Reward Eligibility (High-level)

Rewards are based on an off-chain scoring pipeline that outputs a Merkle root per epoch.

Example scoring inputs:
- Quality score (accuracy / consistency / verification success)
- Participation volume
- Anti-sybil weighting
- Uptime / reliability (if applicable)
- Penalty history (slashing, disputes)

### 4.1 Anti-sybil baseline (recommended)
Use a minimum eligibility gate:
- minimum activity threshold
- minimum account age / proof-of-human / reputation (if needed)
- optional staking requirement for higher reward tiers

---

## 5) Slashing & Enforcement (High-level)

Slashing is used to enforce integrity:
- Users bond VIRD to participate in sensitive roles (operator/validator roles).
- DAO can slash bonded amounts when misbehavior is proven.

Misbehavior examples:
- Fraudulent reporting
- Manipulation of scoring/claims
- Repeated invalid submissions

### 5.1 Slashing principles (recommended)
- Slashing must be **bounded** per action (e.g., max bps per call).
- Slashing must include a **reason code** and be logged.
- Slashing should require **multisig approval** on mainnet.

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

### 6.1 Governance maturity path
- **Phase A (now):** EOA (development only)
- **Phase B (pre-mainnet):** Multisig (2/3 or 3/5)
- **Phase C (later):** Timelock + on-chain governance (optional)

---

## 7) Parameter Table (to finalize)

These are the exact numbers you must decide before mainnet.

| Parameter | Description | Example | Status |
|---|---|---:|---|
| `MAX_SUPPLY` | Total supply cap | 1,000,000,000 | TBD |
| `EPOCH_LENGTH` | Reward period | 7 days | TBD |
| `EPOCH_EMISSION` | VIRD emitted per epoch | 1,000,000 | TBD |
| `EMISSION_SCHEDULE` | Flat/decay/perf-based | Decay 2%/mo | TBD |
| `MIN_BOND` | Minimum bond to participate | 100 VIRD | TBD |
| `MAX_SLASH_BPS` | Max slash per action | 5000 (50%) | TBD |
| `TREASURY_SHARE` | Treasury allocation | 20% | Draft |
| `REWARD_SPLIT` | Contributor/operator/community | 50/20/10 | Draft |

---

## 8) Open Decisions (to finalize)

1. Final max supply number
2. Epoch length (daily/weekly/etc.)
3. Reward schedule per epoch (flat, decaying, performance-based)
4. Eligibility and sybil resistance details
5. Whether token is transferable immediately on mainnet or phased
6. Whether bonding is mandatory for all roles or only privileged roles

---

## 9) Next Step

Finalize this document into v1 tokenomics and only then implement:
- production token contract parameters
- mainnet deployments
- governance hardening

### 9.1 Recommended next actions (very practical)
1. Pick `EPOCH_LENGTH` and a simple `EPOCH_EMISSION` for testnet simulation
2. Run 3–5 epochs on testnet to observe behavior
3. Adjust the reward split and eligibility thresholds based on observed abuse/participation
4. Freeze parameters and move DAO to multisig
