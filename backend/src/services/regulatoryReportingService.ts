import { RiskDecision } from './riskEngineV2';

/**
 * PATHGUARD PILLAR 4: SCALABILITY
 * Regulatory Reporting Service — Automated generation of SARs
 * (Suspicious Activity Reports) and compliance archival.
 */

export interface SARReport {
  reportId: string;
  userId: string;
  timestamp: string;
  threatLevel: number;
  suspiciousSignals: string[];
  status: 'DRAFT' | 'FILED' | 'ARCHIVED';
  jurisdiction: string;
}

export class RegulatoryReportingService {
  private static instance: RegulatoryReportingService;
  private reportArchive: Map<string, SARReport[]> = new Map();

  private constructor() {}

  public static getInstance(): RegulatoryReportingService {
    if (!RegulatoryReportingService.instance) {
      RegulatoryReportingService.instance = new RegulatoryReportingService();
    }
    return RegulatoryReportingService.instance;
  }

  /**
   * Automatically generate a SAR if a risk decision meets certain criteria.
   */
  async autoGenerateSAR(userId: string, decision: RiskDecision): Promise<SARReport | null> {
    if (decision.threatIndex < 70 && decision.decision !== 'BLOCK') {
      return null; // Only report high-risk or blocked activities
    }

    const report: SARReport = {
      reportId: `SAR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId,
      timestamp: new Date().toISOString(),
      threatLevel: decision.threatIndex,
      suspiciousSignals: decision.reasoning,
      status: 'DRAFT',
      jurisdiction: 'US_FINCEN' // Defaulting to US for simulation
    };

    const userReports = this.reportArchive.get(userId) || [];
    userReports.push(report);
    this.reportArchive.set(userId, userReports);

    console.log(`[Pillar-4] SAR Draft generated for user ${userId}. Report ID: ${report.reportId}`);
    return report;
  }

  /**
   * File the SAR with the appropriate regulator.
   */
  async fileReport(reportId: string): Promise<boolean> {
    // In production: Connect to FinCEN/FCA secure portal APIs
    console.log(`[Pillar-4] Filing Regulatory Report ${reportId} with FinCEN...`);
    
    // Simulate filing process
    return true; 
  }

  /**
   * Get all reports for a specific user (Compliance view).
   */
  getReports(userId: string): SARReport[] {
    return this.reportArchive.get(userId) || [];
  }
}

export const regulatoryReportingService = RegulatoryReportingService.getInstance();
