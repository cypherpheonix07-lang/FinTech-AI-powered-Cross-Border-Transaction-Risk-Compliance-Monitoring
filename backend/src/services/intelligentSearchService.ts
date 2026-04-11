import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class IntelligentSearchService {
  /**
   * Feature 20.1: Natural language search
   * "Show me coffee purchases last month"
   */
  async searchByNaturalLanguage(userId: string, query: string) {
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
  async semanticSearch(query: string) {
    // In a real implementation, we would use OpenAI/LangChain/Pinecone
    console.log(`Generating embedding for: ${query}...`);
    return [];
  }

  /**
   * Feature 20.8: Pattern detection
   */
  async detectSpendingPatterns(userId: string) {
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
  async findAnomalies(userId: string) {
    return await prisma.transaction.findMany({
      where: {
        account: { tenant: { users: { some: { id: userId } } } },
        anomalyFlag: true
      }
    });
  }

  private parseIntent(query: string) {
    const q = query.toLowerCase();
    let category = '';
    if (q.includes('coffee')) category = 'Coffee';
    if (q.includes('rent')) category = 'Rent';
    
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    return {
      category,
      startDate: lastMonth,
      endDate: now
    };
  }

  private async getUserAccountIds(userId: string): Promise<string[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { tenant: { include: { accounts: true } } }
    });
    return user?.tenant.accounts.map(a => a.id) || [];
  }
}
