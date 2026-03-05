import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ShieldCheck, Zap, ArrowRightLeft } from 'lucide-react';

const AlgoTerminal = () => {
  const [algoPlan, setAlgoPlan] = useState<any>(null);
  const [arbSignal, setArbSignal] = useState<any>(null);

  useEffect(() => {
    // Mocking Python AlgorithmicTradingEngine responses
    setAlgoPlan({
      order_details: { ticker: "TSLA", side: "BUY", amount_usd: 150000000.0, horizon_hrs: 2 },
      recommended_strategy: "Dark_Pool_Sweep",
      strategy_rationale: "Order size too large for lit markets. Sweeping alternate liquidity venues to prevent massive slippage.",
      estimated_market_impact_bps: 8.22,
      estimated_savings_vs_market_usd: 287500.0,
      routing_venues: ["Dark_Pool_Alpha", "Dark_Pool_Omega", "Internal_Crossing_Network"]
    });

    setArbSignal({
      pair: "KO/PEP",
      current_z_score: 2.85,
      trade_signal: "SHORT KO, LONG PEP",
      model_confidence: 92.5,
      mean_reversion_half_life_days: 14.2
    });
  }, []);

  if (!algoPlan || !arbSignal) return null;

  return (
    <div className="bg-[#050505] border border-blue-900/40 rounded-xl p-6 text-slate-200 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Grid background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-blue-900/50">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-blue-500" />
            HFT & Algorithmic Terminal
          </h2>
          <p className="text-blue-400 mt-1 font-mono text-sm opacity-80">Institutional Execution & Smart Order Routing</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-2 px-3 py-1 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 rounded text-xs font-mono">
            <Activity className="w-3 h-3 animate-pulse" /> SYSTEM ONLINE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Execution Strategy */}
        <div className="lg:col-span-2 bg-[#0a0f1a] rounded-xl p-6 border border-blue-900/50 shadow-[0_0_15px_rgba(30,58,138,0.2)]">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 fill-blue-500" /> Smart Order Routing (Block Trade)
          </h3>
          
          <div className="flex items-end justify-between mb-6 pb-6 border-b border-slate-800">
            <div>
              <p className="text-slate-400 text-xs mb-1">Order Details</p>
              <p className="text-2xl font-mono text-white">
                <span className="text-emerald-400">{algoPlan.order_details.side}</span> ${(algoPlan.order_details.amount_usd / 1000000).toFixed(1)}M {algoPlan.order_details.ticker}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs mb-1">Time Horizon</p>
              <p className="text-xl font-mono text-amber-400">{algoPlan.order_details.horizon_hrs} Hours</p>
            </div>
          </div>

          <div className="bg-blue-950/30 rounded-lg p-4 border border-blue-900/50 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-300">Selected Algorithm</span>
              <span className="font-bold text-fuchsia-400 font-mono text-lg">{algoPlan.recommended_strategy.replace(/_/g, ' ')}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{algoPlan.strategy_rationale}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900/80 p-4 rounded border border-slate-800">
                <p className="text-slate-500 text-xs mb-1">Estimated Slippage Avoided</p>
                <p className="text-emerald-400 font-mono text-lg">${algoPlan.estimated_savings_vs_market_usd.toLocaleString()}</p>
             </div>
             <div className="bg-slate-900/80 p-4 rounded border border-slate-800">
                <p className="text-slate-500 text-xs mb-1">Market Impact (bps)</p>
                <p className="text-white font-mono text-lg">{algoPlan.estimated_market_impact_bps} bps</p>
             </div>
          </div>

          <div className="mt-6">
            <p className="text-slate-500 text-xs uppercase mb-3 text-center">Execution Venues</p>
            <div className="flex justify-center gap-3">
              {algoPlan.routing_venues.map((venue: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-slate-800 text-blue-300 rounded border border-slate-700 font-mono text-xs">
                  {venue.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Statistical Arbitrage */}
        <div className="bg-[#0a0f1a] rounded-xl p-6 border border-blue-900/50 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" /> Stat Arb Scanner
            </h3>
            
            <div className="mb-6 text-center">
              <p className="text-slate-500 text-xs mb-2">Target Pair Cointegration</p>
              <div className="inline-block p-4 bg-slate-900 rounded-full border-4 border-slate-800 mb-2">
                 <p className="text-2xl font-black text-white font-mono">{arbSignal.pair}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 text-sm">Z-Score Divergence</span>
                <span className="font-mono text-amber-500 font-bold">{arbSignal.current_z_score}σ</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 text-sm">Mean Reversion (HL)</span>
                <span className="font-mono text-white">{arbSignal.mean_reversion_half_life_days} Days</span>
              </div>
               <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400 text-sm">Model Confidence</span>
                <span className="font-mono text-emerald-400">{arbSignal.model_confidence}%</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs text-slate-500 text-center mb-2 uppercase">Execution Signal</p>
            <div className={`p-4 rounded-lg border text-center font-bold tracking-widest ${
               arbSignal.trade_signal.includes('SHORT') ? 'bg-rose-900/20 border-rose-500/50 text-rose-400' : 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400'
            }`}>
              {arbSignal.trade_signal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgoTerminal;
