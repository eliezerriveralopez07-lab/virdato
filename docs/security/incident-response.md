# Incident Response Runbook

## SEV classification
SEV0: funds at risk / private keys compromised / contract exploit in progress
SEV1: reward manipulation / root poisoning / backend auth bypass
SEV2: degraded service / minor data leak
SEV3: low impact bugs

## Immediate actions (SEV0)
1. Stop root publication (pause pipeline)
2. Rotate compromised keys (Safe signer rotation)
3. Announce incident status (minimal, factual)
4. Snapshot chain state + logs + CI artifacts
5. Engage auditor / trusted responder

## Evidence to collect
- tx hashes, block numbers, addresses involved
- pipeline inputs/outputs (claims_epoch_X.json, out_epoch_X.json)
- server logs, auth logs
- CI job logs and environment diffs

## Recovery
- patch
- post-mortem
- add regression tests
