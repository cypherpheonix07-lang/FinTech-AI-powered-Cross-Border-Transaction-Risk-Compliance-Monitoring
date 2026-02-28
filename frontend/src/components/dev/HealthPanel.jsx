import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, ShieldCheck, AlertCircle } from 'lucide-react';

/**
 * HealthPanel.jsx
 * Internal monitor for system vitals (mocked telemetry).
 */
const HealthPanel = () => {
  const [vitals, setVitals] = useState({
    latency: '1.2ms',
    cpu: 18,
    memory: '1.4GB',
    connectivity: 'stable',
    engineStatus: 'ready'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(v => ({
        ...v,
        latency: (Math.random() * 2 + 0.5).toFixed(1) + 'ms',
        cpu: Math.floor(Math.random() * 40 + 5)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark-800/80 backdrop-blur-xl border border-dark-600 rounded-3xl p-6 shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
          <Activity size={14} className="text-primary mr-2" /> System Vitals
        </h4>
        <div className="flex items-center space-x-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[10px] font-bold text-green-500 uppercase">Operational</span>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-dark-900/50 p-4 rounded-2xl border border-dark-700">
              <Cpu size={14} className="text-slate-500 mb-2" />
              <div className="text-lg font-bold text-slate-100">{vitals.cpu}%</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">XAI LOAD</div>
           </div>
           <div className="bg-dark-900/50 p-4 rounded-2xl border border-dark-700">
              <Wifi size={14} className="text-slate-500 mb-2" />
              <div className="text-lg font-bold text-slate-100">{vitals.latency}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">LATENCY</div>
           </div>
        </div>

        <div className="bg-dark-900/50 p-4 rounded-2xl border border-dark-700 flex items-center justify-between">
           <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                 <ShieldCheck size={16} />
              </div>
              <div>
                 <div className="text-[10px] font-bold text-slate-200">INTELLIGENCE ENGINE</div>
                 <div className="text-[9px] text-slate-500 uppercase">Version 4.2.0-stable</div>
              </div>
           </div>
           <AlertCircle size={14} className="text-slate-700" />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-dark-700">
         <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center mb-2">Internal Telemetry Only</div>
         <div className="h-1.5 w-full bg-dark-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              animate={{ width: ['20%', '80%', '20%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
         </div>
      </div>
    </div>
  );
};

export default HealthPanel;
