import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingDown, DollarSign, Wallet, AlertTriangle } from 'lucide-react';

const InflationShield = () => {
  const [shieldStatus, setShieldStatus] = useState<any>(null);

  useEffect(() => {
    // Mocking Python InflationShield response (e.g. Argentina Peso Crisis simulation)
    setShieldStatus({
      user_id: "user_ars_992",
      tracked_currency: "ARS",
      current_annualized_inflation: 224.5,
      user_threshold_limit: 50.0,
      system_status: "ALGORITHMIC_CONVERSION_EXECUTED",
      execution_data: {
        converted_to: "PathGuard_Defensive_Basket_v1",
        allocations: {
          USDC_Stablecoin: 5000000.0,
          PAXG_Gold_Token: 3000000.0,
          Wrapped_Bitcoin: 2000000.0
        },
        conversion_fee_pct: 0.5,
        net_value_secured_usd: 9950000.0
      },
      last_checked: new Date().toISOString()
    });
  }, []);

  if (!shieldStatus) return null;

  return (
    <div className="bg-[#1e1e1e] border border-rose-900/50 rounded-xl p-6 text-slate-200 shadow-2xl font-sans relative overflow-hidden">
      
      {/* Background warning pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #e11d48 0, #e11d48 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <TrendingDown className="w-8 h-8 text-rose-500" />
            Hyper-Inflation Defender
          </h2>
          <p className="text-slate-400 mt-1">Algorithmic Fiat Depreciation Shielding</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Monitored Fiat: {shieldStatus.tracked_currency}</p>
          <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-900/50 px-3 py-1.5 rounded-lg">
             <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
             <span className="font-mono font-bold text-rose-400">{shieldStatus.current_annualized_inflation}% Annual Inflation</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Trigger Analysis */}
        <div className="bg-black/50 rounded-xl p-6 border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Trigger Conditions Config
          </h3>

          <div className="mb-8">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Safety Threshold</span>
              <span className="text-rose-500 font-bold uppercase tracking-wider">Current Market Condition</span>
            </div>
            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
               {/* Threshold Marker */}
               <div className="absolute top-0 bottom-0 border-r-2 border-emerald-500 z-10" style={{ width: `${(shieldStatus.user_threshold_limit / 300) * 100}%`}}></div>
               {/* Current Inflation Level */}
               <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose-600 to-rose-400" style={{ width: `${Math.min(100, (shieldStatus.current_annualized_inflation / 300) * 100)}%`}}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-mono">
               <span className="text-emerald-500">{shieldStatus.user_threshold_limit}% trigger limit</span>
               <span className="text-rose-400">Critical: {(shieldStatus.current_annualized_inflation).toFixed(1)}%</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-lg text-center">
             <p className="text-emerald-500 font-bold tracking-widest text-lg mb-1">
               {shieldStatus.system_status.replace(/_/g, ' ')}
             </p>
             <p className="text-xs text-slate-400">
               System detected severe purchasing power collapse and automatically swapped assets to a hard-money basket to preserve wealth.
             </p>
          </div>
        </div>

        {/* Execution Basket */}
        <div className="bg-black/50 rounded-xl p-6 border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
             <Wallet className="w-4 h-4" /> Defensive Asset Target
          </h3>

          <div className="text-center mb-6 border-b border-slate-800 pb-6">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Net Value Secured</p>
            <p className="text-4xl font-black font-mono text-emerald-400 flex items-center justify-center gap-1">
              <DollarSign className="w-6 h-6 text-emerald-500/50" />
              {(shieldStatus.execution_data.net_value_secured_usd).toLocaleString()}
            </p>
          </div>

          <div className="space-y-3">
             <p className="text-[10px] text-slate-500 uppercase tracking-wider ml-1">Composition: {shieldStatus.execution_data.converted_to}</p>
             
             {Object.entries(shieldStatus.execution_data.allocations).map(([asset, amount]: [string, any], idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/50 rounded border border-slate-800">
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${asset.includes('USDC') ? 'bg-blue-500' : asset.includes('Gold') ? 'bg-amber-400' : 'bg-orange-500'}`}></div>
                      <span className="font-mono text-sm text-slate-300">{asset.replace(/_/g, ' ')}</span>
                   </div>
                   <span className="font-mono font-bold text-white text-sm">
                     ${(amount).toLocaleString()}
                   </span>
                </div>
             ))}
          </div>

          <p className="text-[10px] text-slate-600 text-center mt-4">Automated conversion fee applied: {shieldStatus.execution_data.conversion_fee_pct}%</p>
        </div>

      </div>
    </div>
  );
};

export default InflationShield;
