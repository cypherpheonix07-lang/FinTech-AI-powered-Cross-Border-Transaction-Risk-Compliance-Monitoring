import React from 'react';
import { motion } from 'framer-motion';
import { Columns, ArrowLeftRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

const StatDiff = ({ label, left, right, unit = '' }) => {
  const diff = right - left;
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">{label}</span>
      <div className="flex items-end space-x-2">
        <span className="text-lg font-bold text-slate-200">{right}{unit}</span>
        <div className={clsx(
          "flex items-center text-[10px] font-black pb-1",
          diff > 0 ? "text-risk-high" : diff < 0 ? "text-green-500" : "text-slate-500"
        )}>
          {diff > 0 ? <TrendingUp size={10} className="mr-0.5" /> : diff < 0 ? <TrendingDown size={10} className="mr-0.5" /> : <Minus size={10} className="mr-0.5" />}
          {Math.abs(diff).toFixed(1)}{unit}
        </div>
      </div>
    </div>
  );
};

/**
 * PathCompare.jsx
 * Side-by-side comparison of two graph snapshots.
 */
const PathCompare = ({ left, right }) => {
  if (!left || !right) return null;

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between bg-dark-800 p-6 rounded-3xl border border-dark-600">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Columns size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Intelligence Differential</h2>
            <p className="text-xs text-slate-500">Comparing Snapshots: {left.name} vs {right.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-8 px-6 border-l border-dark-700">
          <StatDiff label="Entity Load" left={left.nodes.length} right={right.nodes.length} />
          <StatDiff label="Risk Volatility" left={0.4} right={0.65} unit="%" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
         <div className="bg-dark-900 rounded-3xl border border-dark-700 overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10 bg-dark-800/80 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-dark-600">
              Alpha Snapshot
            </div>
            {/* Minimal Placeholder for Graph View */}
            <div className="h-full w-full flex items-center justify-center bg-slate-900/40">
               <span className="text-[10px] text-slate-700 font-mono tracking-tighter">RENDER_ALPHA_STATE_ACTIVE</span>
            </div>
         </div>
         
         <div className="bg-dark-900 rounded-3xl border border-dark-700 overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10 bg-primary/80 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-primary/20 shadow-lg">
              Beta Snapshot
            </div>
            <div className="h-full w-full flex items-center justify-center bg-slate-900/40">
               <span className="text-[10px] text-slate-700 font-mono tracking-tighter">RENDER_BETA_STATE_ACTIVE</span>
            </div>
         </div>
      </div>
      
      <div className="bg-dark-800 rounded-3xl border border-dark-600 p-6">
         <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest flex items-center">
            <ArrowLeftRight size={14} className="mr-2" /> Detected Variance
         </h4>
         <div className="grid grid-cols-4 gap-4">
            <div className="bg-dark-900/50 p-4 rounded-2xl border border-dark-700">
               <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Added Nodes</div>
               <div className="text-lg font-bold text-green-500">+12 Entities</div>
            </div>
            <div className="bg-dark-900/50 p-4 rounded-2xl border border-dark-700">
               <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Removed Nodes</div>
               <div className="text-lg font-bold text-risk-high">-4 Entities</div>
            </div>
            {/* ... more markers */}
         </div>
      </div>
    </div>
  );
};

export default PathCompare;
