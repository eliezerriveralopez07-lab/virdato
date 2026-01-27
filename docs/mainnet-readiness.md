# Virdato Mainnet Readiness Checklist (v0.1)

This checklist defines the minimum requirements before deploying VIRD + incentives layer to mainnet.

---

## 1) Code Freeze & Versioning
- [ ] Contract code freeze for v1 (no further changes without review)
- [ ] Release tag created for mainnet candidate (e.g., v1.0-rc1)
- [ ] CI passing on main branch

---

## 2) Security & Audits
- [ ] Full unit test suite (Foundry) passing
- [ ] Add happy-path reward claim test with real Merkle root
- [ ] Add double-claim prevention test
- [ ] Add invalid-proof test
- [ ] Add slashing bounds tests (maxSlashBps)
- [ ] Optional: static analysis (Slither) and linting
- [ ] External audit (recommended before mainnet)

---

## 3) Governance Hardening (Required)
- [ ] DAO address = multisig Safe
- [ ] Treasury address = multisig Safe
- [ ] Threshold >= 2-of-3 (minimum)
- [ ] Document signer roles and recovery procedures

---

## 4) Tokenomics Finalization (Required)
- [ ] Max supply decided
- [ ] Emission schedule decided
- [ ] Distribution buckets finalized
- [ ] Utility narrative finalized (what token does, who earns it, why)

---

## 5) Deployment Plan
- [ ] Deploy production ERC-20 token contract
- [ ] Deploy RewardDistributor (prod version)
- [ ] Deploy MerkleRewardsV2 (prod)
- [ ] Deploy SlashingModuleV2 (prod)
- [ ] Verify contracts on block explorer
- [ ] Save deployment artifacts (JSON) and publish addresses in docs

---

## 6) Operational Readiness (Off-chain)
- [ ] Merkle generation pipeline automated (epoch root + proofs)
- [ ] Root publication process (DAO-controlled)
- [ ] Monitoring + alerting (epochs, claims, failures)
- [ ] Incident runbook (pause/disable/rotate keys)

---

## 7) Dry Runs
- [ ] Full deployment dry run on a testnet
- [ ] End-to-end claim run (root -> claim -> balances)
- [ ] End-to-end slashing run (bond -> slash -> treasury withdraw)
- [ ] Gas estimation reviewed

---

## 8) Public Proof Pack
- [ ] README includes token + contract addresses
- [ ] Docs updated with links and verification steps
- [ ] CI green badge (optional)
- [ ] Release notes published

---

## Go/No-Go Criteria
**No-go if:**
- DAO is still an EOA
- tests are not comprehensive
- tokenomics not final
- no rollback / incident plan

