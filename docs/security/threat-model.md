# Threat Model (v0.1)

## Assets to protect
- DAO Safe keys + signer devices
- Treasury funds
- token contract ownership
- merkle root publication authority
- off-chain scoring pipeline outputs (claims JSON / merkle roots)
- user data (creator verification metadata)

## Adversaries
- external attacker (web/API)
- malicious claimant / sybil farm
- malicious/compromised signer
- supply chain attacker (deps/CI)
- insider threat (privileged access)

## Key attack surfaces
- DAO actions: finalize epoch root, sweep, slash, treasury updates
- merkle generation pipeline integrity
- web app auth + OAuth linking
- RPC provider / node reliability
- CI secrets exposure

## Controls (mapped)
- multisig + hardware wallets + separate hot/cold wallets
- allowlist DAO-only methods; frozen contracts for immutables
- reproducible merkle builds + signed artifacts
- rate limiting + WAF + TLS
- RBAC + MFA + audit logs
