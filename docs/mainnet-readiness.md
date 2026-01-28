# Mainnet Readiness Checklist (Phase 5)

## Contracts
- [ ] Tokenomics finalized (cap/emissions)
- [ ] Rewards contracts reviewed + frozen
- [ ] Slashing contracts reviewed + frozen
- [ ] ChallengeRegistry deployed (optional v1)
- [ ] Verify contracts on explorer

## Tests / CI
- [x] Unit tests exist and pass
- [x] CI green on main
- [ ] Add 1 happy-path Merkle claim test (real root + proof)
- [ ] Add double-claim prevention test
- [ ] Add invalid-proof test
- [ ] Add slashing bounds test

## Governance
- [ ] DAO migrated to Safe multisig
- [ ] Treasury migrated to Safe multisig
- [ ] Signer policy documented

## Operations
- [ ] Merkle generation automated
- [ ] Root publication procedure defined
- [ ] Monitoring & alerting added
- [ ] Incident runbook written
