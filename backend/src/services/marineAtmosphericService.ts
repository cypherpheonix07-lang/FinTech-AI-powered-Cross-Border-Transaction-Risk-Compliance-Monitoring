export interface WeatherDerivative {
  id: string;
  type: 'Hurricane' | 'Drought' | 'HeatCloud' | 'Tornado';
  region: string;
  strikePrice: number;
  currentIndex: number;
  status: 'Active' | 'Triggered' | 'Expired';
}

export interface MarineAsset {
  id: string;
  name: string;
  depth: number; // meters
  resource: 'PolymetallicNodules' | 'HydrothermalVents' | 'BlueCarbon';
  valuation: number;
  environmentalImpactScore: number;
}

class MarineAtmosphericService {
  async getWeatherDerivatives(): Promise<WeatherDerivative[]> {
    return [
      { id: 'WD-HUR-26', type: 'Hurricane', region: 'Atlantic-S1', strikePrice: 150, currentIndex: 45, status: 'Active' },
      { id: 'WD-DRO-12', type: 'Drought', region: 'Sahara-Core', strikePrice: 90, currentIndex: 110, status: 'Triggered' }
    ];
  }

  async getMarineAssets(): Promise<MarineAsset[]> {
    return [
      { id: 'MA-DS-01', name: 'Clarion-Clipperton Zone A', depth: 4500, resource: 'PolymetallicNodules', valuation: 450000000, environmentalImpactScore: 6.5 },
      { id: 'MA-BLUE-05', name: 'Sunda Shelf Mangrove Credits', depth: 5, resource: 'BlueCarbon', valuation: 12000000, environmentalImpactScore: 0.2 }
    ];
  }

  async getCatastropheRiskHeatmap(): Promise<Record<string, number>> {
    // Mock risk scores by region
    return {
      'NorthAmerica': 0.45,
      'AsiaPacific': 0.78,
      'Europe': 0.22,
      'Africa': 0.65,
      'Antarctica': 0.95 // Melting risk
    };
  }
}

export const marineAtmosphericService = new MarineAtmosphericService();
