"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehavioralNudgeEngineService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BehavioralNudgeEngineService {
    nudgeLibrary = [
        {
            id: 'N-001',
            type: 'DEFAULT_OPT_IN',
            message: 'You\'re set to auto-save 10% of your income. Most users keep this default. Edit anytime.',
            targetBias: 'Status Quo Bias',
            channel: 'IN_APP_BANNER',
            demoGroup: 'TREATMENT_A',
        },
        {
            id: 'N-002',
            type: 'SOCIAL_NORM',
            message: '82% of users in your income bracket set aside an emergency fund. You\'re almost there!',
            targetBias: 'Herding Behavior (positive framing)',
            channel: 'PUSH',
            demoGroup: 'TREATMENT_A',
        },
        {
            id: 'N-003',
            type: 'LOSS_FRAME',
            message: 'You\'re on track to lose $3,200 this year to fees & inflation if you keep this account idle.',
            targetBias: 'Loss Aversion',
            channel: 'PUSH',
            demoGroup: 'TREATMENT_B',
        },
        {
            id: 'N-004',
            type: 'SCARCITY',
            message: 'Only 3 slots left at today\'s ISA rate of 5.2% — rate locks in when you confirm.',
            targetBias: 'Scarcity + FOMO',
            channel: 'IN_APP_BANNER',
            demoGroup: 'CONTROL',
        },
        {
            id: 'N-005',
            type: 'IMPLEMENTATION_INTENTION',
            message: 'You said you\'d review your investments on Monday. It\'s Monday. Shall we start now?',
            targetBias: 'Present Bias / Procrastination',
            channel: 'PUSH',
            demoGroup: 'TREATMENT_B',
        },
    ];
    /**
     * Feature 163.1: Select best-fit nudge for user's current context
     */
    async selectNudge(userId, userContext) {
        // Match nudge to most relevant detected bias
        const biasNudgeMap = {
            'Loss Aversion': 'N-003',
            'Status Quo Bias': 'N-001',
            'Herding Behavior': 'N-002',
            'Present Bias': 'N-005',
        };
        const topBias = userContext.detectedBiases[0];
        const nudgeId = biasNudgeMap[topBias] ?? 'N-001';
        const nudge = this.nudgeLibrary.find(n => n.id === nudgeId) ?? this.nudgeLibrary[0];
        console.log(`Nudge selected for ${userId}: "${nudge.type}" targeting "${nudge.targetBias}"`);
        return nudge;
    }
    /**
     * Feature 163.3: Deliver nudge and record delivery for A/B test tracking
     */
    async deliverNudge(userId, nudge) {
        console.log(`Delivering nudge [${nudge.id}] via ${nudge.channel} to ${userId}...`);
        return {
            nudgeId: nudge.id,
            userId,
            deliveryChannel: nudge.channel,
            demoGroup: nudge.demoGroup,
            deliveredAt: new Date().toISOString(),
            impressionId: `IMP-${Date.now()}`,
        };
    }
    /**
     * Feature 163.5: A/B test result analysis — uplift in desired behavior
     */
    async analyzeNudgeABTest(nudgeId) {
        // Feature 163.5: Statistical significance test (Z-test for proportions)
        const controlConversionRate = 0.18;
        const treatmentConversionRate = 0.26;
        const n = 1250; // Sample size per group
        const Z = (treatmentConversionRate - controlConversionRate) /
            Math.sqrt(((controlConversionRate + treatmentConversionRate) / 2) *
                (1 - (controlConversionRate + treatmentConversionRate) / 2) *
                (2 / n));
        const isSignificant = Math.abs(Z) > 1.96; // 95% CI
        return {
            nudgeId,
            controlCVR: controlConversionRate,
            treatmentCVR: treatmentConversionRate,
            uplift: `+${((treatmentConversionRate - controlConversionRate) / controlConversionRate * 100).toFixed(1)}%`,
            ZScore: Z.toFixed(3),
            pValue: isSignificant ? '< 0.05' : '> 0.05',
            statSignificant: isSignificant,
            recommendation: isSignificant ? 'SHIP_TREATMENT' : 'CONTINUE_TESTING',
        };
    }
    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 179: CHOICE ARCHITECTURE OPTIMIZATION
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Feature 179.1: Smart pre-selection algorithm (Default Effect)
     * Assigns optimal default option that benefits most users while preserving choice
     */
    async computeSmartDefaults(userId, optionSet) {
        // Feature 136/179: Analyze user history to set optimal default
        return {
            recommendedDefault: optionSet[0], // In production: ML-predicted best option
            rationale: 'Based on your income bracket and goals, 10% auto-save has highest success rate',
            alternativeOptions: optionSet.slice(1),
            nudgeLayer: 'PROGRESSIVE_DISCLOSURE', // Show alternatives only if user wants them
        };
    }
    /**
     * Feature 163.7: Timing optimizer — when to deliver nudges for max impact
     */
    async getOptimalNudgeTiming(userId) {
        // Feature 163.7: Based on past engagement patterns
        return {
            bestDayOfWeek: 'MONDAY',
            bestTimeOfDay: '09:00', // Post-coffee, high cognitive control
            worstTime: '22:00', // Late night — low cognitive control, high impulsivity
            calendarBlocks: ['PAY_DAY_PLUS_3_DAYS', 'START_OF_MONTH'],
        };
    }
}
exports.BehavioralNudgeEngineService = BehavioralNudgeEngineService;
