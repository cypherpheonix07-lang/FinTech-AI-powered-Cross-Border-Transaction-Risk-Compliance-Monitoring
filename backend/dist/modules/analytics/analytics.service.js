"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const database_1 = require("../../config/database");
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const library_1 = require("@prisma/client/runtime/library");
class AnalyticsService {
    static async getFraudTrends(tenantId, period) {
        const days = parseInt(period) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const transactions = await database_1.prisma.transaction.findMany({
            where: {
                tenantId,
                createdAt: { gte: startDate },
            },
            select: { createdAt: true, riskScore: true, status: true, anomalyFlag: true },
            orderBy: { createdAt: 'asc' },
        });
        // Group by day
        const dailyData = {};
        for (const tx of transactions) {
            const day = tx.createdAt.toISOString().split('T')[0];
            if (!dailyData[day]) {
                dailyData[day] = { total: 0, flagged: 0, blocked: 0, avgRisk: 0 };
            }
            dailyData[day].total++;
            if (tx.status === 'FLAGGED')
                dailyData[day].flagged++;
            if (tx.status === 'BLOCKED')
                dailyData[day].blocked++;
            dailyData[day].avgRisk += tx.riskScore;
        }
        // Finalize averages
        const trends = Object.entries(dailyData).map(([date, data]) => ({
            date,
            totalTransactions: data.total,
            flaggedTransactions: data.flagged,
            blockedTransactions: data.blocked,
            averageRiskScore: Math.round(data.avgRisk / data.total),
            flagRate: parseFloat((data.flagged / data.total * 100).toFixed(2)),
        }));
        return {
            period: `${days}d`,
            trends,
            summary: {
                totalTransactions: transactions.length,
                totalFlagged: transactions.filter(tx => tx.status === 'FLAGGED').length,
                totalBlocked: transactions.filter(tx => tx.status === 'BLOCKED').length,
                overallFlagRate: transactions.length > 0
                    ? parseFloat((transactions.filter(tx => tx.status === 'FLAGGED' || tx.status === 'BLOCKED').length / transactions.length * 100).toFixed(2))
                    : 0,
            },
        };
    }
    static async getCorridorRisk(tenantId) {
        const transactions = await database_1.prisma.transaction.findMany({
            where: { tenantId },
            select: {
                senderCountry: true,
                receiverCountry: true,
                riskScore: true,
                amount: true,
                status: true,
            },
        });
        const corridors = {};
        for (const tx of transactions) {
            const key = `${tx.senderCountry} → ${tx.receiverCountry}`;
            if (!corridors[key]) {
                corridors[key] = { count: 0, totalAmount: 0, avgRisk: 0, flagged: 0 };
            }
            corridors[key].count++;
            corridors[key].totalAmount = new library_1.Decimal(corridors[key].totalAmount).plus(tx.amount).toNumber();
            corridors[key].avgRisk += tx.riskScore;
            if (tx.status === 'FLAGGED' || tx.status === 'BLOCKED')
                corridors[key].flagged++;
        }
        return Object.entries(corridors)
            .map(([corridor, data]) => ({
            corridor,
            transactionCount: data.count,
            totalAmount: data.totalAmount,
            averageRiskScore: Math.round(data.avgRisk / data.count),
            flagRate: parseFloat((data.flagged / data.count * 100).toFixed(2)),
        }))
            .sort((a, b) => b.averageRiskScore - a.averageRiskScore);
    }
    static async getModelPerformance() {
        // Fetch from ML service
        try {
            const response = await axios_1.default.get(`${env_1.env.ML_SERVICE_URL}/api/fraud/model-info`);
            if (response.data?.success) {
                return response.data.data;
            }
        }
        catch {
            // Fallback to local model versions
        }
        const versions = await database_1.prisma.modelVersion.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        return {
            versions: versions.map(v => ({
                version: v.id,
                name: v.name,
                createdAt: v.createdAt,
                metrics: v.metrics,
            })),
        };
    }
    static async getRiskDistribution(tenantId) {
        const transactions = await database_1.prisma.transaction.findMany({
            where: { tenantId },
            select: { riskScore: true, status: true },
        });
        const distribution = { low: 0, medium: 0, high: 0, critical: 0 };
        for (const tx of transactions) {
            if (tx.riskScore >= 80)
                distribution.critical++;
            else if (tx.riskScore >= 60)
                distribution.high++;
            else if (tx.riskScore >= 30)
                distribution.medium++;
            else
                distribution.low++;
        }
        const statusBreakdown = { pending: 0, approved: 0, flagged: 0, blocked: 0 };
        for (const tx of transactions) {
            const key = tx.status.toLowerCase();
            if (key in statusBreakdown)
                statusBreakdown[key]++;
        }
        return { distribution, statusBreakdown, totalTransactions: transactions.length };
    }
}
exports.AnalyticsService = AnalyticsService;
