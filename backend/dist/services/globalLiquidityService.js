"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalLiquidityService = exports.GlobalLiquidityService = void 0;
const fxRateProvider_1 = require("./fxRateProvider");
class GlobalLiquidityService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!GlobalLiquidityService.instance) {
            GlobalLiquidityService.instance = new GlobalLiquidityService();
        }
        return GlobalLiquidityService.instance;
    }
    /**
     * Find the optimal liquidity route between two currencies.
     */
    async findOptimalRoute(from, to, amount) {
        console.log(`[Pillar-6] Calculating optimal FX route: ${from} -> ${to} for amount ${amount}`);
        // Auto-refresh rates for the latest data
        fxRateProvider_1.fxRateProvider.refreshRates();
        const directRate = fxRateProvider_1.fxRateProvider.getRate(from, to);
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
            const rate1 = fxRateProvider_1.fxRateProvider.getRate(from, 'USD');
            const rate2 = fxRateProvider_1.fxRateProvider.getRate('USD', to);
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
    calculateSlippage(rate, amount) {
        const sensitivity = 0.000001; // Depth sensitivity
        return (amount * sensitivity) / rate.liquidityDepth;
    }
}
exports.GlobalLiquidityService = GlobalLiquidityService;
exports.globalLiquidityService = GlobalLiquidityService.getInstance();
