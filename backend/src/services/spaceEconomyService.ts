export interface OrbitalSlot {
  id: string;
  orbit: 'LEO' | 'MEO' | 'GEO' | 'HEO';
  position: { ra: number; dec: number };
  owner: string;
  status: 'Active' | 'Available' | 'Reserved';
  value: number;
}

export interface AstroBond {
  id: string;
  target: 'Moon' | 'Mars' | 'AsteroidBelt' | 'Europa';
  type: 'Colonization' | 'Mining' | 'Terraforming';
  yield: number;
  maturityDate: string;
  riskScore: number; // Impacted by solar activity
}

class SpaceEconomyService {
  private orbitalSlots: OrbitalSlot[] = [
    { id: 'SLOT-LEO-102', orbit: 'LEO', position: { ra: 145.2, dec: -12.4 }, owner: 'PathGuard Treasury', status: 'Active', value: 1250000 },
    { id: 'SLOT-GEO-55', orbit: 'GEO', position: { ra: 12.8, dec: 0.1 }, owner: 'Available', status: 'Available', value: 8900000 }
  ];

  async getOrbitalSlots(): Promise<OrbitalSlot[]> {
    return this.orbitalSlots;
  }

  async getAstroBonds(): Promise<AstroBond[]> {
    return [
      { id: 'BOND-LUNAR-01', target: 'Moon', type: 'Colonization', yield: 6.5, maturityDate: '2045-05-20', riskScore: 1.2 },
      { id: 'BOND-MARS-ALPHA', target: 'Mars', type: 'Terraforming', yield: 12.8, maturityDate: '2060-12-31', riskScore: 4.5 },
      { id: 'BOND-AST-99', target: 'AsteroidBelt', type: 'Mining', yield: 25.0, maturityDate: '2052-08-15', riskScore: 8.9 }
    ];
  }

  async simulateInterplanetaryTransaction(amount: number, destination: string): Promise<{ txId: string; latencyMinutes: number }> {
    // Distance-based latency simulation (in minutes)
    const latencies: Record<string, number> = {
      'Moon': 0.02, // ~1.3 seconds
      'Mars': 12.5,  // Average 3-22 mins
      'Jupiter': 45.0
    };
    
    return {
      txId: `IITP-${Math.random().toString(36).substring(7).toUpperCase()}`,
      latencyMinutes: latencies[destination] || 5.0
    };
  }
}

export const spaceEconomyService = new SpaceEconomyService();
