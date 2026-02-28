import React, { useState } from 'react';
import { 
  X, 
  ChevronDown, 
  ChevronUp, 
  Flag, 
  Landmark, 
  ExternalLink,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const HopCard = ({ hop, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-dark-600 rounded-xl bg-dark-800/50 overflow-hidden mb-3">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-dark-600/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            {index + 1}
          </div>
          <div>
            <p className="text-sm font-mono text-slate-200">{hop.id}</p>
            <p className="text-xs text-slate-500 flex items-center mt-0.5">
              <Landmark size={12} className="mr-1" /> {hop.bank} • <Flag size={12} className="ml-1 mr-1" /> {hop.country}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-16 h-1.5 bg-dark-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${hop.risk * 100}%` }}
              className={clsx(
                "h-full",
                hop.risk > 0.6 ? "bg-risk-high" : hop.risk > 0.3 ? "bg-risk-medium" : "bg-risk-low"
              )}
            />
          </div>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-dark-900/40"
          >
            <div className="p-4 pt-0 space-y-3">
              <div className="h-px bg-dark-700 w-full mb-3" />
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Evidence & Intelligence</p>
                {hop.evidence?.map((e, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                    <ShieldAlert size={12} className="mt-0.5 text-risk-medium shrink-0" />
                    <span>{e}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center bg-dark-700/50 p-2 rounded-lg mt-2">
                <div className="flex items-center text-[10px] text-slate-500">
                  <Clock size={10} className="mr-1" /> Last Activity: {hop.lastSeen || '2026-02-15'}
                </div>
                <button className="text-[10px] text-primary flex items-center hover:underline">
                  Full Dossier <ExternalLink size={10} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TraceInspector = ({ isOpen, onClose, traceData }) => {
  if (!traceData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-screen w-[400px] bg-dark-700 border-l border-dark-600 shadow-2xl z-50 flex flex-col"
        >
          <div className="p-6 border-b border-dark-600 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-100">Trace Inspector</h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Path: {traceData.pathId}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-dark-600 rounded-full transition-colors text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-400">Hop Breakdown</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                  {traceData.hops.length} Total
                </span>
              </div>
              {traceData.hops.map((hop, i) => (
                <HopCard key={hop.id} hop={hop} index={i} />
              ))}
            </div>

            <div className="bg-dark-800 p-4 rounded-xl border border-dark-600">
              <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center">
                <ShieldAlert size={16} className="text-risk-high mr-2" /> Global Policy Violations
              </h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• SWIFT gpi verification timeout on Hop 2.</li>
                <li>• Recipient account flagged in World-Check One.</li>
                <li>• Transaction frequency exceeds entity standard profile (340% increase).</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-dark-900/50 border-t border-dark-600">
            <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              Generate Forensic Report
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TraceInspector;
