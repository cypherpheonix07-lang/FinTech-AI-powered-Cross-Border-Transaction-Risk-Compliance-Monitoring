import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Shield, Activity, Zap, Database, 
  Network, Eye, Lock, RefreshCcw, Layers, 
  Filter, Download, Share2, AlertTriangle
} from 'lucide-react';
import { cn } from '../lib/utils';

const ForensicVisualizer = () => (
  <div className="relative h-96 glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 bg-slate-950" />
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="relative w-full h-full p-12">
          {/* Animated Graph Nodes */}
          {[...Array(6)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 x: [Math.random() * 600, Math.random() * 600],
                 y: [Math.random() * 300, Math.random() * 300]
               }}
               transition={{ duration: 10 + i * 2, repeat: Infinity, repeatType: 'reverse' }}
               className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center"
             >
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="absolute -bottom-6 text-[8px] font-black text-blue-400 uppercase tracking-widest whitespace-nowrap">
                   NODE_0x{i}A7
                </div>
             </motion.div>
          ))}
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 400">
             <motion.path 
                d="M 100,100 L 400,200 L 700,100 M 400,200 L 400,350"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1"
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
             />
          </svg>
       </div>
    </div>

    <div className="absolute top-6 left-8 flex items-center gap-3">
       <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
       <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Quantum Trace Active: Depth 128</span>
    </div>

    <div className="absolute bottom-6 right-8 flex items-center gap-4">
       <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          Entropy Score: 0.9992
       </div>
    </div>
  </div>
);

const ForensicLogCard = ({ txId, source, dest, amt, risk, status }: any) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group cursor-pointer">
    <div className="flex items-center justify-between mb-4">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-500 font-mono text-[10px] font-black">
             {txId}
          </div>
          <div>
             <p className="text-[10px] font-black text-white uppercase tracking-widest">{source} → {dest}</p>
             <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">{amt}</p>
          </div>
       </div>
       <div className="text-right">
          <p className={cn("text-[9px] font-black uppercase tracking-widest mb-1", risk === 'Critical' ? 'text-red-500' : 'text-emerald-400')}>
             {risk} Risk
          </p>
          <p className="text-[10px] font-black text-white uppercase tracking-widest">{status}</p>
       </div>
    </div>
    <div className="flex items-center gap-3">
       <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <div className={cn("h-full", risk === 'Critical' ? 'bg-red-500' : 'bg-emerald-500')} style={{ width: risk === 'Critical' ? '92%' : '14%' }} />
       </div>
       <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Eye className="w-4 h-4 text-slate-500" />
       </button>
    </div>
  </div>
);

const TraceNexusForensics = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Trace <span className="text-blue-500">Nexus</span> Forensics
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             Quantum-Level Transaction Tracing & Forensic Analysis
          </p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
              <Filter className="w-4 h-4" />
              Advanced Filter
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
              <RefreshCcw className="w-4 h-4" />
              Rescan Network
           </button>
        </div>
      </header>

      <ForensicVisualizer />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
               <h2 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-500" />
                  Anomalous Activity Logs
               </h2>
               <div className="flex gap-4">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">4 Critical</span>
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">12 Moderate</span>
               </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
               {[
                 { txId: '0x88A2', source: 'LND_HUB_A', dest: 'DARK_POOL_X', amt: '$4.2M', risk: 'Critical', status: 'Flagged' },
                 { txId: '0x99B1', source: 'NYC_GATE', dest: 'MARS_ALPHA', amt: '$120k', risk: 'Low', status: 'Verified' },
                 { txId: '0x77C3', source: 'HKG_CORE', dest: 'LND_HUB_B', amt: '$840k', risk: 'Moderate', status: 'Pending' },
                 { txId: '0x44D5', source: 'TYO_NODE', dest: 'UNKNOWN_RECV', amt: '$1.1M', risk: 'Critical', status: 'Intercepted' }
               ].map((log, i) => (
                 <ForensicLogCard key={i} {...log} />
               ))}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
               <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  Forensic Health
               </h3>
               <div className="space-y-6">
                  {[
                    { label: 'Packet Integrity', val: 99.8 },
                    { label: 'Metadata Depth', val: 84.0 },
                    { label: 'Jurisdiction Coverage', val: 92.1 }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>{stat.label}</span>
                          <span>{stat.val}%</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.val}%` }}
                            className="h-full bg-blue-500" 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <Eye className="w-24 h-24 text-white" />
               </div>
               <h3 className="text-lg font-black text-white italic tracking-tighter mb-2">Deep Trace</h3>
               <p className="text-[10px] font-medium text-slate-500 leading-relaxed mb-8">
                  Initiate a sub-quantum scan of all related wallet addresses across 14 dimensions.
               </p>
               <button className="w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                  Run Deep Trace
               </button>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-red-600/10 border border-red-500/20">
               <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Security Alert</span>
               </div>
               <p className="text-[10px] font-medium text-red-100/60 leading-relaxed">
                  Possible liquidity leakage detected in the Mars-Relay channel. Omega Protocol auto-isolation recommended.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TraceNexusForensics;
