import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Cpu, Brain, Activity, 
  Lock, Database, Search, ChevronRight, 
  ChevronDown, Command, Atom, Network, 
  Share2, Sparkles, Radio, Power, Eye, 
  Clock, TrendingUp, AlertTriangle, RefreshCcw,
  Compass, Layers, Terminal, Server, Link as LinkIcon
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useNexus } from '@/context/NexusStateContext';

const NEXUS_GATEWAYS = [
  {
    id: 'planetary',
    label: 'Planetary Core',
    icon: Globe,
    color: 'text-emerald-500',
    nodes: [
      { id: 'global-ops', label: 'Global Ops', path: '/dashboard', risk: 'Stable' },
      { id: 'fiat-nexus', label: 'Fiat Nexus', path: '/fx-currencies', risk: 'Stable' },
      { id: 'cbdc-integration', label: 'CBDC Integration', path: '/cbdc-integration', risk: 'Low' },
      { id: 'forex-nexus', label: 'Forex Nexus', path: '/fx-currencies', risk: 'Stable' },
    ]
  },
  {
    id: 'quantum',
    label: 'Quantum Security',
    icon: Zap,
    color: 'text-cyan-500',
    nodes: [
      { id: 'pq-crypto', label: 'PQ-Cryptography', path: '/pq-crypto', risk: 'High' },
      { id: 'qkd-networks', label: 'QKD Networks', path: '/qkd-networks', risk: 'Stable' },
      { id: 'omega-firewall', label: 'Omega Firewall', path: '/governance-compliance', risk: 'Critical' },
      { id: 'entanglement-keys', label: 'Entanglement Keys', path: '/quantum-safe-security', risk: 'Stable' },
    ]
  },
  {
    id: 'neural',
    label: 'Neural & Bio',
    icon: Brain,
    color: 'text-rose-500',
    nodes: [
      { id: 'bci-interface', label: 'BCI Interface', path: '/neural-interface-banking', risk: 'Stable' },
      { id: 'bio-vault', label: 'Health-Wealth Vault', path: '/bio-finance-vault', risk: 'Low' },
      { id: 'longevity-funds', label: 'Longevity Funds', path: '/investment-wealth', risk: 'Stable' },
      { id: 'genetic-ip', label: 'Genetic IP Rights', path: '/ip-digital-rights', risk: 'Elevated' },
    ]
  },
  {
    id: 'exotic',
    label: 'Exotic Paradigms',
    icon: Activity,
    color: 'text-amber-500',
    nodes: [
      { id: 'temporal-arbitrage', label: 'Temporal Arbitrage', path: '/post-scarcity', risk: 'Experimental' },
      { id: 'multiverse-hedge', label: 'Multiverse Hedge', path: '/multiverse-arbitrage', risk: 'High' },
      { id: 'singularity-prep', label: 'Singularity Prep', path: '/ai-orchestration', risk: 'Stable' },
      { id: 'dark-matter', label: 'Dark Matter Assets', path: '/multiverse-arbitrage', risk: 'Unknown' },
    ]
  }
];

const SwarmIntelFeed = () => (
  <div className="mt-auto px-6 py-8 border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent">
    <div className="flex items-center justify-between mb-6">
       <div className="flex items-center gap-3">
          <Network className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Swarm Intelligence</span>
       </div>
       <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">LIVE</span>
    </div>
    <div className="space-y-4">
       {[
         { label: 'Global Sentiment', val: 'GREED (74)', color: 'text-emerald-400' },
         { label: 'Quantum Entropy', val: '0.99982', color: 'text-blue-400' },
         { label: 'HFT Pulse Rate', val: '14.2M req/s', color: 'text-rose-400' }
       ].map((item, i) => (
         <div key={i} className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-transform">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
            <span className={cn("text-[10px] font-black uppercase tracking-tighter", item.color)}>{item.val}</span>
         </div>
       ))}
    </div>
  </div>
);

const QuickActionOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="px-6 mb-8 relative">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className={cn(
           "w-full h-16 glass-omega rounded-2xl border transition-all relative overflow-hidden flex items-center justify-center gap-4 group shadow-xl",
           isOpen ? "border-blue-500/50 shadow-blue-500/10" : "border-white/10 hover:border-blue-500/30"
         )}
       >
          <div className="relative">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="w-8 h-8 rounded-full border border-dashed border-blue-500/30"
             />
             <Compass className="absolute inset-0 m-auto w-4 h-4 text-blue-400" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Execute Intent</span>
          
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
             className="absolute bottom-full left-6 right-6 mb-4 p-4 glass-omega rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-2"
           >
              {[
                { label: 'Swap Assets', icon: RefreshCcw, desc: 'Cross-chain atomic swap' },
                { label: 'Deep Forensic Scan', icon: Search, desc: 'AI-powered threat hunt' },
                { label: 'Omega Lockdown', icon: Power, desc: 'Instant kill switch', color: 'text-red-500' },
              ].map((act, i) => (
                <button key={i} className="flex flex-col gap-1 p-4 hover:bg-white/5 rounded-2xl transition-all group/item text-left border border-transparent hover:border-white/5">
                   <div className="flex items-center gap-3">
                      <act.icon className={cn("w-4 h-4", act.color || "text-slate-400 group-hover/item:text-white")} />
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", act.color || "text-slate-400 group-hover/item:text-white")}>
                         {act.label}
                      </span>
                   </div>
                   <span className="text-[8px] font-medium text-slate-600 uppercase ml-7">{act.desc}</span>
                </button>
              ))}
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

const QuantumSidebar = () => {
  const [expanded, setExpanded] = useState<string | null>('planetary');
  const { state } = useNexus();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={cn(
      "w-80 h-screen fixed left-0 top-0 pt-28 border-r border-white/5 flex flex-col z-[90] backdrop-blur-[40px] transition-all duration-700",
      state.isOmegaProtocol ? "bg-red-950/20" : "bg-black/40"
    )}>
       <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8 space-y-6">
          {/* Recent Context Memory */}
          <div className="px-4 mb-8">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Streams</span>
                <Clock className="w-3 h-3 text-slate-600" />
             </div>
             <div className="space-y-2">
                {[
                  { label: 'Risk_Audit_London', time: '12m ago', active: true },
                  { label: 'Mars_Asset_Pivot', time: '1h ago', active: false },
                ].map((stream, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group cursor-pointer hover:bg-white/[0.08] transition-all">
                     <div className={cn("w-1.5 h-1.5 rounded-full", stream.active ? "bg-blue-500 animate-pulse" : "bg-slate-700")} />
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{stream.label}</span>
                        <span className="text-[7px] font-bold text-slate-600 uppercase">{stream.time}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <nav className="space-y-3">
             {NEXUS_GATEWAYS.map((gateway) => {
               const isActive = gateway.nodes.some(n => location.pathname === n.path);
               const isExpanded = expanded === gateway.id;

               return (
                 <div key={gateway.id} className="space-y-1">
                    <button 
                      onClick={() => setExpanded(isExpanded ? null : gateway.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all relative group/gate",
                        isExpanded || isActive ? "bg-white/[0.07] text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      )}
                    >
                       <div className={cn(
                         "p-2.5 rounded-xl bg-black/40 border border-white/5 transition-all shadow-inner",
                         isExpanded && gateway.color
                       )}>
                          <gateway.icon className="w-4 h-4" />
                       </div>
                       <div className="flex flex-col flex-1 text-left">
                          <span className="text-[11px] font-black uppercase tracking-widest">{gateway.label}</span>
                          <span className="text-[7px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">Dimensional Sector</span>
                       </div>
                       <ChevronDown className={cn("w-4 h-4 transition-transform duration-500 opacity-40", isExpanded && "rotate-180 opacity-100")} />
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
                               {gateway.nodes.map((node) => (
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
                                    <span>{node.label}</span>
                                    <span className={cn(
                                      "text-[7px] font-black px-1.5 py-0.5 rounded-md border",
                                      node.risk === 'Stable' ? "border-emerald-500/20 text-emerald-500/50" :
                                      node.risk === 'Critical' ? "border-red-500/20 text-red-500 animate-pulse" :
                                      "border-white/10 text-slate-600"
                                    )}>
                                       {node.risk}
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
       </div>

       <QuickActionOrb />
       <SwarmIntelFeed />
    </aside>
  );
};

export default QuantumSidebar;
