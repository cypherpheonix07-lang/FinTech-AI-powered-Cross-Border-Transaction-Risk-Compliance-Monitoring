import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Globe, Cpu, Brain, Activity, 
  Lock, Database, Search, ChevronRight, 
  ChevronDown, Command, Atom, Network, 
  Share2, Sparkles, Radio, Power, Eye, 
  Clock, TrendingUp, AlertTriangle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AEGIS_SECTORS = [
  {
    id: 'planetary',
    label: 'Planetary Systems',
    icon: Globe,
    color: 'text-emerald-500',
    subnodes: [
      { id: 'global-ops', label: 'Global Ops', path: '/dashboard' },
      { id: 'fiat-gateways', label: 'Fiat Gateways', path: '/fx-currencies' },
      { id: 'cbdc-nexus', label: 'CBDC Nexus', path: '/cbdc-integration' },
      { id: 'planetary-scale', label: 'Planetary Infra', path: '/real-assets' },
    ]
  },
  {
    id: 'quantum',
    label: 'Quantum Dimension',
    icon: Zap,
    color: 'text-cyan-500',
    subnodes: [
      { id: 'pq-crypto', label: 'PQ-Cryptography', path: '/pq-crypto' },
      { id: 'zk-proofs', label: 'Zero-Knowledge', path: '/governance-compliance' },
      { id: 'quantum-networks', label: 'Quantum Nets', path: '/qkd-networks' },
      { id: 'omega-firewall', label: 'Omega Firewall', path: '/governance-compliance' },
    ]
  },
  {
    id: 'neural',
    label: 'Neural & Bio',
    icon: Brain,
    color: 'text-rose-500',
    subnodes: [
      { id: 'bci-wallet', label: 'BCI Wallet', path: '/neural-interface-banking' },
      { id: 'bio-fusion', label: 'Health-Wealth', path: '/bio-finance-vault' },
      { id: 'genetic-assets', label: 'Genetic Assets', path: '/natural-resources' },
      { id: 'longevity-funds', label: 'Longevity Funds', path: '/investment-wealth' },
    ]
  },
  {
    id: 'exotic',
    label: 'Exotic Paradigms',
    icon: Activity,
    color: 'text-amber-500',
    subnodes: [
      { id: 'temporal-finance', label: 'Temporal Finance', path: '/post-scarcity' },
      { id: 'multiverse-hedging', label: 'Multiverse Hedge', path: '/multiverse-arbitrage' },
      { id: 'dark-matter', label: 'Dark Matter Assets', path: '/multiverse-arbitrage' },
      { id: 'singularity', label: 'Singularity Prep', path: '/ai-orchestration' },
    ]
  }
];

const SwarmFeed = () => (
  <div className="mt-auto px-4 py-6 border-t border-white/5 bg-black/40">
    <div className="flex items-center gap-3 mb-4">
       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Swarm Intelligence</span>
    </div>
    <div className="space-y-3">
       {[
         { label: 'Top 1% Sentiment', val: 'BULLISH', color: 'text-emerald-400' },
         { label: 'Quantum Entropy', val: '0.9997', color: 'text-blue-400' },
         { label: 'Interstellar Lag', val: '24ms', color: 'text-amber-400' }
       ].map((item, i) => (
         <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-1 rounded transition-colors">
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
            <span className={cn("text-[9px] font-black uppercase tracking-tighter", item.color)}>{item.val}</span>
         </div>
       ))}
    </div>
  </div>
);

const QuickActionOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative mt-8 px-4">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-full h-14 glass-omega rounded-2xl border border-white/10 flex items-center justify-center group hover:border-blue-500/50 transition-all relative overflow-hidden"
       >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="relative flex items-center gap-3">
             <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
             <span className="text-[10px] font-black text-white uppercase tracking-widest">Execute AI Command</span>
          </div>
       </button>
       
       <AnimatePresence>
         {isOpen && (
           <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.9 }}
             className="absolute bottom-full left-4 right-4 mb-4 p-4 glass-omega rounded-[2rem] border border-white/10 shadow-2xl z-50 flex flex-col gap-2"
           >
              {[
                { label: 'Swap Assets', icon: RefreshCcw },
                { label: 'Deep Scan', icon: Search },
                { label: 'Omega Lock', icon: Power },
              ].map((act, i) => (
                <button key={i} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group">
                   <act.icon className="w-4 h-4 text-slate-500 group-hover:text-white" />
                   <span className="text-[9px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">{act.label}</span>
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
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 pt-24 bg-black/40 border-r border-white/5 flex flex-col z-[90] backdrop-blur-xl group/sidebar hover:bg-black/60 transition-colors">
       {/* Background Depth Elements */}
       <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
       
       <div className="flex-1 overflow-y-auto custom-scrollbar p-4 py-8 space-y-4">
          <div className="px-4 mb-8">
             <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Timeline</span>
                <Clock className="w-3 h-3 text-slate-600" />
             </div>
             <div className="flex gap-1">
                {[1,2,3,4].map(i => <div key={i} className="flex-1 h-0.5 bg-blue-500/20 rounded-full" />)}
             </div>
          </div>

          <nav className="space-y-2">
             {AEGIS_SECTORS.map((sector) => {
               const isActive = sector.subnodes.some(n => location.pathname === n.path);
               const isExpanded = expanded === sector.id;

               return (
                 <div key={sector.id} className="space-y-1">
                    <button 
                      onClick={() => setExpanded(isExpanded ? null : sector.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl transition-all group/btn",
                        isExpanded || isActive ? "bg-white/5 text-white" : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                       <div className={cn("p-2 rounded-lg bg-black/20 border border-white/5 shadow-inner", isExpanded && sector.color)}>
                          <sector.icon className="w-4 h-4" />
                       </div>
                       <span className="text-[11px] font-black uppercase tracking-widest flex-1 text-left">{sector.label}</span>
                       <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} />
                    </button>

                    <AnimatePresence>
                       {isExpanded && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden ml-11 border-l border-white/5"
                         >
                            <div className="py-2 space-y-1">
                               {sector.subnodes.map((node) => (
                                 <button
                                   key={node.id}
                                   onClick={() => navigate(node.path)}
                                   className={cn(
                                     "w-full px-4 py-2 rounded-lg text-[10px] font-bold text-left transition-all",
                                     location.pathname === node.path 
                                       ? "text-blue-400 bg-blue-400/5 -ml-[1px] border-l-2 border-blue-400" 
                                       : "text-slate-500 hover:text-blue-300 hover:bg-white/5"
                                   )}
                                 >
                                    {node.label}
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

          <div className="pt-8 space-y-4">
             <div className="px-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recent Context</span>
             </div>
             <div className="space-y-2 px-2">
                {[
                  { label: 'Risk Analysis: Earth', time: '12m ago', icon: Activity },
                  { label: 'Tax Planning: Mars', time: '1h ago', icon: Database },
                ].map((ctx, i) => (
                  <button key={i} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
                     <ctx.icon className="w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                     <div className="flex flex-col items-start">
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase tracking-tighter">{ctx.label}</span>
                        <span className="text-[8px] font-medium text-slate-600 uppercase tracking-widest">{ctx.time}</span>
                     </div>
                  </button>
                ))}
             </div>
          </div>
       </div>

       <QuickActionOrb />
       <SwarmFeed />
    </aside>
  );
};

export default QuantumSidebar;
