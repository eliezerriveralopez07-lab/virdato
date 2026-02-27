# FINAL Production Audit Scope — Virdato (VIRD)

## Network
Base Mainnet (Chain ID: 8453)

## Purpose
Define the production contracts deployed on Base Mainnet that govern the Virdato (VIRD) utility-token reward ecosystem.
Scope is derived from on-chain contract code presence and selector fingerprinting (function ABI).

---

## In-Scope Contracts (Deployed + Used)

### 1) VIRD Token (ERC-20)
- Address: 0xAEAc353180809F99437c4F9F23aE9204cA6A123B

### 2) Slashing Module (Bond/Slash/Fraud Controls)
- Address: 0x2359276b3ec82e487c0a3c4978c9dda8c41dfcaa
- Selector fingerprint includes:
  - bond(uint256), unbond(uint256), bonded(address)
  - slash(address,uint256,bytes32)
  - freeze(), frozen()
  - MAX_SLASH_BPS()
  - dao(), token(), treasury(), setDAO(address), setTreasury(address)

### 3) Merkle Rewards / Claim Module
- Address: 0x158938310c85d4bcac20e288d9ee34c520ae7368
- Selector fingerprint includes:
  - claim(uint256,uint256,bytes32[])
  - claimed(uint256,address)
  - distributor()
  - sweepToTreasury(uint256)
  - freeze(), frozen()
  - dao(), token(), treasury(), setDAO(address), setTreasury(address)

### 4) Epoch Registry / Merkle Root Registry
- Address: 0x7946545df657735e7a378147e78d79f53cef9b41
- Selector fingerprint includes:
  - finalizeEpoch(bytes32)
  - epochStart(), EPOCH_LENGTH()
  - currentEpoch()
  - merkleRoots(uint256)
  - finalized(uint256), finalizedAt(uint256)
  - dao(), setDAO(address)

---

## Governance / Admin Control Reference (Central to Risk, Not Audited Logic)
### DAO Safe (Admin)
- Address: 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def
- Safe configuration observed:
  - threshold = 1 (1-of-1)
  - NOTE: Not multi-sig yet; target upgrade recommended (2-of-3 or 3-of-5)

---

## Out of Scope (Disclosure / Ops)
- Grants & Partnerships wallet (EOA / no contract code):
  - 0xda06dd020805162d21be10f0298a53fa2194fb26

---

## Security Objectives (High-Level)
- Ensure fixed supply invariant and no unauthorized minting
- Ensure DAO authorization on admin functions (setDAO/setTreasury/freeze/finalizeEpoch)
- Prevent claim abuse (double-claim, invalid proofs, wrong epoch)
- Prevent slashing abuse (bounds enforcement, DAO-only slashing, freeze behavior)
- Ensure epoch finalization integrity (root immutability per epoch, correct epoch increment)
