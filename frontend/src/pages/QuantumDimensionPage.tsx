import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ShieldCheck, Lock, Activity, Cpu, 
  Network, Search, RefreshCcw, Layers, 
  Database, Atom, Radio, Key, Fingerprint
} from 'lucide-react';
import { cn } from '../lib/utils';

const QuantumLattice = () => (
  <div className="relative h-64 glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5" />
    <div className="absolute inset-0 grid grid-cols-12 gap-1 p-4 opacity-20">
       {[...Array(144)].map((_, i) => (
         <motion.div
           key={i}
           animate={{ 
             opacity: [0.2, 0.5, 0.2],
             scale: [1, 1.1, 1]
           }}
           transition={{ 
             duration: 2 + Math.random() * 2, 
             repeat: Infinity,
             delay: Math.random() * 2
           }}
           className="w-full aspect-square bg-cyan-500/20 rounded-sm border border-cyan-500/30"
         />
       ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-full" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-32 h-32 border-2 border-dashed border-indigo-500/30 rounded-full scale-75" 
          />
          <Atom className="absolute inset-0 m-auto w-8 h-8 text-cyan-400 animate-pulse" />
       </div>
    </div>
    <div className="absolute top-6 left-8 flex items-center gap-3">
       <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
       <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Post-Quantum Lattice Active</span>
    </div>
  </div>
);

const QuantumFeatureCard = ({ title, desc, icon: Icon, value, color }: any) => (
  <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-white/20 transition-all">
    <div className="flex items-start justify-between mb-6">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10", color)}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="text-right">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">State</p>
          <p className={cn("text-[10px] font-black uppercase tracking-widest", color)}>Entangled</p>
       </div>
    </div>
    <h3 className="text-sm font-black text-white uppercase italic mb-2 tracking-tight">{title}</h3>
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed mb-6">{desc}</p>
    <div className="flex items-center justify-between">
       <span className="text-xl font-black text-white tracking-tighter">{value}</span>
       <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className={cn("w-1 h-3 rounded-full bg-current opacity-20", color)} />)}
       </div>
    </div>
  </div>
);

const QuantumDimensionPage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Quantum <span className="text-cyan-400">Dimension</span> Security
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Post-Quantum Cryptography & Quantum Compute Layer
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right hidden md:block">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">QKD Entropy</p>
              <p className="text-xs font-black text-cyan-400 font-mono">0.99999999</p>
           </div>
           <div className="px-6 py-3 bg-cyan-400/10 border border-cyan-400/20 rounded-2xl flex items-center gap-3">
              <Key className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Lattice-Kyber Active</span>
           </div>
        </div>
      </header>

      <QuantumLattice />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <QuantumFeatureCard 
          title="QKD Networks"
          desc="Quantum Key Distribution networks for ultra-secure comms."
          icon={Radio}
          value="10.4 Gbps"
          color="text-cyan-400"
        />
        <QuantumFeatureCard 
          title="Kyber-Kyber"
          desc="Lattice-based cryptography for post-quantum key encapsulation."
          icon={ShieldCheck}
          value="STABLE"
          color="text-blue-400"
        />
        <QuantumFeatureCard 
          title="Annealing"
          desc="Quantum approximate optimization for asset allocation."
          icon={Activity}
          value="QAOA v2"
          color="text-indigo-400"
        />
        <QuantumFeatureCard 
          title="Decoherence"
          desc="Real-time monitoring of quantum state integrity."
          icon={Database}
          value="0.0001%"
          color="text-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Layers className="w-6 h-6 text-cyan-500" />
               Quantum Machine Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { label: 'Q-Neural Fraud Detection', val: '99.99%', desc: 'Quantum-enhanced pattern recognition.' },
                 { label: 'Portfolio Annealing', val: 'Optimal', desc: 'D-Wave integrated asset balancing.' },
                 { label: 'zk-STARKs Verification', val: '2ms', desc: 'Quantum-resistant zero-knowledge proofs.' },
                 { label: 'Teleportation Keys', val: 'Active', desc: 'Secure teleportation of encryption seeds.' }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xl font-black text-white tracking-tighter">{item.val}</span>
                       <div className="w-6 h-6 rounded bg-cyan-500/10 flex items-center justify-center">
                          <Activity className="w-3 h-3 text-cyan-400" />
                       </div>
                    </div>
                    <p className="text-[9px] font-medium text-slate-600 leading-tight">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Lock className="w-6 h-6 text-indigo-500" />
               Q-HSM Control
            </h2>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">Hardware Module 07</p>
                     <p className="text-[8px] font-bold text-emerald-400 uppercase">Temp: 15mK (Stable)</p>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                     <span>Entropy Pool</span>
                     <span>84%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '84%' }}
                        className="h-full bg-cyan-500"
                     />
                  </div>
               </div>
            </div>
            <div className="mt-8 p-6 bg-slate-900 border border-white/10 rounded-2xl">
               <div className="flex items-center gap-3 mb-4">
                  <Fingerprint className="w-5 h-5 text-cyan-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Master Key Status</span>
               </div>
               <div className="text-[9px] font-mono text-slate-500 leading-relaxed break-all">
                  882A-FF91-0023-QE11-LATTICE-KYBER-V4
               </div>
            </div>
            <button className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95">
               Rotate Lattice Keys
            </button>
         </div>
      </div>

      <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
               <Network className="w-4 h-4 text-cyan-500" />
               Quantum Communication Channels
            </h3>
            <div className="flex gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full" />
               <div className="w-2 h-2 bg-emerald-500 rounded-full" />
               <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { node: 'LND_CORE', peer: 'HKG_HUB', secure: true, type: 'QKD' },
              { node: 'NYC_GW', peer: 'TYO_NODE', secure: true, type: 'Entanglement' },
              { node: 'MARS_ALPHA', peer: 'LND_CORE', secure: false, type: 'Hybrid' }
            ].map((chan, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-white">{chan.node} ↔ {chan.peer}</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">{chan.type}</p>
                 </div>
                 <div className={cn(
                   "text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded",
                   chan.secure ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                 )}>
                    {chan.secure ? 'SECURE' : 'SYNCING'}
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default QuantumDimensionPage;
