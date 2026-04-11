"use strict";
/**
 * PATHGUARD PILLAR 1: AI INTELLIGENCE
 * Phishing Detector Service — Identifying social engineering footprints
 * and suspicious communication patterns.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.phishingDetectorService = exports.PhishingDetectorService = void 0;
class PhishingDetectorService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!PhishingDetectorService.instance) {
            PhishingDetectorService.instance = new PhishingDetectorService();
        }
        return PhishingDetectorService.instance;
    }
    /**
     * Analyze communication signals for phishing patterns.
     */
    async analyzeSignals(signal) {
        const detectedPatterns = [];
        let riskPoints = 0;
        // 1. Lookalike domain detection (simplified)
        if (signal.url && (signal.url.includes('pathguarcl.com') || signal.url.includes('path-guard.net'))) {
            detectedPatterns.push('HOMOGRAPH_DOMAIN_ATTACK');
            riskPoints += 50;
        }
        // 2. Suspicious Payload Content (Urgency/Threats)
        if (signal.payloadContent) {
            const lowerContent = signal.payloadContent.toLowerCase();
            if (lowerContent.includes('urgent') || lowerContent.includes('account suspended') || lowerContent.includes('verify now')) {
                detectedPatterns.push('URGENCY_MANIPULATION');
                riskPoints += 30;
            }
        }
        // 3. Sender Verification (Simulated DMARC/SPF check)
        if (signal.senderEmail && !signal.senderEmail.endsWith('@pathguard.com')) {
            detectedPatterns.push('EXTERNAL_SENDER_IMPERSONATION');
            riskPoints += 20;
        }
        const isSuspicious = riskPoints > 40;
        let threatLevel = 'LOW';
        if (riskPoints > 80)
            threatLevel = 'CRITICAL';
        else if (riskPoints > 50)
            threatLevel = 'HIGH';
        else if (riskPoints > 20)
            threatLevel = 'MEDIUM';
        return {
            isSuspicious,
            threatLevel,
            detectedPatterns,
            confidenceScore: riskPoints / 100,
        };
    }
    /**
     * Scan for "Invisible Pixel" or "Link Cloaking" (Simulated).
     */
    detectClandestineTracking(html) {
        return html.includes('style="display:none"') && html.includes('width="1" height="1"');
    }
}
exports.PhishingDetectorService = PhishingDetectorService;
exports.phishingDetectorService = PhishingDetectorService.getInstance();
