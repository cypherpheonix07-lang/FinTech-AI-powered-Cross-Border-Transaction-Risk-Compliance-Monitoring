"use strict";
/**
 * PATHGUARD PILLAR 6: CROSS-BORDER LIQUIDITY
 * FX Rate Provider — Real-time mock discovery for major institution-grade
 * currency corridors.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fxRateProvider = exports.FXRateProvider = void 0;
class FXRateProvider {
    static instance;
    rates = new Map();
    constructor() {
        this.refreshRates();
    }
    static getInstance() {
        if (!FXRateProvider.instance) {
            FXRateProvider.instance = new FXRateProvider();
        }
        return FXRateProvider.instance;
    }
    /**
     * Simulate real-time rate volatility.
     */
    refreshRates() {
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
    getRate(from, to) {
        const direct = this.rates.get(`${from}/${to}`);
        if (direct)
            return direct;
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
exports.FXRateProvider = FXRateProvider;
exports.fxRateProvider = FXRateProvider.getInstance();
