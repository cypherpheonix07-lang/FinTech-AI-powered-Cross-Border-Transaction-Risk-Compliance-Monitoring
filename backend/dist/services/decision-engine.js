"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionEngine = exports.RiskDecision = void 0;
exports.evaluateDecision = evaluateDecision;
const database_1 = require("../config/database");
const logger_1 = require("../config/logger");
var RiskDecision;
(function (RiskDecision) {
    RiskDecision["APPROVE"] = "APPROVE";
    RiskDecision["FLAG"] = "FLAG";
    RiskDecision["BLOCK"] = "BLOCK";
    RiskDecision["ESCALATE"] = "ESCALATE";
})(RiskDecision || (exports.RiskDecision = RiskDecision = {}));
/**
 * Evaluate a transaction risk against tenant rules
 * Returns action and optionally escalation metadata
 */
function evaluateDecision(risk, rule) {
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
class DecisionEngine {
    static async evaluate(risk, tenantId) {
        // 1. Fetch tenant-specific thresholds (Fallback to defaults if not set)
        const rule = await database_1.prisma.decisionRule.findFirst({
            where: { tenantId },
        });
        const tenantRule = {
            tenantId,
            blockThreshold: rule?.blockThreshold ?? 85,
            flagThreshold: rule?.flagThreshold ?? 60,
            autoEscalateAbove: rule?.autoEscalateAbove ?? undefined,
        };
        logger_1.logger.info(`Evaluating decision for score ${risk.finalRiskScore} (Flags: ${tenantRule.flagThreshold}, Block: ${tenantRule.blockThreshold})`);
        // 2. Determine Action using the core evaluation function
        return evaluateDecision(risk, tenantRule);
    }
}
exports.DecisionEngine = DecisionEngine;
