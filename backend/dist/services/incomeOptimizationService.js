"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeOptimizationService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class IncomeOptimizationService {
    /**
     * Feature 25.1: Multi-stream income analyzer
     */
    async analyzeAllIncomeStreams(userId) {
        // In production, this aggregates from bank feeds + manual inputs
        return [
            { type: 'SALARY', label: 'Day Job — Fintech Corp', monthlyAmount: 8500, reliability: 0.98 },
            { type: 'FREELANCE', label: 'Side Consulting', monthlyAmount: 1200, reliability: 0.72 },
            { type: 'DIVIDEND', label: 'VHYAX Holdings', monthlyAmount: 340, reliability: 0.95 },
            { type: 'RENTAL', label: 'Airbnb Property', monthlyAmount: 900, reliability: 0.6 },
        ];
    }
    /**
     * Feature 25.2: Income diversification score
     */
    async computeDiversificationScore(streams) {
        const total = streams.reduce((s, i) => s + i.monthlyAmount, 0);
        // Herfindahl-Hirschman Index (HHI) for concentration
        const hhi = streams.reduce((sum, i) => {
            const share = i.monthlyAmount / total;
            return sum + share * share;
        }, 0);
        // Convert HHI to 0-100 score (lower HHI = higher diversification = higher score)
        return Math.round((1 - hhi) * 100);
    }
    /**
     * Feature 25.5: Side hustle opportunity finder
     */
    async findSideHustleOpportunities(userId) {
        return [
            { title: 'AI Prompt Engineering', estimatedMonthly: 800, difficulty: 'MEDIUM', timeRequired: '10 hrs/week' },
            { title: 'Dividend Growth Investing', estimatedMonthly: 200, difficulty: 'LOW', timeRequired: '2 hrs/week' },
            { title: 'Digital Product Sales', estimatedMonthly: 600, difficulty: 'HIGH', timeRequired: '20 hrs/week' },
        ];
    }
    /**
     * Feature 25.9: Passive income runway calculator
     */
    async calculatePassiveIncomeRunway(userId) {
        const monthlyExpenses = 3500;
        const passiveIncome = 1240; // rental + dividend
        const coverageRatio = passiveIncome / monthlyExpenses;
        return {
            passiveIncome,
            monthlyExpenses,
            coverageRatio: parseFloat(coverageRatio.toFixed(2)),
            fireNumber: monthlyExpenses * 12 * 25, // 25x annual expenses (4% rule)
            monthsToFIRE: Math.ceil(((monthlyExpenses * 12 * 25) - 450000) / ((monthlyExpenses * 0.2) * 12)),
            status: coverageRatio >= 1 ? 'FINANCIALLY_FREE' : 'ON_PATH',
        };
    }
}
exports.IncomeOptimizationService = IncomeOptimizationService;
