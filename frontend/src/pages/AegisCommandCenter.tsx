import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, ShieldCheck, Zap, Activity, Globe, Brain, 
  Lock, AlertTriangle, Terminal, Cpu, RefreshCcw, 
  Layers, Database, Network, Search, Eye, Fingerprint,
  Heart, Dna, Radio, Satellite, Command, Power
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Components ---

const MetricCard = ({ title, value, status, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02, translateY: -5 }}
    className="glass-omega p-6 rounded-3xl border border-white/10 relative overflow-hidden group cursor-default"
  >
    <div className={cn("absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity", color)}>
      <Icon className="w-24 h-24" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border border-white/10", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{title}</span>
      </div>
      <div className="text-3xl font-black text-white tracking-tighter mb-1">{value}</div>
      <div className={cn("text-[9px] font-bold uppercase tracking-widest", status.includes('Active') || status.includes('Stable') ? 'text-emerald-400' : 'text-amber-400')}>
        {status}
      </div>
    </div>
  </motion.div>
);

const NeuralStatus = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-purple-400" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white">Neural Auth Layer</span>
      </div>
      <span className="text-[9px] font-mono text-emerald-400 tracking-widest">ENCRYPTED</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '92%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
      />
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="p-2 bg-white/5 rounded-lg border border-white/5">
        <p className="text-[8px] font-bold text-slate-500 uppercase">EEG Sync</p>
        <p className="text-xs font-black text-white">512 CH</p>
      </div>
      <div className="p-2 bg-white/5 rounded-lg border border-white/5">
        <p className="text-[8px] font-bold text-slate-500 uppercase">Cognitive Load</p>
        <p className="text-xs font-black text-white">24%</p>
      </div>
    </div>
  </div>
);

const QuantumStatus = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-cyan-400" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white">Quantum Lattice</span>
      </div>
      <span className="text-[9px] font-mono text-cyan-400 tracking-widest">COHERENT</span>
    </div>
    <div className="flex gap-1 h-8 items-end">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [10, 20 + Math.random() * 20, 10] }}
          transition={{ duration: 1 + Math.random(), repeat: Infinity }}
          className="flex-1 bg-cyan-500/30 rounded-t-sm"
        />
      ))}
    </div>
    <p className="text-[8px] font-mono text-slate-500 text-center uppercase tracking-widest">
      Post-Quantum Entropy: 0.9999971
    </p>
  </div>
);

const GlobalFlowMap = () => (
  <div className="relative aspect-video glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/0,0,1,0,0/1200x600?access_token=pk.eyJ1IjoiYW50aWdyYXZpdHkiLCJhIjoiY2x4bXd4ZDR4MG50ZjJscXN4YnN4eXN4eSJ9')] bg-cover opacity-20 grayscale" />
    
    {/* Animated Flow Lines (SVG) */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      
      {/* Sample Flow Paths */}
      {[
        "M 200,200 Q 500,100 800,250",
        "M 300,400 Q 600,300 900,100",
        "M 100,100 Q 400,250 200,400",
        "M 700,450 Q 850,300 950,450"
      ].map((path, i) => (
        <g key={i}>
          <path d={path} fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          <motion.path
            d={path}
            fill="none"
            stroke="url(#flowGrad)"
            strokeWidth="2"
            strokeDasharray="20, 1000"
            animate={{ strokeDashoffset: [-1000, 1000] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        </g>
      ))}
      
      {/* Node Points */}
      {[
        { x: 200, y: 200, label: 'LND_CORE' },
        { x: 800, y: 250, label: 'HKG_HUB' },
        { x: 300, y: 400, label: 'NYC_GW' },
        { x: 900, y: 100, label: 'TYO_NODE' }
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="3" fill="#3b82f6" />
          <circle cx={node.x} cy={node.y} r="8" fill="none" stroke="#3b82f6" strokeWidth="0.5">
            <animate attributeName="r" from="3" to="15" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={node.x + 10} y={node.y + 4} fill="white" fontSize="8" fontWeight="bold" className="opacity-40">{node.label}</text>
        </g>
      ))}
    </svg>

    <div className="absolute bottom-6 left-6 flex items-center gap-4">
      <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Planetary Sync Active</span>
      </div>
      <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
        <span className="text-[9px] font-mono text-slate-500">LATENCY: 24.0ms (AVG)</span>
      </div>
    </div>
  </div>
);

const OmegaControl = ({ crisisMode, setCrisisMode }: any) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={cn(
      "p-8 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden",
      crisisMode ? "bg-red-950/20 border-red-500/50 shadow-2xl shadow-red-500/20" : "glass-omega border-white/10"
    )}>
      {/* Background Warning Glow */}
      {crisisMode && (
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-600/10 blur-3xl"
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border",
              crisisMode ? "bg-red-600 text-white border-red-400 shadow-lg shadow-red-600/50" : "bg-white/5 text-white border-white/10"
            )}>
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter text-white uppercase italic">Omega Protocol</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Override System v3.0</p>
            </div>
          </div>
          <div className={cn(
            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border",
            crisisMode ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          )}>
            {crisisMode ? 'CRISIS MODE ACTIVE' : 'NOMINAL STATUS'}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-xs font-black text-white uppercase mb-4 tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Emergency Cascades
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Liquidity Freeze', desc: 'Instant halt of all outflows' },
                { label: 'Quantum Lock', desc: 'Isolate all private keys' },
                { label: 'Neural Purge', desc: 'Clear all active sessions' },
                { label: 'Node Isolation', desc: 'Sever interplanetary relays' }
              ].map((cas, i) => (
                <div key={i} className="space-y-2 opacity-50">
                  <p className="text-[10px] font-black text-white">{cas.label}</p>
                  <p className="text-[8px] font-medium text-slate-500 leading-tight">{cas.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {!showConfirm ? (
              <button 
                onClick={() => setShowConfirm(true)}
                className={cn(
                  "flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95",
                  crisisMode 
                    ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-600/20" 
                    : "bg-red-600 text-white hover:bg-red-500 shadow-xl shadow-red-600/20"
                )}
              >
                {crisisMode ? 'Deactivate Omega' : 'Activate Omega'}
              </button>
            ) : (
              <div className="flex-1 flex gap-2">
                <button 
                  onClick={() => {
                    setCrisisMode(!crisisMode);
                    setShowConfirm(false);
                  }}
                  className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95"
                >
                  Confirm Execution
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="px-6 bg-white/10 text-white py-4 rounded-2xl font-black text-xs uppercase active:scale-95"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

const AegisCommandCenter = () => {
  const [crisisMode, setCrisisMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (crisisMode) {
      document.body.classList.add('crisis-active');
    } else {
      document.body.classList.remove('crisis-active');
    }
  }, [crisisMode]);

  return (
    <div className={cn(
      "min-h-screen p-8 transition-colors duration-1000",
      crisisMode ? "text-red-100" : "text-white"
    )}>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Project Aegis <span className="text-blue-500">v3.0</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              OMEGA PROTOCOL OPERATIONAL CENTER
            </p>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase">System Ready</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-2xl font-mono font-black tracking-tighter">
            {currentTime.toLocaleTimeString([], { hour12: false })}
          </div>
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">
            {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Metrics & Neural */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <MetricCard 
              title="Global Liquidity" 
              value="$14.2T" 
              status="Planetary Stable" 
              icon={Globe}
              color="text-blue-500"
            />
            <MetricCard 
              title="Quantum Entropy" 
              value="0.9997" 
              status="Highly Coherent" 
              icon={Zap}
              color="text-cyan-500"
            />
          </div>

          <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <NeuralStatus />
          </div>

          <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <QuantumStatus />
          </div>
        </div>

        {/* Center Column: Global Map & Operations */}
        <div className="lg:col-span-6 space-y-8">
          <GlobalFlowMap />

          <div className="grid grid-cols-2 gap-8">
             <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10 group cursor-pointer hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                   <Satellite className="w-6 h-6 text-indigo-400" />
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Search className="w-4 h-4 text-slate-500" />
                   </div>
                </div>
                <h3 className="text-sm font-black text-white uppercase italic mb-2">Orbital Nodes</h3>
                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
                   Active LEO relay stations monitoring interstellar transaction delays.
                </p>
                <div className="mt-6 flex items-center gap-2">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                         <div key={i} className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-400">
                            S{i}
                         </div>
                      ))}
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 ml-2">+14 Nodes</span>
                </div>
             </div>

             <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10 group cursor-pointer hover:border-emerald-500/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                   <Dna className="w-6 h-6 text-emerald-400" />
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <RefreshCcw className="w-4 h-4 text-slate-500" />
                   </div>
                </div>
                <h3 className="text-sm font-black text-white uppercase italic mb-2">Bio-Compliance</h3>
                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
                   Genetic signature verification and heartbeat-sync authentication active.
                </p>
                <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="h-full w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                   />
                </div>
             </div>
          </div>

          <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                   <Activity className="w-4 h-4 text-blue-500" />
                   Trace Nexus Real-time Logs
                </h3>
                <button className="text-[9px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300">View All</button>
             </div>
             <div className="space-y-4">
                {[
                  { id: 'TX_9921', from: 'LND_CORE', to: 'MARS_ALPHA', amt: '$1.4M', type: 'RELATIVISTIC', status: 'Verifying' },
                  { id: 'TX_8812', from: 'TYO_HUB', to: 'NYC_GW', amt: '$840k', type: 'QUANTUM_LATTICE', status: 'Completed' },
                  { id: 'TX_7734', from: 'HKG_NODE', to: 'LND_CORE', amt: '$2.1M', type: 'NEURAL_PASS', status: 'Verifying' }
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-blue-500 font-mono text-[8px] font-bold">
                        {log.id.split('_')[1]}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white">{log.from} → {log.to}</p>
                        <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">{log.amt} • {log.type}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                      log.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                    )}>
                      {log.status}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Omega Controls & System Intel */}
        <div className="lg:col-span-3 space-y-8">
          <OmegaControl crisisMode={crisisMode} setCrisisMode={setCrisisMode} />

          <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
             <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-400" />
                Interstellar Jurisdictions
             </h3>
             <div className="space-y-4">
                {[
                  { name: 'Earth Federation', compliance: 99.8, load: 64 },
                  { name: 'Lunar Base Delta', compliance: 100, load: 12 },
                  { name: 'Mars Colony 1', compliance: 94.2, load: 8 },
                ].map((jur, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-slate-400">{jur.name}</span>
                       <span className="text-[9px] font-mono text-white">{jur.compliance}% OK</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-indigo-500"
                         style={{ width: `${jur.load}%` }}
                       />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Lock className="w-24 h-24 text-white" />
             </div>
             <h3 className="text-lg font-black text-white italic tracking-tighter mb-2">Vault Integrity</h3>
             <p className="text-[10px] font-medium text-white/60 leading-relaxed mb-6">
                All cryptographic assets are currently secured within quantum-resistant vaults.
             </p>
             <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all">
                Audit Assets
             </button>
          </div>
        </div>

      </div>

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

    </div>
  );
};

export default AegisCommandCenter;
