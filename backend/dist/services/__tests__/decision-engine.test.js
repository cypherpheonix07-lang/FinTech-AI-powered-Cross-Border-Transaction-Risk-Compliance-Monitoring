"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decision_engine_1 = require("../decision-engine");
const database_1 = require("../../config/database");
jest.mock('../../config/database', () => ({
    prisma: {
        decisionRule: {
            findFirst: jest.fn(),
        },
    },
}));
describe('decision engine', () => {
    const rule = { tenantId: 't1', blockThreshold: 80, flagThreshold: 50, autoEscalateAbove: 90 };
    it('blocks when score >= blockThreshold', () => {
        const result = (0, decision_engine_1.evaluateDecision)({ finalRiskScore: 85, anomalyScore: 0.9, supervisedProb: 0.7 }, rule);
        expect(result.decision).toBe(decision_engine_1.RiskDecision.BLOCK);
        expect(result.escalate).toBe(false);
    });
    it('auto-escalates when above autoEscalateAbove', () => {
        const result = (0, decision_engine_1.evaluateDecision)({ finalRiskScore: 95, anomalyScore: 0.95, supervisedProb: 0.9 }, rule);
        expect(result.decision).toBe(decision_engine_1.RiskDecision.BLOCK);
        expect(result.escalate).toBe(true);
    });
    it('flags when between flag and block thresholds', () => {
        const result = (0, decision_engine_1.evaluateDecision)({ finalRiskScore: 60, anomalyScore: 0.4, supervisedProb: 0.6 }, rule);
        expect(result.decision).toBe(decision_engine_1.RiskDecision.FLAG);
    });
    it('approves when below flag threshold', () => {
        const result = (0, decision_engine_1.evaluateDecision)({ finalRiskScore: 20, anomalyScore: 0.1, supervisedProb: 0.05 }, rule);
        expect(result.decision).toBe(decision_engine_1.RiskDecision.APPROVE);
    });
    describe('DecisionEngine.evaluate', () => {
        const riskInput = { finalRiskScore: 75, anomalyScore: 0.7, supervisedProb: 0.6 };
        const tenantId = 'tenant-1';
        it('uses tenant-specific rules when available', async () => {
            database_1.prisma.decisionRule.findFirst.mockResolvedValue({
                tenantId,
                blockThreshold: 70,
                flagThreshold: 40,
                autoEscalateAbove: 80,
            });
            const result = await decision_engine_1.DecisionEngine.evaluate(riskInput, tenantId);
            expect(result.decision).toBe(decision_engine_1.RiskDecision.BLOCK);
            expect(result.reason).toContain('70');
        });
        it('falls back to defaults when no tenant rules exist', async () => {
            database_1.prisma.decisionRule.findFirst.mockResolvedValue(null);
            const result = await decision_engine_1.DecisionEngine.evaluate(riskInput, tenantId);
            // Default flag is 60, block is 85. 75 should be FLAG.
            expect(result.decision).toBe(decision_engine_1.RiskDecision.FLAG);
        });
    });
});
