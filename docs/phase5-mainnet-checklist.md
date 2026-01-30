# Phase 5 — Mainnet Readiness Checklist

## Governance
- [ ] Mainnet Safe created (DAO + Treasury)
- [ ] Safe funded with ETH for execution
- [ ] Owners + threshold set (2/3 recommended)

## Tokenomics
- [ ] Max supply finalized
- [ ] Emission plan finalized
- [ ] Reward eligibility rules finalized (bond + anti-AI policy)

## Contracts (Prod)
- [ ] Use Prod distributor (no forceFinalizeEpoch)
- [ ] Use V3 freezable rewards + slashing
- [ ] Freeze contracts after deploy via Safe (freeze())

## Tests / CI
- [ ] forge test -vv is green
- [ ] CI green on main branch

## Deployment
- [ ] Deploy token (if not already)
- [ ] Deploy distributor
- [ ] Deploy MerkleRewardsV3 + SlashingModuleV3
- [ ] Fund MerkleRewardsV3
- [ ] Publish first epoch root
- [ ] Execute one test claim
- [ ] Freeze (freeze()) via Safe

## Verification
- [ ] Verify contracts on explorer
- [ ] Publish deployment manifest JSON
- [ ] Add Proof Pack entry in README

## Suggested verification commands
forge verify-contract <ADDRESS> <PATH:CONTRACT> --chain-id 1 --etherscan-api-key $ETHERSCAN_API_KEY
