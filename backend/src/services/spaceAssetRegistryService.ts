/**
 * PATHGUARD PILLAR 15: SPACE-BASED ASSET TRACKING
 * SpaceAssetRegistryService — Registry for extraterrestrial property rights
 * (Lunar, Asteroid) and orbital resource licensing (ORR).
 */

export interface SpaceAsset {
  assetId: string;
  type: 'LUNAR_PROPERTY' | 'ASTEROID_MINING_RIGHTS' | 'ORBITAL_SLOT';
  name: string;
  location: string; // e.g., "Lunar South Pole - Shackleton Crater"
  ownerDid: string; // Linked to Pillar 9 (DID)
  coordinates: string;
  registryDate: string;
}

export class SpaceAssetRegistryService {
  private static instance: SpaceAssetRegistryService;
  private registry: Map<string, SpaceAsset> = new Map();

  private constructor() {
    this.seedSpaceAssets();
  }

  public static getInstance(): SpaceAssetRegistryService {
    if (!SpaceAssetRegistryService.instance) {
      SpaceAssetRegistryService.instance = new SpaceAssetRegistryService();
    }
    return SpaceAssetRegistryService.instance;
  }

  private seedSpaceAssets(): void {
    this.registry.set('LUNAR-001', {
      assetId: 'LUNAR-001',
      type: 'LUNAR_PROPERTY',
      name: 'Shackleton Prime Plot',
      location: 'Lunar South Pole',
      ownerDid: 'did:pg:institutional-pioneer-1',
      coordinates: '89.9°S 0.0°E',
      registryDate: new Date().toISOString()
    });
  }

  /**
   * Register a new space-based asset.
   */
  async registerAsset(asset: Omit<SpaceAsset, 'assetId' | 'registryDate'>): Promise<SpaceAsset> {
    const assetId = `SPACE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const newAsset: SpaceAsset = {
      ...asset,
      assetId,
      registryDate: new Date().toISOString()
    };
    
    this.registry.set(assetId, newAsset);
    console.log(`[Pillar-15] Space Registry: Asset ${assetId} (${asset.type}) registered to ${asset.ownerDid}.`);
    return newAsset;
  }

  /**
   * Resolve ownership of a space asset.
   */
  async getAsset(assetId: string): Promise<SpaceAsset | null> {
    return this.registry.get(assetId) || null;
  }

  /**
   * Orbital Resource Rights (ORR) Auction Logic Stub
   */
  async auctionOrbitalSlot(slotCoords: string): Promise<string> {
    console.log(`[Pillar-15] Space Registry: Initiating auction for orbital slot ${slotCoords}...`);
    return `ORR-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  }
}

export const spaceAssetRegistryService = SpaceAssetRegistryService.getInstance();
