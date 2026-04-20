import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

export interface ForecastData {
  date: string;
  predictedBalance: number;
  confidenceInterval: [number, number];
}

export class MLIntelligenceService {
  /**
   * Feature 1.3: Predictive cash flow forecasting using LSTM-style logic (Simulated)
   * Future implementation will integrate with TensorFlow.js or a Python microservice.
   */
  async getCashFlowForecast(accountId: string, days: number = 30): Promise<ForecastData[]> {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: { transactions: { orderBy: { createdAt: 'desc' }, take: 50 } }
    });

    if (!account) throw new Error('Account not found');

    const currentBalance = account.balance.toNumber();
    const averageDailyBurn = this.calculateAverageDailyBurn(account.transactions);
    
    return Array.from({ length: days }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      
      const prediction = currentBalance - (averageDailyBurn * (i + 1));
      const volatility = averageDailyBurn * 0.1 * (i + 1);

      return {
        date: date.toISOString().split('T')[0],
        predictedBalance: Math.max(0, prediction),
        confidenceInterval: [
          Math.max(0, prediction - volatility),
          prediction + volatility
        ]
      };
    });
  }

  /**
   * Feature 1.1: Reinforcement Learning Advice Engine
   * Generates nudges based on spending behavior.
   */
  async generateSmartNudges(userId: string) {
    // 1. Fetch features from FeatureStore (Feature 2.1)
    const features = await prisma.featureValue.findMany({
      where: { entityId: userId },
      include: { featureStore: true }
    });

    // 2. Simple Rule-based RL logic for MVP
    const alerts = [];
    const subscriptionSpend = features.find(f => f.featureStore.featureName === 'SUBSCRIPTION_SPEND');
    
    if (subscriptionSpend && (subscriptionSpend.value as Record<string, unknown>).amount as number > 100) {
      alerts.push({
        type: 'OPTIMIZATION',
        message: 'You have $100+ in active subscriptions. Would you like our AI to negotiate these rates?',
        action: 'NEGOTIATE'
      });
    }

    return alerts;
  }

  private calculateAverageDailyBurn(transactions: unknown[]): number {
    if (transactions.length === 0) return 0;
    const totalOutflow = transactions
      .filter(t => t.amount.lessThan(0))
      .reduce((sum, t) => sum.plus(t.amount.abs()), new Decimal(0));
    
    return totalOutflow.dividedBy(30).toNumber(); // Estimate over 30 days
  }
}
