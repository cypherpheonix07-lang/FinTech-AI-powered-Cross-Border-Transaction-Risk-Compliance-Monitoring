import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, ShieldCheck, Zap, Activity, Globe, Brain, 
  Lock, AlertTriangle, Terminal, Cpu, RefreshCcw, 
  Layers, Database, Network, Search, Eye, Fingerprint,
  Heart, Dna, Radio, Satellite, Command, Power,
  ChevronRight, ArrowUpRight, TrendingUp, Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useNexus } from '@/context/NexusStateContext';

// --- Components ---

const MetricCard = ({ title, value, status, icon: Icon, color, onClick }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02, translateY: -5 }}
    onClick={onClick}
    className="glass-omega p-6 rounded-3xl border border-white/10 relative overflow-hidden group cursor-pointer"
  >
    <div className={cn("absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150", color)}>
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
      <div className={cn("text-[9px] font-bold uppercase tracking-widest flex items-center gap-2", status.includes('Active') || status.includes('Stable') || status.includes('OK') ? 'text-emerald-400' : 'text-amber-400')}>
        <div className={cn("w-1 h-1 rounded-full animate-pulse", status.includes('Active') || status.includes('Stable') || status.includes('OK') ? 'bg-emerald-400' : 'bg-amber-400')} />
        {status}
      </div>
    </div>
  </motion.div>
);

const NeuralStatus = () => {
  const { state } = useNexus();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Neural Auth Layer</span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 tracking-widest">SYNCED</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${state.focusScore}%` }}
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Heart Rate</p>
          <p className="text-sm font-black text-white font-mono">{state.heartRate.toFixed(0)} BPM</p>
        </div>
        <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Focus Score</p>
          <p className="text-sm font-black text-white font-mono">{state.focusScore}%</p>
        </div>
      </div>
    </div>
  );
};

const QuantumStatus = () => {
  const { state } = useNexus();
  return (
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
        Encryption Level: {state.quantumEncryptionLevel}%
      </p>
    </div>
  );
};

const GlobalFlowMap = () => (
  <div className="relative aspect-video glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/0,0,1,0,0/1200x600?access_token=pk.eyJ1IjoiYW50aWdyYXZpdHkiLCJhIjoiY2x4bXd4ZDR4MG50ZjJscXN4YnN4eXN4eSJ9')] bg-cover opacity-20 grayscale" />
    
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      
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
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Override System v4.0</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
             <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Liquidity Freeze', desc: 'Active' },
                 { label: 'Quantum Lock', desc: 'Secure' },
                 { label: 'Neural Purge', desc: 'Ready' },
                 { label: 'Node Isolation', desc: 'Linked' }
               ].map((cas, i) => (
                 <div key={i} className="space-y-1">
                   <p className="text-[9px] font-black text-white uppercase tracking-widest">{cas.label}</p>
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">{cas.desc}</p>
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
                    ? "bg-emerald-600 text-white hover:bg-emerald-500" 
                    : "bg-red-600 text-white hover:bg-red-500"
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
                  className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="px-6 bg-white/10 text-white py-4 rounded-2xl font-black text-xs uppercase"
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
  const { state, toggleOmegaProtocol } = useNexus();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000",
      state.isOmegaProtocol ? "text-red-100" : "text-white"
    )}>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
               <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
                 Project Aegis <span className="text-blue-500">v4.0</span>
               </h1>
               <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Transcendent Navigation Hub</span>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Prime_Connected</span>
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
           <div className="flex flex-col items-end border-r border-white/10 pr-10">
             <div className="text-3xl font-mono font-black tracking-tighter text-white">
               {currentTime.toLocaleTimeString([], { hour12: false })}
             </div>
             <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">
               Global_Time_Sync
             </div>
           </div>
           <div 
             onClick={() => navigate('/settings')}
             className="w-14 h-14 glass-omega rounded-2xl border border-white/5 flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all group"
           >
              <Settings className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
           </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Metrics & Neural */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <MetricCard 
              title="Global Flow Volume" 
              value={`$${(state.globalFlowVolume / 1000).toFixed(1)}k`}
              status="Planetary Stable" 
              icon={TrendingUp}
              color="text-emerald-500"
              onClick={() => navigate('/transactions')}
            />
            <MetricCard 
              title="Active Nodes" 
              value={state.activeNodes.toLocaleString()} 
              status="Network Optimized" 
              icon={Satellite}
              color="text-blue-500"
              onClick={() => navigate('/qkd-networks')}
            />
          </div>

          <div 
            onClick={() => navigate('/neural-interface-banking')}
            className="glass-omega p-8 rounded-[2.5rem] border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
          >
            <NeuralStatus />
            <div className="mt-6 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-purple-400 transition-colors">
               <span>Enter Neural Hub</span>
               <ChevronRight className="w-3 h-3" />
            </div>
          </div>

          <div 
            onClick={() => navigate('/quantum-safe-security')}
            className="glass-omega p-8 rounded-[2.5rem] border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group"
          >
            <QuantumStatus />
            <div className="mt-6 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
               <span>Audit Entropy</span>
               <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Center Column: Global Map & Operations */}
        <div className="lg:col-span-6 space-y-8">
          <GlobalFlowMap />

          <div className="grid grid-cols-2 gap-8">
             <div 
               onClick={() => navigate('/space-economy')}
               className="glass-omega p-8 rounded-[3rem] border border-white/10 group cursor-pointer hover:border-blue-500/50 transition-all relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                   <div className="p-3 bg-blue-600/20 border border-blue-500/20 rounded-2xl text-blue-400">
                      <Satellite className="w-6 h-6" />
                   </div>
                   <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-white uppercase italic mb-2 relative z-10 tracking-tighter">Orbital Nexus</h3>
                <p className="text-[11px] font-medium text-slate-500 leading-relaxed relative z-10">
                   Active LEO relay stations monitoring interstellar transaction delays.
                </p>
             </div>

             <div 
               onClick={() => navigate('/biometric')}
               className="glass-omega p-8 rounded-[3rem] border border-white/10 group cursor-pointer hover:border-emerald-500/50 transition-all relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                   <div className="p-3 bg-emerald-600/20 border border-emerald-500/20 rounded-2xl text-emerald-400">
                      <Dna className="w-6 h-6" />
                   </div>
                   <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-white uppercase italic mb-2 relative z-10 tracking-tighter">Bio-Protocol</h3>
                <p className="text-[11px] font-medium text-slate-500 leading-relaxed relative z-10">
                   Genetic signature verification and heartbeat-sync authentication active.
                </p>
             </div>
          </div>

          <div className="glass-omega p-8 rounded-[3rem] border border-white/10">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <Activity className="w-5 h-5 text-blue-500" />
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Trace Nexus Flux</h3>
                </div>
                <button 
                  onClick={() => navigate('/transactions')}
                  className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-2 group"
                >
                  View Full Ledger
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
             <div className="space-y-4">
                {[
                  { id: 'TX_9921', from: 'LND_CORE', to: 'MARS_ALPHA', amt: '$1.4M', type: 'RELATIVISTIC', status: 'Verifying' },
                  { id: 'TX_8812', from: 'TYO_HUB', to: 'NYC_GW', amt: '$840k', type: 'QUANTUM_LATTICE', status: 'Completed' },
                  { id: 'TX_7734', from: 'HKG_NODE', to: 'LND_CORE', amt: '$2.1M', type: 'NEURAL_PASS', status: 'Verifying' }
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-colors cursor-default">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-500 font-mono text-[10px] font-black">
                        {log.id.split('_')[1]}
                      </div>
                      <div>
                        <p className="text-xs font-black text-white tracking-tight">{log.from} → {log.to}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-widest">{log.amt} • {log.type}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border",
                      log.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse"
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
          <OmegaControl crisisMode={state.isOmegaProtocol} setCrisisMode={toggleOmegaProtocol} />

          <div 
            onClick={() => navigate('/compliance')}
            className="glass-omega p-8 rounded-[3rem] border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
             <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                <Network className="w-5 h-5 text-indigo-400" />
                Interstellar Hubs
             </h3>
             <div className="space-y-6">
                {[
                  { name: 'Earth Fed', compliance: 99.8, load: 64 },
                  { name: 'Lunar Delta', compliance: 100, load: 12 },
                  { name: 'Mars Alpha', compliance: 94.2, load: 8 },
                ].map((jur, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{jur.name}</span>
                       <span className="text-[9px] font-mono text-emerald-400">{jur.compliance}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${jur.load}%` }}
                         className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                       />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden group cursor-pointer shadow-2xl shadow-blue-600/20" onClick={() => navigate('/governance-vault')}>
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700 group-hover:scale-125">
                <Lock className="w-32 h-32 text-white" />
             </div>
             <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                   <Wallet className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter mb-3 leading-none">Vault Integrity</h3>
                <p className="text-[11px] font-medium text-white/70 leading-relaxed mb-8">
                   Quantum-resistant cold storage audit active for all multi-planetary assets.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                   <span>Audit Collective Assets</span>
                   <ChevronRight className="w-3 h-3" />
                </div>
             </div>
          </div>
        </div>

      </div>

      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

    </div>
  );
};

export default AegisCommandCenter;
