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
  Wallet, Layers2, Box
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useNexus } from '@/context/NexusStateContext';

const DIMENSIONAL_SECTORS = [
  {
    id: 'core',
    label: 'Nexus Core Assets',
    icon: Wallet,
    color: 'text-blue-400',
    nodes: [
      { id: 'dashboard', label: 'Command Center', path: '/dashboard', shortcut: 'C+C', type: 'HUD' },
      { id: 'transactions', label: 'Transaction Ledger', path: '/transactions', shortcut: 'T+L', type: 'TRACE' },
      { id: 'recipients', label: 'Verified Entities', path: '/recipients', shortcut: 'V+E', type: 'OSINT' },
      { id: 'cards', label: 'Neural Cards', path: '/cards', shortcut: 'N+C', type: 'HARDWARE' },
      { id: 'crypto', label: 'Quantum Assets', path: '/crypto', shortcut: 'Q+A', type: 'BLOCKCHAIN' },
    ]
  },
  {
    id: 'security',
    label: 'Quantum Guard & Verification',
    icon: Shield,
    color: 'text-cyan-500',
    nodes: [
      { id: 'pq-crypto', label: 'PQ-Cryptography', path: '/pq-crypto', shortcut: 'Q+C', type: 'SECURITY' },
      { id: 'qkd-network', label: 'QKD Networks', path: '/qkd-networks', shortcut: 'Q+N', type: 'CORE' },
      { id: 'biometric', label: 'Bio-Auth Systems', path: '/biometric', shortcut: 'B+A', type: 'BIO' },
      { id: 'privacy', label: 'ZK-Privacy Shield', path: '/privacy-shield', shortcut: 'P+S', type: 'PRIVACY' },
    ]
  },
  {
    id: 'intelligence',
    label: 'AI Intelligence & Flows',
    icon: Brain,
    color: 'text-purple-500',
    nodes: [
      { id: 'orchestration', label: 'AI Orchestration', path: '/ai-orchestration', shortcut: 'A+O', type: 'ORCH' },
      { id: 'analytics', label: 'Deep Analytics', path: '/advanced-analytics', shortcut: 'D+A', type: 'INTEL' },
      { id: 'trace-nexus', label: 'Forensic Tracing', path: '/ledger-forensics', shortcut: 'F+T', type: 'FORENSIC' },
      { id: 'prediction', label: 'Prediction Markets', path: '/prediction-markets', shortcut: 'P+M', type: 'QUANT' },
    ]
  },
  {
    id: 'governance',
    label: 'Protocols & Governance',
    icon: FileText,
    color: 'text-emerald-500',
    nodes: [
      { id: 'compliance', label: 'Compliance Suite', path: '/compliance', shortcut: 'C+S', type: 'LAW' },
      { id: 'policy', label: 'Governance Policy', path: '/governance', shortcut: 'G+P', type: 'DAO' },
      { id: 'vault', label: 'Ownership Vault', path: '/governance-vault', shortcut: 'O+V', type: 'ASSET' },
      { id: 'crisis', label: 'Crisis Management', path: '/emergency', shortcut: 'E+M', type: 'OMEGA' },
    ]
  },
  {
    id: 'frontiers',
    label: 'Interstellar Frontiers',
    icon: Globe,
    color: 'text-amber-500',
    nodes: [
      { id: 'space', label: 'Space Economy', path: '/space-economy', shortcut: 'S+E', type: 'ORBITAL' },
      { id: 'multiverse', label: 'Multiverse Arb', path: '/multiverse-arbitrage', shortcut: 'M+A', type: 'EXOTIC' },
      { id: 'metaverse', label: 'Metaverse Hub', path: '/metaverse-banking', shortcut: 'M+H', type: 'VIRTUAL' },
      { id: 'natural', label: 'Natural Resources', path: '/natural-resources', shortcut: 'N+R', type: 'GEO' },
    ]
  }
];

const SwarmIntelFeed = () => {
  const { state } = useNexus();
  return (
    <div className="mt-auto px-6 py-8 border-t border-white/5 bg-gradient-to-t from-black/60 to-transparent">
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Swarm Intelligence</span>
         </div>
         <div className="flex gap-1">
            {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
         </div>
      </div>
      <div className="space-y-4">
         {[
           { label: 'Global Liquidity', val: (state.globalFlowVolume / 1000).toFixed(1) + 'M', color: 'text-blue-400' },
           { label: 'Privacy Index', val: state.privacyScore + '.00%', color: 'text-emerald-400' },
           { label: 'Network Latency', val: state.networkLatency.toFixed(2) + 'ms', color: 'text-cyan-400' }
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

const QuickIntentOrb = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="px-6 mb-8 relative">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className={cn(
           "w-full h-14 glass-omega rounded-2xl border transition-all relative overflow-hidden flex items-center justify-center gap-4 group shadow-xl",
           isOpen ? "border-blue-500/50 shadow-blue-500/10" : "border-white/10 hover:border-blue-500/30"
         )}
       >
          <div className="relative">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="w-8 h-8 rounded-full border border-dashed border-blue-500/20"
             />
             <Target className="absolute inset-0 m-auto w-3.5 h-3.5 text-blue-400" />
          </div>
          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Quick Trace Intent</span>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: 0 }}
                className="absolute inset-y-0 left-0 bg-blue-500/10 -z-10"
              />
            )}
          </AnimatePresence>
       </button>
       
       <AnimatePresence>
         {isOpen && (
           <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             className="absolute bottom-full left-6 right-6 mb-4 p-4 glass-omega rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col gap-2"
           >
              {[
                { label: 'Support Nexus', icon: HelpCircle, path: '/support', type: 'HELP' },
                { id: 'settings', label: 'Security Hub', icon: Settings, path: '/settings', type: 'CONFIG' },
                { id: 'forensics', label: 'Deep Trace', icon: Search, path: '/ledger-forensics', type: 'FORENSIC' },
              ].map((act, i) => (
                <button 
                  key={i} 
                  onClick={() => { navigate(act.path); setIsOpen(false); }}
                  className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group/item"
                >
                   <div className="flex items-center gap-3">
                      <act.icon className="w-4 h-4 text-slate-500 group-hover/item:text-blue-400" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover/item:text-white">{act.label}</span>
                   </div>
                   <span className="text-[7px] font-black text-slate-600 bg-white/5 px-2 py-0.5 rounded uppercase">{act.type}</span>
                </button>
              ))}
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

const QuantumSidebar = () => {
  const [expanded, setExpanded] = useState<string | null>('core');
  const { state } = useNexus();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={cn(
      "w-80 h-screen fixed left-0 top-0 pt-32 border-r border-white/5 flex flex-col z-[90] backdrop-blur-[80px] transition-all duration-700",
      state.isOmegaProtocol ? "bg-red-950/20" : "bg-black/40"
    )}>
       <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8 space-y-8">
          <nav className="space-y-4">
             {DIMENSIONAL_SECTORS.map((sector) => {
               const isActive = sector.nodes.some(n => location.pathname === n.path);
               const isExpanded = expanded === sector.id;

               return (
                 <div key={sector.id} className="space-y-1">
                    <button 
                      onClick={() => setExpanded(isExpanded ? null : sector.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all group/gate relative overflow-hidden",
                        isExpanded || isActive ? "bg-white/[0.08] text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      )}
                    >
                       <div className={cn(
                         "p-2.5 rounded-xl bg-black border border-white/5 transition-all shadow-inner relative z-10",
                         isExpanded && sector.color
                       )}>
                          <sector.icon className="w-4 h-4" />
                       </div>
                       <div className="flex flex-col flex-1 text-left relative z-10">
                          <span className="text-[11px] font-black uppercase tracking-widest">{sector.label}</span>
                       </div>
                       <ChevronDown className={cn("w-4 h-4 transition-transform duration-500 opacity-20 relative z-10", isExpanded && "rotate-180 opacity-100")} />
                       
                       {isExpanded && (
                         <motion.div 
                           layoutId="glow"
                           className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"
                         />
                       )}
                    </button>

                    <AnimatePresence>
                       {isExpanded && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden ml-14 border-l border-white/10"
                         >
                            <div className="py-3 space-y-1 pr-4">
                               {sector.nodes.map((node) => (
                                 <button
                                   key={node.id}
                                   onClick={() => navigate(node.path)}
                                   className={cn(
                                     "w-full group flex items-center justify-between px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                     location.pathname === node.path 
                                       ? "text-blue-400 bg-blue-400/5 -ml-[1px] border-l-2 border-blue-400" 
                                       : "text-slate-500 hover:text-blue-300 hover:bg-white/5"
                                   )}
                                 >
                                    <div className="flex flex-col items-start">
                                       <span>{node.label}</span>
                                       <span className="text-[7px] font-bold text-slate-700 tracking-tighter mt-0.5">{node.type}</span>
                                    </div>
                                    <span className="text-[8px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                       {node.shortcut}
                                    </span>
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

          <div className="px-4 py-6 glass-omega rounded-2xl border border-white/5 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Entropy</span>
                <Activity className="w-3 h-3 text-slate-600" />
             </div>
             <div className="grid grid-cols-8 gap-1">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square rounded-sm animate-pulse",
                      i % 7 === 0 ? "bg-rose-500/40" : i % 5 === 0 ? "bg-amber-500/40" : "bg-emerald-500/40"
                    )} 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
             </div>
          </div>
       </div>

       <QuickIntentOrb />
       <SwarmIntelFeed />
    </aside>
  );
};

export default QuantumSidebar;
