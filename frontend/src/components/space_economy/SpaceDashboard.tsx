import React, { useState, useEffect } from 'react';
import { Rocket, Globe, ShieldAlert, TrendingUp, Zap } from 'lucide-react';

const SpaceDashboard = () => {
  const [spaceIndex, setSpaceIndex] = useState<any>(null);
  const [insuranceQuote, setInsuranceQuote] = useState<any>(null);

  useEffect(() => {
    // Mocking the Python OrbitalFinanceManager responses
    setSpaceIndex({
      index_name: "PathGuard_Space_Tracker_v1",
      total_aum_millions: 450.2,
      ytd_return_pct: 14.5,
      top_holdings: [
        { ticker: "ASTS", weight_pct: 12.5 },
        { ticker: "RKLB", weight_pct: 10.2 },
        { ticker: "PL", weight_pct: 8.4 },
        { ticker: "PRIV_SPCX", weight_pct: 25.0 }
      ]
    });

    setInsuranceQuote({
      payload_value_usd: 50000000.0,
      premium_rate: 0.0274,
      premium_cost_usd: 1370000.0,
      debris_risk_factor: 0.0024,
      provider: "SpaceX",
      orbit_type: "LEO"
    });
  }, []);

  if (!spaceIndex || !insuranceQuote) return null;

  return (
    <div className="bg-[#0b1121] border border-blue-900/40 rounded-xl p-6 text-slate-200 relative overflow-hidden font-sans">
      {/* Starfield background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Rocket className="w-8 h-8 text-blue-400" />
              Orbital Economy Tracker
            </h2>
            <p className="text-slate-400 mt-1">Satellite Finance & Space Index Funds</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/30 font-mono text-sm">
            <Globe className="w-4 h-4" />
             LEO Monitoring Active
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Space Index Fund Section */}
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                {spaceIndex.index_name}
              </h3>
              <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded text-sm">
                +{spaceIndex.ytd_return_pct}% YTD
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-slate-400">Assets Under Management</p>
              <p className="text-2xl font-mono text-white">${spaceIndex.total_aum_millions}M</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Holdings</p>
              {spaceIndex.top_holdings.map((holding: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700">
                  <span className="font-mono text-blue-300 font-bold">{holding.ticker}</span>
                  <div className="flex items-center gap-3 w-1/2">
                    <div className="w-full bg-slate-900 rounded-full h-1.5 border border-slate-700">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${holding.weight_pct}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono w-10 text-right">{holding.weight_pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Satellite Launch Insurance Section */}
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-700/50 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-slate-200 flex items-center gap-2 mb-4">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                Launch Insurance Calculator
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Payload Value</p>
                  <p className="text-lg font-mono text-white">${(insuranceQuote.payload_value_usd / 1000000).toFixed(1)}M</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Target Orbit</p>
                  <p className="text-lg font-mono text-white flex items-center gap-2">
                    {insuranceQuote.orbit_type} <span className="text-xs text-slate-500 border border-slate-600 px-1 rounded bg-slate-800 tracking-widest">{insuranceQuote.provider}</span>
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/10 border border-amber-500/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Estimated Premium Quote</span>
                  <span className="font-mono text-lg text-amber-400 font-bold">
                    ${(insuranceQuote.premium_cost_usd).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Base Rate + Debris Risk Factor ({(insuranceQuote.debris_risk_factor * 100).toFixed(2)}%)</span>
                  <span>Rate: {(insuranceQuote.premium_rate * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 transition-all">
              <Zap className="w-4 h-4 fill-white" />
              Bind Launch Coverage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDashboard;
