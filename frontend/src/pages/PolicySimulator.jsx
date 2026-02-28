import React, { useState } from 'react';
import { 
  Play, RotateCcw, ShieldAlert, BarChart2, 
  Settings2, Database, Zap, ArrowRight 
} from 'lucide-react';

/**
 * PolicySimulator.jsx
 * Interactive backtesting and impact analysis for compliance rules.
 */
const PolicySimulator = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState(null);

  const startSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setResult({
        alerts: 482,
        reduction: '-18%',
        fpRate: '12%',
        riskLeak: '0.01%'
      });
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-8 py-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-slate-100 flex items-center italic tracking-tighter uppercase">
             <Zap className="text-primary mr-3" size={32} />
             Policy Backtest Lab
           </h1>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1 ml-1">Simulate Regulatory Updates on Historical Corpora</p>
        </div>
        <button 
          onClick={startSimulation}
          disabled={isSimulating}
          className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-3xl font-black flex items-center shadow-2xl shadow-primary/30 transition-all uppercase text-xs tracking-widest"
        >
          {isSimulating ? <RotateCcw size={16} className="mr-2 animate-spin" /> : <Play size={16} className="mr-2" />}
          Execute Simulation 
        </button>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
         {/* Configuration Sidebar */}
         <div className="col-span-4 bg-dark-800 border-2 border-dark-600 rounded-[3rem] p-10 space-y-8 flex flex-col shadow-2xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center">
               <Settings2 size={14} className="mr-2" /> Global Parameter Overrides
            </h3>
            
            <div className="space-y-6">
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                     <span>Alert Threshold (USD)</span>
                     <span className="text-primary">$50,000</span>
                  </div>
                  <input type="range" className="w-full accent-primary h-1 bg-dark-900 rounded-full" />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                     <span>Max Hub Velocity</span>
                     <span className="text-primary">12 / Hour</span>
                  </div>
                  <input type="range" className="w-full accent-primary h-1 bg-dark-900 rounded-full" />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dataset Slice</label>
                  <select className="w-full bg-dark-900 border border-dark-700 p-4 rounded-2xl text-xs text-slate-300 outline-none">
                     <option>Q1 2026 Correspondent Data</option>
                     <option>High-Risk Corridors (EMEA)</option>
                     <option>Synthetic Mule Tests</option>
                  </select>
               </div>
            </div>

            <div className="mt-auto bg-dark-900/50 border border-dark-700 p-6 rounded-[2rem] space-y-4">
               <div className="flex items-center space-x-3 text-primary">
                  <Database size={20} />
                  <span className="text-xs font-black uppercase tracking-tighter italic text-slate-200">Historical Corpus Active</span>
               </div>
               <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                  Backtesting against 1.2M records. Simulations are sandboxed and do not persist to the live governance ledger.
               </p>
            </div>
         </div>

         {/* Simulation Results Area */}
         <div className="col-span-8 space-y-8 h-full flex flex-col">
            <div className="grid grid-cols-2 gap-8">
               {[
                 { label: 'Delta Alerts', value: result?.alerts || '---', trend: result?.reduction || '0%', icon: ShieldAlert },
                 { label: 'False Positives', value: result?.fpRate || '---', trend: 'Predicted', icon: BarChart2 }
               ].map((stat, i) => (
                 <div key={i} className="bg-dark-800 border-2 border-dark-600 p-8 rounded-[2.5rem] shadow-xl flex items-center justify-between group">
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                       <div className="flex items-baseline space-x-2">
                          <span className="text-3xl font-black text-slate-100">{stat.value}</span>
                          <span className="text-xs font-bold text-primary">{stat.trend}</span>
                       </div>
                    </div>
                    <div className="p-4 bg-dark-900 rounded-2xl text-slate-600 group-hover:text-primary transition-colors">
                       <stat.icon size={28} />
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex-1 bg-dark-800 border-2 border-dark-600 rounded-[3rem] p-10 shadow-3xl flex flex-col relative overflow-hidden">
               {!result && !isSimulating && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 opacity-30">
                    <Play size={64} className="text-dark-600" />
                    <p className="text-xs font-black text-slate-100 uppercase italic">Awaiting Input Parameters</p>
                 </div>
               )}
               
               {isSimulating && (
                 <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-2xl shadow-primary/20" />
                    <div className="text-center">
                       <p className="text-xs font-black text-slate-100 uppercase italic tracking-widest">Iterating Decision Tree</p>
                       <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Cross-referencing 50k nodes/sec</p>
                    </div>
                 </div>
               )}

               {result && (
                 <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                       <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest flex items-center italic">
                          <Zap size={16} className="text-yellow-500 mr-2" /> Simulation Summary: SIM_X42
                       </h3>
                       <button className="text-primary hover:text-white transition-all text-[10px] font-black flex items-center uppercase">
                          Download Detail Brief <ArrowRight size={12} className="ml-1" />
                       </button>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <div className="bg-dark-900/50 p-6 rounded-3xl border border-dark-700">
                             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Risk Leakage Analysis</h4>
                             <p className="text-xs text-slate-400 italic">"The proposed threshold increase effectively drops low-value noise but exposes 0.01% of 'Rapid Siphon' patterns currently caught by policy v2.1."</p>
                          </div>
                       </div>
                       <div className="bg-dark-900 rounded-3xl border border-dark-700 flex flex-col items-center justify-center p-8">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 text-center">Efficiency Delta</span>
                          <span className="text-6xl font-black text-primary italic">+24%</span>
                          <span className="text-[9px] text-slate-600 font-bold mt-2 uppercase tracking-tight">System Throughput Gains</span>
                       </div>
                    </div>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default PolicySimulator;
