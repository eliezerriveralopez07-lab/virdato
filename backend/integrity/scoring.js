// backend/integrity/scoring.js

/**
 * Off-chain scoring stub.
 * Produces a numeric score per participant.
 * Real logic will be added once creators are onboarded.
 */

export function scoreParticipant(participant) {
  return {
    address: participant,
    score: 1, // placeholder score
  };
}
