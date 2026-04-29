import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Brain, User, 
  Search, Bell, Mic, Eye, Power,
  Maximize2, Box, Activity, ChevronDown,
  Sparkles, Radio, Heart, Fingerprint,
  AlertTriangle, Lock, Cpu, Network
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useNexus } from '@/context/NexusStateContext';

const NeuralCommandBar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state } = useNexus();
  const [transcription, setTranscription] = useState('');
  
  // Simulate BCI thought-to-text
  useEffect(() => {
    if (state.neuralState === 'Focused') {
      const phrases = ['Analyzing Q3 risk exposure...', 'Verifying quantum keys...', 'Optimizing arbitrage flow...'];
      let i = 0;
      const interval = setInterval(() => {
        setTranscription(phrases[i % phrases.length]);
        i++;
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [state.neuralState]);

  return (
    <div 
      onClick={onOpenCommand}
      className="flex-1 max-w-2xl mx-8 relative group"
    >
      <div className={cn(
        "absolute inset-0 rounded-2xl blur-2xl opacity-20 transition-all duration-1000",
        state.neuralState === 'Focused' ? "bg-blue-500 scale-110" : "bg-purple-500"
      )} />
      
      <div className="relative flex items-center gap-4 px-8 py-4 glass-omega rounded-2xl border border-white/5 group-hover:border-white/20 transition-all cursor-text overflow-hidden">
        {/* Scanning Beam Animation */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent skew-x-12"
        />

        <div className="flex items-center gap-3">
           <Brain className={cn("w-5 h-5", state.neuralState === 'Focused' ? "text-blue-400" : "text-purple-400 animate-pulse")} />
           <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">BCI Input Active</span>
              <span className="text-[10px] font-bold text-white/40 italic">
                {transcription || "Listening for thought commands..."}
              </span>
           </div>
        </div>

        <div className="ml-auto flex items-center gap-6">
           <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400/50" />
              <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: ['20%', '80%', '40%'] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="h-full bg-emerald-500" 
                 />
              </div>
           </div>
           <div className="h-4 w-px bg-white/10" />
           <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md border border-white/5">
              <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">META</span>
              <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">K</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const HolographicRibbon = () => {
  return (
    <div className="absolute -bottom-1 left-0 right-0 h-px overflow-hidden">
       <motion.div 
         animate={{ x: ['-100%', '100%'] }}
         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         className="flex gap-12 whitespace-nowrap"
       >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-8 items-center">
               <span className="text-[8px] font-black text-blue-500/40 uppercase tracking-[0.3em]">QUANTUM_ENTANGLEMENT_STABLE</span>
               <span className="text-[8px] font-black text-emerald-500/40 uppercase tracking-[0.3em]">MARS_RELAY_ACTIVE</span>
               <span className="text-[8px] font-black text-rose-500/40 uppercase tracking-[0.3em]">THREAT_LEVEL_MINIMAL</span>
            </div>
          ))}
       </motion.div>
    </div>
  );
};

const OmegaPulse = () => {
  const { state, toggleOmegaProtocol } = useNexus();
  return (
    <div 
      onClick={toggleOmegaProtocol}
      className="flex items-center gap-4 px-6 py-2 glass-omega rounded-2xl border border-white/5 hover:border-red-500/30 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <motion.div 
          animate={{ 
            scale: state.isOmegaProtocol ? [1, 1.5, 1] : [1, 1.2, 1],
            opacity: state.isOmegaProtocol ? [0.6, 1, 0.6] : [0.3, 0.6, 0.3]
          }}
          transition={{ duration: state.isOmegaProtocol ? 0.5 : 2, repeat: Infinity }}
          className={cn(
            "absolute inset-0 rounded-full blur-md",
            state.isOmegaProtocol ? "bg-red-500" : "bg-blue-500"
          )}
        />
        <Shield className={cn(
          "w-5 h-5 relative z-10 transition-colors",
          state.isOmegaProtocol ? "text-red-500" : "text-blue-500"
        )} />
      </div>
      <div className="flex flex-col relative z-10">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">System State</span>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-tighter",
          state.isOmegaProtocol ? "text-red-400" : "text-white"
        )}>
          {state.isOmegaProtocol ? "OMEGA_PROTOCOL_ACTIVE" : "Aegis_Prime_V3.0"}
        </span>
      </div>
    </div>
  );
};

const NeuralNavbar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state, setMode, setNeuralState } = useNexus();
  const navigate = useNavigate();
  const [showBioAuth, setShowBioAuth] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-28 z-[100] px-8 flex items-center justify-between pointer-events-none">
       {/* Background Depth - Ultra Dark Glass */}
       <div className="absolute inset-x-0 top-0 h-28 bg-black/60 backdrop-blur-[60px] border-b border-white/5 -z-10 shadow-2xl" />
       <HolographicRibbon />
       
       <div className="flex items-center gap-10 pointer-events-auto">
          <div 
            className="flex items-center gap-5 group cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
             <div className="relative">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 group-hover:rotate-[360deg] transition-all duration-1000">
                   <Shield className="w-7 h-7 text-white" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border border-dashed border-blue-500/20 rounded-full" 
                />
             </div>
             <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none group-hover:text-blue-400 transition-colors">Nexus</span>
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.5em] mt-1">Prime Interface</span>
             </div>
          </div>
          
          <OmegaPulse />
       </div>

       <div className="flex-1 flex justify-center pointer-events-auto">
          <NeuralCommandBar onOpenCommand={onOpenCommand} />
       </div>

       <div className="flex items-center gap-10 pointer-events-auto">
          {/* Dimensional Context Switcher */}
          <div className="flex items-center gap-3 glass-omega p-2 rounded-2xl border border-white/5">
             {['Planetary', 'Orbital', 'Quantum', 'Bio'].map((m) => (
               <button
                 key={m}
                 onClick={() => setMode(m as any)}
                 className={cn(
                   "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all relative group/btn",
                   state.mode === m ? "text-white" : "text-slate-500 hover:text-slate-300"
                 )}
               >
                 {state.mode === m && (
                   <motion.div 
                     layoutId="mode-bg"
                     className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20"
                   />
                 )}
                 <span className="relative z-10">{m}</span>
               </button>
             ))}
          </div>
          
          <div className="flex items-center gap-6 border-l border-white/5 pl-10">
             <button 
               onClick={() => setNeuralState(state.neuralState === 'Focused' ? 'Calm' : 'Focused')}
               className={cn(
                 "p-3 rounded-2xl transition-all relative overflow-hidden",
                 state.neuralState === 'Focused' ? "bg-blue-600/20 text-blue-400" : "bg-white/5 text-slate-500"
               )}
             >
                <Activity className="w-5 h-5 relative z-10" />
                {state.neuralState === 'Focused' && (
                  <motion.div 
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-400"
                  />
                )}
             </button>

             <div className="relative">
                <button 
                  onClick={() => setShowBioAuth(!showBioAuth)}
                  className="flex items-center gap-4 group"
                >
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-tight">{state.wealthTicker.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                      <div className="flex items-center gap-2 mt-1">
                         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                         <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Abs_Certainty</span>
                      </div>
                   </div>
                   <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-slate-800 to-black p-[1px] group-hover:scale-105 transition-transform border border-white/10">
                      <div className="w-full h-full bg-slate-950 rounded-[1.1rem] flex items-center justify-center overflow-hidden">
                         <Fingerprint className="w-7 h-7 text-blue-500/40 group-hover:text-blue-500 transition-colors" />
                      </div>
                   </div>
                </button>

                <AnimatePresence>
                  {showBioAuth && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      className="absolute top-full right-0 mt-6 w-80 glass-omega rounded-[2.5rem] border border-white/10 p-8 shadow-2xl shadow-black/80"
                    >
                       <div className="space-y-6">
                          <div className="flex items-center justify-between">
                             <h3 className="text-xs font-black text-white uppercase tracking-widest">Bio-Profile</h3>
                             <Lock className="w-4 h-4 text-emerald-500" />
                          </div>
                          
                          <div className="space-y-4">
                             {[
                               { label: 'Heartbeat Rhythm', status: 'SYNCED', color: 'text-emerald-400' },
                               { label: 'Retinal Pattern', status: 'VERIFIED', color: 'text-blue-400' },
                               { label: 'Neural Signature', status: 'ACTIVE', color: 'text-purple-400' }
                             ].map((item, i) => (
                               <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                                  <span className={cn("text-[9px] font-black uppercase tracking-tighter", item.color)}>{item.status}</span>
                               </div>
                             ))}
                          </div>

                          <button 
                            onClick={() => navigate('/login')}
                            className="w-full py-4 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                             Disconnect Consciousness
                          </button>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
       </div>
    </header>
  );
};

export default NeuralNavbar;
