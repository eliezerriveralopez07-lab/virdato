# Signer Policy (Safe Multisig)

## Goal
Minimize the chance of:
- single-key compromise draining funds
- unilateral governance changes
- social engineering / phishing approvals

## Threshold recommendation
**Minimum:** 2-of-3  
**Preferred:** 3-of-5 (more resilient)

## Signer requirements
- Each signer uses a hardware wallet (Ledger/Trezor) OR a dedicated secured device
- MFA on all associated accounts (email, GitHub, cloud)
- No signer should store seed phrases digitally
- Separate daily-use wallet from signer wallet

## Key separation
- DAO Safe signers must NOT be the same keys used for:
  - deployment hot wallet
  - day-to-day testing
  - personal trading wallets

## Change management
- Any signer rotation requires a recorded proposal:
  - reason
  - replacement signer address
  - tx hash in Safe
- Emergency procedure for suspected compromise:
  1) remove compromised signer
  2) raise threshold temporarily if needed
  3) rotate all credentials and audit logs

## Approval rules
- No signing without:
  - simulation (Tenderly/Safe simulation)
  - confirmation of target address + function signature
  - confirmation of chain (Base vs Sepolia)

