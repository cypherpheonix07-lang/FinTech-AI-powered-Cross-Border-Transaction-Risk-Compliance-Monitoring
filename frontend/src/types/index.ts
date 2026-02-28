export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  mfaRequired: boolean;
  mfaSessionId: string | null;
}

export interface Tenant {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'suspended' | 'onboarding';
  transactionVolume: number;
  riskScore: number;
  corridors: string[];
  createdAt: string;
}

export interface Transaction {
  id: string;
  tenantId: string;
  senderCountry: string;
  receiverCountry: string;
  amount: number;
  currency: string;
  riskScore: number;
  riskLevel: RiskLevel;
  status: 'pending' | 'completed' | 'flagged' | 'blocked';
  timestamp: string;
  senderName: string;
  receiverName: string;
  corridor: string;
  features: FeatureContribution[];
  metadata: Record<string, string>;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface FeatureContribution {
  name: string;
  value: number;
  contribution: number;
}

export interface RiskSummary {
  totalTransactions: number;
  flaggedCount: number;
  blockedCount: number;
  averageRiskScore: number;
  highRiskPercentage: number;
  volumeProcessed: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  tenantId: string;
}

export interface SystemHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  uptime: number;
  lastCheck: string;
}

export interface ModelMetric {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastTrained: string;
  predictions: number;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface SimulationState {
  isRunning: boolean;
  mode: 'normal' | 'stress' | 'adversarial';
  transactionsPerSecond: number;
  elapsed: number;
  generated: number;
  flagged: number;
}

export interface CorridorRisk {
  corridor: string;
  from: string;
  to: string;
  volume: number;
  avgRisk: number;
  flagRate: number;
}
