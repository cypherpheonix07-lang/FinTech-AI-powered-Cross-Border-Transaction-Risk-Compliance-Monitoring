import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NeuralNavbar from './NeuralNavbar';
import QuantumSidebar from './QuantumSidebar';
import CommandCenter from './CommandCenter';
import { ErrorBoundary } from '../ErrorBoundary';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* 🌌 Neural HUD Layer (Top) */}
      <NeuralNavbar onOpenCommand={() => setIsCommandOpen(true)} />

      {/* 🌀 Quantum Navigation Layer (Side) */}
      <QuantumSidebar />

      {/* 🌫️ Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* 🚀 Main Command Area */}
      <div className="flex flex-col min-h-screen pt-24 ml-72 relative">
        <CommandCenter 
          isOpen={isCommandOpen} 
          onClose={() => setIsCommandOpen(false)} 
        />
        
        <main className="flex-1 p-8 overflow-x-hidden relative">
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
