import { prisma } from '../../config/database';
import { Decimal } from '@prisma/client/runtime/library';

export class RiskService {
  static async getSummary(tenantId: string) {
    const transactions = await prisma.transaction.findMany({
      where: { tenantId },
      select: { riskScore: true, amount: true, status: true, senderCountry: true, receiverCountry: true }
    });

    const totalVolume = transactions.reduce((acc, t) => acc.plus(t.amount), new Decimal(0));
    const avgRiskScore = transactions.length 
      ? transactions.reduce((acc, t) => acc + t.riskScore, 0) / transactions.length 
      : 0;
    
    const flaggedCount = transactions.filter(t => t.status === 'FLAGGED').length;

    return {
      totalVolume,
      avgRiskScore,
      flaggedCount,
      count: transactions.length,
    };
  }

  static async getCorridors(tenantId: string) {
    // Basic aggregation for corridors
    const txs = await prisma.transaction.findMany({ where: { tenantId } });
    const corridorMap = new Map();

    txs.forEach(t => {
      const key = `${t.senderCountry} -> ${t.receiverCountry}`;
      if (!corridorMap.has(key)) {
        corridorMap.set(key, { name: key, volume: 0, avgRisk: 0, count: 0 });
      }
      const val = corridorMap.get(key);
      val.volume = new Decimal(val.volume).plus(t.amount);
      val.avgRisk += t.riskScore;
      val.count += 1;
    });

    return Array.from(corridorMap.values()).map(v => ({
      ...v,
      avgRisk: v.avgRisk / v.count
    }));
  }
}
