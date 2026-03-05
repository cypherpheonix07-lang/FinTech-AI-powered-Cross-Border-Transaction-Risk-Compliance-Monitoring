import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Command, 
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMANDS } from '@/data/commands';

export default function CommandCenter({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      if (filtered[selectedIndex]) {
        navigate(filtered[selectedIndex].path);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-[640px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col focus:outline-none"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Area */}
            <div className="p-6 flex items-center gap-4 border-b border-slate-100 bg-slate-50/50">
               <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <Command className="w-5 h-5" />
               </div>
               <input 
                 ref={inputRef}
                 type="text" 
                 placeholder="Search PathGuard (⌘K)..." 
                 value={query}
                 onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                 className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-slate-900 placeholder:text-slate-400"
               />
               <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                  <X className="w-5 h-5" />
               </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-3 space-y-4">
               {filtered.length > 0 ? (
                 <div className="space-y-1">
                   {filtered.map((cmd, idx) => (
                     <button
                        key={cmd.id}
                        onClick={() => { navigate(cmd.path); onClose(); }}
                        onMouseMove={() => setSelectedIndex(idx)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group",
                          selectedIndex === idx ? "bg-blue-600 shadow-xl shadow-blue-600/10" : "hover:bg-slate-50"
                        )}
                     >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                          selectedIndex === idx ? "bg-white text-blue-600 scale-110" : "bg-slate-100 text-slate-400 group-hover:bg-white"
                        )}>
                           <cmd.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2">
                             <p className={cn(
                               "text-sm font-black tracking-tight",
                               selectedIndex === idx ? "text-white" : "text-slate-900"
                             )}>
                               {cmd.name}
                             </p>
                             {cmd.premium && (
                               <span className={cn(
                                 "text-[8px] font-black uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full",
                                 selectedIndex === idx ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
                               )}>
                                 PREMIUM
                               </span>
                             )}
                           </div>
                           <p className={cn(
                             "text-[11px] font-medium opacity-70 truncate",
                             selectedIndex === idx ? "text-blue-50" : "text-slate-500"
                           )}>
                             {cmd.description}
                           </p>
                        </div>
                        <div className={cn(
                           "text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity",
                           selectedIndex === idx ? "text-blue-200" : "text-slate-400"
                        )}>
                           {cmd.category}
                        </div>
                     </button>
                   ))}
                 </div>
               ) : (
                 <div className="p-12 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center mx-auto">
                       <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">No results found for "{query}"</p>
                       <p className="text-xs text-slate-500 mt-1">Try searching for "Analytics", "Coach", or "Quantum".</p>
                    </div>
                 </div>
               )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <div className="flex gap-4">
                 <span className="flex items-center gap-1"><kbd className="bg-white border rounded px-1 min-w-[20px] text-center">↵</kbd> Select</span>
                 <span className="flex items-center gap-1"><kbd className="bg-white border rounded px-1 min-w-[20px] text-center">↑↓</kbd> Navigate</span>
                 <span className="flex items-center gap-1"><kbd className="bg-white border rounded px-1 min-w-[20px] text-center">esc</kbd> Close</span>
               </div>
               <div className="text-blue-600 font-black tracking-tighter">PathGuard OS v2.0</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
