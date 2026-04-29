import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import NeuralNavbar from './NeuralNavbar';
import QuantumSidebar from './QuantumSidebar';
import CommandCenter from './CommandCenter';
import { ErrorBoundary } from '../ErrorBoundary';
import { NexusProvider, useNexus } from '@/context/NexusStateContext';
import { cn } from '@/lib/utils';

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
      "min-h-screen transition-colors duration-1000 selection:bg-blue-500/30",
      state.isOmegaProtocol ? "bg-[#1a0000]" : "bg-[#050505]"
    )}>
      {/* 🌌 Neural HUD Layer (Top) */}
      <NeuralNavbar onOpenCommand={() => setIsCommandOpen(true)} />

      {/* 🌀 Quantum Navigation Layer (Side) */}
      <QuantumSidebar />

      {/* 🚨 Emergency Shatter Overlay */}
      <AnimatePresence>
        {state.isOmegaProtocol && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] pointer-events-none border-[20px] border-red-600/20 backdrop-invert-[0.05] animate-glitch"
          >
             <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWU0EB9K6V_tV7/giphy.gif')] opacity-5 mix-blend-screen" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <AlertTriangle className="w-32 h-32 text-red-600 animate-bounce" />
                <h1 className="text-6xl font-black text-red-600 uppercase italic tracking-tighter mt-8">Omega Protocol</h1>
                <p className="text-xl font-black text-red-500 uppercase tracking-[1em] mt-2">Active</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌫️ Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: state.isOmegaProtocol ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: state.isOmegaProtocol ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className={cn(
            "absolute top-0 left-1/4 w-[1200px] h-[800px] rounded-full blur-[180px]",
            state.isOmegaProtocol ? "bg-red-600" : "bg-blue-600"
          )} 
        />
        <div className={cn(
          "absolute bottom-0 right-1/4 w-[1000px] h-[600px] rounded-full blur-[180px] animate-pulse delay-1000",
          state.isOmegaProtocol ? "bg-red-900/10" : "bg-purple-600/5"
        )} />
      </div>

      {/* 🚀 Main Command Area */}
      <div className="flex flex-col min-h-screen pt-28 ml-80 relative">
        <CommandCenter 
          isOpen={isCommandOpen} 
          onClose={() => setIsCommandOpen(false)} 
        />
        
        <main className="flex-1 p-10 overflow-x-hidden relative text-white">
          <ErrorBoundary>
            <div className="animate-fade-up">
              <Outlet />
            </div>
          </ErrorBoundary>
        </main>

        {/* Floating Scanlines / Noise Overlay for Aesthetic */}
        <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
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
