# FINAL Production Audit Scope — Virdato (VIRD)

## Network
Base Mainnet (Chain ID: 8453)

## Purpose
Define the production contracts that are deployed and controlled in the Virdato (VIRD) utility-token ecosystem.
This scope is derived from on-chain contract code presence and ABI probes (dao/token pointers).

---

## In-Scope Contracts (Deployed + Used)

### 1) VIRD Token (ERC-20)
- Address: 0xAEAc353180809F99437c4F9F23aE9204cA6A123B
- Notes: Fixed-supply utility token (on Base)

### 2) Reward Module / Distributor #1
- Address: 0x2359276b3ec82e487c0a3c4978c9dda8c41dfcaa
- On-chain evidence:
  - dao() => 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def
  - token() => 0xAEAc353180809F99437c4F9F23aE9204cA6A123B

### 3) Reward Module / Distributor #2
- Address: 0x158938310c85d4bcac20e288d9ee34c520ae7368
- On-chain evidence:
  - dao() => 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def
  - token() => 0xAEAc353180809F99437c4F9F23aE9204cA6A123B

### 4) DAO-Controlled Registry / Controller Module
- Address: 0x7946545df657735e7a378147e78d79f53cef9b41
- On-chain evidence:
  - dao() => 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def
  - currentEpoch() => 0

---

## Governance / Admin Control Reference (Not “audited code”, but central to risk)
### DAO Safe (Admin)
- Address: 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def
- Notes:
  - Safe is currently configured as 1-of-1 (threshold = 1)
  - Target state should be multi-sig (e.g., 2-of-3 or 3-of-5)

---

## Out of Scope (Disclosure / Ops)
- Treasury and program wallets used purely for custody/accounting (where they are not program logic contracts)
- Grants & Partnerships EOA:
  - 0xda06dd020805162d21be10f0298a53fa2194fb26 (EOA / no contract code)

---

## Security Objectives (High-Level)
- Prevent unauthorized minting or supply changes
- Prevent unauthorized admin actions (DAO control integrity)
- Prevent reward/claim logic abuse, double claims, or pool drains
- Ensure reward module authorization and parameter change controls are correct
- Verify registry/controller invariants and epoch logic integrity

