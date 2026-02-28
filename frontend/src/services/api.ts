import type { User, Transaction, Tenant, AuditLog, SystemHealth, ModelMetric, Alert, RiskSummary, CorridorRisk } from '@/types';
import { generateTransactions, mockTenants, mockRiskSummary, mockSystemHealth, mockModelMetrics, mockAlerts, generateAuditLogs, mockCorridorRisks } from './mockData';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

import type { User, Transaction, Tenant, AuditLog, SystemHealth, ModelMetric, Alert, RiskSummary, CorridorRisk } from '@/types';
import axiosInstance from './axiosInstance';

export const authApi = {
  async login(email: string, password: string) {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },
  async refreshToken(token: string) {
    const response = await axiosInstance.post('/auth/refresh', { token });
    return response.data;
  },
  async verifyMfa(sessionId: string, code: string) {
    const response = await axiosInstance.post('/auth/mfa/verify', { sessionId, code });
    return response.data;
  },
};

export const transactionApi = {
  async getTransactions(tenantId?: string, page = 1, limit = 20): Promise<{ data: Transaction[]; total: number }> {
    const response = await axiosInstance.get('/transactions', { params: { tenantId, page, limit } });
    return response.data;
  },
  async getTransaction(id: string): Promise<Transaction> {
    const response = await axiosInstance.get(`/transactions/${id}`);
    return response.data;
  },
  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    const response = await axiosInstance.post('/transactions', data);
    return response.data;
  },
};

export const riskApi = {
  async getRiskSummary(tenantId?: string): Promise<RiskSummary> {
    const response = await axiosInstance.get('/analytics/risk-summary', { params: { tenantId } });
    return response.data;
  },
  async getCorridorRisks(): Promise<CorridorRisk[]> {
    const response = await axiosInstance.get('/analytics/corridor-risk');
    return response.data;
  },
};

export const tenantApi = {
  async getTenants(): Promise<Tenant[]> {
    const response = await axiosInstance.get('/tenants');
    return response.data;
  },
  async getTenant(id: string): Promise<Tenant> {
    const response = await axiosInstance.get(`/tenants/${id}`);
    return response.data;
  },
};

export const auditApi = {
  async getAuditLogs(filters?: { action?: string; resource?: string; startDate?: string; endDate?: string }, page = 1, limit = 20): Promise<{ data: AuditLog[]; total: number }> {
    const response = await axiosInstance.get('/audit-logs', { params: { ...filters, page, limit } });
    return response.data;
  },
};

export const adminApi = {
  async getSystemHealth(): Promise<SystemHealth[]> {
    const response = await axiosInstance.get('/admin/health');
    return response.data;
  },
  async getModelMetrics(): Promise<ModelMetric[]> {
    const response = await axiosInstance.get('/admin/model-metrics');
    return response.data;
  },
  async getAlerts(): Promise<Alert[]> {
    const response = await axiosInstance.get('/admin/alerts');
    return response.data;
  },
};

export const simulationApi = {
  async start(mode: string): Promise<{ sessionId: string }> {
    const response = await axiosInstance.post('/simulation/start', { mode });
    return response.data;
  },
  async stop(sessionId: string): Promise<void> {
    await axiosInstance.post('/simulation/stop', { sessionId });
  },
};
