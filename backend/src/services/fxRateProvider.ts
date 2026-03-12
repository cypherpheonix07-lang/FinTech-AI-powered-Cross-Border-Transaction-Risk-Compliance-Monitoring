/**
 * PATHGUARD PILLAR 6: CROSS-BORDER LIQUIDITY
 * FX Rate Provider — Real-time mock discovery for major institution-grade
 * currency corridors.
 */

export interface ExchangeRate {
  pair: string; // e.g., 'USD/AED'
  rate: number;
  spread: number;
  liquidityDepth: number; // 0-1 (1 = max liquidity)
  lastUpdated: string;
}

export class FXRateProvider {
  private static instance: FXRateProvider;
  private rates: Map<string, ExchangeRate> = new Map();

  private constructor() {
    this.refreshRates();
  }

  public static getInstance(): FXRateProvider {
    if (!FXRateProvider.instance) {
      FXRateProvider.instance = new FXRateProvider();
    }
    return FXRateProvider.instance;
  }

  /**
   * Simulate real-time rate volatility.
   */
  refreshRates(): void {
    const pairs = [
      { pair: 'USD/AED', base: 3.67, volatility: 0.001 },
      { pair: 'USD/EUR', base: 0.92, volatility: 0.005 },
      { pair: 'USD/GBP', base: 0.78, volatility: 0.004 },
      { pair: 'EUR/AED', base: 4.01, volatility: 0.01 },
      { pair: 'GBP/AED', base: 4.65, volatility: 0.01 }
    ];

    pairs.forEach(p => {
      const fluctuation = (Math.random() - 0.5) * p.volatility;
      this.rates.set(p.pair, {
        pair: p.pair,
        rate: p.base + fluctuation,
        spread: 0.0002, // 2 pips institutional spread
        liquidityDepth: 0.8 + Math.random() * 0.2,
        lastUpdated: new Date().toISOString()
      });
    });
  }

  /**
   * Get the current rate for a specific pair.
   */
  getRate(from: string, to: string): ExchangeRate | undefined {
    const direct = this.rates.get(`${from}/${to}`);
    if (direct) return direct;

    // Inverse logic
    const inverse = this.rates.get(`${to}/${from}`);
    if (inverse) {
      return {
        pair: `${from}/${to}`,
        rate: 1 / inverse.rate,
        spread: inverse.spread,
        liquidityDepth: inverse.liquidityDepth,
        lastUpdated: inverse.lastUpdated
      };
    }

    return undefined;
  }
}

export const fxRateProvider = FXRateProvider.getInstance();
