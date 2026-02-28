import React, { useState, useEffect } from 'react';
import { Terminal, Database, Cpu, Activity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TelemetryPanel.jsx
 * Internal debugging tool for monitoring store changes and system performance.
 */
const TelemetryPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    
    // Simple console hook for telemetry
    const originalLog = console.log;
    console.log = (...args) => {
      if (args[0] === 'Realtime Event Received:') {
         setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg: args.join(' ') }, ...prev].slice(0, 50));
      }
      originalLog(...args);
    };
    return () => { console.log = originalLog; };
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-dark-700 border border-primary/30 rounded-full flex items-center justify-center text-primary shadow-2xl z-[100] hover:scale-110 transition-transform"
      >
        <Terminal size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-96 max-h-[500px] bg-dark-900 border border-dark-600 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-dark-800 border-b border-dark-600 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Terminal size={16} className="text-primary" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">Dev Telemetry</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><X size={16} /></button>
            </div>

            <div className="p-4 grid grid-cols-2 gap-2 border-b border-dark-700">
              <div className="bg-dark-800 p-2 rounded-lg border border-dark-700">
                <div className="flex items-center text-[10px] text-slate-500 font-bold mb-1">
                  <Database size={10} className="mr-1" /> STORE_SIZE
                </div>
                <div className="text-sm font-mono text-primary">12.4 KB</div>
              </div>
              <div className="bg-dark-800 p-2 rounded-lg border border-dark-700">
                <div className="flex items-center text-[10px] text-slate-500 font-bold mb-1">
                  <Cpu size={10} className="mr-1" /> RENDER_CYCLE
                </div>
                <div className="text-sm font-mono text-green-500">OPTIMAL</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 bg-black/20 font-mono text-[10px]">
              {logs.length === 0 ? (
                <div className="text-slate-700 p-4 text-center">Waiting for telemetry events...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="py-1 border-b border-white/5 last:border-0">
                    <span className="text-slate-600 mr-2">[{log.time}]</span>
                    <span className="text-slate-300">{log.msg}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TelemetryPanel;
