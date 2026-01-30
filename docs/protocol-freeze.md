# Virdato Protocol – Freeze Confirmation (Phase 4)

Network: Base (staging/test)
Date: 2026-01-30

## DAO (Safe)
0xef7d7D16bd38D77c750D09A08B898B575e8f5Def

## Contracts (V3)
- VIRD Token: ${VIRD}
- MerkleRewardsV3: ${MERKLE_V3}
- SlashingModuleV3: ${SLASHING_V3}

## Verified Ownership
- Token owner(): 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def
- MerkleRewardsV3 dao(): 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def
- SlashingV3 dao(): 0xef7d7D16bd38D77c750D09A08B898B575e8f5Def

## Freeze Status (must be true)
- MerkleRewardsV3 frozen(): (run cast call)
- SlashingV3 frozen(): (run cast call)

## Meaning
- DAO Safe controls all admin actions
- Contracts are frozen/immutable after Phase 4
- Rewards distributed via Merkle roots per epoch and claim()
- Slashing enforced by DAO via SlashingModuleV3

