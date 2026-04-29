import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Brain, User, 
  Search, Bell, Mic, Eye, Power,
  Maximize2, Box, Activity, ChevronDown,
  Sparkles, Radio, Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const OmegaStatus = () => {
  const [threatLevel, setThreatLevel] = useState(0.04);
  
  return (
    <div className="flex items-center gap-4 px-6 py-2 glass-omega rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-default group">
      <div className="relative">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-blue-500 rounded-full blur-md"
        />
        <Shield className="w-5 h-5 text-blue-500 relative z-10 group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">System State</span>
        <span className="text-[10px] font-black text-white uppercase tracking-tighter">Omega v3.0 Nominal</span>
      </div>
      
      {/* Expanded Hover Intel */}
      <div className="hidden group-hover:flex absolute top-full left-0 mt-4 p-6 glass-omega rounded-[2rem] border border-white/10 w-64 flex-col gap-4 shadow-2xl shadow-black/50 z-50">
        <div className="space-y-2">
           <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
              <span>Latency</span>
              <span className="text-emerald-400">12.0ms</span>
           </div>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[12%] bg-emerald-500" />
           </div>
        </div>
        <div className="space-y-2">
           <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
              <span>Entanglement</span>
              <span className="text-blue-400">99.9%</span>
           </div>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[99%] bg-blue-500" />
           </div>
        </div>
        <div className="pt-2 border-t border-white/5">
           <p className="text-[7px] font-medium text-slate-500 leading-relaxed uppercase">
              Secure planetary nodes synced across 14 dimensions. Threat forensics active.
           </p>
        </div>
      </div>
    </div>
  );
};

const IntentEngine = ({ onOpenCommand }: any) => {
  return (
    <div 
      onClick={onOpenCommand}
      className="flex-1 max-w-xl mx-8 relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-3 px-6 py-3 glass-omega rounded-2xl border border-white/5 group-hover:border-white/20 transition-all cursor-text">
        <Search className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
        <span className="text-xs text-slate-500 font-medium">Neural Intent: "Execute arbitrage flow..."</span>
        <div className="ml-auto flex items-center gap-3">
           <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md border border-white/5">
              <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">CTRL</span>
              <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">K</span>
           </div>
           <Mic className="w-4 h-4 text-slate-600 hover:text-purple-400 transition-colors" />
           <Sparkles className="w-4 h-4 text-slate-600 hover:text-blue-400 transition-colors animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const ContextSwitcher = () => {
  const [mode, setMode] = useState('Planetary');
  
  return (
    <div className="flex items-center gap-2">
       {['Planetary', 'Orbital', 'Quantum', 'Bio'].map((m) => (
         <button
           key={m}
           onClick={() => setMode(m)}
           className={cn(
             "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all relative overflow-hidden",
             mode === m ? "text-white bg-white/10" : "text-slate-500 hover:text-slate-300"
           )}
         >
           {mode === m && (
             <motion.div 
               layoutId="context-bg"
               className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
             />
           )}
           <span className="relative z-10">{m}</span>
         </button>
       ))}
       <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center ml-2 group cursor-pointer hover:border-blue-500/50 transition-all">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
             <Box className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
          </motion.div>
       </div>
    </div>
  );
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-4 pl-4 border-l border-white/5 group"
      >
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-white uppercase tracking-tighter">Nexus_User_01</span>
          <div className="flex items-center gap-1.5 mt-0.5">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Bio-Verified</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-[1px] group-hover:scale-105 transition-transform shadow-xl shadow-blue-900/20">
           <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center overflow-hidden">
              <User className="w-6 h-6 text-white/50" />
           </div>
        </div>
      </button>

      <AnimatePresence>
        {showProfile && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-4 w-72 glass-omega rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-black/80 z-50 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Brain className="w-32 h-32 text-white" />
            </div>
            
            <div className="relative z-10 space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Wealth</p>
                     <p className="text-xl font-black text-white tracking-tighter">$14,204,992.00</p>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reputation</p>
                     <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-3 bg-blue-500 rounded-sm" />)}
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  {[
                    { label: 'Neural Calibration', icon: Radio },
                    { label: 'Consciousness Settings', icon: Sparkles },
                    { label: 'Asset Forensics', icon: Search },
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group">
                       <item.icon className="w-4 h-4 text-slate-500 group-hover:text-white" />
                       <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase tracking-widest">{item.label}</span>
                    </button>
                  ))}
               </div>

               <button 
                 onClick={() => navigate('/login')}
                 className="w-full py-4 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3"
               >
                 <Power className="w-4 h-4" />
                 Disconnect Consciousness
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NeuralNavbar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-24 z-[100] px-8 flex items-center justify-between pointer-events-none">
       {/* Background Blur Strip */}
       <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md -z-10" />
       
       <div className="flex items-center gap-8 pointer-events-auto">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = '/'}>
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform">
                <Shield className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">Aegis</span>
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mt-1">Omega Protocol</span>
             </div>
          </div>
          
          <OmegaStatus />
       </div>

       <div className="flex-1 flex justify-center pointer-events-auto">
          <IntentEngine onOpenCommand={onOpenCommand} />
       </div>

       <div className="flex items-center gap-8 pointer-events-auto">
          <ContextSwitcher />
          
          <div className="flex items-center gap-4 pr-8">
             <button className="relative p-2 text-slate-400 hover:text-white transition-colors group">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
             </button>
             <button className="p-2 text-slate-400 hover:text-white transition-colors group">
                <Activity className="w-5 h-5 group-hover:scale-110 transition-transform text-rose-500" />
             </button>
          </div>

          <UserProfile />
       </div>
    </header>
  );
};

export default NeuralNavbar;
