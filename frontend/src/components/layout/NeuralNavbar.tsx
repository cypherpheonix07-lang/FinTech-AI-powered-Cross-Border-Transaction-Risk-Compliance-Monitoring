import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Brain, User, 
  Search, Bell, Mic, Eye, Power,
  Maximize2, Box, Activity, ChevronDown,
  Sparkles, Radio, Heart, Fingerprint,
  AlertTriangle, Lock, Cpu, Network,
  Layers, Terminal, Server, Link as LinkIcon,
  Workflow, Globe2, CpuIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNexus } from '@/context/NexusStateContext';

const QuantumTelemetry = () => {
  const { state } = useNexus();
  
  return (
    <div className="flex items-center gap-6 px-6 py-2 glass-omega rounded-2xl border border-white/5 cursor-default">
       <div className="flex flex-col items-start border-r border-white/10 pr-6">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Network Latency</span>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             <span className="text-[10px] font-black text-emerald-400 font-mono tracking-tighter">
                {state.networkLatency.toFixed(3)}ms
             </span>
          </div>
       </div>
       <div className="flex flex-col items-start border-r border-white/10 pr-6">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Quantum Security</span>
          <div className="flex items-center gap-2">
             <Shield className="w-3 h-3 text-cyan-400" />
             <span className="text-[10px] font-black text-cyan-400 font-mono tracking-tighter">
                AES-Q_{state.quantumEncryptionLevel}%
             </span>
          </div>
       </div>
       <div className="flex flex-col items-start">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Nodes</span>
          <div className="flex items-center gap-2">
             <Server className="w-3 h-3 text-blue-400" />
             <span className="text-[10px] font-black text-white font-mono tracking-tighter">
                {state.activeNodes.toLocaleString()}
             </span>
          </div>
       </div>
    </div>
  );
};

const WorkspaceSwitcher = () => {
  const { state, setMode } = useNexus();
  const [isOpen, setIsOpen] = useState(false);
  
  const workspaces = [
    { id: 'Personal', label: 'Personal Node', icon: User, color: 'text-blue-400' },
    { id: 'Enterprise', label: 'Enterprise Nexus', icon: Server, color: 'text-purple-400' },
    { id: 'Government', label: 'Gov_Secure_Layer', icon: Shield, color: 'text-amber-400' },
    { id: 'Quantum', label: 'Quantum Dimension', icon: Zap, color: 'text-cyan-400' }
  ];

  return (
    <div className="relative pointer-events-auto">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center gap-3 px-4 py-2 glass-omega rounded-xl border border-white/5 hover:border-white/20 transition-all group"
       >
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          <span className="text-[9px] font-black text-white uppercase tracking-widest">{state.mode} Hub</span>
          <ChevronDown className={cn("w-3 h-3 text-slate-500 transition-transform", isOpen && "rotate-180")} />
       </button>
       
       <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-3 w-64 glass-omega rounded-2xl border border-white/10 p-4 shadow-2xl z-[200]"
            >
               <div className="space-y-1">
                  {workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => { setMode(ws.id as any); setIsOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-4 p-3 rounded-xl transition-all group/item",
                        state.mode === ws.id ? "bg-blue-600/10 border border-blue-500/20" : "hover:bg-white/5"
                      )}
                    >
                       <ws.icon className={cn("w-4 h-4", ws.color)} />
                       <span className="text-[10px] font-bold text-slate-300 group-hover/item:text-white uppercase tracking-widest">{ws.label}</span>
                    </button>
                  ))}
               </div>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

const NeuralIntentBar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state } = useNexus();
  const [intent, setIntent] = useState('Awaiting Neural Intent...');
  
  useEffect(() => {
    if (state.neuralState === 'Focused') {
      const intents = [
        'Tracing transaction hash: 0x8a42...9f21',
        'Verifying verified paths for node_1420',
        'Analyzing capital flight patterns: SE-Asia',
        'Initiating Quantum-Safe handshake...'
      ];
      let i = 0;
      const interval = setInterval(() => {
        setIntent(intents[i % intents.length]);
        i++;
      }, 4000);
      return () => clearInterval(interval);
    } else {
      setIntent('Awaiting Neural Intent...');
    }
  }, [state.neuralState]);

  return (
    <div 
      onClick={onOpenCommand}
      className="flex-1 max-w-xl mx-6 pointer-events-auto relative group cursor-pointer"
    >
       <div className={cn(
         "absolute inset-0 rounded-2xl blur-xl transition-all duration-1000",
         state.neuralState === 'Focused' ? "bg-blue-500/10" : "bg-purple-500/5"
       )} />
       
       <div className="relative flex items-center gap-4 px-6 py-3 glass-omega rounded-2xl border border-white/5 hover:border-white/10 transition-all overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent skew-x-12"
          />
          
          <div className="flex items-center gap-3">
             <div className="relative">
                <Brain className={cn("w-4 h-4", state.neuralState === 'Focused' ? "text-blue-400" : "text-slate-600")} />
                {state.neuralState === 'Focused' && (
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-400 rounded-full blur-sm"
                  />
                )}
             </div>
             <div className="flex flex-col">
                <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Command HUD</span>
                <span className="text-[10px] font-bold text-white/50 italic tracking-tight">{intent}</span>
             </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
             <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                    className="w-0.5 bg-blue-500/30 rounded-full"
                  />
                ))}
             </div>
             <div className="px-2 py-1 bg-white/5 rounded border border-white/5 flex items-center gap-2">
                <span className="text-[8px] font-black text-slate-600">CMD + K</span>
             </div>
          </div>
       </div>
    </div>
  );
};

const BreadcrumbTrace = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  return (
    <div className="flex items-center gap-2 ml-10">
       <div className="p-1.5 glass-omega rounded-lg border border-white/5">
          <Globe2 className="w-3 h-3 text-slate-500" />
       </div>
       <div className="flex items-center gap-1">
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">NEXUS</span>
          {pathParts.map((part, i) => (
            <React.Fragment key={i}>
               <span className="text-slate-800 font-black text-[10px]">/</span>
               <span className="text-[9px] font-black text-blue-500/80 uppercase tracking-widest">{part.replace('-', '_')}</span>
            </React.Fragment>
          ))}
       </div>
    </div>
  );
};

const NeuralNavbar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const { state, toggleOmegaProtocol } = useNexus();
  const navigate = useNavigate();
  const [showBioAuth, setShowBioAuth] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-28 z-[100] px-8 flex items-center justify-between pointer-events-none">
       {/* Background Depth */}
       <div className="absolute inset-x-0 top-0 h-28 bg-black/60 backdrop-blur-[60px] border-b border-white/5 -z-10 shadow-2xl" />
       
       <div className="flex items-center gap-8 pointer-events-auto">
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
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border border-dashed border-blue-500/20 rounded-full" 
                />
             </div>
             <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">TransactTrace</span>
                <div className="flex items-center gap-2 mt-1">
                   <div className="px-1.5 py-0.5 bg-blue-600/20 border border-blue-500/20 rounded text-[7px] font-black text-blue-400 uppercase tracking-widest">Nexus Prime</div>
                   <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                   <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em]">Absolute Transparency</span>
                </div>
             </div>
          </div>
          
          <BreadcrumbTrace />
       </div>

       <div className="flex-1 flex justify-center items-center pointer-events-auto">
          <WorkspaceSwitcher />
          <NeuralIntentBar onOpenCommand={onOpenCommand} />
          <QuantumTelemetry />
       </div>

       <div className="flex items-center gap-8 pointer-events-auto">
          <div className="flex items-center gap-6 border-r border-white/5 pr-8">
             <button 
               onClick={toggleOmegaProtocol}
               className={cn(
                 "p-3 rounded-2xl transition-all relative overflow-hidden group",
                 state.isOmegaProtocol ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]" : "bg-white/5 border border-white/5 hover:border-red-500/30"
               )}
             >
                <Power className={cn("w-5 h-5 relative z-10", state.isOmegaProtocol ? "text-white" : "text-slate-500 group-hover:text-red-500")} />
                {state.isOmegaProtocol && (
                   <motion.div 
                     animate={{ opacity: [0.5, 1, 0.5] }}
                     transition={{ duration: 0.5, repeat: Infinity }}
                     className="absolute inset-0 bg-red-400"
                   />
                )}
             </button>
             
             <div className="relative">
                <Bell className="w-5 h-5 text-slate-500 hover:text-white transition-colors cursor-pointer" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-black flex items-center justify-center">
                   <span className="text-[6px] font-black text-white">4</span>
                </div>
             </div>
          </div>

          <button 
            onClick={() => setShowBioAuth(!showBioAuth)}
            className="flex items-center gap-4 group"
          >
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-white tracking-widest leading-tight uppercase font-mono">{state.wealthTicker.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                <span className="text-[7px] font-black text-emerald-400 uppercase tracking-[0.2em] mt-1">Bio_Verified</span>
             </div>
             <div className="relative">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors bg-gradient-to-br from-slate-800 to-black p-[1px]">
                   <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                      <Fingerprint className="w-7 h-7 text-blue-500/40 group-hover:text-blue-500 transition-colors" />
                   </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>
             </div>
          </button>
       </div>
    </header>
  );
};

export default NeuralNavbar;
