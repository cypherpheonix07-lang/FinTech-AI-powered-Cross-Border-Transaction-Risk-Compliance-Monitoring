import React from 'react';
import { Sparkles, ArrowRight, TrendingDown, ShieldAlert } from 'lucide-react';

/**
 * CounterfactualView.jsx
 * Actionable recommendations to mitigate detected risks.
 */
const CounterfactualView = ({ data }) => {
  if (!data || !data.suggestions) return null;

  return (
    <div className="bg-dark-800 border-2 border-primary/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 p-10 opacity-5">
         <Sparkles size={160} className="text-primary" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex justify-between items-start">
           <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center tracking-tighter uppercase italic">
                <ArrowRight className="text-primary mr-2" size={24} />
                Risk Mitigation Optimization
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Simulated adjustments to reach target threshold: {data.target_risk}</p>
           </div>
           <div className="text-right">
              <span className="text-[10px] font-black text-slate-500 uppercase">Est. Mitigated Risk</span>
              <p className="text-3xl font-black text-green-500">{(data.estimated_new_risk * 100).toFixed(0)}%</p>
           </div>
        </div>

        <div className="space-y-4">
           {data.suggestions.map((s, i) => (
             <div key={i} className="bg-dark-900/50 border border-dark-600 p-6 rounded-2xl flex items-center justify-between group hover:border-primary/40 transition-all">
                <div className="flex items-center space-x-4">
                   <div className="bg-dark-800 p-3 rounded-xl text-slate-400">
                      <TrendingDown size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.feature}</p>
                      <div className="flex items-center space-x-2 mt-1">
                         <span className="text-xs text-risk-high font-medium line-through decoration-risk-high/40">{s.current_value}</span>
                         <ArrowRight size={12} className="text-slate-600" />
                         <span className="text-xs text-green-400 font-black">{s.suggested_value}</span>
                      </div>
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-[9px] font-bold text-green-500/80 bg-green-500/10 px-2 py-0.5 rounded uppercase">
                     {s.impact * 100}% Risk
                   </span>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex items-start space-x-4">
           <ShieldAlert className="text-primary flex-shrink-0" size={18} />
           <div>
              <h4 className="text-xs font-bold text-primary italic uppercase">Analyst Decision Support</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
                These suggestions are generated using the <strong>Kubera Intelligence Counterfactual Engine</strong>. Implementing these changes would move this transaction from a "Risk Escalation" to a "Verified Corridor" state.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CounterfactualView;
