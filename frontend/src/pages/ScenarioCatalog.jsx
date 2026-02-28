import React from 'react';
import { 
  Terminal, ShieldCheck, Zap, ArrowRight, 
  MapPin, Clock, Globe 
} from 'lucide-react';

const SCENARIOS = [
  {
    id: 'SCEN_001',
    title: 'Mule Aggregation Protocol',
    tags: ['CORRESPONDENT', 'MULE'],
    risk: 'EXTREME',
    desc: 'Simulates 50+ micro-deposits into a single consolidation node followed by rapid jurisdictional exit.'
  },
  {
    id: 'SCEN_002',
    title: 'Rapid Velocity Siphon',
    tags: ['CARD_FRAUD', 'AUTOMATED'],
    risk: 'HIGH',
    desc: 'Burst of 200 small-dollar transfers across 12 countries in < 5 mins to bypass legacy velocity limits.'
  },
  {
    id: 'SCEN_003',
    title: 'Sanction Evasion Ring',
    tags: ['COMPLIANCE', 'UA'],
    risk: 'CRITICAL',
    desc: 'Complex layering involving shell companies in non-sanctioned jurisdictions with hidden UBO links.'
  }
];

/**
 * ScenarioCatalog.jsx
 * Curated catalog of investigation scenarios for regulators and testers.
 */
const ScenarioCatalog = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 animate-in fade-in duration-1000">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-slate-100 tracking-tighter uppercase italic">Scenario Intelligence Lab</h1>
        <p className="text-slate-500 font-medium">Select a synthetic adversarial pattern to load into the trace engine.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {SCENARIOS.map((scen) => (
          <div key={scen.id} className="bg-dark-800 border-2 border-dark-600 rounded-3xl p-8 flex flex-col hover:border-primary/40 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Terminal size={120} />
             </div>
             
             <div className="flex justify-between items-start mb-6">
                <div className="bg-dark-900 p-4 rounded-2xl text-primary border border-primary/20">
                   <Zap size={24} />
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${scen.risk === 'EXTREME' ? 'bg-risk-high text-white' : 'bg-risk-medium text-dark-900'}`}>
                   {scen.risk} RISK
                </span>
             </div>

             <h3 className="text-xl font-bold text-slate-100 mb-3">{scen.title}</h3>
             <p className="text-xs text-slate-500 leading-relaxed mb-8">{scen.desc}</p>

             <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {scen.tags.map(t => (
                  <span key={t} className="text-[9px] font-bold text-slate-400 bg-dark-900/50 px-2 py-1 rounded uppercase">#{t}</span>
                ))}
             </div>

             <button className="w-full bg-dark-900 hover:bg-primary hover:text-white border border-dark-600 text-slate-300 py-3 rounded-2xl font-bold text-xs flex items-center justify-center transition-all">
                Launch Intelligence Profile <ArrowRight size={14} className="ml-2" />
             </button>
          </div>
        ))}
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-3xl p-10 flex items-center justify-between">
         <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-dark-900">
               <Globe size={32} />
            </div>
            <div>
               <h4 className="text-lg font-bold text-slate-100">Custom Synthetic Synthesis</h4>
               <p className="text-xs text-slate-500">Define your own attack parameters and jurisdictional corridors.</p>
            </div>
         </div>
         <button className="bg-primary/10 border border-primary/20 text-primary px-8 py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
            Open Advanced Builder
         </button>
      </div>
    </div>
  );
};

export default ScenarioCatalog;
