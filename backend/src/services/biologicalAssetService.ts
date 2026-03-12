/**
 * PATHGUARD PILLAR 16: BIOLOGICAL ASSET PROTECTION
 * BiologicalAssetService — Securitization of Genomic IP and Bio-Enclave logic.
 * Ensures the protection of biological and agricultural assets.
 */

export interface BiologicalAsset {
  assetId: string;
  type: 'GENOMIC_DATA' | 'SEED_IP' | 'SPECIES_PRESERVATION';
  name: string;
  ownerDid: string;
  encryptionMethod: string; // e.g., "Bio-Enclave-AES-GCM"
  scarcityIndex: number; // 0.0 to 1.0 (1.0 = Extinction level risk)
  isSecuritized: boolean;
}

export interface BioEnclaveAuditLog {
  requestId: string;
  assetId: string;
  userDid: string;
  timestamp: string;
  status: 'AUTHORIZED' | 'DENIED';
}

export class BiologicalAssetService {
  private static instance: BiologicalAssetService;
  private bioRegistry: Map<string, BiologicalAsset> = new Map();
  private auditLogs: BioEnclaveAuditLog[] = [];

  private constructor() {
    this.seedBioAssets();
  }

  public static getInstance(): BiologicalAssetService {
    if (!BiologicalAssetService.instance) {
      BiologicalAssetService.instance = new BiologicalAssetService();
    }
    return BiologicalAssetService.instance;
  }

  private seedBioAssets(): void {
    this.bioRegistry.set('BIO-IP-01', {
      assetId: 'BIO-IP-01',
      type: 'SEED_IP',
      name: 'Resilient Wheat Strain G-14',
      ownerDid: 'did:pg:agro-secure-corp',
      encryptionMethod: 'Bio-Enclave-256',
      scarcityIndex: 0.15,
      isSecuritized: true
    });
  }

  /**
   * Securitize a biological asset into a fractionalized IP pool.
   */
  async securitizeBioIP(assetId: string): Promise<boolean> {
    const asset = this.bioRegistry.get(assetId);
    if (!asset) return false;

    asset.isSecuritized = true;
    console.log(`[Pillar-16] Bio-Enclave: Asset ${assetId} has been successfully securitized into the IP pool.`);
    return true;
  }

  /**
   * Request access to encrypted genomic data via Bio-Enclave gate.
   */
  async requestGenomicAccess(assetId: string, requestDid: string): Promise<boolean> {
    const asset = this.bioRegistry.get(assetId);
    if (!asset) return false;

    console.log(`[Pillar-16] Bio-Enclave: Authorizing genomic access for ${requestDid} on asset ${assetId}...`);
    
    // Simulation: Only the owner or specialized DIDs can access
    const isAuthorized = asset.ownerDid === requestDid || requestDid.includes('research-hub');
    
    const log: BioEnclaveAuditLog = {
      requestId: `REQ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      assetId,
      userDid: requestDid,
      timestamp: new Date().toISOString(),
      status: isAuthorized ? 'AUTHORIZED' : 'DENIED'
    };

    this.auditLogs.push(log);
    return isAuthorized;
  }

  /**
   * Get scarcity-driven liquidity data.
   */
  getScarcityLiquidity(assetId: string): number {
    const asset = this.bioRegistry.get(assetId);
    if (!asset) return 0;
    
    // Higher scarcity = Higher liquidity premium
    return (asset.scarcityIndex * 1000000); // Mock USD premium
  }
}

export const biologicalAssetService = BiologicalAssetService.getInstance();
