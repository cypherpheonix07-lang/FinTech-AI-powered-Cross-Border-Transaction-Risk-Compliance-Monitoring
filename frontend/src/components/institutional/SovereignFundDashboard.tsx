import React, { useState, useEffect } from 'react';
import { Globe2, Anchor, Filter, TrendingUp, BarChart3 } from 'lucide-react';

const SovereignFundDashboard = () => {
  const [allocation, setAllocation] = useState<any>(null);

  useEffect(() => {
    // Mocking Python SovereignWealthManager response
    setAllocation({
      fund_id: "NORWAY_SWF_01",
      thesis: "Global Renewables Push",
      total_authorized_usd: 500000000.0,
      total_deployed_usd: 300000000.0,
      capital_unallocated_usd: 200000000.0,
      portfolio_weighted_esg_score: 93.0,
      tranches: [
        {
          project_id: "PROJ_WIND_NORTH_SEA",
          amount_allocated_usd: 250000000.0,
          esg_rating_achieved: 92,
          geopolitical_exposure: "EU_Allied",
          status: "FUNDS_LOCKED_IN_ESCROW"
        },
        {
          project_id: "PROJ_AFRICA_SOLAR",
          amount_allocated_usd: 50000000.0,
          esg_rating_achieved: 98,
          geopolitical_exposure: "Neutral",
          status: "FUNDS_LOCKED_IN_ESCROW"
        }
      ]
    });
  }, []);

  if (!allocation) return null;

  const deployedPct = (allocation.total_deployed_usd / allocation.total_authorized_usd) * 100;

  return (
    <div className="bg-[#0f172a] border border-sky-900/40 rounded-xl p-6 text-slate-200 shadow-2xl font-sans relative">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-sky-900/50">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-sky-400" />
            Sovereign Wealth & Institutional Deployment
          </h2>
          <p className="text-slate-400 mt-1">Macro-Capital Tranching & ESG Tracking</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-slate-700">
             <Anchor className="w-4 h-4 text-sky-500" />
             {allocation.fund_id}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-slate-900/80 rounded-xl p-6 border border-slate-700/50">
          <div className="flex justify-between items-end mb-4">
             <div>
               <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Fund Deployment Thesis</p>
               <h3 className="text-xl font-bold text-sky-300">{allocation.thesis}</h3>
             </div>
             <div className="text-right">
               <p className="text-xs text-emerald-500 font-bold mb-1">Minimum ESG Compliance: 90</p>
               <p className="text-3xl font-black font-mono text-white">
                 <span className="text-emerald-400">{allocation.portfolio_weighted_esg_score}</span><span className="text-lg text-slate-500">/100</span>
               </p>
               <p className="text-[10px] uppercase tracking-wider text-slate-500">Fund Weighted ESG</p>
             </div>
          </div>

          <div className="mt-8">
             <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Capital Deployed (${(allocation.total_deployed_usd / 1000000).toFixed(0)}M)</span>
                <span className="text-slate-500">Total Authorized (${(allocation.total_authorized_usd / 1000000).toFixed(0)}M)</span>
             </div>
             <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div className="h-full bg-gradient-to-r from-sky-600 to-sky-400 relative" style={{ width: `${deployedPct}%` }}>
                  {/* animated stripe overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
                </div>
             </div>
             <p className="text-xs text-sky-400 mt-2 text-right">{deployedPct.toFixed(1)}% Allocated</p>
          </div>
        </div>

         <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-700/50 flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Global Macro Filters Active
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span className="text-sm text-slate-400">Geopolitical Mandate</span>
                 <span className="font-mono text-emerald-400 text-xs px-2 py-0.5 bg-emerald-900/20 border border-emerald-500/30 rounded">Neutral + Allied</span>
               </div>
               <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span className="text-sm text-slate-400">Risk Tranching</span>
                 <span className="font-mono text-sky-400 text-xs">Senior Debt / Equity</span>
               </div>
               <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span className="text-sm text-slate-400">Target IRR</span>
                 <span className="font-mono text-white text-xs">12% - 14%</span>
               </div>
            </div>
         </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Active Tranches
        </h3>
        
        {allocation.tranches.map((tranche: any, idx: number) => (
          <div key={idx} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex items-center justify-between hover:bg-slate-800 transition-colors">
             <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-sky-900/30 border ${tranche.esg_rating_achieved >= 95 ? 'border-emerald-500/50 text-emerald-400' : 'border-sky-500/50 text-sky-400'}`}>
                   <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                   <p className="font-bold text-slate-200">{tranche.project_id.replace(/_/g, ' ')}</p>
                   <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-mono uppercase bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
                        ESG {tranche.esg_rating_achieved}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${
                        tranche.geopolitical_exposure === 'Neutral' ? 'text-amber-500' : 'text-blue-400'
                      }`}>
                        Geo: {tranche.geopolitical_exposure.replace('_', ' ')}
                      </span>
                   </div>
                </div>
             </div>
             
             <div className="text-right">
               <p className="font-mono font-bold text-white text-lg">
                 ${(tranche.amount_allocated_usd / 1000000).toFixed(1)}M
               </p>
               <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{tranche.status.replace(/_/g, ' ')}</p>
             </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default SovereignFundDashboard;
