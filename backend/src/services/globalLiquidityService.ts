import { fxRateProvider, ExchangeRate } from './fxRateProvider';

/**
 * PATHGUARD PILLAR 6: CROSS-BORDER LIQUIDITY
 * Global Liquidity Service — Core FX routing and liquidity aggregation
 * to find the optimal path for cross-border transfers.
 */

export interface LiquidityRoute {
  path: string[];
  estimatedRate: number;
  totalFees: number;
  liquidityProvider: string;
  isAtomicOptionAvailable: boolean;
}

export class GlobalLiquidityService {
  private static instance: GlobalLiquidityService;

  private constructor() {}

  public static getInstance(): GlobalLiquidityService {
    if (!GlobalLiquidityService.instance) {
      GlobalLiquidityService.instance = new GlobalLiquidityService();
    }
    return GlobalLiquidityService.instance;
  }

  /**
   * Find the optimal liquidity route between two currencies.
   */
  async findOptimalRoute(from: string, to: string, amount: number): Promise<LiquidityRoute | string> {
    console.log(`[Pillar-6] Calculating optimal FX route: ${from} -> ${to} for amount ${amount}`);
    
    // Auto-refresh rates for the latest data
    fxRateProvider.refreshRates();

    const directRate = fxRateProvider.getRate(from, to);
    
    if (directRate) {
      // Logic for choosing between different stubs (Legacy vs. Atomic)
      const isHighUrgency = amount > 100000; // Simplified urgency logic
      
      return {
        path: [from, to],
        estimatedRate: directRate.rate,
        totalFees: amount * 0.0001, // 1 basis point institutional fee
        liquidityProvider: 'Institutional_Pool_Alpha',
        isAtomicOptionAvailable: directRate.liquidityDepth > 0.9 || isHighUrgency
      };
    }

    // Secondary routing via USD (Synthetics)
    if (from !== 'USD' && to !== 'USD') {
      const rate1 = fxRateProvider.getRate(from, 'USD');
      const rate2 = fxRateProvider.getRate('USD', to);
      
      if (rate1 && rate2) {
        return {
          path: [from, 'USD', to],
          estimatedRate: rate1.rate * rate2.rate,
          totalFees: amount * 0.0002, // Higher fee for multi-hop
          liquidityProvider: 'Global_Aggregator_Node',
          isAtomicOptionAvailable: false
        };
      }
    }

    return 'ERROR: LIQUIDITY_CORRIDOR_NOT_FOUND';
  }

  /**
   * Calculate slippage based on depth.
   */
  calculateSlippage(rate: ExchangeRate, amount: number): number {
    const sensitivity = 0.000001; // Depth sensitivity
    return (amount * sensitivity) / rate.liquidityDepth;
  }
}

export const globalLiquidityService = GlobalLiquidityService.getInstance();
