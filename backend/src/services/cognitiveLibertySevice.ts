/**
 * SECTION 111: NEURO-RIGHTS & COGNITIVE LIBERTY
 * SECTION 165: COGNITIVE SECURITY PROTOCOLS
 * Omega P5 — Neural data privacy, cognitive load insurance, manipulation detection,
 * attention economy opt-out, thought privacy, mental integrity protection
 */

export type CognitiveThreat =
  | 'SUBLIMINAL_ADVERTISING'
  | 'DARK_PATTERN_UI'
  | 'SOCIAL_PROOF_MANIPULATION'
  | 'AUTHORITY_EXPLOITATION'
  | 'SCARCITY_ILLUSION'
  | 'LOSS_AVERSION_TRIGGER'
  | 'FOMO_ENGINEERING'
  | 'ANCHORING_ATTACK'
  | 'EMOTION_HIJACKING';

export interface NeuralDataPrivacyPolicy {
  userId: string;
  consentedDataTypes: string[];
  blockedUsesCases: string[];
  dataRetentionDays: number;
  shareWithResearch: boolean;
  shareWithThirdParty: boolean;
  cognitiveLoadProtectionEnabled: boolean;
  manipulationShieldLevel: 'BASIC' | 'ENHANCED' | 'MAXIMUM';
}

export class CognitiveLibertySevice {

  /**
   * Feature 111.1: Neural data privacy compliance checker
   * Verifies that all uses of neural/biometric data comply with user consent
   */
  async checkNeuralDataCompliance(
    userId: string,
    proposedDataUse: { dataType: string; useCase: string; thirdParty?: string },
    policy: NeuralDataPrivacyPolicy
  ): Promise<{ allowed: boolean; reason: string; alternativeUse?: string }> {
    if (!policy.consentedDataTypes.includes(proposedDataUse.dataType)) {
      return {
        allowed: false,
        reason: `Data type '${proposedDataUse.dataType}' not in user consent list.`,
        alternativeUse: 'Request explicit user consent before accessing this neural data type.',
      };
    }

    if (policy.blockedUsesCases.includes(proposedDataUse.useCase)) {
      return {
        allowed: false,
        reason: `Use case '${proposedDataUse.useCase}' is blocked by user's cognitive liberty policy.`,
      };
    }

    if (proposedDataUse.thirdParty && !policy.shareWithThirdParty) {
      return {
        allowed: false,
        reason: 'User has prohibited third-party neural data sharing.',
        alternativeUse: 'Obtain separate third-party sharing consent via re-consent flow.',
      };
    }

    return { allowed: true, reason: 'Complies with user neural data privacy policy.' };
  }

  /**
   * Feature 111.6: Cognitive load insurance
   * Covers financial losses caused by decisions made under excessive cognitive load
   */
  async getCognitiveLoadInsurance(userId: string, coverageAmountUSD: number) {
    const annualPremium = coverageAmountUSD * 0.025; // 2.5% — new product category

    return {
      policyId: `CLI-${userId}-${Date.now()}`,
      userId,
      coverageAmountUSD,
      annualPremiumUSD: parseFloat(annualPremium.toFixed(2)),
      montlyPremiumUSD: parseFloat((annualPremium / 12).toFixed(2)),
      coveredScenarios: [
        { scenario: 'HIGH_STRESS_FINANCIAL_DECISION', proofRequired: 'WEARABLE_HRV_DATA + TIMESTAMP' },
        { scenario: 'SLEEP_DEPRIVATION_PURCHASE', proofRequired: 'SLEEP_TRACKER_RECORDS_< 6HRS' },
        { scenario: 'GRIEF_OR_TRAUMA_SPENDING', proofRequired: 'CERTIFIED_THERAPIST_LETTER' },
        { scenario: 'COGNITIVE_IMPAIRMENT_DRUG_INTERACTION', proofRequired: 'MEDICAL_RECORD' },
        { scenario: 'DARK_PATTERN_VICTIMIZATION', proofRequired: 'UI_AUDIT_REPORT + SCREENSHOT_HASH' },
      ],
      claimReviewProcess: 'AI_ASSISTED_REVIEW + HUMAN_ETHICS_BOARD',
      maxClaimPerYear: 3,
      exclusions: ['GAMBLING_LOSSES', 'RECREATIONAL_DRUG_INDUCED', 'REPEATED_PATTERN_WITHOUT_REMEDIATION'],
    };
  }

  /**
   * Feature 111.7: Manipulation detection system
   * Real-time detection of psychological manipulation patterns in financial interfaces
   */
  detectManipulationPattern(uiInteractions: {
    elementId: string;
    elementType: string;
    displayedText: string;
    colorScheme?: string;
    timePresented: number; // milliseconds
    urgencyScore?: number; // 0-10
  }[]): { detected: CognitiveThreat[]; riskScore: number; recommendation: string } {
    const detected: CognitiveThreat[] = [];
    let riskScore = 0;

    for (const el of uiInteractions) {
      const text = el.displayedText.toLowerCase();

      if (text.includes('only') && text.includes('left') || text.includes('hurry')) {
        detected.push('SCARCITY_ILLUSION');
        riskScore += 25;
      }
      if (el.urgencyScore !== undefined && el.urgencyScore > 7) {
        detected.push('FOMO_ENGINEERING');
        riskScore += 20;
      }
      if (el.colorScheme?.includes('RED') && el.elementType === 'LOSS_DISPLAY') {
        detected.push('LOSS_AVERSION_TRIGGER');
        riskScore += 15;
      }
      if (text.includes('everyone is') || text.includes('most people')) {
        detected.push('SOCIAL_PROOF_MANIPULATION');
        riskScore += 20;
      }
      if (el.timePresented < 500 && el.elementType === 'FINE_PRINT') {
        detected.push('DARK_PATTERN_UI');
        riskScore += 30;
      }
      if (text.includes('experts recommend') || text.includes('certified')) {
        detected.push('AUTHORITY_EXPLOITATION');
        riskScore += 10;
      }
    }

    const uniqueThreats = [...new Set(detected)] as CognitiveThreat[];
    const finalRisk = Math.min(riskScore, 100);

    return {
      detected: uniqueThreats,
      riskScore: finalRisk,
      recommendation: finalRisk > 60
        ? 'BLOCK_TRANSACTION — High manipulation risk. Show user cognitive liberty alert.'
        : finalRisk > 30
        ? 'WARN_USER — Potential manipulation detected. Add cooling-off period.'
        : 'ALLOW — Low manipulation risk.',
    };
  }

  /**
   * Feature 111.8: Attention economy opt-out tools
   * Tracks and blocks monetization of user attention without explicit consent
   */
  async manageAttentionConsentPolicy(userId: string, policy: {
    blockBehavioralTargeting: boolean;
    maxAdsPerSession: number;
    requiredCompensationPerAdViewCent: number; // User demands payment to view ads
    cognitiveDowntimeProtection: boolean; // Block high-engagement prompts during rest hours
    restHoursStart: number; // e.g. 22 (10pm)
    restHoursEnd: number;   // e.g. 8 (8am)
  }) {
    const monthlyAdViewValue = policy.maxAdsPerSession * 30 * 0.03; // Avg session/day
    const userCompensationMonthlyUSD = policy.requiredCompensationPerAdViewCent
      ? monthlyAdViewValue * (policy.requiredCompensationPerAdViewCent / 3)
      : 0;

    return {
      userId,
      attentionPolicyId: `ATP-${userId}-${Date.now()}`,
      blockBehavioralTargeting: policy.blockBehavioralTargeting,
      maxAdsPerSession: policy.maxAdsPerSession,
      requiredCompensationPerAdViewCent: policy.requiredCompensationPerAdViewCent,
      estimatedMonthlyCompensationUSD: parseFloat(userCompensationMonthlyUSD.toFixed(2)),
      cognitiveDowntimeProtection: {
        enabled: policy.cognitiveDowntimeProtection,
        blockedHours: `${policy.restHoursStart}:00 - ${policy.restHoursEnd}:00`,
        blockedContent: ['PUSH_NOTIFICATIONS', 'UPSELL_PROMPTS', 'GAMIFICATION_TRIGGERS'],
      },
      gdprLegalBasis: 'LEGITIMATE_INTEREST_OVERRIDDEN_BY_USER_OBJECTION',
      ccpaCategory: 'SENSITIVE_PERSONAL_INFO_OPT_OUT',
      enforcedBy: 'PATHGUARD_COGNITIVE_LIBERTY_ENGINE',
    };
  }

  /**
   * Feature 165.1: Anti-manipulation financial advice validation
   * Ensures AI financial advice is not manipulating the user psychologically
   */
  async validateAdviceIntegrity(advice: {
    text: string;
    recommendedAction: string;
    urgencyLevel: number;
    sourceModel: string;
    financialBenefitToProvider: number;
  }): Promise<{ clean: boolean; flags: string[]; correctedAdvice?: string }> {
    const flags: string[] = [];

    if (advice.urgencyLevel > 7) flags.push('EXCESSIVE_URGENCY_DETECTED');
    if (advice.financialBenefitToProvider > 0) flags.push(`CONFLICT_OF_INTEREST_$${advice.financialBenefitToProvider}`);
    if (advice.text.toLowerCase().includes('guaranteed')) flags.push('FALSE_CERTAINTY_LANGUAGE');
    if (advice.text.toLowerCase().includes("don't miss")) flags.push('FOMO_LANGUAGE');
    if (advice.text.split(' ').length < 10 && advice.urgencyLevel > 5) flags.push('INSUFFICIENT_EXPLANATION_WITH_HIGH_URGENCY');

    const clean = flags.length === 0;
    return {
      clean,
      flags,
      correctedAdvice: clean ? undefined :
        `[Cognitive Liberty Shield Applied] ${advice.text.replace(/guaranteed/gi, 'projected').replace(/don't miss/gi, 'consider')} — Please verify independently before acting.`,
    };
  }

  /**
   * Feature 111.12: Neurodiversity accommodation funding
   * Automatically adjusts financial services for users with cognitive accessibility needs
   */
  async applyNeurodiversityAccommodations(userId: string, profile: {
    dyslexia?: boolean;
    adhd?: boolean;
    autism?: boolean;
    dyscalculia?: boolean;
    processingSpeed?: 'SLOW' | 'AVERAGE' | 'FAST';
  }) {
    const accommodations: string[] = [];
    const uiAdaptations: Record<string, unknown> = {};

    if (profile.dyslexia) {
      accommodations.push('DYSLEXIA_FRIENDLY_FONT (OpenDyslexic)');
      uiAdaptations['fontFamily'] = 'OpenDyslexic';
      uiAdaptations['lineSpacing'] = 1.8;
    }
    if (profile.adhd) {
      accommodations.push('REDUCED_DISTRACTION_MODE');
      accommodations.push('CHUNKED_FINANCIAL_TASKS');
      accommodations.push('POSITIVE_REINFORCEMENT_MILESTONES');
      uiAdaptations['maxItemsVisible'] = 3;
    }
    if (profile.dyscalculia) {
      accommodations.push('VISUAL_NUMBER_REPRESENTATIONS');
      accommodations.push('CONFIRMATION_READ_BACK_FOR_AMOUNTS');
      uiAdaptations['numberVisualization'] = 'BAR_CHART_PROPORTIONAL';
    }
    if (profile.processingSpeed === 'SLOW') {
      accommodations.push('EXTENDED_SESSION_TIMEOUTS');
      accommodations.push('NO_TIMED_OFFERS');
      uiAdaptations['sessionTimeoutMinutes'] = 120;
    }

    return {
      userId,
      accommodationsApplied: accommodations,
      uiAdaptations,
      fundingSource: 'PATHGUARD_ACCESSIBILITY_FUND',
      complianceFramework: 'ADA + WCAG_2.2_AAA + UN_CRPD',
      reviewedByAccessibilityBoard: true,
    };
  }
}
