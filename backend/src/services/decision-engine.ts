import { prisma } from '../config/database';
import { logger } from '../config/logger';

export enum RiskDecision {
  APPROVE = 'APPROVE',
  FLAG = 'FLAG',
  BLOCK = 'BLOCK',
  ESCALATE = 'ESCALATE'
}

export interface RiskOutput {
  anomalyScore: number;    // 0..1
  supervisedProb: number;  // 0..1
  finalRiskScore: number; // 0..100
  graphFlag?: boolean;
  explanation?: Record<string, unknown>;
}

export interface TenantDecisionRule {
  tenantId: string;
  blockThreshold: number; // e.g., 80
  flagThreshold: number;  // e.g., 50
  autoEscalateAbove?: number; // e.g., 85 to automatically open escalation
}

/**
 * Evaluate a transaction risk against tenant rules
 * Returns action and optionally escalation metadata
 */
export function evaluateDecision(
  risk: RiskOutput,
  rule: TenantDecisionRule
): { decision: RiskDecision; escalate?: boolean; reason: string } {
  const s = risk.finalRiskScore;
  const { blockThreshold, flagThreshold, autoEscalateAbove } = rule;

  if (s >= blockThreshold) {
    const escalate = !!(autoEscalateAbove && s >= autoEscalateAbove);
    return {
      decision: RiskDecision.BLOCK,
      escalate,
      reason: `score >= blockThreshold (${s} >= ${blockThreshold})`
    };
  }

  if (s >= flagThreshold) {
    const escalate = !!(autoEscalateAbove && s >= autoEscalateAbove);
    return {
      decision: RiskDecision.FLAG,
      escalate,
      reason: `score >= flagThreshold (${s} >= ${flagThreshold})`
    };
  }

  return {
    decision: RiskDecision.APPROVE,
    escalate: false,
    reason: `score < flagThreshold (${s} < ${flagThreshold})`
  };
}

export class DecisionEngine {
  static async evaluate(risk: RiskOutput, tenantId: string) {
    // 1. Fetch tenant-specific thresholds (Fallback to defaults if not set)
    const rule = await prisma.decisionRule.findFirst({
      where: { tenantId },
    });

    const tenantRule: TenantDecisionRule = {
      tenantId,
      blockThreshold: rule?.blockThreshold ?? 85,
      flagThreshold: rule?.flagThreshold ?? 60,
      autoEscalateAbove: rule?.autoEscalateAbove ?? undefined,
    };

    logger.info(`Evaluating decision for score ${risk.finalRiskScore} (Flags: ${tenantRule.flagThreshold}, Block: ${tenantRule.blockThreshold})`);

    // 2. Determine Action using the core evaluation function
    return evaluateDecision(risk, tenantRule);
  }
}
