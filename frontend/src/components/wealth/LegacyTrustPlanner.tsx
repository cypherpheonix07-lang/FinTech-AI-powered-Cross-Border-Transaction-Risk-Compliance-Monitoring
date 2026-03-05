import React, { useState, useEffect } from 'react';
import { ScrollText, ActivitySquare, ShieldAlert, HeartPulse, Clock } from 'lucide-react';

const LegacyTrustPlanner = () => {
  const [trustStatus, setTrustStatus] = useState<any>(null);

  useEffect(() => {
    // Mocking Python LegacyTrustManager response
    setTrustStatus({
      trust_id: "TRUST_OMEGA_77",
      creator: "HNW_Client_941",
      proof_of_life_status: "NOMINAL",
      last_ping_received_days_ago: 12,
      critical_threshold_days: 30,
      days_until_execution: 18,
      next_required_action: "Client must authenticate via Biometrics/Hardware Key",
      beneficiaries: [
        { name: "Alice (Daughter)", percentage: 40, age: 22, asset_preference: "Bitcoin_Multisig", lock: "Vested over 3 years" },
        { name: "Bob (Son)", percentage: 40, age: 28, asset_preference: "Vanguard_Index_Tokens", lock: "Immediate" },
        { name: "XYZ Foundation", percentage: 20, age: 99, asset_preference: "USDC_Stablecoin", lock: "Immediate" }
      ]
    });
  }, []);

  if (!trustStatus) return null;

  const pingPercentage = Math.min(100, (trustStatus.last_ping_received_days_ago / trustStatus.critical_threshold_days) * 100);

  return (
    <div className="bg-[#1a1a24] border border-amber-900/30 rounded-xl p-6 text-slate-200 shadow-2xl font-sans">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ScrollText className="w-8 h-8 text-amber-500" />
            Legacy & Succession Planner
          </h2>
          <p className="text-slate-400 mt-1">Smart Contract Multi-Sig Trusts & Dead-Man Switch</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-900/20 text-amber-400 border border-amber-500/30 font-mono text-sm rounded">
                ID: {trustStatus.trust_id}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Heartbeat Monitor */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">
             <ActivitySquare className="w-4 h-4" /> Proof of Life Monitor
          </div>

          <div className="relative mt-8 mb-6">
            <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center">
              <HeartPulse className={`w-12 h-12 ${pingPercentage < 50 ? 'text-emerald-500 animate-pulse' : pingPercentage < 80 ? 'text-amber-500 animate-bounce' : 'text-rose-500 animate-[ping_1s_infinite]'}`} />
            </div>
            {/* Circular progress indicator simulation */}
            <svg className="absolute top-0 left-0 w-32 h-32 -rotate-90 pointer-events-none">
              <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" 
                className={pingPercentage < 50 ? 'text-emerald-500' : pingPercentage < 80 ? 'text-amber-500' : 'text-rose-500'}
                strokeDasharray={`${pingPercentage * 3.51} 351`} />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {trustStatus.last_ping_received_days_ago} Days Since Last Ping
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Threshold: {trustStatus.critical_threshold_days} Days. Smart contract executes in <strong className="text-amber-400">{trustStatus.days_until_execution} days</strong> if no ping is received.
          </p>

          <button className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all shadow-lg flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" /> Authenticate Life Ping Now
          </button>
        </div>

        {/* Beneficiaries logic */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
           <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
             <Clock className="w-4 h-4" /> Distribution Logic Queue
           </h3>
           
           <div className="space-y-4">
             {trustStatus.beneficiaries.map((ben: any, idx: number) => (
               <div key={idx} className="p-4 bg-slate-800/80 border border-slate-700 rounded-lg">
                 <div className="flex justify-between items-start mb-3">
                   <h4 className="font-bold text-slate-200">{ben.name}</h4>
                   <span className="text-xl font-black text-amber-500 font-mono">{ben.percentage}%</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-700/50">
                   <div>
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Asset Target</p>
                     <p className="text-xs font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded inline-block border border-slate-800">
                       {ben.asset_preference.replace('_', ' ')}
                     </p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Smart Lock</p>
                     <p className={`text-xs font-medium ${ben.lock === 'Immediate' ? 'text-emerald-400' : 'text-amber-400'}`}>
                       {ben.lock}
                     </p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default LegacyTrustPlanner;
