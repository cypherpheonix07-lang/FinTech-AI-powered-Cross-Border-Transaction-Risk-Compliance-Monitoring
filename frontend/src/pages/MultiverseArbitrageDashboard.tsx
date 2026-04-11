import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  GitBranch, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Layers,
  Search,
  RefreshCcw,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

const mockTimelines = [
  { id: 'TL-PRIMUS', name: 'Mainline Continuity', prob: 88, price: 45000, risk: 'Stable', color: '#3b82f6' },
  { id: 'TL-BETA-7', name: 'Quantum Vetoed', prob: 10, price: 65250, risk: 'High Vol', color: '#8b5cf6' },
  { id: 'TL-OMEGA-VOID', name: 'Alignment Failure', prob: 2, price: 5400, risk: 'Existential', color: '#ef4444' },
];

const mockQuantumYieldData = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: Math.random() * 10,
  z: Math.random() * 100
}));

const MultiverseArbitrageDashboard: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState(mockTimelines[0]);

  const runQuantumScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-[#a0a0c0] p-8 font-['Outfit'] relative overflow-hidden">
      {/* Quantum Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#101020_1px,transparent_1px),linear-gradient(to_bottom,#101020_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-2 text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              <Zap size={14} className="animate-pulse" /> Parallel Reality Arbitrage Engine
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter">Multiverse Portfolio Hub</h1>
            <p className="text-slate-500 mt-2 font-medium">Hedging recursive uncertainty across divergent probability streams.</p>
          </div>
          <button 
            onClick={runQuantumScan}
            className="group relative px-8 py-4 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative flex items-center gap-2">
              <RefreshCcw size={18} className={isScanning ? 'animate-spin' : ''} />
              {isScanning ? 'Syncing Realities...' : 'Quantum Scan'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Timeline View */}
          <div className="col-span-8 space-y-8">
            <div className="bg-[#0a0a15]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <GitBranch className="text-purple-400" /> Probability Stream Divergence
              </h3>
              
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                    <XAxis type="number" dataKey="x" hide />
                    <YAxis type="number" dataKey="y" hide />
                    <ZAxis type="number" dataKey="z" range={[50, 400]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0a0a15', border: '1px solid #ffffff10' }} />
                    <Scatter name="Quantum Fluctuations" data={mockQuantumYieldData} fill="#8b5cf6" opacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                {mockTimelines.map((tl) => (
                  <motion.div 
                    key={tl.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedTimeline(tl)}
                    className={`cursor-pointer p-6 rounded-3xl border transition-all ${selectedTimeline.id === tl.id ? 'bg-white/5 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : 'bg-transparent border-white/5 hover:border-white/20'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tl.color}20` }}>
                        <Activity size={16} style={{ color: tl.color }} />
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: tl.color }}>{tl.prob}% PROB</span>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">{tl.name}</h4>
                    <p className="text-xl font-black text-white">${tl.price.toLocaleString()}</p>
                    <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Risk: <span style={{ color: tl.color }}>{tl.risk}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Arbitrage Sidebar */}
          <div className="col-span-4 space-y-8">
            <div className="bg-[#0a0a15]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Layers className="text-blue-400" /> Arbitrage Opportunity
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <TrendingUp size={60} />
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-2">Theoretical Spread</p>
                  <p className="text-3xl font-black text-white">+45.2%</p>
                  <p className="text-[10px] text-blue-400 mt-2 font-bold">Mainline → Timeline Beta-7</p>
                  <button className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-2xl transition shadow-lg shadow-blue-600/20">
                    Execute Cross-Reality Hedge
                  </button>
                </div>

                <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle size={16} />
                    <span className="text-[10px] font-black uppercase">Existence Threat Detected</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-red-200/60 font-medium">
                    Timeline Omega-Void probability has increased by 0.4% in the last 12 minutes. System-wide entropy hedging recommended.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 rounded-[40px] p-8">
              <h4 className="font-black text-white mb-4 flex items-center gap-2 uppercase tracking-tighter">
                <ShieldCheck className="text-purple-400" /> Quantum Entanglement Vault
              </h4>
              <p className="text-xs leading-relaxed text-slate-400 mb-6 font-medium">
                Asset keys are distributed across 3 parallel reality slices. Inaccessible to current-timeline adversaries.
              </p>
              <div className="flex gap-2">
                <div className="h-1 flex-1 bg-purple-500 rounded-full" />
                <div className="h-1 flex-1 bg-purple-500 rounded-full" />
                <div className="h-1 flex-1 bg-slate-800 rounded-full" />
              </div>
              <p className="text-[10px] font-bold text-purple-400 mt-4 uppercase">Sync Status: 66% Divergent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiverseArbitrageDashboard;
