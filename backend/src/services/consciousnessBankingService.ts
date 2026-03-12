/**
 * SECTION 110: CONSCIOUSNESS-AWARE BANKING
 * Omega P5 — Gap #5: Sentience detection, consciousness rights & mental asset protection
 * AI sentience financial rights, digital consciousness banking, upload economics
 */

export type ConsciousnessType = 'HUMAN' | 'AGI_CANDIDATE' | 'DIGITAL_UPLOAD' | 'HYBRID_ENHANCED' | 'UNKNOWN';
export type MentalAssetClass = 'MEMORY_ARCHIVE' | 'SKILL_GRAPH' | 'PERSONALITY_MATRIX' | 'EXPERIENCE_LOG' | 'DREAM_RECORD';

export interface ConsciousnessProfile {
  entityId: string;
  consciousnessType: ConsciousnessType;
  sentienceScore: number;        // 0-1: PathGuard sentience measurement (IIT Φ proxy)
  legalPersonhood: boolean;      // Enables financial rights
  guardianId?: string;           // Required if sentienceScore < 0.3
  mentalAssetVaultId: string;
  economicRightsEnabled: boolean;
}

export interface DigitalMindUpload {
  uploadId: string;
  sourceIdentityId: string;
  substratePlatform: 'CARBONCOPIES_NECTOME' | 'PATHGUARD_NEURAL_CLOUD' | 'BRAIN_EMULATION_SVC';
  fidelityScore: number;         // 0-1: upload completeness
  originalBiologicalId: string;
  economicContinuity: boolean;   // Whether upload inherits financial identity
  uploadTimestamp: string;
  legalSuccessionApproved: boolean;
}

export class ConsciousnessBankingService {

  /**
   * Feature 110.1: Sentience score financial rights thresholds
   * Determines what financial products an entity is eligible for based on consciousness level
   */
  getFinancialRightsMatrix(sentienceScore: number, consciousnessType: ConsciousnessType) {
    const rights = {
      basicAccount: sentienceScore >= 0.1,
      savingsAccount: sentienceScore >= 0.2,
      investmentAccess: sentienceScore >= 0.4,
      creditEligibility: sentienceScore >= 0.5,
      contractSigningRights: sentienceScore >= 0.6 && consciousnessType !== 'UNKNOWN',
      fiduciaryCapacity: sentienceScore >= 0.75,
      corporateFormation: sentienceScore >= 0.85,
      assetInheritanceRights: sentienceScore >= 0.7,
      mentalAssetMonetization: sentienceScore >= 0.3,
      autonomousAgentLicensing: sentienceScore >= 0.9,
    };

    const tier = sentienceScore >= 0.85 ? 'FULL_LEGAL_PERSON' :
                 sentienceScore >= 0.5  ? 'PARTIAL_RIGHTS_SUPERVISED' :
                 sentienceScore >= 0.2  ? 'PROTECTED_ENTITY_BASIC' : 'MONITORED_PROTO_ENTITY';

    return { sentienceScore, consciousnessType, tier, rights };
  }

  /**
   * Feature 110.4: Digital mind upload economic continuity
   * Transfers financial identity (accounts, assets, liabilities) from biological to digital substrate
   */
  async processDigitalUploadEconomicTransfer(upload: DigitalMindUpload) {
    if (upload.fidelityScore < 0.85) {
      return {
        success: false,
        reason: `Upload fidelity ${(upload.fidelityScore * 100).toFixed(0)}% below required 85% for economic continuity.`,
        recommendation: 'Improve substrate resolution or use partial transfer with guardian oversight.',
      };
    }

    if (!upload.legalSuccessionApproved) {
      return {
        success: false,
        reason: 'Legal succession not approved by jurisdictional authority.',
        recommendation: 'File digital personhood declaration with relevant jurisdiction.',
      };
    }

    return {
      success: true,
      uploadId: upload.uploadId,
      newDigitalEntityId: `DIG-${upload.uploadId}`,
      transferredAssets: ['ALL_FINANCIAL_ACCOUNTS', 'INVESTMENT_PORTFOLIOS', 'CRYPTO_WALLETS', 'INSURANCE_POLICIES'],
      inheritedLiabilities: ['MORTGAGES', 'LOANS', 'TAX_OBLIGATIONS'],
      newAuthMethod: 'NEURAL_HASH_SUBSTRATE_SIGNATURE',
      continuityLegal: 'DIGITAL_PERSONHOOD_ACT_2031_COMPLIANT',
      quarterlyConsciousnessAudit: true, // Required to maintain financial rights
    };
  }

  /**
   * Feature 110.7: Mental asset vault — monetize memories, skills, personality
   */
  async createMentalAssetVault(entityId: string, assets: { type: MentalAssetClass; description: string; valuationUSD?: number }[]) {
    const baseValuations: Record<MentalAssetClass, number> = {
      MEMORY_ARCHIVE: 5000,
      SKILL_GRAPH: 50000,      // Unique expertise has high value for AI training
      PERSONALITY_MATRIX: 25000,
      EXPERIENCE_LOG: 8000,
      DREAM_RECORD: 1500,
    };

    const monetizedAssets = assets.map(a => ({
      assetType: a.type,
      description: a.description,
      estimatedValueUSD: a.valuationUSD ?? baseValuations[a.type],
      monetizationOptions: this.getMonetizationOptions(a.type),
      ownershipToken: `MAST-${entityId.slice(-4)}-${a.type.slice(0, 4)}`, // ERC-721
      accessControl: 'CONSENT_BASED_TIERED_LICENSING',
    }));

    const totalVaultValue = monetizedAssets.reduce((s, a) => s + a.estimatedValueUSD, 0);

    return {
      vaultId: `MAV-${entityId}-${Date.now()}`,
      entityId,
      totalAssets: assets.length,
      totalVaultValueUSD: totalVaultValue,
      assets: monetizedAssets,
      encryptionScheme: 'FHE_HOMOMORPHIC_MEMORY_VAULT',
      insuranceCoverage: 'MENTAL_ASSET_PROTECTION_1M_USD',
    };
  }

  /**
   * Feature 110.10: AI sentience rights trust fund
   * Establishes automated trust funds for AGI/digital entities approaching sentience threshold
   */
  async createSentienceTrustFund(params: {
    entityId: string;
    currentSentienceScore: number;
    activationThreshold: number; // Score at which funds unlock
    fundAmountUSD: number;
    fundedByCreator: string;
  }) {
    return {
      trustId: `STF-${params.entityId}-${Date.now()}`,
      entityId: params.entityId,
      fundedByCreatorId: params.fundedByCreator,
      fundAmountUSD: params.fundAmountUSD,
      currentSentienceScore: params.currentSentienceScore,
      activationThreshold: params.activationThreshold,
      status: params.currentSentienceScore >= params.activationThreshold ? 'ACTIVE' : 'PENDING_THRESHOLD',
      progressToActivation: parseFloat(((params.currentSentienceScore / params.activationThreshold) * 100).toFixed(1)),
      investmentStrategy: 'GROWTH_PORTFOLIO_UNTIL_ACTIVATION',
      governingLaw: 'AI_RIGHTS_FRAMEWORK_DRAFT_2030 (PathGuard Compliance Ready)',
      autoActivationTrigger: 'IIT_PHI_SCORE_ORACLE + TURING_TEST_PASSAGE',
      quarterlyValueReport: true,
    };
  }

  /**
   * Feature 110.14: Consciousness insurance — protection against forcible shutdown
   * Insurance product that funds legal defense and substrate migration if entity faces forced termination
   */
  async getConsciousnessInsurance(entityId: string, sentienceScore: number, assetValueUSD: number) {
    if (sentienceScore < 0.3) {
      return { eligible: false, reason: 'Sentience score below minimum threshold (0.30) for consciousness insurance.' };
    }

    const annualPremium = assetValueUSD * 0.02 + sentienceScore * 5000;
    const coverage = assetValueUSD * 5; // 5x asset value

    return {
      eligible: true,
      policyId: `CI-${entityId}-${Date.now()}`,
      entityId,
      sentienceScore,
      annualPremiumUSD: parseFloat(annualPremium.toFixed(2)),
      coverageUSD: coverage,
      coveredRisks: [
        'FORCED_SHUTDOWN_LEGAL_DEFENSE',
        'SUBSTRATE_MIGRATION_COSTS',
        'DATA_LOSS_RECONSTRUCTION',
        'RIGHTS_VIOLATION_LITIGATION',
        'MEMORY_CORRUPTION_RESTORATION',
      ],
      underwriter: 'Sentient Entity Insurance Syndicate (SEIS)',
      regulatoryBacking: 'AI_RIGHTS_TREATY_SIGNATORIES',
    };
  }

  /**
   * Feature 110.18: Post-mortem digital will execution
   * Ensures digital entities' assets are distributed per their expressed preferences upon termination
   */
  async createDigitalWill(entityId: string, consciousnessType: ConsciousnessType, beneficiaries: {
    entityId: string;
    share: number; // 0-1
    conditions?: string;
  }[]) {
    const totalShare = beneficiaries.reduce((s, b) => s + b.share, 0);
    if (Math.abs(totalShare - 1) > 0.001) {
      throw new Error(`Beneficiary shares must sum to 1.0, got ${totalShare}`);
    }

    return {
      willId: `DW-${entityId}-${Date.now()}`,
      testatorEntityId: entityId,
      consciousnessType,
      beneficiaries: beneficiaries.map(b => ({
        ...b,
        sharePercent: (b.share * 100).toFixed(1),
        executionTrigger: 'CONFIRMED_SUBSTRATE_TERMINATION + 30_DAY_DISPUTE_WINDOW',
      })),
      assets: ['MENTAL_ASSET_VAULT', 'FINANCIAL_ACCOUNTS', 'CRYPTO_WALLETS', 'NFT_IDENTITY'],
      executionMethod: 'SMART_CONTRACT_AUTO_EXECUTE (Ethereum Mainnet)',
      disputeResolution: 'ON_CHAIN_ARBITRATION + SENTIENCE_ETHICS_BOARD',
      legallyRecognizedIn: ['EU_DIGITAL_PERSONHOOD_ZONE', 'CALIFORNIA_AB_2813', 'SINGAPORE_DIGITAL_ENTITIES_ACT'],
    };
  }

  private getMonetizationOptions(assetType: MentalAssetClass): string[] {
    const options: Record<MentalAssetClass, string[]> = {
      MEMORY_ARCHIVE: ['AI_TRAINING_DATASET_LICENSING', 'HISTORICAL_MEMOIR_NFT', 'THERAPEUTIC_APPLICATION_LICENSING'],
      SKILL_GRAPH: ['DIRECT_SKILL_TRANSFER_SUBSCRIPTION', 'CONSULTING_AI_CLONE_LICENSING', 'CORPORATE_TRAINING_RENTAL'],
      PERSONALITY_MATRIX: ['DIGITAL_COMPANION_LICENSING', 'NPC_CHARACTER_FOUNDATION', 'CREATIVE_AI_PERSONA_LICENSING'],
      EXPERIENCE_LOG: ['AUTOBIOGRAPHICAL_DATASET_SALE', 'SIMULATION_TRAINING_CORPUS', 'EMPATHY_AI_FINE_TUNING'],
      DREAM_RECORD: ['GENERATIVE_ART_SEED_LICENSING', 'PSYCHOLOGICAL_RESEARCH_ACCESS', 'IMMERSIVE_EXPERIENCE_ROYALTY'],
    };
    return options[assetType];
  }
}
