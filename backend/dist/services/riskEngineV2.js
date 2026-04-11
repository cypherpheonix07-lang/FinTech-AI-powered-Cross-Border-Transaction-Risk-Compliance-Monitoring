"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.riskEngineV2 = exports.RiskEngineV2 = void 0;
const behavioralAnalyticsService_1 = require("./behavioralAnalyticsService");
const phishingDetectorService_1 = require("./phishingDetectorService");
class RiskEngineV2 {
    static instance;
    constructor() { }
    static getInstance() {
        if (!RiskEngineV2.instance) {
            RiskEngineV2.instance = new RiskEngineV2();
        }
        return RiskEngineV2.instance;
    }
    /**
     * Run a predictive risk assessment on a transaction context.
     */
    async assessRisk(ctx) {
        const reasoning = [];
        // 1. Behavioral Weights
        const geoRisk = behavioralAnalyticsService_1.behavioralAnalyticsService.calculateGeoVelocityRisk(ctx.userId, ctx.location.lat, ctx.location.lng);
        const keyRisk = behavioralAnalyticsService_1.behavioralAnalyticsService.calculateKeystrokeRisk(ctx.userId, ctx.typingSpeed);
        const recRisk = behavioralAnalyticsService_1.behavioralAnalyticsService.calculateRecipientRisk(ctx.userId, ctx.recipientId);
        const devRisk = behavioralAnalyticsService_1.behavioralAnalyticsService.calculateDeviceRisk(ctx.userId, ctx.deviceUuid);
        // 2. Phishing Weights
        const phishingReport = await phishingDetectorService_1.phishingDetectorService.analyzeSignals({
            url: ctx.externalSignals?.urlAnalyzed,
            payloadContent: ctx.externalSignals?.contentAnalyzed
        });
        // 3. Weighted Aggregation
        // Geo: 30%, Device: 25%, Keys: 15%, Recipient: 10%, Phishing: 20%
        let totalScore = ((geoRisk * 30) +
            (devRisk * 25) +
            (keyRisk * 15) +
            (recRisk * 10) +
            (phishingReport.confidenceScore * 20));
        // Amount sensitivity (High amount multiplier)
        if (ctx.amount > 10000)
            totalScore *= 1.2;
        // Build reasoning
        if (geoRisk > 0.8)
            reasoning.push('IMPOSSIBLE_TRAVEL_DETECTED');
        if (keyRisk > 0.5)
            reasoning.push('TYPING_BIOMETRIC_MISMATCH');
        if (devRisk > 0.5)
            reasoning.push('UNKNOWN_DEVICE_SIGNATURE');
        if (phishingReport.isSuspicious)
            reasoning.push(`PHISHING_PATTERN_${phishingReport.detectedPatterns[0]}`);
        // Final Decision logic
        let decision = 'APPROVE';
        if (totalScore > 75)
            decision = 'BLOCK';
        else if (totalScore > 40)
            decision = 'CHALLENGE_MFA';
        return {
            threatIndex: Math.min(Math.round(totalScore), 100),
            decision,
            reasoning: reasoning.length > 0 ? reasoning : ['ALL_SIGNALS_OPTIMAL'],
            predictiveConfidence: 0.92, // Simulated model confidence
        };
    }
}
exports.RiskEngineV2 = RiskEngineV2;
exports.riskEngineV2 = RiskEngineV2.getInstance();
