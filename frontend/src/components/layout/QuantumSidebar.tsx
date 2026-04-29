import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Cpu, Brain, Activity, 
  Lock, Database, Search, ChevronRight, 
  ChevronDown, Command, Atom, Network, 
  Share2, Sparkles, Radio, Power, Eye, 
  Clock, TrendingUp, AlertTriangle, RefreshCcw,
  Compass, Layers, Terminal, Server, Link as LinkIcon,
  Workflow, Globe2, ShieldAlert, Fingerprint,
  PieChart, Settings, HelpCircle, Map,
  Key, Target, FileText, Code, Users, BellRing,
  CreditCard, UserPlus, History, BarChart3,
  Wallet, Layers2, Box, Infinity as InfinityIcon,
  Wind, Sun, Star, Anchor, Hexagon, Component
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useNexus } from '@/context/NexusStateContext';

const DIMENSIONAL_SPINE_SECTORS = [
  {
    id: 'omnipotence',
    label: 'Omnipotent Action',
    icon: InfinityIcon,
    color: 'text-rose-500',
    nodes: [
      { id: 'god-mode', label: 'Reality Architect', path: '/agi-terminal', shortcut: 'Ω+R', type: 'GOD-MODE' },
      { id: 'causality', label: 'Causality Logic', path: '/automation', shortcut: 'C+L', type: 'LOGIC' },
      { id: 'multiverse', label: 'Multiversal Wealth', path: '/multiverse-arbitrage', shortcut: 'M+W', type: 'EXOTIC' },
      { id: 'singularity', label: 'Singularity Prep', path: '/space-frontier', shortcut: 'S+P', type: 'OMEGA' },
    ]
  },
  {
    id: 'omniscience',
    label: 'Omniscient Data',
    icon: Brain,
    color: 'text-purple-500',
    nodes: [
      { id: 'hive-mind', label: 'Hive Collective', path: '/social', shortcut: 'H+C', type: 'SYNC' },
      { id: 'akashic', label: 'Akashic Records', path: '/ledger-forensics', shortcut: 'A+R', type: 'INFO' },
      { id: 'forensics', label: 'Deep Trace', path: '/ledger-forensics', shortcut: 'D+T', type: 'TRACE' },
      { id: 'predictive', label: 'Temporal Insight', path: '/prediction-markets', shortcut: 'T+I', type: 'ORACLE' },
    ]
  },
  {
    id: 'immunity',
    label: 'Biological Immunity',
    icon: Shield,
    color: 'text-emerald-500',
    nodes: [
      { id: 'white-cell', label: 'WBC Defense', path: '/compliance', shortcut: 'W+D', type: 'AUTO' },
      { id: 'healing', label: 'Self-Repair', path: '/settings', shortcut: 'S+R', type: 'BIO' },
      { id: 'privacy', label: 'Ontological Shield', path: '/privacy-shield', shortcut: 'O+S', type: 'SOUL' },
      { id: 'auth', label: 'Biometric Essence', path: '/biometric', shortcut: 'B+E', type: 'CORE' },
    ]
  },
  {
    id: 'quantum',
    label: 'Quantum Superposition',
    icon: Atom,
    color: 'text-cyan-500',
    nodes: [
      { id: 'entanglement', label: 'Spooky Navigation', path: '/qkd-networks', shortcut: 'S+N', type: 'LINK' },
      { id: 'collapse', label: 'Wave Collapse', path: '/quantum', shortcut: 'W+C', type: 'DECIDE' },
      { id: 'pq-crypto', label: 'Post-Quantum Hub', path: '/pq-crypto', shortcut: 'P+Q', type: 'SECURE' },
      { id: 'ledger', label: 'Lattice Forensics', path: '/ledger-forensics', shortcut: 'L+F', type: 'DATA' },
    ]
  },
  {
    id: 'assets',
    label: 'Omni-Value Assets',
    icon: Wallet,
    color: 'text-amber-500',
    nodes: [
      { id: 'tokenization', label: 'Matter-Value', path: '/tokenization-rwa', shortcut: 'M+V', type: 'PHYSICAL' },
      { id: 'energy', label: 'Energy Credits', path: '/natural-resources', shortcut: 'E+C', type: 'POWER' },
      { id: 'reputation', label: 'Social Karma', path: '/identity-reputation', shortcut: 'S+K', type: 'SPIRIT' },
      { id: 'legacy', label: 'Eternal Legacy', path: '/governance-vault', shortcut: 'E+L', type: 'VAULT' },
    ]
  }
];

const ProbabilityOverlay = () => {
  const { state } = useNexus();
  return (
    <div className="px-6 py-6 mb-8 glass-omega rounded-[2rem] border border-white/10 space-y-4 relative overflow-hidden group">
       <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <Hexagon className="w-4 h-4 text-cyan-400 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Probability_Overlay</span>
          </div>
          <span className="text-[9px] font-mono text-cyan-500">{state.probabilityCoherence.toFixed(1)}%</span>
       </div>
       
       <div className="space-y-4">
          {[
            { label: 'Bull Future', prob: 64.2, color: 'bg-emerald-500' },
            { label: 'Bear Future', prob: 28.1, color: 'bg-rose-500' },
            { label: 'Omega Collapse', prob: 7.7, color: 'bg-amber-500' }
          ].map((future, i) => (
            <div key={i} className="space-y-1.5">
               <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  <span>{future.label}</span>
                  <span>{future.prob}%</span>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${future.prob}%` }}
                    className={cn("h-full", future.color)}
                  />
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

const HiveMindSyncFeed = () => {
  const { state } = useNexus();
  return (
    <div className="mt-auto px-6 py-8 border-t border-white/5 bg-gradient-to-t from-black/60 to-transparent">
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Hive Mind Collective</span>
         </div>
         <div className="flex gap-1">
            {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-purple-500/50 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
         </div>
      </div>
      <div className="space-y-4">
         {[
           { label: 'Collective Wisdom', val: 'Active', color: 'text-purple-400' },
           { label: 'Global Intent', val: 'Bullish', color: 'text-emerald-400' },
           { label: 'Threat Awareness', val: 'Symbiotic', color: 'text-blue-400' }
         ].map((item, i) => (
           <div key={i} className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-transform">
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
              <span className={cn("text-[10px] font-black uppercase tracking-tighter", item.color)}>{item.val}</span>
           </div>
         ))}
      </div>
    </div>
  );
};

const QuantumSidebar = () => {
  const [expanded, setExpanded] = useState<string | null>('omnipotence');
  const { state } = useNexus();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={cn(
      "w-80 h-screen fixed left-0 top-0 pt-40 border-r border-white/5 flex flex-col z-[90] backdrop-blur-[120px] transition-all duration-1000",
      state.isOmegaProtocol ? "bg-red-950/20" : "bg-black/60"
    )}>
       <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8 space-y-10">
          <nav className="space-y-6">
             {DIMENSIONAL_SPINE_SECTORS.map((sector) => {
               const isActive = sector.nodes.some(n => location.pathname === n.path);
               const isExpanded = expanded === sector.id;

               return (
                 <div key={sector.id} className="space-y-2">
                    <button 
                      onClick={() => setExpanded(isExpanded ? null : sector.id)}
                      className={cn(
                        "w-full flex items-center gap-5 p-5 rounded-[2rem] transition-all group/gate relative overflow-hidden",
                        isExpanded || isActive ? "bg-white/[0.08] text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      )}
                    >
                       <div className={cn(
                         "p-3 rounded-2xl bg-black border border-white/5 transition-all shadow-inner relative z-10",
                         isExpanded && sector.color
                       )}>
                          <sector.icon className="w-5 h-5" />
                       </div>
                       <div className="flex flex-col flex-1 text-left relative z-10">
                          <span className="text-[12px] font-black uppercase tracking-widest leading-none mb-1">{sector.label}</span>
                          <span className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em]">{sector.id.toUpperCase()}_SECTOR</span>
                       </div>
                       <ChevronDown className={cn("w-4 h-4 transition-transform duration-500 opacity-20 relative z-10", isExpanded && "rotate-180 opacity-100")} />
                       
                       {isExpanded && (
                         <motion.div 
                           layoutId="glow-v2"
                           className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"
                         />
                       )}
                    </button>

                    <AnimatePresence>
                       {isExpanded && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden ml-16 border-l-2 border-white/5"
                         >
                            <div className="py-4 space-y-2 pr-4 pl-4">
                               {sector.nodes.map((node) => (
                                 <button
                                   key={node.id}
                                   onClick={() => navigate(node.path)}
                                   className={cn(
                                     "w-full group flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                                     location.pathname === node.path 
                                       ? "text-blue-400 bg-blue-400/5 -ml-[1px] border-l-2 border-blue-400" 
                                       : "text-slate-500 hover:text-blue-300 hover:bg-white/5"
                                   )}
                                 >
                                    <div className="flex flex-col items-start">
                                       <span>{node.label}</span>
                                       <span className="text-[8px] font-bold text-slate-700 tracking-tighter mt-1">{node.type}</span>
                                    </div>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                                 </button>
                               ))}
                            </div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
               );
             })}
          </nav>

          <ProbabilityOverlay />
       </div>

       <HiveMindSyncFeed />
    </aside>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default QuantumSidebar;
