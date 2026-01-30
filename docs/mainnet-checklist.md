# Virdato Mainnet Checklist (Phase 5)

## 1) Governance + Ownership
- [ ] DAO is Safe multisig (threshold >= 2)
- [ ] VIRD owner() == DAO Safe
- [ ] MerkleRewardsV3 dao() == DAO Safe
- [ ] SlashingV3 dao() == DAO Safe
- [ ] Treasury == DAO Safe (or separate Safe)

## 2) Contract Hardening
- [ ] MerkleRewardsV3 frozen() == true
- [ ] SlashingV3 frozen() == true
- [ ] All contracts verified on explorer
- [ ] Confirm no admin-only “escape hatches” remain

## 3) Rewards Ops
- [ ] Epoch root generation script deterministic + versioned
- [ ] Root publication procedure documented (who, how, when)
- [ ] Claim proofs stored in immutable location (IPFS / git tag / S3 versioning)

## 4) Slashing Ops
- [ ] Slashing evidence workflow documented
- [ ] Safe transaction templates prepared for slash() + sweep()

## 5) Monitoring
- [ ] Watch: merkleRoots changes
- [ ] Watch: large sweeps, slash events, token transfers
- [ ] Alerting configured (Discord/email)
