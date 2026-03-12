import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

export interface LoanTerms {
  principal: number;
  apr: number;
  termMonths: number;
  monthlyPayment: number;
}

export class CreditEngineService {
  /**
   * Feature 11.2: AI-driven credit scoring (Internal)
   */
  async calculateInternalCreditScore(userId: string): Promise<number> {
    const transactions = await prisma.transaction.findMany({
      where: { account: { tenant: { users: { some: { id: userId } } } } },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    // Simulated scoring logic
    const totalOutflow = transactions.reduce((sum, t) => sum.plus(t.amount.abs()), new Decimal(0));
    const anomalyCount = transactions.filter(t => t.anomalyFlag).length;
    
    let score = 700; // Base score
    if (anomalyCount > 5) score -= 100;
    if (totalOutflow.toNumber() > 10000) score += 50;
    
    return Math.min(850, Math.max(300, score));
  }

  /**
   * Feature 11.5: Instant loan origination
   */
  async originateLoan(userId: string, amount: number, termMonths: number): Promise<LoanTerms> {
    const score = await this.calculateInternalCreditScore(userId);
    
    // Risk-based APR
    let apr = 0.15; // 15% base
    if (score > 750) apr = 0.08;
    else if (score > 650) apr = 0.12;

    const monthlyRate = apr / 12;
    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));

    console.log(`Originating loan of $${amount} for user ${userId} at ${apr * 100}% APR`);
    
    return {
      principal: amount,
      apr,
      termMonths,
      monthlyPayment: Number(monthlyPayment.toFixed(2))
    };
  }

  /**
   * Feature 11.7: Automated repayment scheduler
   */
  async scheduleRepayments(accountId: string, loanId: string, payment: number) {
    console.log(`Scheduling recurring repayment of $${payment} for loan ${loanId} from account ${accountId}`);
    // Future: Create cron jobs or ledger-based scheduled entries
    return { status: 'SCHEDULED', nextDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
  }
}
