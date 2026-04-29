import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Network, Activity, Zap, Brain, 
  Layers, Search, RefreshCcw, Database, 
  ShieldCheck, Command, Radio, Terminal,
  Workflow, Share2, Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

const OrchestrationNode = ({ label, status, load }: any) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
      <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === 'Active' ? 'bg-emerald-500' : 'bg-blue-500')} />
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${load}%` }}
        className="h-full bg-blue-500" 
      />
    </div>
  </div>
);

const AIOrchestrationPage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              AI <span className="text-indigo-400">Orchestration</span> & Super-Intelligence
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Collective Super-Intelligence & Autonomous Financial Agents (AFA) v5.0
          </p>
        </div>
        <div className="px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-3">
           <Sparkles className="w-5 h-5 text-indigo-400" />
           <span className="text-[10px] font-black uppercase tracking-widest text-white">Super-Intelligence Active</span>
        </div>
      </header>

      {/* Hero Section: Orchestration Graph Placeholder */}
      <div className="relative h-80 glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full p-12 overflow-hidden">
               {/* Swarm Animation */}
               {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [Math.random() * 800, Math.random() * 800],
                      y: [Math.random() * 400, Math.random() * 400],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute w-2 h-2 bg-indigo-500/40 rounded-full blur-[1px]"
                  />
               ))}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-dashed border-indigo-500/20 rounded-full animate-spin-slow flex items-center justify-center">
                     <Brain className="w-12 h-12 text-indigo-400" />
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute top-6 left-8 flex items-center gap-3">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Swarm Intelligence Operational</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-indigo-500/30 transition-all">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Autonomous Agents</h3>
            <div className="text-3xl font-black text-white tracking-tighter mb-1">1,240</div>
            <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Active AFAs</p>
         </div>
         <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-indigo-500/30 transition-all">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Orchestration Load</h3>
            <div className="text-3xl font-black text-white tracking-tighter mb-1">42%</div>
            <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Optimal Efficiency</p>
         </div>
         <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-indigo-500/30 transition-all">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Meta-Learning Rate</h3>
            <div className="text-3xl font-black text-white tracking-tighter mb-1">0.982</div>
            <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Self-Correcting</p>
         </div>
         <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-indigo-500/30 transition-all">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Super-Intel Sync</h3>
            <div className="text-3xl font-black text-white tracking-tighter mb-1">100%</div>
            <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">Quantum Coherent</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Workflow className="w-6 h-6 text-indigo-500" />
               Agent Mission Control
            </h2>
            <div className="space-y-4">
               {[
                 { agent: 'AFA_ARBITRAGE_01', mission: 'Mars-Earth Spread Optimization', status: 'Running', yield: '+4.2%' },
                 { agent: 'AFA_RISK_SHIELD', mission: 'Quantum Threat Neutralization', status: 'Standby', yield: 'N/A' },
                 { agent: 'AFA_LIQUIDITY_MAX', mission: 'Cross-Planetary Pool Rebalancing', status: 'Running', yield: '+1.8%' }
               ].map((afa, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:bg-white/[0.08] transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                          <Zap className={cn("w-5 h-5", afa.status === 'Running' ? 'text-indigo-400' : 'text-slate-600')} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">{afa.agent}</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">{afa.mission}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className={cn("text-[9px] font-black uppercase tracking-widest mb-1", afa.status === 'Running' ? 'text-emerald-400' : 'text-slate-500')}>
                          {afa.status}
                       </p>
                       <p className="text-[10px] font-black text-white">{afa.yield}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Share2 className="w-6 h-6 text-purple-500" />
               Collective Super-Intel
            </h2>
            <div className="space-y-6">
               <OrchestrationNode label="Neural Mesh Alpha" status="Active" load={64} />
               <OrchestrationNode label="Quantum Core Relay" status="Active" load={12} />
               <OrchestrationNode label="Heuristic Layer Delta" status="Active" load={48} />
               
               <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                     <Command className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-sm font-black text-white italic mb-1">Global Brain Sync</h3>
                  <p className="text-[10px] font-medium text-white/70 leading-relaxed mb-6">Harmonize all AI agents into a single unified intelligence mesh.</p>
                  <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-white transition-all">Initiate Sync</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIOrchestrationPage;
