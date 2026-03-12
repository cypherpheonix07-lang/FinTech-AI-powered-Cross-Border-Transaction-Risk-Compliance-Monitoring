import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  ShieldAlert, 
  Activity, 
  Dna, 
  Zap, 
  Globe, 
  Boxes,
  Lock,
  ArrowUpRight,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

const mockAGIBonds = [
  { id: 'AGI-77', lab: 'OpenMind', safety: 94.5, compute: '1.2e26', yield: '4.2%', status: 'Stable' },
  { id: 'AGI-99', lab: 'DeepUnbound', safety: 42.1, compute: '5.8e26', yield: '18.5%', status: 'Volatile' },
];

const mockSafetyTrend = [
  { time: '00:00', score: 85 },
  { time: '04:00', score: 82 },
  { time: '08:00', score: 88 },
  { time: '12:00', score: 84 },
  { time: '16:00', score: 79 },
  { time: '20:00', score: 81 },
];

const AGIAlignmentTerminal: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030308] text-[#c0c8d0] p-8 font-['Outfit']">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
            <Cpu size={14} /> Existential Risk Oversight
          </div>
          <h1 className="text-4xl font-black text-white">AGI Alignment & Nano Terminal</h1>
          <p className="mt-2 text-slate-500">Monitoring high-stakes financial derivatives in the age of post-human intelligence.</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex gap-8">
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Safety Avg</p>
            <p className="text-xl font-bold text-cyan-400">82.4%</p>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Nano-Divergence</p>
            <p className="text-xl font-bold text-green-400">NORMAL</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* AGI Bonds & Safety */}
        <div className="col-span-8 space-y-8">
          <div className="bg-slate-900/30 border border-slate-800 rounded-[32px] p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <ShieldAlert className="text-cyan-400" /> Active AGI Alignment Bonds
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {mockAGIBonds.map((bond) => (
                <div key={bond.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <Lock className="text-cyan-400 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{bond.lab} Frontier <span className="text-[10px] text-slate-500 ml-2">[{bond.id}]</span></h4>
                      <p className="text-xs text-slate-500">Compute: {bond.compute} FLOPs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-500">Safety Score</p>
                      <p className={`text-lg font-black ${bond.safety > 80 ? 'text-cyan-400' : 'text-orange-400'}`}>{bond.safety}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-500">Bond Yield</p>
                      <p className="text-lg font-black text-white">{bond.yield}</p>
                    </div>
                    <button className="bg-white text-black px-6 py-2 rounded-lg font-bold text-xs hover:bg-cyan-400 hover:text-white transition">
                      Trade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-[32px] p-8 h-[300px]">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="text-yellow-400" /> Collective Alignment Trend
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSafetyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#030308', border: '1px solid #1e293b' }} />
                <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Longevity & Nanosphere */}
        <div className="col-span-4 space-y-8">
          <div className="bg-slate-900/30 border border-slate-800 rounded-[32px] p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Dna className="text-green-400" /> Longevity Hedging
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-green-500/5 border border-green-500/10 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-green-400">CREDIT PORTFOLIO</span>
                  <ArrowUpRight size={14} className="text-green-400" />
                </div>
                <p className="text-2xl font-black text-white">14.2M Credits</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Avg Bio-Age Gap: -4.2Y</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[8px] uppercase font-bold text-slate-500">Therapy Yield</p>
                  <p className="text-sm font-bold">+12%</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[8px] uppercase font-bold text-slate-500">Hedge Ratio</p>
                  <p className="text-sm font-bold">1:4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-[32px] p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Boxes className="text-purple-400" /> Molecular Nanosphere
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <Globe size={14} className="text-purple-400" /> Grey Goo Potential: <span className="text-green-400">0.00001%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }} animate={{ width: '10%' }}
                   className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
                />
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                Nanotech assembly markers remain within regulatory bounds. Molecular manufacturing credits trading at parity.
              </p>
              <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition">
                Access Nanofabrication Dashboard
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/20 rounded-[32px] p-8 text-center">
            <p className="text-xs font-bold text-cyan-400 mb-2">AGI SENTINEL ACTIVE</p>
            <p className="text-[10px] text-slate-400 leading-relaxed italic">
              "Ensuring post-scarcity economies remain aligned with biological flourishing via cryptographic incentive structures."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AGIAlignmentTerminal;
