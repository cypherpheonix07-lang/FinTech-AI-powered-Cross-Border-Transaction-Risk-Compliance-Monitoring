// backend/src/types/canonical-transaction.ts
// Canonical internal format for all transaction types (SWIFT MT, ISO 20022, REST JSON)

export interface CanonicalTransaction {
  // Core identification
  transactionId: string;
  messageType: 'SWIFT_MT103' | 'SWIFT_MT202' | 'ISO20022_PACS008' | 'ISO20022_PACS002' | 'REST_JSON';
  originalReference: string;

  // Parties
  senderName: string;
  senderAccount: string;
  senderBIC?: string;
  senderCountry: string;

  receiverName: string;
  receiverAccount: string;
  receiverBIC?: string;
  receiverCountry: string;

  // Financial
  amount: number;
  currency: string;
  valueDate: string;
  settlementDate?: string;

  // Risk metadata
  deviceId?: string;
  ipAddress?: string;
  ipCountry?: string;
  userAgent?: string;

  // Processing
  rawMessage?: string;
  parsedAt: string;
  tenantId: string;
}

export interface TransactionRiskResult {
  transactionId: string;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  fraudProbability: number;
  anomalyFlag: boolean;
  graphFlag: boolean;
  cycleDetected: boolean;
  explanation: string[];
  decision: 'APPROVED' | 'FLAGGED' | 'BLOCKED';
  modelVersion?: string;
  latencyMs: number;
}

export interface BatchTransactionRequest {
  transactions: CanonicalTransaction[];
  priority?: 'normal' | 'high' | 'urgent';
}

export interface BatchTransactionResult {
  results: TransactionRiskResult[];
  total: number;
  flagged: number;
  blocked: number;
  processingTimeMs: number;
}

export interface ComplianceReport {
  id: string;
  type: 'SAR' | 'STR';
  status: 'DRAFT' | 'SUBMITTED' | 'FILED';
  transactionIds: string[];
  generatedBy: string;
  filingDate?: string;
  content: SARContent | STRContent;
  createdAt: string;
}

export interface SARContent {
  subjectName: string;
  subjectAccount: string;
  suspiciousActivity: string;
  activityDateRange: { from: string; to: string };
  totalAmount: number;
  currency: string;
  narrativeDescription: string;
  riskIndicators: string[];
  supportingTransactions: string[];
}

export interface STRContent {
  reportingEntity: string;
  suspectName: string;
  transactionDetails: Array<{
    transactionId: string;
    amount: number;
    date: string;
    riskScore: number;
  }>;
  reasonForSuspicion: string;
  regulatoryBody: string;
}
