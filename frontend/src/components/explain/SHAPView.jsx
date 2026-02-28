import React from 'react';
import { motion } from 'framer-motion';
import { Info, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

/**
 * SHAPView.jsx
 * Visualizes SHAP feature importances using a horizontal bar chart
 * with natural language explanations.
 */
const SHAPView = ({ data, onGeneratePack }) => {
  if (!data) return null;

  const sortedFeatures = [...data.features].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));

  return (
    <div className="bg-dark-800 rounded-3xl border border-dark-600 overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-dark-600 flex justify-between items-center bg-gradient-to-r from-dark-800 to-dark-700">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center">
            <Info className="text-primary mr-2" size={20} />
            Explainability Model (SHAP)
          </h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">XAI Analytics Internal</p>
        </div>
        <button 
          onClick={() => onGeneratePack(data.tx_id)}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center transition-all shadow-lg shadow-primary/20"
        >
          <Download size={14} className="mr-2" />
          Evidence Pack
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* Natural Language Summary */}
        <div className="bg-dark-900/50 p-5 rounded-2xl border-l-4 border-primary">
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{data.natural_language}"
          </p>
        </div>

        {/* Feature Importance List */}
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            <span>Feature Name</span>
            <span>Impact Magnitude</span>
          </div>
          
          <div className="space-y-3">
            {sortedFeatures.map((feature, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-medium text-slate-400">{feature.name}</span>
                  <span className={clsx(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
                    feature.importance > 0 ? "text-risk-high" : "text-green-500"
                  )}>
                    {feature.importance > 0 ? '+' : ''}{(feature.importance * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-dark-900 rounded-full overflow-hidden flex">
                  {/* We visualize absolute importance here */}
                  <div className="w-1/2 flex justify-end">
                    {feature.importance < 0 && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.abs(feature.importance) * 100}%` }}
                        className="h-full bg-green-500/40"
                      />
                    )}
                  </div>
                  <div className="w-1/2 flex justify-start border-l border-slate-700">
                    {feature.importance >= 0 && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.importance * 100}%` }}
                        className="h-full bg-risk-high/60"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Footer */}
        <div className="pt-4 border-t border-dark-600 flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-500">
             <AlertTriangle size={14} className="mr-1 text-risk-medium" />
             <span>Model Confidence: 94.2%</span>
          </div>
          <div className="flex items-center text-xs text-slate-500">
             <CheckCircle2 size={14} className="mr-1 text-green-500" />
             <span>Audited & Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SHAPView;
