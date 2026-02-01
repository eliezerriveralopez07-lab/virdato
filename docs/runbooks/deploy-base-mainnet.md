# Deployment Runbook — Base Mainnet (v1)

> This is the irreversible production runbook.

## Pre-flight (must pass)
- [ ] Counsel-reviewed ToS/Privacy/Risk/Token Notice published
- [ ] Tokenomics v1 signed
- [ ] Security policy + incident runbook committed
- [ ] CI green
- [ ] Safe multisig created, threshold set, signers verified
- [ ] Deployment wallet funded (ETH on Base for gas)
- [ ] Final contract addresses list prepared

## Step 1 — Configure env
Set:
- BASE_RPC_URL
- DEPLOYER_PRIVATE_KEY (deployment hot wallet ONLY)
- DAO_SAFE
- TREASURY_SAFE
- ETHERSCAN_API_KEY (BaseScan key)

## Step 2 — Deploy contracts
Order:
1) Token (or reuse if already deployed on Base mainnet)
2) Distributor
3) MerkleRewards
4) SlashingModule
5) Optional registries/modules

## Step 3 — Transfer ownership
- transfer token ownership to DAO Safe
- set DAO + treasury on modules to DAO Safe
- confirm on-chain reads

## Step 4 — Freeze (if using Freezable)
- call freeze() on reward + slashing (and any other freeze-enabled modules)

## Step 5 — Verify contracts
- verify on BaseScan
- commit tx hashes into repo under `docs/deployment/base-mainnet/`

## Step 6 — Smoke test
- fund MerkleRewards with a small amount
- publish epoch root
- claim from a test wallet
- verify balances + claimed mapping

