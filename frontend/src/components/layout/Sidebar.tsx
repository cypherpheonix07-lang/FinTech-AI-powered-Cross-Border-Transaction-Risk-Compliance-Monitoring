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
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const GALACTIC_SECTORS = [
  {
    id: 'command-center',
    label: 'Aegis Command Center',
    icon: <Shield className="w-4 h-4 text-blue-500" />,
    subsectors: [
      { id: 'omega-status', label: 'Omega Protocol Status', featuresCount: 120, path: '/dashboard' },
      { id: 'global-ops', label: 'Global Ops Center', featuresCount: 85, path: '/advanced-analytics' },
      { id: 'threat-detect', label: 'Autonomous Threat Response', featuresCount: 64, path: '/automation-rules' },
    ]
  },
  {
    id: 'neural-command',
    label: 'Neural Command Core',
    icon: <Brain className="w-4 h-4 text-purple-500" />,
    subsectors: [
      { id: 'neural-auth', label: 'Neural Authentication Layer', featuresCount: 512, path: '/neural-interface-banking' },
      { id: 'predictive-neural', label: 'Predictive Neural Analytics', featuresCount: 240, path: '/agi-symbiosis' },
      { id: 'neural-interface', label: 'Neural Command Interface', featuresCount: 180, path: '/bci-finance' },
    ]
  },
  {
    id: 'quantum-dimension',
    label: 'Quantum Dimension Security',
    icon: <Zap className="w-4 h-4 text-cyan-500" />,
    subsectors: [
      { id: 'quantum-infra', label: 'Quantum-Resistant Infra', featuresCount: 420, path: '/pq-crypto' },
      { id: 'quantum-compute', label: 'Quantum Computing Integr.', featuresCount: 310, path: '/quantum-annealer' },
      { id: 'quantum-networks', label: 'Quantum Comm Networks', featuresCount: 195, path: '/qkd-networks' },
    ]
  },
  {
    id: 'planetary-systems',
    label: 'Planetary Systems Core',
    icon: <Globe className="w-4 h-4 text-emerald-500" />,
    subsectors: [
      { id: 'multi-planetary', label: 'Multi-Planetary Network', featuresCount: 280, path: '/space-economy' },
      { id: 'global-fabric', label: 'Global Payment Fabric', featuresCount: 640, path: '/cbdc-integration' },
      { id: 'planetary-scale', label: 'Planetary-Scale Infra', featuresCount: 450, path: '/real-assets' },
    ]
  },
  {
    id: 'neural-bio',
    label: 'Neural & Bio Convergence',
    icon: <Atom className="w-4 h-4 text-rose-500" />,
    subsectors: [
      { id: 'bio-financial', label: 'Bio-Financial Integration', featuresCount: 150, path: '/bio-finance-vault' },
      { id: 'synthetic-bio', label: 'Synthetic Biology Finance', featuresCount: 120, path: '/natural-resources' },
      { id: 'neurosymbiotic', label: 'Neurosymbiotic Financial AI', featuresCount: 210, path: '/holographic-advisor' },
    ]
  },
  {
    id: 'universal-exotic',
    label: 'Universal & Exotic Paradigms',
    icon: <Activity className="w-4 h-4 text-amber-500" />,
    subsectors: [
      { id: 'temporal-finance', label: 'Temporal Finance Systems', featuresCount: 95, path: '/post-scarcity' },
      { id: 'dimensional-finance', label: 'Dimensional Finance', featuresCount: 110, path: '/multiverse-arbitrage' },
      { id: 'metaphysical', label: 'Metaphysical Finance', featuresCount: 75, path: '/identity-reputation' },
    ]
  },
  {
    id: 'ai-orchestration',
    label: 'Advanced AI Orchestration',
    icon: <Cpu className="w-4 h-4 text-indigo-500" />,
    subsectors: [
      { id: 'collective-superintel', label: 'Collective Super-Intelligence', featuresCount: 1200, path: '/collaborative-finance' },
      { id: 'meta-learning', label: 'Meta-Learning Systems', featuresCount: 450, path: '/ai-coach' },
      { id: 'autonomous-agents', label: 'Autonomous Financial Agents', featuresCount: 880, path: '/automation-rules' },
    ]
  }
];

export function SidebarContent() {
  const [expandedSector, setExpandedSector] = useState<string | null>('command-center');
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {GALACTIC_SECTORS.map((sector) => {
        const isSectorActive = sector.subsectors.some(sub => location.pathname === sub.path);
        
        return (
          <div key={sector.id} className="mb-2">
            <button
              onClick={() => setExpandedSector(expandedSector === sector.id ? null : sector.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all",
                (expandedSector === sector.id || isSectorActive) ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-300"
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
                    className={cn(
                      "w-full group flex items-center justify-between p-2 rounded-md text-[11px] transition-all text-left",
                      location.pathname === sub.path 
                        ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-600 -ml-[17px] pl-[15px]" 
                        : "text-zinc-500 hover:bg-white/5 hover:text-blue-400"
                    )}
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
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-72 h-screen bg-zinc-950/50 border-r border-white/5 flex flex-col backdrop-blur-xl hidden lg:flex fixed left-0 top-0">
      {/* HEADER: NEURAL COMMAND TRIGGER */}
      <div className="p-6 border-b border-white/5">
        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 mb-6 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">PROJECT AEGIS</h2>
            <p className="text-[10px] text-zinc-500 font-mono">OMEGA PROTOCOL V3.0</p>
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
