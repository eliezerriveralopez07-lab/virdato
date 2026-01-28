import { AI_POLICY } from "./aiPolicy.js";

export function evaluateSubmission(submission) {
  const declaredAI = submission?.metadata?.ai_generated === true;
  const aiRisk = submission?.detector?.aiRisk ?? 0;

  if (AI_POLICY.hardBlockIfDeclaredAI && declaredAI) {
    return { eligible: false, multiplier: 0, reason: "DECLARED_AI" };
  }
  if (aiRisk >= AI_POLICY.hardBlockThreshold) {
    return { eligible: false, multiplier: 0, reason: "AI_HIGH_CONFIDENCE" };
  }
  if (aiRisk >= AI_POLICY.softReviewThreshold) {
    return { eligible: true, multiplier: AI_POLICY.softMultiplier, reason: "AI_RISK_REDUCED" };
  }
  return { eligible: true, multiplier: 1.0, reason: "OK" };
}
