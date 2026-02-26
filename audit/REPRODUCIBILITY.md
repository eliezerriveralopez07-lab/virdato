# Reproducibility — Audit Environment

## Tooling
- Foundry (forge)
- Solidity compiler: 0.8.24 (or your pinned version)
- OpenZeppelin Contracts: pinned version

## Commands

Run tests:
    forge test -vvv

Run coverage:
    forge coverage

Generate gas snapshot:
    forge snapshot

Static analysis (Slither):
    slither . --print human-summary

