# Virdato Protocol Freeze (Phase 5)

## Scope
This document defines which parts of the Virdato protocol are frozen
prior to mainnet launch.

## Frozen Components
The following contracts are considered behavior-frozen:

- VIRD Token
- MerkleRewardsV2
- SlashingModuleV2
- RewardDistributor (DAO-controlled)

No logic changes will be made to these contracts after this phase.

## Allowed Changes
- DAO address migration (EOA → Safe)
- Treasury address migration
- Epoch root publication
- Reward amounts per epoch
- Off-chain scoring logic

## Disallowed Changes
- Token mint logic
- Claim verification logic
- Slashing logic bounds
- Double-claim prevention

## Enforcement
- All changes must be approved via DAO Safe
- Contract redeployments require new version tag

Status: **FROZEN**
