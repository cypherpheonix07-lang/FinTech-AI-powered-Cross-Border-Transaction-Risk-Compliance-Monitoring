import React, { useState } from 'react';
import { PlayCircle, Database, ShieldAlert, Zap } from 'lucide-react';
import clsx from 'clsx';

/**
 * ScenarioForm.jsx
 * Interface for defining synthetic attack patterns (mule, velocity, etc.)
 */
const ScenarioForm = ({ onSubmit, loading }) => {
  const [config, setConfig] = useState({
    type: 'money_mule',
    nodeCount: 5,
    amountRange: [1000, 50000],
    complexity: 'medium'
  });

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-3xl p-8 space-y-8 shadow-2xl">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Pattern Template</label>
            <select 
              value={config.type}
              onChange={(e) => setConfig({ ...config, type: e.target.value })}
              className="w-full bg-dark-900 border border-dark-600 p-4 rounded-2xl text-slate-200 text-sm focus:border-primary focus:outline-none"
            >
              <option value="money_mule">Money Mule Operation</option>
              <option value="velocity_spike">Velocity Attack (Burst)</option>
              <option value="layering_ring">Structured Layering Ring</option>
              <option value="sanction_evasion">Jurisdictional Evasion</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Entity Count: {config.nodeCount}</label>
            <input 
              type="range" 
              min="3" max="50" 
              value={config.nodeCount}
              onChange={(e) => setConfig({ ...config, nodeCount: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-primary" 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Attack Complexity</label>
            <div className="flex space-x-2">
              {['low', 'medium', 'high'].map(level => (
                <button 
                  key={level}
                  onClick={() => setConfig({ ...config, complexity: level })}
                  className={clsx(
                    "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase transition-all border",
                    config.complexity === level 
                      ? "bg-primary/20 border-primary text-primary" 
                      : "bg-dark-900 border-dark-600 text-slate-500 hover:text-slate-300"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-dark-900 border-l-4 border-risk-medium p-4 rounded-2xl">
             <div className="flex items-center text-[10px] font-bold text-risk-medium mb-1 uppercase tracking-tighter">
                <ShieldAlert size={12} className="mr-1" /> Pattern Warning
             </div>
             <p className="text-[10px] text-slate-500 leading-tight">
               Mule operations will simulate staggered transfers (&lt; 24h) across diverse jurisdictions.
             </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onSubmit(config)}
        disabled={loading}
        className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-xl shadow-primary/30 disabled:opacity-50"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Zap size={18} className="mr-2" />
            Synthesize Synthetic Intelligence
          </>
        )}
      </button>
    </div>
  );
};

export default ScenarioForm;
