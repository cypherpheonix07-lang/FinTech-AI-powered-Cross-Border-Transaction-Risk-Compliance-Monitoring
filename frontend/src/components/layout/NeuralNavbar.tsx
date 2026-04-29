import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Brain, User, 
  Search, Bell, Mic, Eye, Power,
  Activity, ChevronDown, Sparkles, Radio, 
  Heart, Fingerprint, Lock, Cpu, Network,
  Workflow, Globe2, Target, Waves, 
  Thermometer, Gauge, Command, Infinity as InfinityIcon,
  Clock, Timer, Wind, Sun, Star, Atom
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNexus } from '@/context/NexusStateContext';

const AutopoieticStatus = () => {
  const { state } = useNexus();
  return (
    <div className="flex items-center gap-6 px-8 py-3 glass-omega rounded-[2rem] border border-white/5 cursor-default group relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
       
       <div className="flex flex-col items-start border-r border-white/10 pr-6">
          <div className="flex items-center gap-2 mb-1">
             <Atom className="w-3 h-3 text-emerald-400 animate-spin-slow" />
             <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">Autopoietic_Org</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  animate={{ width: `${state.autopoieticHealth}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                />
             </div>
             <span className="text-[9px] font-black text-emerald-400 font-mono">{state.autopoieticHealth}%</span>
          </div>
       </div>

       <div className="flex flex-col items-start border-r border-white/10 pr-6">
          <div className="flex items-center gap-2 mb-1">
             <Radio className="w-3 h-3 text-blue-400" />
             <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">Hive_Sync</span>
          </div>
          <div className="flex items-end gap-1">
             <span className="text-sm font-black text-white leading-none tracking-tighter">{state.hiveMindSync.toFixed(1)}</span>
             <span className="text-[8px] font-black text-slate-500 uppercase mb-0.5">%</span>
          </div>
       </div>

       <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-1">
             <Waves className="w-3 h-3 text-purple-400" />
             <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">Temporal_Drift</span>
          </div>
          <span className="text-[9px] font-black text-purple-400 font-mono tracking-widest">{state.temporalDrift.toFixed(5)}s</span>
       </div>
    </div>
  );
};

const OmniValueTicker = () => {
  const { state } = useNexus();
  const [index, setIndex] = useState(0);
  
  const values = [
    { label: 'Fiat/Crypto', val: state.wealthTicker.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), color: 'text-emerald-400', icon: DollarIcon },
    { label: 'Energy Capital', val: state.energyCredits.toFixed(1) + ' kWh', color: 'text-blue-400', icon: Zap },
    { label: 'Karma Weight', val: state.karmaScore + '.00 Ω', color: 'text-amber-400', icon: Star },
    { label: 'Time Remaining', val: state.timeCapital.toFixed(1) + ' Years', color: 'text-rose-400', icon: Clock }
  ];

  useEffect(() => {
    const interval = setInterval(() => setIndex(prev => (prev + 1) % values.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const current = values[index];
  const Icon = current.icon;

  return (
    <div className="flex flex-col items-end min-w-[120px]">
       <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-end"
          >
             <span className={cn("text-xs font-black tracking-widest leading-tight uppercase font-mono", current.color)}>
                {current.val}
             </span>
             <div className="flex items-center gap-2 mt-1">
                <Icon className={cn("w-2.5 h-2.5", current.color)} />
                <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em]">{current.label}</span>
             </div>
          </motion.div>
       </AnimatePresence>
    </div>
  );
};

const DollarIcon = ({ className }: { className?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const ConsciousnessStreamHUD = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state } = useNexus();
  const [transcription, setTranscription] = useState('Direct Consciousness Stream Active...');

  useEffect(() => {
    if (state.neuralState === 'Unity' || state.neuralState === 'Ascended' || state.neuralState === 'Focused') {
      const phrases = [
        'Collapsing multiversal arbitrage paradoxes...',
        'Manifesting social capital via karma-loop...',
        'Accelerating singularity takeoff speed...',
        'Consulting future-self (v.2045) on portfolio...',
        'Syncing collective unconscious with market-mesh...'
      ];
      let i = 0;
      const interval = setInterval(() => {
        setTranscription(phrases[i % phrases.length]);
        i++;
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [state.neuralState]);

  return (
    <div 
      onClick={onOpenCommand}
      className="flex-1 max-w-2xl mx-10 relative pointer-events-auto cursor-pointer group"
    >
       <div className={cn(
         "absolute inset-0 rounded-[3rem] blur-3xl transition-all duration-1000",
         state.neuralState === 'Unity' ? "bg-blue-500/20 scale-110" : "bg-blue-500/5"
       )} />
       
       <div className="relative flex items-center gap-6 px-10 py-5 glass-omega rounded-[3rem] border border-white/5 group-hover:border-blue-500/20 transition-all overflow-hidden shadow-2xl">
          {/* Animated Quantum Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <svg width="100%" height="100%">
                <pattern id="nav-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                   <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#nav-grid)" />
             </svg>
          </div>

          <motion.div 
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent skew-x-12"
          />
          
          <div className="flex items-center gap-5">
             <div className="relative">
                <Brain className={cn("w-6 h-6", state.neuralState === 'Unity' ? "text-blue-400" : "text-slate-500 animate-pulse")} />
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-500 rounded-full blur-md"
                />
             </div>
             <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em]">Consciousness Stream</span>
                <span className="text-xs font-bold text-white/60 italic tracking-tight truncate max-w-[300px]">{transcription}</span>
             </div>
          </div>

          <div className="ml-auto flex items-center gap-8">
             {/* Timeline Scrubber Mock */}
             <div className="flex flex-col items-center">
                <div className="flex gap-1.5 h-6 items-center">
                   {[...Array(8)].map((_, i) => (
                     <motion.div 
                       key={i}
                       animate={{ 
                         height: [4, 12, 4],
                         backgroundColor: i === 4 ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.1)'
                       }}
                       transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                       className="w-1 rounded-full"
                     />
                   ))}
                </div>
                <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest mt-1">Timeline_V_Control</span>
             </div>
             
             <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Coherence</span>
                <span className="text-[10px] font-mono text-blue-400 font-black">{state.probabilityCoherence.toFixed(2)}%</span>
             </div>
          </div>
       </div>
    </div>
  );
};

const OmniProtocolBadge = () => {
  const { state, toggleOmegaProtocol } = useNexus();
  
  return (
    <div 
      onClick={toggleOmegaProtocol}
      className={cn(
        "flex items-center gap-5 px-8 py-3 rounded-[1.5rem] border transition-all cursor-pointer group relative overflow-hidden",
        state.isOmegaProtocol 
          ? "bg-red-600/20 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)]" 
          : "glass-omega border-white/5 hover:border-blue-500/30"
      )}
    >
       <div className="relative">
          <motion.div 
            animate={{ 
              scale: state.isOmegaProtocol ? [1, 1.6, 1] : 1,
              rotate: 360
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={cn(
              "absolute -inset-2 rounded-full border border-dashed",
              state.isOmegaProtocol ? "border-red-500/50" : "border-blue-500/20"
            )}
          />
          <InfinityIcon className={cn(
            "w-6 h-6 relative z-10 transition-colors duration-700",
            state.isOmegaProtocol ? "text-red-500" : "text-blue-500"
          )} />
       </div>
       <div className="flex flex-col relative z-10">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">Omni-Omnipotent</span>
          <span className={cn(
            "text-[12px] font-black uppercase tracking-tighter italic",
            state.isOmegaProtocol ? "text-red-400" : "text-white"
          )}>
            {state.isOmegaProtocol ? "SINGULARITY_EVENT_ACTIVE" : state.protocolVersion}
          </span>
       </div>
    </div>
  );
};

const NeuralNavbar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state, setMode } = useNexus();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-36 z-[100] px-12 flex items-center justify-between pointer-events-none">
       {/* Deep Space Background HUD */}
       <div className="absolute inset-x-0 top-0 h-36 bg-black/40 backdrop-blur-[100px] border-b border-white/5 -z-10 shadow-[0_20px_100px_rgba(0,0,0,0.8)]" />
       
       <div className="flex items-center gap-12 pointer-events-auto">
          <div 
            className="flex items-center gap-8 group cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
             <div className="relative">
                <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.5)] group-hover:rotate-[360deg] transition-all duration-1000 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                   <Shield className="w-9 h-9 text-white relative z-10" />
                </div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-blue-500/10 rounded-full" 
                />
             </div>
             <div className="flex flex-col">
                <span className="text-4xl font-black text-white tracking-[ -0.05em] uppercase italic leading-none group-hover:text-blue-400 transition-colors">Aegis</span>
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.8em] mt-2 flex items-center gap-2">
                   <div className="w-1 h-1 bg-blue-500 rounded-full" />
                   OMNIPRESENCE
                </span>
             </div>
          </div>
          
          <OmniProtocolBadge />
       </div>

       <div className="flex-1 flex justify-center items-center pointer-events-auto">
          <ConsciousnessStreamHUD onOpenCommand={onOpenCommand} />
          <AutopoieticStatus />
       </div>

       <div className="flex items-center gap-12 pointer-events-auto">
          {/* Dimensional Portal Switcher v2.0 */}
          <div className="flex items-center gap-2 glass-omega p-2 rounded-[1.5rem] border border-white/5">
             {['Planetary', 'Quantum', 'Multiverse', 'Nirvana'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={cn(
                    "px-5 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all relative group/btn",
                    state.mode === m ? "text-white" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {state.mode === m && (
                    <motion.div 
                      layoutId="mode-glow-v2"
                      className="absolute inset-0 bg-blue-600 rounded-[1.2rem] shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    />
                  )}
                  <span className="relative z-10">{m === 'Nirvana' ? 'Ω' : m}</span>
                </button>
             ))}
          </div>

          <button className="flex items-center gap-6 group">
             <OmniValueTicker />
             <div className="relative">
                <div className="w-16 h-16 rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all bg-gradient-to-br from-slate-900 to-black p-[1px] shadow-2xl relative">
                   <div className="w-full h-full bg-slate-950 rounded-[1.9rem] flex items-center justify-center overflow-hidden">
                      <Fingerprint className="w-9 h-9 text-blue-500/30 group-hover:text-blue-500 transition-all duration-700" />
                      {/* Ontological Identity Wave */}
                      <motion.div 
                        animate={{ height: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 w-full bg-blue-500/5 blur-sm"
                      />
                   </div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-black flex items-center justify-center">
                   <InfinityIcon className="w-3 h-3 text-white" />
                </div>
             </div>
          </button>
       </div>
    </header>
  );
};

export default NeuralNavbar;
