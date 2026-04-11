"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligentSearchService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class IntelligentSearchService {
    /**
     * Feature 20.1: Natural language search
     * "Show me coffee purchases last month"
     */
    async searchByNaturalLanguage(userId, query) {
        const intent = this.parseIntent(query);
        return await prisma.transaction.findMany({
            where: {
                accountId: { in: await this.getUserAccountIds(userId) },
                transactionRef: { contains: intent.category, mode: 'insensitive' },
                createdAt: { gte: intent.startDate, lte: intent.endDate }
            }
        });
    }
    /**
     * Feature 20.2: Semantic search with vector embeddings (Stub)
     */
    async semanticSearch(query) {
        // In a real implementation, we would use OpenAI/LangChain/Pinecone
        console.log(`Generating embedding for: ${query}...`);
        return [];
    }
    /**
     * Feature 20.8: Pattern detection
     */
    async detectSpendingPatterns(userId) {
        const transactions = await prisma.transaction.findMany({
            where: { account: { tenant: { users: { some: { id: userId } } } } },
            take: 100
        });
        // Simulated pattern: "Spend more on weekends"
        return {
            insight: "You spend 42% more on Saturdays than any other day.",
            category: "LIFESTYLE",
            confidence: 0.89
        };
    }
    /**
     * Feature 20.9: Anomaly Search
     */
    async findAnomalies(userId) {
        return await prisma.transaction.findMany({
            where: {
                account: { tenant: { users: { some: { id: userId } } } },
                anomalyFlag: true
            }
        });
    }
    parseIntent(query) {
        const q = query.toLowerCase();
        let category = '';
        if (q.includes('coffee'))
            category = 'Coffee';
        if (q.includes('rent'))
            category = 'Rent';
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return {
            category,
            startDate: lastMonth,
            endDate: now
        };
    }
    async getUserAccountIds(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { tenant: { include: { accounts: true } } }
        });
        return user?.tenant.accounts.map(a => a.id) || [];
    }
}
exports.IntelligentSearchService = IntelligentSearchService;
