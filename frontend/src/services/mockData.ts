import type { Transaction, Tenant, AuditLog, SystemHealth, ModelMetric, Alert, RiskSummary, CorridorRisk, RiskLevel, User } from '@/types';

const countries = ['US', 'GB', 'NG', 'IN', 'PH', 'MX', 'BR', 'AE', 'SG', 'KE', 'DE', 'FR', 'JP', 'CN', 'ZA'];
const currencies = ['USD', 'GBP', 'NGN', 'INR', 'PHP', 'MXN', 'BRL', 'AED', 'SGD', 'KES', 'EUR', 'JPY', 'CNY', 'ZAR'];
const names = ['Alice Chen', 'Bob Smith', 'Carlos Garcia', 'Diana Okonkwo', 'Elena Petrova', 'Fatima Al-Hassan', 'George Tanaka', 'Hannah Mueller', 'Ibrahim Diallo', 'Jasmine Patel'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRiskLevel(score: number): RiskLevel {
  if (score < 30) return 'low';
  if (score < 60) return 'medium';
  if (score < 85) return 'high';
  return 'critical';
}

export function generateTransactions(count: number, tenantId?: string): Transaction[] {
  return Array.from({ length: count }, (_, i) => {
    const sender = randomFrom(countries);
    let receiver = randomFrom(countries);
    while (receiver === sender) receiver = randomFrom(countries);
    const riskScore = Math.round(Math.random() * 100);
    const riskLevel = randomRiskLevel(riskScore);
    const statuses: Transaction['status'][] = riskScore > 85 ? ['blocked'] : riskScore > 60 ? ['flagged'] : ['completed', 'pending'];
    return {
      id: `TXN-${String(10000 + i).slice(1)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      tenantId: tenantId || `tenant-${Math.ceil(Math.random() * 3)}`,
      senderCountry: sender,
      receiverCountry: receiver,
      amount: Math.round(Math.random() * 50000 * 100) / 100,
      currency: randomFrom(currencies),
      riskScore,
      riskLevel,
      status: randomFrom(statuses),
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      senderName: randomFrom(names),
      receiverName: randomFrom(names),
      corridor: `${sender}→${receiver}`,
      features: [
        { name: 'Amount Velocity', value: Math.random() * 100, contribution: Math.random() * 0.4 },
        { name: 'Corridor Risk', value: Math.random() * 100, contribution: Math.random() * 0.3 },
        { name: 'Sender History', value: Math.random() * 100, contribution: Math.random() * 0.2 },
        { name: 'Time Pattern', value: Math.random() * 100, contribution: Math.random() * 0.15 },
        { name: 'Network Score', value: Math.random() * 100, contribution: Math.random() * 0.1 },
      ],
      metadata: { paymentMethod: randomFrom(['bank_transfer', 'mobile_money', 'card', 'crypto']), purpose: randomFrom(['remittance', 'trade', 'salary', 'investment']) },
    };
  });
}

export const mockTenants: Tenant[] = [
  { id: 'tenant-1', name: 'GlobalPay Corp', region: 'North America', status: 'active', transactionVolume: 1245000, riskScore: 32, corridors: ['US→MX', 'US→PH', 'US→IN'], createdAt: '2024-01-15' },
  { id: 'tenant-2', name: 'AfriRemit Ltd', region: 'Sub-Saharan Africa', status: 'active', transactionVolume: 890000, riskScore: 48, corridors: ['GB→NG', 'GB→KE', 'US→ZA'], createdAt: '2024-03-22' },
  { id: 'tenant-3', name: 'AsiaTransfer Inc', region: 'Asia-Pacific', status: 'active', transactionVolume: 2100000, riskScore: 25, corridors: ['SG→IN', 'JP→PH', 'AE→IN'], createdAt: '2023-11-08' },
  { id: 'tenant-4', name: 'EuroFlow GmbH', region: 'Europe', status: 'onboarding', transactionVolume: 340000, riskScore: 15, corridors: ['DE→FR', 'GB→DE'], createdAt: '2025-01-10' },
];

export const mockRiskSummary: RiskSummary = {
  totalTransactions: 24589,
  flaggedCount: 342,
  blockedCount: 47,
  averageRiskScore: 34.2,
  highRiskPercentage: 8.3,
  volumeProcessed: 128500000,
};

export const mockSystemHealth: SystemHealth[] = [
  { service: 'Risk Engine', status: 'healthy', latency: 23, uptime: 99.97, lastCheck: new Date().toISOString() },
  { service: 'Transaction API', status: 'healthy', latency: 45, uptime: 99.95, lastCheck: new Date().toISOString() },
  { service: 'ML Pipeline', status: 'degraded', latency: 180, uptime: 98.2, lastCheck: new Date().toISOString() },
  { service: 'Webhook Relay', status: 'healthy', latency: 12, uptime: 99.99, lastCheck: new Date().toISOString() },
  { service: 'Queue Processor', status: 'healthy', latency: 8, uptime: 99.98, lastCheck: new Date().toISOString() },
  { service: 'Audit Logger', status: 'healthy', latency: 15, uptime: 99.96, lastCheck: new Date().toISOString() },
];

export const mockModelMetrics: ModelMetric[] = [
  { modelName: 'XGBoost v3.2', accuracy: 0.943, precision: 0.912, recall: 0.887, f1Score: 0.899, lastTrained: '2026-02-10', predictions: 145200 },
  { modelName: 'Neural Net v2.1', accuracy: 0.951, precision: 0.928, recall: 0.902, f1Score: 0.915, lastTrained: '2026-02-08', predictions: 89400 },
  { modelName: 'Ensemble v1.5', accuracy: 0.962, precision: 0.941, recall: 0.918, f1Score: 0.929, lastTrained: '2026-02-12', predictions: 234600 },
];

export const mockAlerts: Alert[] = [
  { id: 'ALT-001', severity: 'critical', message: 'Unusual spike in NG corridor transactions', source: 'Risk Engine', timestamp: new Date(Date.now() - 300000).toISOString(), acknowledged: false },
  { id: 'ALT-002', severity: 'warning', message: 'ML Pipeline latency exceeding threshold', source: 'ML Pipeline', timestamp: new Date(Date.now() - 900000).toISOString(), acknowledged: false },
  { id: 'ALT-003', severity: 'error', message: 'Failed webhook delivery to tenant-2', source: 'Webhook Relay', timestamp: new Date(Date.now() - 1800000).toISOString(), acknowledged: true },
  { id: 'ALT-004', severity: 'info', message: 'Model retraining completed successfully', source: 'ML Pipeline', timestamp: new Date(Date.now() - 3600000).toISOString(), acknowledged: true },
  { id: 'ALT-005', severity: 'warning', message: 'Queue lag increasing for tenant-3', source: 'Queue Processor', timestamp: new Date(Date.now() - 600000).toISOString(), acknowledged: false },
];

export function generateAuditLogs(count: number): AuditLog[] {
  const actions = ['LOGIN', 'LOGOUT', 'VIEW_TRANSACTION', 'FLAG_TRANSACTION', 'EXPORT_REPORT', 'UPDATE_RULE', 'CREATE_USER', 'CHANGE_ROLE', 'APPROVE_BLOCK', 'MODIFY_THRESHOLD'];
  const resources = ['auth', 'transactions', 'rules', 'users', 'reports', 'settings'];
  return Array.from({ length: count }, (_, i) => ({
    id: `AUD-${String(1000 + i)}`,
    userId: `user-${Math.ceil(Math.random() * 5)}`,
    userName: randomFrom(names),
    action: randomFrom(actions),
    resource: randomFrom(resources),
    details: `Performed ${randomFrom(actions).toLowerCase()} on ${randomFrom(resources)}`,
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
    tenantId: `tenant-${Math.ceil(Math.random() * 3)}`,
  }));
}

export const mockCorridorRisks: CorridorRisk[] = [
  { corridor: 'US→NG', from: 'US', to: 'NG', volume: 4200, avgRisk: 62, flagRate: 12.4 },
  { corridor: 'GB→KE', from: 'GB', to: 'KE', volume: 3100, avgRisk: 45, flagRate: 7.8 },
  { corridor: 'US→MX', from: 'US', to: 'MX', volume: 8900, avgRisk: 28, flagRate: 3.2 },
  { corridor: 'AE→IN', from: 'AE', to: 'IN', volume: 6700, avgRisk: 35, flagRate: 5.1 },
  { corridor: 'SG→PH', from: 'SG', to: 'PH', volume: 2800, avgRisk: 52, flagRate: 9.6 },
  { corridor: 'DE→FR', from: 'DE', to: 'FR', volume: 5400, avgRisk: 15, flagRate: 1.2 },
  { corridor: 'JP→CN', from: 'JP', to: 'CN', volume: 4100, avgRisk: 38, flagRate: 4.8 },
  { corridor: 'US→IN', from: 'US', to: 'IN', volume: 7200, avgRisk: 31, flagRate: 4.1 },
];

export const mockUsers: User[] = [
  { id: 'user-1', email: 'admin@riskmonitor.io', name: 'Sarah Admin', role: 'admin', tenantId: 'tenant-1' },
  { id: 'user-2', email: 'analyst@riskmonitor.io', name: 'James Analyst', role: 'analyst', tenantId: 'tenant-1' },
  { id: 'user-3', email: 'viewer@riskmonitor.io', name: 'Maria Viewer', role: 'viewer', tenantId: 'tenant-2' },
];
