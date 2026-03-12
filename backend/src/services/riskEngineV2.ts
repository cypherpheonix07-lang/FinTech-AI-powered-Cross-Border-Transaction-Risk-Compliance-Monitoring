import { behavioralAnalyticsService } from './behavioralAnalyticsService';
import { phishingDetectorService } from './phishingDetectorService';

/**
 * PATHGUARD PILLAR 1: AI INTELLIGENCE
 * Risk Engine V2 — The predictive decision core that aggregates
 * behavioral and phishing signals into a high-fidelity threat index.
 */

export interface TransactionContext {
  userId: string;
  amount: number;
  currency: string;
  recipientId: string;
  location: { lat: number; lng: number };
  typingSpeed: number;
  deviceUuid: string;
  externalSignals?: {
    urlAnalyzed?: string;
    contentAnalyzed?: string;
  };
}

export interface RiskDecision {
  threatIndex: number; // 0-100
  decision: 'APPROVE' | 'CHALLENGE_MFA' | 'BLOCK';
  reasoning: string[];
  predictiveConfidence: number;
}

export class RiskEngineV2 {
  private static instance: RiskEngineV2;

  private constructor() {}

  public static getInstance(): RiskEngineV2 {
    if (!RiskEngineV2.instance) {
      RiskEngineV2.instance = new RiskEngineV2();
    }
    return RiskEngineV2.instance;
  }

  /**
   * Run a predictive risk assessment on a transaction context.
   */
  async assessRisk(ctx: TransactionContext): Promise<RiskDecision> {
    const reasoning: string[] = [];
    
    // 1. Behavioral Weights
    const geoRisk = behavioralAnalyticsService.calculateGeoVelocityRisk(ctx.userId, ctx.location.lat, ctx.location.lng);
    const keyRisk = behavioralAnalyticsService.calculateKeystrokeRisk(ctx.userId, ctx.typingSpeed);
    const recRisk = behavioralAnalyticsService.calculateRecipientRisk(ctx.userId, ctx.recipientId);
    const devRisk = behavioralAnalyticsService.calculateDeviceRisk(ctx.userId, ctx.deviceUuid);

    // 2. Phishing Weights
    const phishingReport = await phishingDetectorService.analyzeSignals({
      url: ctx.externalSignals?.urlAnalyzed,
      payloadContent: ctx.externalSignals?.contentAnalyzed
    });

    // 3. Weighted Aggregation
    // Geo: 30%, Device: 25%, Keys: 15%, Recipient: 10%, Phishing: 20%
    let totalScore = (
      (geoRisk * 30) +
      (devRisk * 25) +
      (keyRisk * 15) +
      (recRisk * 10) +
      (phishingReport.confidenceScore * 20)
    );

    // Amount sensitivity (High amount multiplier)
    if (ctx.amount > 10000) totalScore *= 1.2;

    // Build reasoning
    if (geoRisk > 0.8) reasoning.push('IMPOSSIBLE_TRAVEL_DETECTED');
    if (keyRisk > 0.5) reasoning.push('TYPING_BIOMETRIC_MISMATCH');
    if (devRisk > 0.5) reasoning.push('UNKNOWN_DEVICE_SIGNATURE');
    if (phishingReport.isSuspicious) reasoning.push(`PHISHING_PATTERN_${phishingReport.detectedPatterns[0]}`);

    // Final Decision logic
    let decision: RiskDecision['decision'] = 'APPROVE';
    if (totalScore > 75) decision = 'BLOCK';
    else if (totalScore > 40) decision = 'CHALLENGE_MFA';

    return {
      threatIndex: Math.min(Math.round(totalScore), 100),
      decision,
      reasoning: reasoning.length > 0 ? reasoning : ['ALL_SIGNALS_OPTIMAL'],
      predictiveConfidence: 0.92, // Simulated model confidence
    };
  }
}

export const riskEngineV2 = RiskEngineV2.getInstance();
