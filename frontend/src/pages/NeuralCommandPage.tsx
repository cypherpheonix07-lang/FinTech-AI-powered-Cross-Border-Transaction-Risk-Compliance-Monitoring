import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Activity, Zap, ShieldCheck, Eye, 
  Fingerprint, Search, Lock, Cpu, Network,
  AlertCircle, RefreshCcw, Command, UserCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

const BrainWaveVisualizer = () => (
  <div className="relative h-64 glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
    <svg className="w-full h-full p-8" viewBox="0 0 800 200">
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={i}
          d={`M 0 ${100 + i * 5} Q 200 ${50 + i * 10} 400 ${100 + i * 5} T 800 ${100 + i * 5}`}
          fill="none"
          stroke={i % 2 === 0 ? "#8b5cf6" : "#3b82f6"}
          strokeWidth="1.5"
          strokeOpacity={0.2 + (i * 0.1)}
          animate={{
            d: [
              `M 0 ${100 + i * 5} Q 200 ${50 + i * 10} 400 ${100 + i * 5} T 800 ${100 + i * 5}`,
              `M 0 ${100 + i * 5} Q 200 ${150 - i * 10} 400 ${100 + i * 5} T 800 ${100 + i * 5}`
            ]
          }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      ))}
    </svg>
    <div className="absolute top-6 left-8 flex items-center gap-3">
       <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
       <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Live EEG Stream: 512 Channels</span>
    </div>
  </div>
);

const NeuralFeatureCard = ({ title, desc, icon: Icon, value, color }: any) => (
  <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-white/20 transition-all">
    <div className="flex items-start justify-between mb-6">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10", color)}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="text-right">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</p>
          <p className={cn("text-[10px] font-black uppercase tracking-widest", color.replace('text-', 'text-'))}>Active</p>
       </div>
    </div>
    <h3 className="text-sm font-black text-white uppercase italic mb-2 tracking-tight">{title}</h3>
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed mb-6">{desc}</p>
    <div className="flex items-center justify-between">
       <span className="text-xl font-black text-white tracking-tighter">{value}</span>
       <button className="text-[9px] font-black uppercase tracking-widest text-blue-400">Configure</button>
    </div>
  </div>
);

const NeuralCommandPage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Neural <span className="text-purple-500">Command</span> Core
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Brain-Computer Financial Interface (BCFI) v4.0
          </p>
        </div>
        <div className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center gap-4">
           <div className="text-right">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Identity</p>
              <p className="text-xs font-black text-white">BRAIN_SIG_882_QE</p>
           </div>
           <div className="w-10 h-10 rounded-full border-2 border-purple-500/30 flex items-center justify-center overflow-hidden">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-6 bg-purple-500 rounded-full blur-sm" 
              />
           </div>
        </div>
      </header>

      <BrainWaveVisualizer />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <NeuralFeatureCard 
          title="Thought Auth"
          desc="Continuous EEG-based authentication with 99.97% accuracy."
          icon={UserCheck}
          value="99.97%"
          color="text-emerald-400"
        />
        <NeuralFeatureCard 
          title="Cognitive Load"
          desc="Adaptive UI complexity based on real-time neural fatigue."
          icon={Activity}
          value="24%"
          color="text-blue-400"
        />
        <NeuralFeatureCard 
          title="Intent Detection"
          desc="Pre-conscious spending detection (200ms before awareness)."
          icon={Zap}
          value="ACTIVE"
          color="text-amber-400"
        />
        <NeuralFeatureCard 
          title="Privacy Shield"
          desc="Neural data sovereignty with local-only processing."
          icon={Lock}
          value="SECURE"
          color="text-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Cpu className="w-6 h-6 text-blue-500" />
               Neural Analytics Engine
            </h2>
            <div className="space-y-6">
               {[
                 { label: 'Subconscious Risk Tolerance', val: 'Aggressive', change: '+12%', color: 'text-blue-400' },
                 { label: 'Decision Bias Detection', val: 'Loss Aversion', change: 'Med', color: 'text-amber-400' },
                 { label: 'Neural Reward Optimization', val: 'Calibrated', change: 'OK', color: 'text-emerald-400' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-10 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: '70%' }}
                            transition={{ duration: 1 + i }}
                            className="w-full bg-blue-500" 
                          />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-lg font-black text-white tracking-tighter uppercase">{item.val}</p>
                       </div>
                    </div>
                    <div className={cn("text-xs font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg", item.color)}>
                       {item.change}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Command className="w-6 h-6 text-purple-500" />
               Mental Commands
            </h2>
            <div className="space-y-4">
               {[
                 { label: 'Thought-to-Transfer', keys: 'ALT + T' },
                 { id: 'bci_1', label: 'Mental Bookmark', status: 'READY' },
                 { id: 'bci_2', label: 'Consciousness Branch', status: 'LOCKED' },
                 { id: 'bci_3', label: 'Neural Macro', status: 'READY' }
               ].map((cmd, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-purple-500/30 transition-colors">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{cmd.label}</span>
                    {cmd.keys ? (
                      <span className="text-[9px] font-mono text-slate-500 px-2 py-1 bg-white/5 rounded">{cmd.keys}</span>
                    ) : (
                      <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded", cmd.status === 'READY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-600')}>
                         {cmd.status}
                      </span>
                    )}
                 </div>
               ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <Brain className="w-16 h-16" />
               </div>
               <h4 className="text-sm font-black text-white italic mb-1">Calibrate BCI</h4>
               <p className="text-[10px] font-medium text-white/70 leading-relaxed mb-4">Re-sync neural dictionary with current cognitive state.</p>
               <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-white transition-all">Start Calibration</button>
            </div>
         </div>
      </div>

      <footer className="glass-omega p-8 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
               <Network className="w-5 h-5 text-purple-400" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white uppercase tracking-widest">Shared Neural Workspace</p>
               <p className="text-[9px] font-medium text-slate-500 uppercase mt-0.5">3 Active Collaborators</p>
            </div>
         </div>
         <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full active:scale-95 transition-all">Join Session</button>
            <button className="px-6 py-2 bg-white/5 text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10 hover:bg-white/10 transition-all">Audit Trails</button>
         </div>
      </footer>
    </div>
  );
};

export default NeuralCommandPage;
