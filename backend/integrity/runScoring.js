// backend/integrity/runScoring.js

import { scoreParticipant } from "./scoring.js";

/**
 * Step 3 reward pipeline stub
 * This will later:
 * - pull creator identities
 * - verify bonding (Step 4A)
 * - exclude AI-generated content
 * - output Merkle tree inputs
 */

export function runScoring(participants) {
  return participants.map(scoreParticipant);
}
