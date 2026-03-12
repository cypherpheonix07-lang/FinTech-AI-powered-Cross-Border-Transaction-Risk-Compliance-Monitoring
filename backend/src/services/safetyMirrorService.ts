/**
 * PATHGUARD PILLAR 3: USER EXPERIENCE
 * Safety Mirror Service — A "pre-flight" check for destination health,
 * volatility, and security footprint.
 */

export type HealthStatus = 'EXCELLENT' | 'STABLE' | 'VOLATILE' | 'HIGH_RISK' | 'BLACKLISTED';

export interface DestinationHealth {
  address: string;
  status: HealthStatus;
  reputationScore: number; // 0-100
  recentRedFlags: string[];
  lastPingMs: number;
}

export class SafetyMirrorService {
  private static instance: SafetyMirrorService;

  private constructor() {}

  public static getInstance(): SafetyMirrorService {
    if (!SafetyMirrorService.instance) {
      SafetyMirrorService.instance = new SafetyMirrorService();
    }
    return SafetyMirrorService.instance;
  }

  /**
   * Perform a non-custodial health ping to a destination.
   */
  async checkHealth(address: string): Promise<DestinationHealth> {
    console.log(`[Pillar-3] Performing Safety Mirror check for: ${address}`);
    
    // Simulation: Mock data based on address patterns
    const isMockMalicious = address.toLowerCase().includes('dark') || address.toLowerCase().includes('bad');
    const isMockNew = address.length < 10;

    let status: HealthStatus = 'EXCELLENT';
    let score = 98;
    const flags: string[] = [];

    if (isMockMalicious) {
      status = 'BLACKLISTED';
      score = 0;
      flags.push('MATCHED_GLOBAL_ADVERSARY_DB');
    } else if (isMockNew) {
      status = 'VOLATILE';
      score = 45;
      flags.push('NEWLY_CREATED_ADDRESS', 'LOW_LIQUIDITY_DEPTH');
    }

    return {
      address,
      status,
      reputationScore: score,
      recentRedFlags: flags,
      lastPingMs: 124
    };
  }

  /**
   * Generate a 'Lucidity Prompt' for the user if health is not Excellent.
   */
  getLucidityPrompt(health: DestinationHealth): string | null {
    if (health.status === 'EXCELLENT' || health.status === 'STABLE') return null;
    
    return `WARNING: The destination '${health.address}' shows signs of ${health.status}. ${health.recentRedFlags.join(', ')}. Do you wish to proceed despite these volatility markers?`;
  }
}

export const safetyMirrorService = SafetyMirrorService.getInstance();
