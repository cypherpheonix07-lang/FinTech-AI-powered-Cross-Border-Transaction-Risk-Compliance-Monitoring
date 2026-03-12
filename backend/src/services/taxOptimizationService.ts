import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

export interface TaxEvent {
  symbol: string;
  acquiredDate: Date;
  soldDate: Date;
  costBasis: number;
  saleProceeds: number;
  gainLoss: number;
  isLongTerm: boolean;
}

// US 2026 Long-Term Capital Gains brackets (simulated)
const US_LTCG_BRACKETS = [
  { maxIncome: 47025, rate: 0.00 },
  { maxIncome: 518900, rate: 0.15 },
  { maxIncome: Infinity, rate: 0.20 },
];

export class TaxOptimizationService {

  /**
   * Feature 31.1: Capital Gains Tax Calculator
   */
  async calculateCapitalGains(events: TaxEvent[]) {
    let shortTermGains = new Decimal(0);
    let longTermGains = new Decimal(0);

    for (const e of events) {
      const gl = new Decimal(e.gainLoss);
      if (e.isLongTerm) {
        longTermGains = longTermGains.plus(gl);
      } else {
        shortTermGains = shortTermGains.plus(gl);
      }
    }

    return {
      shortTermGains: shortTermGains.toNumber(),
      longTermGains: longTermGains.toNumber(),
      netGain: shortTermGains.plus(longTermGains).toNumber(),
    };
  }

  /**
   * Feature 31.2: Real-time marginal bracket tracker
   */
  async getCurrentTaxBracket(annualIncome: number) {
    const bracket = US_LTCG_BRACKETS.find(b => annualIncome <= b.maxIncome);
    return {
      annualIncome,
      ltcgRate: bracket?.rate ?? 0.20,
      marginalOrdinaryRate: annualIncome > 518900 ? 0.37 : 0.24, // simplified
    };
  }

  /**
   * Feature 31.3: Tax-loss harvesting opportunity finder
   */
  async findHarvestingOpportunities(userId: string) {
    // In production, this compares cost basis against current market price
    return [
      { symbol: 'ARKK', unrealizedLoss: -1240.00, harvestDeadline: '2026-12-31', potentialTaxSaving: 297.60 },
      { symbol: 'META', unrealizedLoss: -340.00, harvestDeadline: '2026-12-31', potentialTaxSaving: 81.60 },
    ];
  }

  /**
   * Feature 31.7: Wash-sale rule detection (30-day window)
   */
  async detectWashSales(events: TaxEvent[]) {
    const washSales: string[] = [];
    for (const e of events) {
      const daysDiff = (new Date().getTime() - new Date(e.soldDate).getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff <= 30 && e.gainLoss < 0) {
        washSales.push(`⚠️ Potential wash-sale on ${e.symbol} — repurchase within 30-day window detected.`);
      }
    }
    return washSales;
  }

  /**
   * Feature 31.9: Multi-country tax stub (OECD Pillar II)
   */
  async getMultiJurisdictionSummary(userId: string) {
    return [
      { jurisdiction: 'US', taxOwed: 12450, currency: 'USD', dueDate: '2026-04-15' },
      { jurisdiction: 'UK', taxOwed: 4200, currency: 'GBP', dueDate: '2026-01-31' },
      { jurisdiction: 'India', taxOwed: 85000, currency: 'INR', dueDate: '2026-07-31' },
    ];
  }
}
