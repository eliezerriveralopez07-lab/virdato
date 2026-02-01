# Security Checklist (Launch Gate)

## Keys & Access
- [ ] Safe signers are hardware wallets
- [ ] Threshold >= 2
- [ ] Recovery procedure documented
- [ ] MFA enabled everywhere

## Contracts
- [ ] Ownership transferred to Safe
- [ ] DAO-only methods enforced
- [ ] Freeze executed (if available)
- [ ] Tests cover:
  - happy path claim
  - invalid proof
  - double claim
  - slash bounds

## Pipeline
- [ ] Merkle build deterministic
- [ ] Root publication procedure documented
- [ ] Artifacts stored + signed (optional)

## Monitoring
- [ ] alerts for:
  - large transfers from treasury
  - unexpected root changes
  - slashing events
  - claim spikes
