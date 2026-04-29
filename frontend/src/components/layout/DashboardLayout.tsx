import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralNavbar from './NeuralNavbar';
import QuantumSidebar from './QuantumSidebar';
import CommandCenter from './CommandCenter';
import { useNexus } from '@/context/NexusStateContext';
import { cn } from '@/lib/utils';
import { ShieldCheck, Activity, Brain, Infinity as InfinityIcon } from 'lucide-react';

const OntologicalSecurityLayer = () => {
  const { state } = useNexus();
  return (
    <div className="fixed bottom-12 right-12 z-[200] flex items-center gap-6">
       <div className="flex flex-col items-end">
          <div className="flex items-center gap-3 mb-1">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Reality_Stable</span>
          </div>
          <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest italic">Ontological_Security_Active</span>
       </div>
       
       <div className="w-20 h-20 glass-omega rounded-3xl border border-white/10 flex items-center justify-center relative group cursor-pointer hover:border-emerald-500/50 transition-all shadow-2xl">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <ShieldCheck className="w-8 h-8 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
          
          {/* Animated Scanning Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-dashed border-emerald-500/20 rounded-full"
          />
       </div>
    </div>
  );
};

const HyperDimensionalBackground = () => {
  const { state } = useNexus();
  
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#020202]">
       {/* Multiversal Starfield */}
       <div className="absolute inset-0 opacity-[0.15]">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50
              }}
              transition={{ 
                duration: 5 + Math.random() * 10, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute rounded-full bg-blue-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
            />
          ))}
       </div>

       {/* Quantum Wave Interference */}
       <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
             <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
             </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx="50%"
              cy="50%"
              r="20%"
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="0.5"
              animate={{ 
                r: ['20%', '80%', '20%'],
                opacity: [0.1, 0.5, 0.1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 20 + i * 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
       </svg>

       {/* Tesseract Overlay */}
       <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
          <motion.div 
            animate={{ rotateX: [0, 360], rotateY: [0, 360], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] border-2 border-white rounded-[10rem] flex items-center justify-center"
          >
             <div className="w-[400px] h-[400px] border-2 border-white rounded-[5rem]" />
          </motion.div>
       </div>

       {/* Omega Protocol Shatter Effect */}
       <AnimatePresence>
          {state.isOmegaProtocol && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-red-950/20 backdrop-invert-[0.05] z-0"
            />
          )}
       </AnimatePresence>
    </div>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { state } = useNexus();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={cn(
      "min-h-screen relative font-rajdhani overflow-x-hidden selection:bg-blue-500/30",
      state.isOmegaProtocol ? "cursor-crosshair" : "cursor-default"
    )}>
      <HyperDimensionalBackground />
      
      <NeuralNavbar onOpenCommand={() => setIsCommandOpen(true)} />
      
      <div className="flex">
        <QuantumSidebar />
        
        <main className="flex-1 ml-80 pt-48 px-12 pb-32 relative z-10">
          <AnimatePresence mode="wait">
             <motion.div
               key={state.mode}
               initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
               animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             >
               {children}
             </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <OntologicalSecurityLayer />
      
      <CommandCenter 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
      />

      {/* Global Particle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[500] opacity-[0.05]">
         <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
    </div>
  );
}
