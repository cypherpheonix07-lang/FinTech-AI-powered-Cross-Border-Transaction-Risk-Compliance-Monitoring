import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Command, 
  X,
  Zap,
  Shield,
  Activity,
  Globe,
  Database,
  Link as LinkIcon,
  Eye,
  FileText,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexus } from '@/context/NexusStateContext';

const TRACE_MOCK_RESULTS = [
  { id: 't1', type: 'TRANSACTION', label: '0x8a42...9f21', status: 'VERIFIED', risk: 'LOW', confidence: 99 },
  { id: 't2', type: 'WALLET', label: 'Nexus_Core_Vault_01', status: 'SECURE', risk: 'MINIMAL', confidence: 100 },
  { id: 't3', type: 'ENTITY', label: 'Orbital_Hedge_Alpha', status: 'FLAGGED', risk: 'ELEVATED', confidence: 74 },
  { id: 't4', type: 'CONTRACT', label: 'Quantum_Escrow_V3', status: 'ACTIVE', risk: 'STABLE', confidence: 92 },
];

export default function CommandCenter({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const navigate = useNavigate();
  const { state } = useNexus();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % (TRACE_MOCK_RESULTS.length + 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + TRACE_MOCK_RESULTS.length + 1) % (TRACE_MOCK_RESULTS.length + 1));
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-950/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-[800px] bg-black/90 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden flex flex-col focus:outline-none"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            {/* Neural Input Zone */}
            <div className="p-10 flex flex-col gap-6 border-b border-white/5 bg-white/5 relative">
               <div className="absolute top-0 right-10 flex gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-0.5 h-1 bg-blue-500/20" />
                  ))}
               </div>
               
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                     <Target className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                     <input 
                       ref={inputRef}
                       type="text" 
                       placeholder="Enter Trace ID, Wallet, or Neural Intent..." 
                       value={query}
                       onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                       className="w-full bg-transparent border-none outline-none text-2xl font-black text-white placeholder:text-slate-700 tracking-tighter"
                     />
                     <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                           <Activity className="w-2.5 h-2.5 text-emerald-400" />
                           <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Global Trace Active</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">Predicting next hop in {state.networkLatency.toFixed(2)}ms</span>
                     </div>
                  </div>
                  <button onClick={onClose} className="p-3 text-slate-600 hover:text-white transition-all">
                     <X className="w-6 h-6" />
                  </button>
               </div>
            </div>

            {/* Results Grid */}
            <div className="flex flex-col p-6 space-y-8">
               <div className="px-4 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">AI Suggested Traces</span>
                  <div className="flex items-center gap-2">
                     <span className="text-[8px] font-bold text-slate-700 uppercase">Sort by Risk</span>
                     <ChevronDown className="w-3 h-3 text-slate-700" />
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-2 px-2">
                  {TRACE_MOCK_RESULTS.map((res, idx) => (
                    <button
                       key={res.id}
                       onMouseMove={() => setSelectedIndex(idx)}
                       className={cn(
                         "flex items-center gap-6 p-6 rounded-[2rem] transition-all group relative overflow-hidden",
                         selectedIndex === idx ? "bg-blue-600 shadow-2xl" : "hover:bg-white/5 border border-transparent hover:border-white/5"
                       )}
                    >
                       <div className={cn(
                         "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                         selectedIndex === idx ? "bg-white text-blue-600" : "bg-white/5 text-slate-500"
                       )}>
                          {res.type === 'TRANSACTION' && <Zap className="w-7 h-7" />}
                          {res.type === 'WALLET' && <Database className="w-7 h-7" />}
                          {res.type === 'ENTITY' && <Globe className="w-7 h-7" />}
                          {res.type === 'CONTRACT' && <FileText className="w-7 h-7" />}
                       </div>

                       <div className="flex-1 text-left">
                          <div className="flex items-center gap-3">
                             <span className={cn(
                               "text-lg font-black tracking-tighter",
                               selectedIndex === idx ? "text-white" : "text-slate-200"
                             )}>{res.label}</span>
                             <span className={cn(
                               "text-[8px] font-black px-2 py-0.5 rounded-full border",
                               selectedIndex === idx ? "bg-white/20 border-white/20 text-white" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                             )}>{res.type}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 opacity-70">
                             <div className="flex items-center gap-1">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Confidence:</span>
                                <span className={cn("text-[9px] font-black", selectedIndex === idx ? "text-white" : "text-blue-400")}>{res.confidence}%</span>
                             </div>
                             <div className="w-1 h-1 bg-slate-800 rounded-full" />
                             <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Status: {res.status}</span>
                          </div>
                       </div>

                       <div className="flex flex-col items-end gap-2 pr-4">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                            res.risk === 'LOW' || res.risk === 'MINIMAL' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : 
                            res.risk === 'ELEVATED' ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" : 
                            "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                          )}>
                             Risk: {res.risk}
                          </span>
                          <div className="flex gap-0.5">
                             {[...Array(5)].map((_, i) => (
                               <div key={i} className={cn("w-1 h-3 rounded-full", i < (res.confidence / 20) ? "bg-blue-400" : "bg-slate-800")} />
                             ))}
                          </div>
                       </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* Neural Visualization Footer */}
            <div className="mt-auto p-8 border-t border-white/5 bg-white/5 flex items-center justify-between">
               <div className="flex items-center gap-10">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Network Entropy</span>
                     <div className="flex items-end gap-1 mt-1">
                        {[4, 12, 8, 16, 10, 4, 18, 6].map((h, i) => (
                          <motion.div 
                            key={i} 
                            animate={{ height: [h, h*0.5, h] }} 
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                            className="w-1 bg-blue-500/40 rounded-full" 
                          />
                        ))}
                     </div>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">System Load</span>
                     <span className="text-[10px] font-black text-white mt-1">12.42% <span className="text-emerald-500 ml-1">OPT_SAFE</span></span>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                     <Command className="w-3 h-3" />
                     <span>Advanced OSINT</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-[9px] font-black text-white uppercase tracking-widest shadow-xl shadow-blue-600/20 cursor-pointer">
                     <Sparkles className="w-3 h-3" />
                     <span>Deep Forensic Trace</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
