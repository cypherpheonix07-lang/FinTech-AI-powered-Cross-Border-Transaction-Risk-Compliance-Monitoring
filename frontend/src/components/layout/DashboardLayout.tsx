import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Globe, Shield, Zap } from 'lucide-react';
import NeuralNavbar from './NeuralNavbar';
import QuantumSidebar from './QuantumSidebar';
import CommandCenter from './CommandCenter';
import { ErrorBoundary } from '../ErrorBoundary';
import { NexusProvider, useNexus } from '@/context/NexusStateContext';
import { cn } from '@/lib/utils';

const GlobalFlowBackground = () => {
  const { state } = useNexus();
  
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#020202]">
       {/* 🌀 Neural Mesh Animation */}
       <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
             <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
             </pattern>
             <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
       </div>

       {/* 🚀 Dynamic Flow Particles */}
       {[...Array(15)].map((_, i) => (
         <motion.div
           key={i}
           initial={{ 
             x: Math.random() * 100 + '%', 
             y: Math.random() * 100 + '%',
             opacity: 0,
             scale: 0
           }}
           animate={{ 
             x: [null, Math.random() * 100 + '%'],
             y: [null, Math.random() * 100 + '%'],
             opacity: [0, 0.4, 0],
             scale: [0, 1.5, 0]
           }}
           transition={{ 
             duration: 10 + Math.random() * 20, 
             repeat: Infinity, 
             ease: "linear",
             delay: Math.random() * 5
           }}
           className={cn(
             "absolute w-1 h-1 rounded-full blur-sm",
             state.isOmegaProtocol ? "bg-red-500" : "bg-blue-500"
           )}
         />
       ))}

       {/* 🌫️ Atmosphere Glows */}
       <motion.div 
         animate={{ 
           scale: state.isOmegaProtocol ? [1, 1.3, 1] : [1, 1.1, 1],
           opacity: state.isOmegaProtocol ? [0.1, 0.3, 0.1] : [0.05, 0.1, 0.05]
         }}
         transition={{ duration: 15, repeat: Infinity }}
         className={cn(
           "absolute top-0 left-1/3 w-[1500px] h-[1000px] rounded-full blur-[250px]",
           state.isOmegaProtocol ? "bg-red-900/20" : "bg-blue-900/10"
         )} 
       />
       <div className={cn(
         "absolute -bottom-1/4 -right-1/4 w-[1200px] h-[800px] rounded-full blur-[200px] animate-pulse",
         state.isOmegaProtocol ? "bg-red-600/5" : "bg-purple-600/5"
       )} />

       {/* Scanline Overlay */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-[0.03]" />
    </div>
  );
};

const NeuralLatencyOverlay = () => {
  const { state } = useNexus();
  return (
    <AnimatePresence>
       {state.networkLatency > 0.28 && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[1000] pointer-events-none mix-blend-overlay opacity-20"
         >
            <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[1px]" />
         </motion.div>
       )}
    </AnimatePresence>
  );
};

function DashboardLayoutContent() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { state } = useNexus();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className={cn(
      "min-h-screen selection:bg-blue-500/30 font-rajdhani",
      state.isOmegaProtocol ? "bg-[#0a0000]" : "bg-[#020202]"
    )}>
      <GlobalFlowBackground />
      <NeuralLatencyOverlay />

      {/* 🚀 TransactTrace HUD Layer */}
      <NeuralNavbar onOpenCommand={() => setIsCommandOpen(true)} />

      {/* 🌀 Dimensional Spine (Sidebar) */}
      <QuantumSidebar />

      {/* 🚨 Omega Protocol Overlay */}
      <AnimatePresence>
        {state.isOmegaProtocol && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] pointer-events-none border-[30px] border-red-600/10 backdrop-invert-[0.02] animate-glitch"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <Shield className="w-40 h-40 text-red-600 animate-pulse" />
                <h1 className="text-8xl font-black text-red-600 uppercase italic tracking-tighter mt-10 skew-x-12">Omega Active</h1>
                <div className="flex items-center gap-4 mt-4">
                   <div className="w-12 h-1 bg-red-600 animate-ping" />
                   <span className="text-2xl font-black text-red-500 uppercase tracking-[1.5em]">System Lockdown</span>
                   <div className="w-12 h-1 bg-red-600 animate-ping" />
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Main Dimensional Stage */}
      <div className="flex flex-col min-h-screen pt-28 ml-80 relative transition-all duration-700">
        <CommandCenter 
          isOpen={isCommandOpen} 
          onClose={() => setIsCommandOpen(false)} 
        />
        
        <main className="flex-1 p-12 overflow-x-hidden relative text-white">
          <ErrorBoundary>
            <div className="animate-fade-up max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </ErrorBoundary>
        </main>

        {/* Floating Atmospheric Particles (Noise) */}
        <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* Dimensional Telemetry Footer HUD */}
      <footer className="fixed bottom-0 left-80 right-0 h-10 border-t border-white/5 bg-black/40 backdrop-blur-md z-[80] flex items-center justify-between px-10">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-1 h-1 bg-emerald-500 rounded-full" />
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Consensus Finalized: 0.2ms ago</span>
            </div>
            <div className="w-px h-3 bg-white/5" />
            <div className="flex items-center gap-2">
               <Zap className="w-3 h-3 text-blue-500" />
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">TPS: 1.4M / S</span>
            </div>
         </div>
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Entropy:</span>
               <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['20%', '60%', '40%'] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="h-full bg-blue-500" 
                  />
               </div>
            </div>
            <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.3em]">Absolute Transparency Mode Active</span>
         </div>
      </footer>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <NexusProvider>
      <DashboardLayoutContent />
    </NexusProvider>
  );
}
