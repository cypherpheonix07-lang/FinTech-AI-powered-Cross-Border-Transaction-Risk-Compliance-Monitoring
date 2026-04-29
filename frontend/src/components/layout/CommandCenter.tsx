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
  Target,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexus } from '@/context/NexusStateContext';

const TRACE_MOCK_RESULTS = [
  { id: 't1', type: 'TRANSACTION', label: 'Transaction Ledger', path: '/transactions', status: 'VERIFIED', risk: 'LOW', confidence: 99 },
  { id: 't2', type: 'WALLET', label: 'Governance Vault', path: '/governance-vault', status: 'SECURE', risk: 'MINIMAL', confidence: 100 },
  { id: 't3', type: 'ENTITY', label: 'Space Economy', path: '/space-economy', status: 'FLAGGED', risk: 'ELEVATED', confidence: 74 },
  { id: 't4', type: 'CONTRACT', label: 'Compliance Hub', path: '/compliance', status: 'ACTIVE', risk: 'STABLE', confidence: 92 },
  { id: 't5', type: 'NEURAL', label: 'Neural Banking', path: '/neural-interface-banking', status: 'SYNCED', risk: 'LOW', confidence: 98 },
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

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % TRACE_MOCK_RESULTS.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + TRACE_MOCK_RESULTS.length) % TRACE_MOCK_RESULTS.length);
    } else if (e.key === 'Enter') {
      handleSelect(TRACE_MOCK_RESULTS[selectedIndex].path);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-950/40 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-[850px] bg-black/90 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_150px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden flex flex-col focus:outline-none"
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
               
               <div className="flex items-center gap-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                     <Target className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                     <input 
                       ref={inputRef}
                       type="text" 
                       placeholder="Enter Trace ID, Entity, or Neural Intent..." 
                       value={query}
                       onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                       className="w-full bg-transparent border-none outline-none text-3xl font-black text-white placeholder:text-slate-700 tracking-tighter"
                     />
                     <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                           <Activity className="w-3 h-3 text-emerald-400" />
                           <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Aegis_Live_Stream</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Resolving neural path in {state.networkLatency.toFixed(2)}ms</span>
                     </div>
                  </div>
                  <button onClick={onClose} className="p-4 text-slate-600 hover:text-white transition-all">
                     <X className="w-8 h-8" />
                  </button>
               </div>
            </div>

            {/* Results Grid */}
            <div className="flex flex-col p-8 space-y-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
               <div className="px-4 flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Suggested Traces</span>
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] font-bold text-slate-700 uppercase">Filtered by Relevance</span>
                     <ChevronDown className="w-4 h-4 text-slate-700" />
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-3 px-2 pb-10">
                  {TRACE_MOCK_RESULTS.map((res, idx) => (
                    <button
                       key={res.id}
                       onMouseMove={() => setSelectedIndex(idx)}
                       onClick={() => handleSelect(res.path)}
                       className={cn(
                         "flex items-center gap-8 p-6 rounded-[2.5rem] transition-all group relative overflow-hidden",
                         selectedIndex === idx ? "bg-blue-600 shadow-2xl scale-[1.02]" : "hover:bg-white/5 border border-transparent hover:border-white/5"
                       )}
                    >
                       <div className={cn(
                         "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                         selectedIndex === idx ? "bg-white text-blue-600" : "bg-white/5 text-slate-500"
                       )}>
                          {res.type === 'TRANSACTION' && <Zap className="w-8 h-8" />}
                          {res.type === 'WALLET' && <Database className="w-8 h-8" />}
                          {res.type === 'ENTITY' && <Globe className="w-8 h-8" />}
                          {res.type === 'CONTRACT' && <FileText className="w-8 h-8" />}
                          {res.type === 'NEURAL' && <Brain className="w-8 h-8" />}
                       </div>

                       <div className="flex-1 text-left">
                          <div className="flex items-center gap-4">
                             <span className={cn(
                               "text-xl font-black tracking-tighter",
                               selectedIndex === idx ? "text-white" : "text-slate-200"
                             )}>{res.label}</span>
                             <span className={cn(
                               "text-[9px] font-black px-3 py-1 rounded-full border",
                               selectedIndex === idx ? "bg-white/20 border-white/20 text-white" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                             )}>{res.type}</span>
                          </div>
                          <div className="flex items-center gap-5 mt-2 opacity-70">
                             <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Confidence:</span>
                                <span className={cn("text-[10px] font-black", selectedIndex === idx ? "text-white" : "text-blue-400")}>{res.confidence}%</span>
                             </div>
                             <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status: {res.status}</span>
                          </div>
                       </div>

                       <div className="flex flex-col items-end gap-3 pr-6">
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl",
                            res.risk === 'LOW' || res.risk === 'MINIMAL' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : 
                            res.risk === 'ELEVATED' ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" : 
                            "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                          )}>
                             Risk: {res.risk}
                          </span>
                       </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* Neural Visualization Footer */}
            <div className="mt-auto p-10 border-t border-white/5 bg-white/5 flex items-center justify-between">
               <div className="flex items-center gap-12">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Network Entropy</span>
                     <div className="flex items-end gap-1.5 mt-2">
                        {[4, 12, 8, 16, 10, 4, 18, 6, 12, 8].map((h, i) => (
                          <motion.div 
                            key={i} 
                            animate={{ height: [h, h*0.4, h] }} 
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                            className="w-1.5 bg-blue-500/30 rounded-full" 
                          />
                        ))}
                     </div>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">BCI Load</span>
                     <span className="text-sm font-black text-white mt-2">14.82% <span className="text-emerald-500 ml-2 font-mono text-[10px]">COHERENT</span></span>
                  </div>
               </div>
               
               <div className="flex gap-5">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <Command className="w-4 h-4" />
                     <span>Advanced Filters</span>
                  </div>
                  <div className="flex items-center gap-3 px-8 py-3 bg-blue-600 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest shadow-2xl shadow-blue-600/30 cursor-pointer">
                     <Sparkles className="w-4 h-4" />
                     <span>Initiate Deep Trace</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
