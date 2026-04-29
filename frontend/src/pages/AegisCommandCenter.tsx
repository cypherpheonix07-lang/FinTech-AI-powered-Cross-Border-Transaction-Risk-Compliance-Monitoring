import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, ShieldCheck, Zap, Activity, Globe, Brain, 
  Lock, AlertTriangle, Terminal, Cpu, RefreshCcw, 
  Layers, Database, Network, Search, Eye, Fingerprint,
  Heart, Dna, Radio, Satellite, Command, Power,
  ChevronRight, ArrowUpRight, TrendingUp, Wallet,
  Infinity as InfinityIcon, Atom, Sparkles, Clock, 
  Waves, Target, Hexagon, Star, Sun, Wind
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useNexus } from '@/context/NexusStateContext';

// --- Components ---

const OmniMetricCard = ({ title, value, status, icon: Icon, color, onClick, subtext }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02, translateY: -5 }}
    onClick={onClick}
    className="glass-omega p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group cursor-pointer"
  >
    <div className={cn("absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12", color)}>
      <Icon className="w-32 h-32" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner", color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
           <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">{title}</span>
           <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">{subtext}</span>
        </div>
      </div>
      <div className="text-4xl font-black text-white tracking-tighter mb-2 font-mono">{value}</div>
      <div className={cn("text-[10px] font-black uppercase tracking-widest flex items-center gap-2", status.includes('Stable') || status.includes('High') || status.includes('Active') ? 'text-emerald-400' : 'text-amber-400')}>
        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status.includes('Stable') || status.includes('High') || status.includes('Active') ? 'bg-emerald-400' : 'bg-amber-400')} />
        {status}
      </div>
    </div>
  </motion.div>
);

const TemporalTimelineHUD = () => {
  const { state } = useNexus();
  return (
    <div className="glass-omega p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-8 opacity-5">
          <Clock className="w-48 h-48 text-purple-500" />
       </div>
       <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600/20 rounded-2xl border border-purple-500/20 text-purple-400">
                   <Waves className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                   <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Temporal_Sync_Grid</h3>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Causality_Monitoring_Active</span>
                </div>
             </div>
             <div className="flex items-center gap-3 px-5 py-2 bg-white/5 rounded-xl border border-white/5">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-purple-400 font-mono tracking-widest">DRFT_{state.temporalDrift.toFixed(6)}s</span>
             </div>
          </div>

          <div className="relative h-24 flex items-center justify-between px-4">
             {/* Timeline Axis */}
             <div className="absolute inset-x-0 h-px bg-white/10 top-1/2 -translate-y-1/2" />
             
             {[...Array(9)].map((_, i) => {
               const offset = i - 4;
               const label = offset === 0 ? 'NOW' : offset > 0 ? `T+${offset}h` : `T${offset}h`;
               return (
                 <div key={i} className="relative flex flex-col items-center">
                    <div className={cn(
                      "w-1 h-4 rounded-full transition-all duration-700",
                      offset === 0 ? "h-12 w-1.5 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]" : "bg-white/20"
                    )} />
                    <span className={cn(
                      "absolute top-full mt-4 text-[9px] font-black tracking-widest",
                      offset === 0 ? "text-white" : "text-slate-600"
                    )}>{label}</span>
                 </div>
               );
             })}
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6">
             {[
               { label: 'Past Stability', val: '99.98%', icon: History },
               { label: 'Future Probability', val: '84.22%', icon: Target },
               { label: 'Reality Coherence', val: '98.90%', icon: Hexagon }
             ].map((m, i) => (
               <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-purple-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                     <m.icon className="w-3 h-3 text-slate-500" />
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                  </div>
                  <span className="text-sm font-black text-white font-mono">{m.val}</span>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

const OntologicalSecurityBadge = () => {
  const { state } = useNexus();
  return (
    <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all cursor-default relative overflow-hidden group">
       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/30">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Ontological_Guard</span>
                <span className="text-lg font-black text-white uppercase italic tracking-tighter">Immunity_v2.0</span>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-mono text-emerald-400 font-black tracking-widest animate-pulse">OPTIMIZED</span>
             <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mt-1">ZERO_LATENCY_HEAL</span>
          </div>
       </div>
       
       <div className="space-y-4">
          {[
            { label: 'Reality Glitch Buffer', val: '100%', status: 'Active' },
            { label: 'Self-Healing Core', val: '99.4%', status: 'Regenerating' },
            { label: 'Identity Continuity', val: '100%', status: 'Verified' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-white font-mono">{item.val}</span>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

const AegisCommandCenter = () => {
  const { state, toggleOmegaProtocol } = useNexus();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000",
      state.isOmegaProtocol ? "text-red-100" : "text-white"
    )}>
      {/* Omni-Omnipotent Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 px-4">
        <div className="relative">
          <div className="flex items-center gap-6 mb-4">
            <div className="p-4 bg-blue-600 rounded-[2.5rem] shadow-[0_0_80px_rgba(37,99,235,0.4)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              <ShieldCheck className="w-10 h-10 text-white relative z-10" />
            </div>
            <div>
               <h1 className="text-7xl font-black tracking-[-0.05em] uppercase italic leading-none">
                 Aegis <span className="text-blue-500">v2.0</span>
               </h1>
               <div className="flex items-center gap-4 mt-3">
                  <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Omni-Omnipotent</span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] italic">Post-Human Financial Command</span>
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-16">
           <div className="flex flex-col items-end border-r border-white/10 pr-16">
             <div className="text-5xl font-mono font-black tracking-tighter text-white tabular-nums">
               {currentTime.toLocaleTimeString([], { hour12: false })}
             </div>
             <div className="flex items-center gap-3 mt-2">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Global_Pulse_Connected</span>
             </div>
           </div>
           
           <div className="flex flex-col items-end">
              <div className="text-2xl font-black text-white italic tracking-tighter mb-1">
                 {state.wealthTicker.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </div>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                 <TrendingUp className="w-3 h-3" />
                 LIV_FLOW_MANIFEST
              </span>
           </div>
        </div>
      </header>

      {/* Main Grid v2.0 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Omni-Metrics */}
        <div className="lg:col-span-3 space-y-10">
           <OmniMetricCard 
              title="Collective Intelligence" 
              value={`${state.hiveMindSync.toFixed(1)}%`}
              status="High Coherence"
              subtext="Hive_Mind_Integration"
              icon={Brain}
              color="text-purple-500"
              onClick={() => navigate('/social')}
           />
           <OmniMetricCard 
              title="Quantum Entropy" 
              value={state.networkLatency.toFixed(3) + "ms"}
              status="Stable_Lattice"
              subtext="QKD_Network_State"
              icon={Zap}
              color="text-cyan-500"
              onClick={() => navigate('/quantum-safe-security')}
           />
           <OntologicalSecurityBadge />
        </div>

        {/* Center Column: Temporal & Global Manifest */}
        <div className="lg:col-span-6 space-y-10">
           <TemporalTimelineHUD />

           <div className="grid grid-cols-2 gap-10">
              <div 
                onClick={() => navigate('/multiverse-arbitrage')}
                className="glass-omega p-10 rounded-[3.5rem] border border-white/10 group cursor-pointer hover:border-rose-500/50 transition-all relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="p-4 bg-rose-600/20 border border-rose-500/20 rounded-[1.5rem] text-rose-400">
                       <InfinityIcon className="w-8 h-8" />
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase italic mb-3 relative z-10 tracking-tighter">Multiversal_Arb</h3>
                 <p className="text-xs font-medium text-slate-500 leading-relaxed relative z-10">
                    Extracting value across divergent timelines and probability branches.
                 </p>
              </div>

              <div 
                onClick={() => navigate('/agi-terminal')}
                className="glass-omega p-10 rounded-[3.5rem] border border-white/10 group cursor-pointer hover:border-amber-500/50 transition-all relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="p-4 bg-amber-600/20 border border-amber-500/20 rounded-[1.5rem] text-amber-400">
                       <Sparkles className="w-8 h-8" />
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase italic mb-3 relative z-10 tracking-tighter">Reality_Architect</h3>
                 <p className="text-xs font-medium text-slate-500 leading-relaxed relative z-10">
                    Recursive self-improvement protocols and ontological asset creation.
                 </p>
              </div>
           </div>

           {/* Value Manifestation Feed */}
           <div className="glass-omega p-10 rounded-[3.5rem] border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-600/20 border border-emerald-500/20 rounded-2xl text-emerald-400">
                       <Wallet className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                       <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Omni-Value_Flow</h3>
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Manifesting_Social_&_Physical_Capital</span>
                    </div>
                 </div>
                 <button 
                   onClick={() => navigate('/tokenization-rwa')}
                   className="text-[11px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 flex items-center gap-3 group"
                 >
                   Deep_Audit
                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              
              <div className="space-y-6">
                 {[
                   { label: 'Fiat/Crypto Aggregator', val: '+$142.4k', type: 'LIQUIDITY', icon: Zap },
                   { label: 'Social Karma Loop', val: '+42.0 Ω', type: 'REPUTATION', icon: Star },
                   { label: 'Matter-Value Token', val: 'Active', type: 'PHYSICAL', icon: Hexagon }
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all cursor-default group">
                     <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                         <log.icon className="w-6 h-6" />
                       </div>
                       <div>
                         <p className="text-sm font-black text-white tracking-tight">{log.label}</p>
                         <p className="text-[10px] font-black text-slate-500 uppercase mt-1 tracking-[0.2em]">{log.type}</p>
                       </div>
                     </div>
                     <div className="text-right">
                        <div className="text-lg font-black text-emerald-400 font-mono tracking-tighter">{log.val}</div>
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">MANIFESTED</span>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Omega Controls & Singularity Prep */}
        <div className="lg:col-span-3 space-y-10">
           {/* Singularity Prep Dashboard */}
           <div className="glass-omega p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-45 transition-transform duration-1000">
                 <Target className="w-32 h-32 text-amber-500" />
              </div>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                 <Target className="w-4 h-4 text-amber-500" />
                 Singularity_Readiness
              </h3>
              
              <div className="space-y-8">
                 {[
                   { label: 'Intelligence Takeoff', val: 94.2, color: 'text-amber-500' },
                   { label: 'Value Alignment', val: 100, color: 'text-emerald-500' },
                   { label: 'Post-Human UX', val: 88.4, color: 'text-blue-500' }
                 ].map((m, i) => (
                   <div key={i} className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
                         <span className={cn("text-[11px] font-black font-mono", m.color)}>{m.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${m.val}%` }}
                           className={cn("h-full", m.color.replace('text', 'bg'))}
                         />
                      </div>
                   </div>
                 ))}
              </div>
              
              <button className="w-full mt-12 py-5 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-600/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 transition-all">
                 Initialize_Omega_Point
              </button>
           </div>

           <div className="p-10 rounded-[3rem] bg-gradient-to-br from-purple-600 to-blue-700 relative overflow-hidden group cursor-pointer shadow-2xl shadow-purple-600/20" onClick={() => navigate('/governance-vault')}>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000 group-hover:scale-125">
                 <InfinityIcon className="w-40 h-40 text-white" />
              </div>
              <div className="relative z-10">
                 <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 shadow-xl">
                    <Star className="w-7 h-7 text-white" />
                 </div>
                 <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4 leading-tight">Eternal_Legacy</h3>
                 <p className="text-sm font-medium text-white/70 leading-relaxed mb-10">
                    Secure your digital and biological essence across all future timelines.
                 </p>
                 <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-all">
                    <span>Access_Akashic_Vault</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Post-Human Visual Effects */}
      <div className="fixed inset-0 pointer-events-none -z-20">
         {/* Tesseract Overlay */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-blue-500/5 rounded-full animate-pulse-slow" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-500/5 rounded-full animate-pulse-slow delay-700" />
         
         <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-blue-600/[0.03] rounded-full blur-[200px] animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] bg-purple-600/[0.03] rounded-full blur-[200px] animate-pulse delay-1000" />
      </div>

    </div>
  );
};

export default AegisCommandCenter;
