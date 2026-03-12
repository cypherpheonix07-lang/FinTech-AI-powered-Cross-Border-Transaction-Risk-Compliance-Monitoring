import { Router } from 'express';
import { VanguardController } from './vanguard.controller';

const router = Router();
const controller = new VanguardController();

// Quantum routes
router.get('/quantum/status', controller.getQuantumStatus);
router.get('/quantum/threats', controller.getQuantumThreats);
router.post('/quantum/rotate-keys', controller.rotateQuantumKeys);

// Neuro routes
router.post('/neuro/verify', controller.verifyNeuroIdentity);
router.get('/neuro/alerts/:transactionId?', controller.getCognitiveAlerts);

// Spatial routes
router.get('/spatial/sessions', controller.getSpatialSessions);
router.get('/spatial/path/:transactionId', controller.getVolumetricPath);

// Bio-Finance routes
router.post('/bio/verify-dna', controller.verifyDNAIdentity);
router.get('/bio/portfolio', controller.getLongevityPortfolio);
router.get('/bio/geo-bonds', controller.getGeoengineeringBonds);

// Transparency routes
router.post('/transparency/verify-hash', controller.verifyTransferHash);
router.post('/transparency/generate-zkp', controller.generateZKP);

// Governance routes
router.get('/governance/ubo-tree/:entityId', controller.getUBOTree);
router.get('/governance/sof-analysis/:transferId', controller.analyzeSoF);

// Space Economy routes
router.get('/space/slots', controller.getOrbitalSlots);
router.post('/space/simulate-tx', controller.simulateAstroTransaction);

// Marine & Atmospheric routes
router.get('/marine/weather-derivatives', controller.getWeatherDerivatives);
router.get('/marine/assets', controller.getMarineAssets);

// Phase 20 routes
router.get('/risk/agi-bonds', controller.getAGIBonds);
router.get('/risk/nanotech-status', controller.getNanotechStatus);
router.get('/multiverse/divergence/:assetId?', controller.getTimelineDivergence);
router.get('/multiverse/quantum-yield', controller.getQuantumYield);
router.get('/longevity/credits', controller.getLongevityCredits);

export default router;
