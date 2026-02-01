# Verification Steps (Explorer + Local)

## 1) On-chain checks (cast)
Replace variables with real ones:

- Token:
  - name, symbol, decimals
  - totalSupply
  - owner == DAO Safe
- MerkleRewards:
  - dao == DAO Safe
  - treasury == DAO Safe
  - frozen == true (if applicable)
- Slashing:
  - dao == DAO Safe
  - treasury == DAO Safe
  - frozen == true (if applicable)

## 2) Explorer verification
- Verify contracts on BaseScan
- Save links + tx hashes in repo

## 3) Reproducibility
- Save merkle input and output files for each epoch:
  - claims_epoch_X.json
  - out_epoch_X.json
  - root used on-chain
- Sign the artifact (optional but recommended)

