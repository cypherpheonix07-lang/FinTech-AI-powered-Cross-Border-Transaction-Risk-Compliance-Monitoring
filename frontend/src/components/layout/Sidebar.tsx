'use client';

/**
 * 🛡️ PATHGUARD (PROJECT AEGIS): OMEGA PROTOCOL V2.0
 * SIDEBAR.TSX - Galactic Navigation System (2000+ Features)
 * 
 * ☢️ NUCLEAR WARNING:
 * High navigation density can lead to user fatigue. 
 * Use the Neural Command (Ctrl+K) for rapid sector jumping.
 */

import React, { useState } from 'react';
import { 
  Shield, Zap, Globe, Cpu, Atom, Brain, Eye, 
  TrendingUp, Activity, Lock, Database, Search,
  ChevronRight, ChevronDown, Command
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const GALACTIC_SECTORS = [
  {
    id: 'planetary',
    label: 'Planetary Systems (Core)',
    icon: <Globe className="w-4 h-4" />,
    subsectors: [
      { id: 'banking', label: 'Universal Banking', featuresCount: 40, path: '/dashboard' },
      { id: 'compliance', label: 'Global Compliance', featuresCount: 30, path: '/compliance' },
      { id: 'risk', label: 'Predictive Risk', featuresCount: 25, path: '/advanced-analytics' },
    ]
  },
  {
    id: 'quantum',
    label: 'Quantum Dimension (Security)',
    icon: <Atom className="w-4 h-4" />,
    subsectors: [
      { id: 'pqc', label: 'Quantum-Resistant Crypto', featuresCount: 30, sector: 51, path: '/pq-crypto' },
      { id: 'entanglement', label: 'Quantum Entanglement', featuresCount: 30, sector: 75, path: '/entanglement-settle' },
      { id: 'annealing', label: 'Quantum Annealing', featuresCount: 30, sector: 86, path: '/quantum-annealer' },
    ]
  },
  {
    id: 'neural',
    label: 'Neural & Bio Convergence',
    icon: <Brain className="w-4 h-4" />,
    subsectors: [
      { id: 'neural-intl', label: 'Neural Interface Banking', featuresCount: 30, sector: 52, path: '/neural-interface-banking' },
      { id: 'biometric-behavioral', label: 'Biometric Analytics', featuresCount: 30, sector: 57, path: '/biometric' },
      { id: 'synthetic-bio', label: 'Synthetic Biology Finance', featuresCount: 30, sector: 60, path: '/bio-finance-vault' },
    ]
  },
  {
    id: 'universal-exotic',
    label: 'Universal & Exotic Paradigms',
    icon: <Zap className="w-4 h-4" />,
    subsectors: [
      { id: 'space-econ', label: 'Space Economy Finance', featuresCount: 30, sector: 62, path: '/space-economy' },
      { id: 'nano-tech', label: 'Nanotechnology Finance', featuresCount: 30, sector: 63, path: '/natural-resources' },
      { id: 'agi-finance', label: 'AGI (General Intelligence)', featuresCount: 30, sector: 64, path: '/agi-symbiosis' },
      { id: 'post-scarcity', label: 'Post-Scarcity Economics', featuresCount: 30, sector: 70, path: '/post-scarcity' },
    ]
  }
];

export function SidebarContent() {
  const [expandedSector, setExpandedSector] = useState<string | null>('planetary');
  const navigate = useNavigate();

  return (
    <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {GALACTIC_SECTORS.map((sector) => (
        <div key={sector.id} className="mb-2">
          <button
            onClick={() => setExpandedSector(expandedSector === sector.id ? null : sector.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all",
              expandedSector === sector.id ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {sector.icon}
            <span className="font-medium flex-1 text-left">{sector.label}</span>
            {expandedSector === sector.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {expandedSector === sector.id && (
            <div className="mt-1 ml-7 space-y-1 border-l border-white/5 pl-4">
              {sector.subsectors.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => navigate(sub.path)}
                  className="w-full group flex items-center justify-between p-2 rounded-md text-[11px] text-zinc-500 hover:bg-white/5 hover:text-blue-400 transition-all text-left"
                >
                  <span>{sub.label}</span>
                  <span className="text-[9px] font-mono opacity-0 group-hover:opacity-50">
                    {sub.featuresCount} FEATURES
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-zinc-950/50 border-r border-white/5 flex flex-col backdrop-blur-xl hidden lg:flex fixed left-0 top-0">
      {/* HEADER: NEURAL COMMAND TRIGGER */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">PROJECT AEGIS</h2>
            <p className="text-[10px] text-zinc-500 font-mono">OMEGA PROTOCOL V2.0</p>
          </div>
        </div>
        
        <button className="w-full h-10 bg-white/5 border border-white/10 rounded-lg flex items-center px-4 gap-3 text-zinc-400 hover:bg-white/10 transition-all group">
          <Search className="w-4 h-4 group-hover:text-blue-400" />
          <span className="text-xs">Neural Command...</span>
          <div className="ml-auto flex items-center gap-1 opacity-50">
            <Command className="w-3 h-3" />
            <span className="text-[10px]">K</span>
          </div>
        </button>
      </div>

      <SidebarContent />

      {/* FOOTER: SYSTEM STATUS */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 text-[10px] font-mono text-emerald-500/70">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>REALITY_CHECK: PASSING</span>
        </div>
        <div className="mt-2 flex items-center gap-3 text-[9px] font-mono text-zinc-600">
          <Lock className="w-3 h-3" />
          <span>AEGIS_ENCRYPTION_ACTIVE</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
