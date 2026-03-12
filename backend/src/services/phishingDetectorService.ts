/**
 * PATHGUARD PILLAR 1: AI INTELLIGENCE
 * Phishing Detector Service — Identifying social engineering footprints
 * and suspicious communication patterns.
 */

export interface PhishingSignal {
  url?: string;
  senderEmail?: string;
  payloadContent?: string;
  headers?: Record<string, string>;
}

export interface PhishingReport {
  isSuspicious: boolean;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedPatterns: string[];
  confidenceScore: number;
}

export class PhishingDetectorService {
  private static instance: PhishingDetectorService;

  private constructor() {}

  public static getInstance(): PhishingDetectorService {
    if (!PhishingDetectorService.instance) {
      PhishingDetectorService.instance = new PhishingDetectorService();
    }
    return PhishingDetectorService.instance;
  }

  /**
   * Analyze communication signals for phishing patterns.
   */
  async analyzeSignals(signal: PhishingSignal): Promise<PhishingReport> {
    const detectedPatterns: string[] = [];
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
    let threatLevel: PhishingReport['threatLevel'] = 'LOW';
    if (riskPoints > 80) threatLevel = 'CRITICAL';
    else if (riskPoints > 50) threatLevel = 'HIGH';
    else if (riskPoints > 20) threatLevel = 'MEDIUM';

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
  detectClandestineTracking(html: string): boolean {
    return html.includes('style="display:none"') && html.includes('width="1" height="1"');
  }
}

export const phishingDetectorService = PhishingDetectorService.getInstance();
