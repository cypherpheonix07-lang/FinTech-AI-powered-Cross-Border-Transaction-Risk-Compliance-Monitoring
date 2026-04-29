import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Activity, Clock, Layers, Network, 
  Search, RefreshCcw, Database, ShieldCheck, 
  Atom, Radio, Compass, Infinity as InfinityIcon,
  Sun, Moon, Stars
} from 'lucide-react';
import { cn } from '../lib/utils';

const TemporalVortex = () => (
  <div className="relative h-80 glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-purple-500/5" />
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="relative scale-150">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: 10 + i * 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 m-auto border border-amber-500/20 rounded-full"
              style={{ width: 100 + i * 50, height: 100 + i * 50 }}
            />
          ))}
          <motion.div 
            animate={{ 
               scale: [1, 1.5, 1],
               opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 bg-amber-500/20 rounded-full blur-2xl" 
          />
          <Clock className="absolute inset-0 m-auto w-10 h-10 text-amber-400 animate-pulse" />
       </div>
    </div>
    
    <div className="absolute top-6 left-8 flex items-center gap-3">
       <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
       <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Temporal Drift Corrected: +0.0004s</span>
    </div>
  </div>
);

const ExoticFeatureCard = ({ title, desc, icon: Icon, value, color }: any) => (
  <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-white/20 transition-all">
    <div className="flex items-start justify-between mb-6">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10", color)}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="text-right">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Reality</p>
          <p className={cn("text-[10px] font-black uppercase tracking-widest", color)}>Stable</p>
       </div>
    </div>
    <h3 className="text-sm font-black text-white uppercase italic mb-2 tracking-tight">{title}</h3>
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed mb-6">{desc}</p>
    <div className="flex items-center justify-between">
       <span className="text-xl font-black text-white tracking-tighter">{value}</span>
       <InfinityIcon className={cn("w-4 h-4 opacity-20", color)} />
    </div>
  </div>
);

const ExoticParadigmsPage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <InfinityIcon className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Universal & <span className="text-amber-500">Exotic</span> Paradigms
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Temporal & Dimensional Financial Infrastructure (TDFI)
          </p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3">
              <Compass className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Multiverse-Sync: ON</span>
           </div>
        </div>
      </header>

      <TemporalVortex />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ExoticFeatureCard 
          title="Temporal Arbitrage"
          desc="Correcting for relativistic time-dilation in high-speed trades."
          icon={Clock}
          value="0.4ms"
          color="text-amber-400"
        />
        <ExoticFeatureCard 
          title="Multiverse Hedge"
          desc="Cross-dimensional risk hedging via quantum branching."
          icon={Layers}
          value="ACTIVE"
          color="text-purple-400"
        />
        <ExoticFeatureCard 
          title="Post-Scarcity"
          desc="Managing resource-infinite economic protocols."
          icon={InfinityIcon}
          value="v9.1"
          color="text-emerald-400"
        />
        <ExoticFeatureCard 
          title="Meta-Physics"
          desc="Financial logic based on non-euclidean asset mapping."
          icon={Atom}
          value="VALID"
          color="text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Stars className="w-6 h-6 text-amber-500" />
               Dimensional Asset Portfolio
            </h2>
            <div className="space-y-4">
               {[
                 { dim: 'Universe-1 (Current)', asset: 'Sol-Credits', val: '14.2M', risk: 'Low' },
                 { dim: 'Universe-B (Mirror)', asset: 'Anti-Matter Bond', val: '2.1B', risk: 'Extreme' },
                 { dim: 'Timeline-4 (Future-G)', asset: 'Temporal Option', val: '840k', risk: 'Med' }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-amber-500/30 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                             {i === 0 ? <Sun className="w-6 h-6 text-amber-400" /> : i === 1 ? <Moon className="w-6 h-6 text-purple-400" /> : <Stars className="w-6 h-6 text-blue-400" />}
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.dim}</p>
                             <p className="text-lg font-black text-white tracking-tighter uppercase italic">{item.asset}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-black text-white tracking-tighter">{item.val}</p>
                          <p className={cn("text-[9px] font-black uppercase tracking-widest", item.risk === 'Extreme' ? 'text-red-500' : item.risk === 'Low' ? 'text-emerald-400' : 'text-amber-400')}>
                             {item.risk} Risk
                          </p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <RefreshCcw className="w-6 h-6 text-blue-500" />
               Reality Correction
            </h2>
            <div className="space-y-6">
               <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
                  Monitoring consistency between dimensional ledgers. Any divergence will trigger an automatic Omega Protocol re-sync.
               </p>
               <div className="space-y-3">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                     <span>Coherence Pool</span>
                     <span>99.98%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '99.98%' }}
                        className="h-full bg-amber-500"
                     />
                  </div>
               </div>
               <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                  <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Temporal Jitter: Minimal</span>
               </div>
               <button className="w-full py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">
                  Branch Reality
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ExoticParadigmsPage;
