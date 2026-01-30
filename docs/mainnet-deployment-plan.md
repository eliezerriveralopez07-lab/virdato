# Virdato Mainnet Deployment Plan (Phase 6)

## Target chain
- [ ] Base Mainnet
- [ ] Ethereum Mainnet

## Deployment order
1) Deploy VIRD token (final params)
2) Deploy RewardDistributor / MerkleRewardsV3
3) Deploy SlashingV3
4) Transfer ownerships to DAO Safe
5) Fund Rewards contract
6) Publish epoch 0 root
7) Run first claim

## Verification
- Verify contracts on explorer (Sourcify/Etherscan equivalents)
- Tag repo at deployment commit hash

## Post-deploy checks
- owner/dao/treasury pointers correct
- freeze flags true where expected
- first epoch claim works
