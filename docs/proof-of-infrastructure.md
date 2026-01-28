# Proof of Infrastructure (Phase 6)

This document records verifiable on-chain evidence that Virdato currently has a deployed ERC-20 utility token and a working rewards + slashing infrastructure.

---

## Network
- Ethereum Sepolia (testnet)
- Chain ID: 11155111

---

## Contract Addresses (Sepolia)

### Utility Token (VIRD)
- Token: 0x57E742384F86cDB4FdbD0D78A4bD3f3D815da42F

### Rewards Infrastructure
- RewardDistributorDev: 0x8BF7F061d4F53B199402aAe9830e37bE846187ce
- MerkleRewardsV2: 0x2c73BEdcb069D1BCC97E5A22D096De0a46d51b81

### Slashing / Bonding
- SlashingModuleV2: 0x481517B0F723EAaC92200bBEe37694C8C05EFfC2

---

## End-to-End Rewards Proof (Epoch 4)

### Generated Merkle Root (Epoch 4)
- Root: 0x8aebbb866e5e7ad8fa11b9f0ba6dcea925cffa081c576db6cc8fed4928f4a775

### On-chain Root Publication
- TX (forceFinalizeEpoch): 0x151a01d43e7294f6e1278c54262ac2f29ed527ee41b05bd6eebd57f213daffb1
- Verified: merkleRoots(4) equals the above root

### Claim Execution
- TX (claim epoch 4): 0xc414b8a4f3da5b42531063aabd532d48c54d9e432c6462dd063626efcfdaa03e
- Transfer event shows 1000 VIRD paid from MerkleRewardsV2 to claimant wallet

---

## Balances (Verification)

### Claimant Wallet
- Wallet: 0x940fB2F978a9e987E6F72c98FDF37a77D0B26596
- Current balance (VIRD): 998999000000000000000000 (998,999 VIRD)

### MerkleRewardsV2
- Current balance (VIRD): 1000000000000000000000 (1,000 VIRD)

---

## Summary
This proves Virdato has:
- a deployed ERC-20 utility token
- a deployed Merkle rewards infrastructure
- a deployed slashing/bonding module
- a functioning end-to-end rewards lifecycle: scoring → root → publish → claim → payout
