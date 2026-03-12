/**
 * PATHGUARD PILLAR 14: ECOLOGICAL & CARBON CREDIT MARKETS
 * EcologicalCreditService — Validating 'Proof-of-Conservation' via oracle
 * and managing carbon credit tokenization.
 */

export interface EcologicalProject {
  projectId: string;
  name: string;
  type: 'REFORESTATION' | 'OCEAN_CLEANUP' | 'RENEWABLE_ENERGY';
  location: { lat: number; lng: number };
  verifiedSequestrationTons: number;
  availableCredits: number;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface CarbonCreditTrade {
  tradeId: string;
  buyerId: string;
  projectId: string;
  amountCredits: number;
  pricePerCreditUsd: number;
  timestamp: string;
}

export class EcologicalCreditService {
  private static instance: EcologicalCreditService;
  private projects: Map<string, EcologicalProject> = new Map();

  private constructor() {
    this.seedProjects();
  }

  public static getInstance(): EcologicalCreditService {
    if (!EcologicalCreditService.instance) {
      EcologicalCreditService.instance = new EcologicalCreditService();
    }
    return EcologicalCreditService.instance;
  }

  private seedProjects(): void {
    this.projects.set('PROJ-AMAZON-01', {
      projectId: 'PROJ-AMAZON-01',
      name: 'Amazon Rainforest Protection',
      type: 'REFORESTATION',
      location: { lat: -3.4653, lng: -62.2159 },
      verifiedSequestrationTons: 50000,
      availableCredits: 10000,
      verificationStatus: 'VERIFIED'
    });
  }

  /**
   * Validate 'Proof-of-Conservation' using satellite oracle data (stub).
   */
  async validateConservation(projectId: string, satelliteHash: string): Promise<boolean> {
    const project = this.projects.get(projectId);
    if (!project) return false;

    console.log(`[Pillar-14] Eco Engine: Validating satellite proof for ${projectId}...`);
    
    // Simulation: Satellite data hash validation
    const isValid = satelliteHash.startsWith('eco_');
    if (isValid) {
      project.verificationStatus = 'VERIFIED';
      console.log(`[Pillar-14] Eco Engine: Proof-of-Conservation VALIDATED for ${projectId}.`);
    }

    return isValid;
  }

  /**
   * Execute a trade of verified carbon credits.
   */
  async executeCreditTrade(buyerId: string, projectId: string, amount: number): Promise<CarbonCreditTrade> {
    const project = this.projects.get(projectId);
    if (!project || project.availableCredits < amount) throw new Error('Insufficient credits');

    const tradeId = `TRADE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const pricePerCredit = 25.00; // Simulated price $25/ton

    project.availableCredits -= amount;

    const trade: CarbonCreditTrade = {
      tradeId,
      buyerId,
      projectId,
      amountCredits: amount,
      pricePerCreditUsd: pricePerCredit,
      timestamp: new Date().toISOString()
    };

    console.log(`[Pillar-14] Eco Engine: Trade ${tradeId} completed. ${amount} credits issued to ${buyerId}.`);
    return trade;
  }
}

export const ecologicalCreditService = EcologicalCreditService.getInstance();
