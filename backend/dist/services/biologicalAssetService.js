"use strict";
/**
 * PATHGUARD PILLAR 16: BIOLOGICAL ASSET PROTECTION
 * BiologicalAssetService — Securitization of Genomic IP and Bio-Enclave logic.
 * Ensures the protection of biological and agricultural assets.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.biologicalAssetService = exports.BiologicalAssetService = void 0;
class BiologicalAssetService {
    static instance;
    bioRegistry = new Map();
    auditLogs = [];
    constructor() {
        this.seedBioAssets();
    }
    static getInstance() {
        if (!BiologicalAssetService.instance) {
            BiologicalAssetService.instance = new BiologicalAssetService();
        }
        return BiologicalAssetService.instance;
    }
    seedBioAssets() {
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
    async securitizeBioIP(assetId) {
        const asset = this.bioRegistry.get(assetId);
        if (!asset)
            return false;
        asset.isSecuritized = true;
        console.log(`[Pillar-16] Bio-Enclave: Asset ${assetId} has been successfully securitized into the IP pool.`);
        return true;
    }
    /**
     * Request access to encrypted genomic data via Bio-Enclave gate.
     */
    async requestGenomicAccess(assetId, requestDid) {
        const asset = this.bioRegistry.get(assetId);
        if (!asset)
            return false;
        console.log(`[Pillar-16] Bio-Enclave: Authorizing genomic access for ${requestDid} on asset ${assetId}...`);
        // Simulation: Only the owner or specialized DIDs can access
        const isAuthorized = asset.ownerDid === requestDid || requestDid.includes('research-hub');
        const log = {
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
    getScarcityLiquidity(assetId) {
        const asset = this.bioRegistry.get(assetId);
        if (!asset)
            return 0;
        // Higher scarcity = Higher liquidity premium
        return (asset.scarcityIndex * 1000000); // Mock USD premium
    }
}
exports.BiologicalAssetService = BiologicalAssetService;
exports.biologicalAssetService = BiologicalAssetService.getInstance();
