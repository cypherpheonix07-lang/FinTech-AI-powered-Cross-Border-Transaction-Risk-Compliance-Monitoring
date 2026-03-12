/**
 * SECTION 107: SOVEREIGN INDIVIDUAL & STATELESSNESS FINANCE
 * Omega P5 — Jurisdiction arbitrage, digital nomad compliance, network states,
 * flag theory, cryptographic citizenship, political risk hedging, sovereign identity
 */

export interface JurisdictionProfile {
  countryCode: string;
  taxRate: number;
  politicalRiskScore: number; // 0-100: higher = riskier
  financialPrivacyScore: number; // 0-100: higher = more private
  residencyRequirementDaysPerYear: number;
  bankingAccessScore: number; // 0-100: ease of banking
  cbiProgram: boolean; // Citizenship by Investment
  rbiProgram: boolean; // Residency by Investment
}

export interface FlagTheoryStrategy {
  strategyId: string;
  entityId: string;
  primaryResidence: string;  // Low-tax, low-requirement
  businessBase: string;      // Strong contracts, business-friendly
  bankingJurisdiction: string; // Stable, private banking
  playFlag: string;          // Where you "play" (lifestyle)
  assetProtection: string;   // Strong asset protection laws
  digitalIncome: string;     // Best jurisdiction for digital income
  effectiveTaxRatePct: number;
  annualSavingsEstimateUSD: number;
}

export class SovereignIdentityService {

  private jurisdictionData: JurisdictionProfile[] = [
    { countryCode: 'SGP', taxRate: 0.17, politicalRiskScore: 8, financialPrivacyScore: 82, residencyRequirementDaysPerYear: 183, bankingAccessScore: 96, cbiProgram: false, rbiProgram: true },
    { countryCode: 'UAE', taxRate: 0.00, politicalRiskScore: 22, financialPrivacyScore: 75, residencyRequirementDaysPerYear: 90, bankingAccessScore: 88, cbiProgram: false, rbiProgram: true },
    { countryCode: 'PAN', taxRate: 0.00, politicalRiskScore: 35, financialPrivacyScore: 78, residencyRequirementDaysPerYear: 0, bankingAccessScore: 72, cbiProgram: false, rbiProgram: true },
    { countryCode: 'CYM', taxRate: 0.00, politicalRiskScore: 10, financialPrivacyScore: 90, residencyRequirementDaysPerYear: 90, bankingAccessScore: 94, cbiProgram: false, rbiProgram: true },
    { countryCode: 'MLT', taxRate: 0.05, politicalRiskScore: 12, financialPrivacyScore: 70, residencyRequirementDaysPerYear: 183, bankingAccessScore: 85, cbiProgram: true, rbiProgram: true },
    { countryCode: 'PRT', taxRate: 0.20, politicalRiskScore: 12, financialPrivacyScore: 68, residencyRequirementDaysPerYear: 183, bankingAccessScore: 82, cbiProgram: false, rbiProgram: true },
    { countryCode: 'EST', taxRate: 0.00, politicalRiskScore: 20, financialPrivacyScore: 72, residencyRequirementDaysPerYear: 0, bankingAccessScore: 65, cbiProgram: false, rbiProgram: false }, // e-Residency
  ];

  /**
   * Feature 107.1: Jurisdiction arbitrage optimizer
   * Finds the optimal multi-jurisdiction structure to minimize tax & political risk
   */
  async optimizeJurisdictionArbitrage(params: {
    annualIncomeUSD: number;
    incomeType: 'EMPLOYMENT' | 'BUSINESS' | 'INVESTMENT' | 'DIGITAL_NOMAD';
    currentCountryCode: string;
    prioritize: ('TAX' | 'PRIVACY' | 'STABILITY' | 'RESIDENCY_EASE')[];
    minimumBankingScore: number;
  }) {
    const candidates = this.jurisdictionData
      .filter(j => j.countryCode !== params.currentCountryCode)
      .filter(j => j.bankingAccessScore >= params.minimumBankingScore);

    const scored = candidates.map(j => {
      let score = 0;
      if (params.prioritize.includes('TAX')) score += (1 - j.taxRate) * 40;
      if (params.prioritize.includes('PRIVACY')) score += (j.financialPrivacyScore / 100) * 30;
      if (params.prioritize.includes('STABILITY')) score += ((100 - j.politicalRiskScore) / 100) * 20;
      if (params.prioritize.includes('RESIDENCY_EASE')) score += (1 - j.residencyRequirementDaysPerYear / 365) * 10;

      const taxSavingUSD = params.annualIncomeUSD * (0.35 - j.taxRate); // vs 35% benchmark
      return { ...j, optimizerScore: score, estimatedAnnualTaxSavingUSD: Math.max(0, taxSavingUSD) };
    }).sort((a, b) => b.optimizerScore - a.optimizerScore);

    return {
      currentJurisdiction: params.currentCountryCode,
      recommendations: scored.slice(0, 3),
      topPick: scored[0],
      estimatedFirstYearSavingUSD: scored[0]?.estimatedAnnualTaxSavingUSD ?? 0,
      caveat: 'Tax optimization must comply with CRS/BEPS rules. Consult a licensed tax attorney.',
    };
  }

  /**
   * Feature 107.5: Flag theory implementation support — 5-flag structure builder
   */
  async buildFlagTheoryStrategy(
    entityId: string,
    annualIncomeUSD: number,
    priorityFlags: Partial<FlagTheoryStrategy>
  ): Promise<FlagTheoryStrategy> {
    const bestTax = this.jurisdictionData.sort((a, b) => a.taxRate - b.taxRate)[0];
    const bestPrivacy = this.jurisdictionData.sort((a, b) => b.financialPrivacyScore - a.financialPrivacyScore)[0];
    const bestBiz = this.jurisdictionData.sort((a, b) => b.bankingAccessScore - a.bankingAccessScore)[0];

    const effectiveRate = bestTax.taxRate;
    const currentBenchmark = 0.35;
    const savingsUSD = annualIncomeUSD * (currentBenchmark - effectiveRate);

    return {
      strategyId: `FLAG5-${entityId}-${Date.now()}`,
      entityId,
      primaryResidence: priorityFlags.primaryResidence ?? bestTax.countryCode,
      businessBase: priorityFlags.businessBase ?? 'SGP',
      bankingJurisdiction: priorityFlags.bankingJurisdiction ?? bestPrivacy.countryCode,
      playFlag: priorityFlags.playFlag ?? 'PRT',
      assetProtection: 'CYM', // Cayman — strong asset protection
      digitalIncome: priorityFlags.digitalIncome ?? 'EST', // Estonian e-Residency
      effectiveTaxRatePct: parseFloat((effectiveRate * 100).toFixed(1)),
      annualSavingsEstimateUSD: parseFloat(savingsUSD.toFixed(0)),
    };
  }

  /**
   * Feature 107.7: Digital nomad visa compliance automation
   * Tracks days per jurisdiction, warns before tax residency triggers
   */
  async trackNomadCompliance(
    userId: string,
    locationLog: { countryCode: string; entryDate: string; exitDate: string }[]
  ) {
    const daysByCountry: Record<string, number> = {};

    for (const stay of locationLog) {
      const entry = new Date(stay.entryDate);
      const exit = new Date(stay.exitDate);
      const days = Math.round((exit.getTime() - entry.getTime()) / 86400000);
      daysByCountry[stay.countryCode] = (daysByCountry[stay.countryCode] ?? 0) + days;
    }

    const alerts: { country: string; daysSpent: number; threshold: number; riskLevel: string }[] = [];
    const residencyThreshold = 183;

    for (const [country, days] of Object.entries(daysByCountry)) {
      const pct = (days / residencyThreshold) * 100;
      if (pct >= 70) {
        alerts.push({
          country,
          daysSpent: days,
          threshold: residencyThreshold,
          riskLevel: pct >= 100 ? 'TAX_RESIDENCY_TRIGGERED' : pct >= 90 ? 'CRITICAL' : 'WARNING',
        });
      }
    }

    return {
      userId,
      startOfYear: new Date().getFullYear(),
      daysByCountry: Object.fromEntries(Object.entries(daysByCountry).sort(([, a], [, b]) => b - a)),
      taxResidencyAlerts: alerts,
      safeCountries: Object.entries(daysByCountry)
        .filter(([, d]) => d < 100)
        .map(([c]) => c),
      nextRecommendedDepature: alerts[0]?.country ?? null,
    };
  }

  /**
   * Feature 107.12: Political risk hedging instruments
   * Financial instruments to protect wealth against government seizure, sanctions, coups
   */
  async getPoliticalRiskHedges(exposureCountry: string, assetValueUSD: number) {
    const riskScores: Record<string, number> = {
      RUS: 85, CHN: 55, TUR: 60, VEN: 95, ARG: 70, BRA: 45, IND: 35, ZAF: 50, NGA: 75, DEFAULT: 40
    };
    const riskScore = riskScores[exposureCountry] ?? riskScores['DEFAULT'];
    const annualPremium = assetValueUSD * (riskScore / 1000); // 0-9.5% based on risk

    return {
      exposureCountry,
      riskScore,
      assetValueAtRiskUSD: assetValueUSD,
      hedges: [
        {
          instrument: 'POLITICAL_RISK_INSURANCE',
          provider: "Lloyd's of London Political Risk ARIA",
          annualPremiumUSD: parseFloat((annualPremium * 0.6).toFixed(0)),
          coverage: 'EXPROPRIATION + CURRENCY_INCONVERTIBILITY + POLITICAL_VIOLENCE',
          maxCoverageUSD: assetValueUSD,
        },
        {
          instrument: 'POWER_REVERSE_DUAL_CURRENCY_NOTE',
          description: 'Structured note that pays more if local currency collapses',
          notionalUSD: assetValueUSD * 0.20,
          triggerEvent: 'CURRENCY_DEVALUATION > 30%',
          expectedPayoutMultiple: 3,
        },
        {
          instrument: 'DISTRIBUTED_ASSET_HOLDING',
          description: 'Spread assets across 5+ jurisdictions to limit single-country seizure risk',
          maxExposurePerJurisdiction: assetValueUSD * 0.20,
          recommendedJurisdictions: ['CHE', 'SGP', 'CYM', 'LIE', 'MLT'],
        },
      ],
    };
  }

  /**
   * Feature 107.18: Network state financial participation
   * Track contributions to and benefits from decentralized network states (Balaji concept)
   */
  async enrollInNetworkState(userId: string, params: {
    networkStateId: string; // e.g. "Praxis", "Florasis", "Zuzalu"
    contributionAmountUSD: number;
    role: 'FOUNDER' | 'CITIZEN' | 'VISITOR' | 'INVESTOR';
  }) {
    const votingWeight = { FOUNDER: 1000, CITIZEN: 100, VISITOR: 1, INVESTOR: 50 };

    return {
      membershipId: `NS-${params.networkStateId}-${userId}-${Date.now()}`,
      networkStateId: params.networkStateId,
      userId,
      role: params.role,
      contributionUSD: params.contributionAmountUSD,
      votingWeight: votingWeight[params.role],
      digitalPassport: `DID:SOLANA:${Math.random().toString(36).slice(2, 22).toUpperCase()}`,
      taxTreaty: 'SUBJECT_TO_HOST_NATION_ARRANGEMENT',
      benefits: [
        'ACCESS_TO_NETWORK_STATE_SERVICES',
        'GOVERNANCE_VOTING_RIGHTS',
        'SHARED_PROPERTY_POOL_ACCESS',
        'NETWORK_STATE_INSURANCE',
        'REPUTATION_VERIFIED_COMMUNITY',
      ],
      cryptographicCitizenshipNFT: 'ERC-721_SOULBOUND',
    };
  }
}
