import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Brain, User, 
  Search, Bell, Mic, Eye, Power,
  Maximize2, Box, Activity, ChevronDown,
  Sparkles, Radio, Heart, Fingerprint,
  AlertTriangle, Lock, Cpu, Network,
  Workflow, Globe2, CpuIcon, Command,
  Waves, Thermometer, Gauge, Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNexus } from '@/context/NexusStateContext';

const NeuralInterfaceHUD = () => {
  const { state } = useNexus();
  
  return (
    <div className="flex items-center gap-6 px-8 py-3 glass-omega rounded-[2rem] border border-white/5 cursor-default relative overflow-hidden group">
       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
       
       {/* fNIRS Cognitive Load Monitor */}
       <div className="flex flex-col items-start border-r border-white/10 pr-6">
          <div className="flex items-center gap-2 mb-1">
             <Waves className="w-3 h-3 text-cyan-400" />
             <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">fNIRS_Cognitive</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  animate={{ width: `${state.cognitiveLoad}%` }}
                  className={cn(
                    "h-full transition-all duration-1000",
                    state.cognitiveLoad > 70 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-cyan-500"
                  )} 
                />
             </div>
             <span className="text-[9px] font-black text-white font-mono">{state.cognitiveLoad}%</span>
          </div>
       </div>

       {/* Biometric Heartbeat Sync */}
       <div className="flex flex-col items-start border-r border-white/10 pr-6">
          <div className="flex items-center gap-2 mb-1">
             <Heart className="w-3 h-3 text-rose-500 animate-pulse" />
             <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">Bio_Sync</span>
          </div>
          <div className="flex items-end gap-1">
             <span className="text-sm font-black text-white leading-none tracking-tighter">{state.heartRate.toFixed(0)}</span>
             <span className="text-[8px] font-black text-slate-500 uppercase mb-0.5">BPM</span>
          </div>
       </div>

       {/* EEG Neural Signature */}
       <div className="flex flex-col items-start pr-2">
          <div className="flex items-center gap-2 mb-1">
             <Radio className="w-3 h-3 text-blue-400" />
             <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">EEG_Signature</span>
          </div>
          <span className="text-[9px] font-black text-blue-400 font-mono tracking-widest">{state.neuralSignature}</span>
       </div>
    </div>
  );
};

const OmegaProtocolBadge = () => {
  const { state, toggleOmegaProtocol } = useNexus();
  
  return (
    <div 
      onClick={toggleOmegaProtocol}
      className={cn(
        "flex items-center gap-4 px-6 py-2 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden",
        state.isOmegaProtocol 
          ? "bg-red-600/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]" 
          : "glass-omega border-white/5 hover:border-red-500/30"
      )}
    >
       <div className="relative">
          <motion.div 
            animate={{ 
              scale: state.isOmegaProtocol ? [1, 1.4, 1] : 1,
              opacity: state.isOmegaProtocol ? [0.4, 1, 0.4] : 0.2
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
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
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">System Protocol</span>
          <span className={cn(
            "text-[10px] font-black uppercase tracking-tighter",
            state.isOmegaProtocol ? "text-red-400" : "text-white"
          )}>
            {state.isOmegaProtocol ? "OMEGA_V4.0_ACTIVE" : state.protocolVersion}
          </span>
       </div>
    </div>
  );
};

const NeuralCommandHUD = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state } = useNexus();
  const [transcription, setTranscription] = useState('Listening for Neural Intent...');

  useEffect(() => {
    if (state.neuralState === 'Focused') {
      const phrases = [
        'Predicting capital flight in SE-Asia...',
        'Resolving 0x84a2 entity relationships...',
        'Optimizing Quantum-Safe handshake...',
        'Analyzing dream-state risk patterns...'
      ];
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
      className="flex-1 max-w-xl mx-8 relative pointer-events-auto cursor-pointer group"
    >
       <div className={cn(
         "absolute inset-0 rounded-[2.5rem] blur-2xl transition-all duration-1000",
         state.neuralState === 'Focused' ? "bg-blue-500/10 scale-105" : "bg-purple-500/5"
       )} />
       
       <div className="relative flex items-center gap-5 px-8 py-4 glass-omega rounded-[2.5rem] border border-white/5 group-hover:border-white/10 transition-all overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent skew-x-12"
          />
          
          <div className="flex items-center gap-4">
             <div className="relative">
                <Brain className={cn("w-5 h-5", state.neuralState === 'Focused' ? "text-blue-400" : "text-slate-600 animate-pulse")} />
                {state.neuralState === 'Focused' && (
                  <motion.div 
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-400 rounded-full blur-sm"
                  />
                )}
             </div>
             <div className="flex flex-col">
                <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Intent Stream</span>
                <span className="text-[11px] font-bold text-white/40 italic tracking-tight">{transcription}</span>
             </div>
          </div>

          <div className="ml-auto flex items-center gap-5">
             <div className="flex gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 16, 4] }}
                    transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                    className="w-0.5 bg-blue-500/20 rounded-full"
                  />
                ))}
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-slate-600 uppercase">Latency</span>
                <span className="text-[9px] font-mono text-blue-500">{state.networkLatency.toFixed(3)}ms</span>
             </div>
          </div>
       </div>
    </div>
  );
};

const NeuralNavbar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state, setMode } = useNexus();
  const navigate = useNavigate();
  const [showBioAuth, setShowBioAuth] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-32 z-[100] px-10 flex items-center justify-between pointer-events-none">
       {/* Background Depth HUD */}
       <div className="absolute inset-x-0 top-0 h-32 bg-black/60 backdrop-blur-[80px] border-b border-white/5 -z-10 shadow-2xl" />
       
       <div className="flex items-center gap-10 pointer-events-auto">
          <div 
            className="flex items-center gap-6 group cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
             <div className="relative">
                <div className="w-14 h-14 bg-blue-600 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] group-hover:rotate-[360deg] transition-all duration-1000">
                   <Shield className="w-8 h-8 text-white" />
                </div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 border border-dashed border-blue-500/20 rounded-full" 
                />
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none group-hover:text-blue-400 transition-colors">Aegis</span>
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.6em] mt-1.5">Absolute Transparency</span>
             </div>
          </div>
          
          <OmegaProtocolBadge />
       </div>

       <div className="flex-1 flex justify-center items-center pointer-events-auto">
          <NeuralCommandHUD onOpenCommand={onOpenCommand} />
          <NeuralInterfaceHUD />
       </div>

       <div className="flex items-center gap-10 pointer-events-auto">
          {/* Dimensional Portal Switcher */}
          <div className="flex items-center gap-3 glass-omega p-2 rounded-2xl border border-white/5">
             {['Planetary', 'Orbital', 'Quantum', 'Multiverse'].map((m) => (
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
                      layoutId="mode-glow"
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30"
                    />
                  )}
                  <span className="relative z-10">{m}</span>
                </button>
             ))}
          </div>

          <button 
            onClick={() => setShowBioAuth(!showBioAuth)}
            className="flex items-center gap-5 group"
          >
             <div className="flex flex-col items-end">
                <span className="text-xs font-black text-white tracking-widest leading-tight uppercase font-mono">{state.wealthTicker.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                <div className="flex items-center gap-2 mt-1">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[7px] font-black text-emerald-400 uppercase tracking-[0.3em]">Retinal_Sync_Active</span>
                </div>
             </div>
             <div className="relative">
                <div className="w-14 h-14 rounded-3xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all bg-gradient-to-br from-slate-800 to-black p-[1px] shadow-2xl">
                   <div className="w-full h-full bg-slate-950 rounded-[1.6rem] flex items-center justify-center">
                      <Fingerprint className="w-8 h-8 text-blue-500/40 group-hover:text-blue-500 transition-colors" />
                   </div>
                </div>
                <AnimatePresence>
                   {state.retinalSync && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.5 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-black flex items-center justify-center"
                     >
                        <Eye className="w-3 h-3 text-white" />
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </button>
       </div>
    </header>
  );
};

export default NeuralNavbar;
