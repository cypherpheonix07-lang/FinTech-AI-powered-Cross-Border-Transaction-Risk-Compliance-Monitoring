import React from 'react';
import { motion } from 'framer-motion';
import { 
  Network, Share2, Zap, Activity, Globe, 
  Database, RefreshCcw, Layers, Search, 
  ShieldCheck, Cpu, Radio, Link as LinkIcon,
  Cloud, Terminal, Server
} from 'lucide-react';
import { cn } from '../lib/utils';

const EcosystemPage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Ecosystem <span className="text-blue-400">Integration</span>
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             Inter-planetary Protocol Interoperability & API Mesh v3.0
          </p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-3">
              <LinkIcon className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">428 Active Endpoints</span>
           </div>
        </div>
      </header>

      {/* Hero Section: Connectivity Visualization */}
      <div className="relative h-80 glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full p-12 flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="w-64 h-64 border border-blue-500/10 rounded-full relative"
               >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                      style={{ 
                        top: '50%', 
                        left: '50%', 
                        transform: `rotate(${i * 60}deg) translate(128px) rotate(-${i * 60}deg)` 
                      }}
                    >
                       <Zap className="w-2 h-2 text-white" />
                    </motion.div>
                  ))}
               </motion.div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-16 h-16 text-blue-400 opacity-40 animate-pulse" />
               </div>
            </div>
         </div>
         <div className="absolute top-6 left-8 flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Multi-Protocol Mesh: STABLE</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
               <Server className="w-4 h-4 text-blue-400" />
               External Gateways
            </h3>
            <div className="space-y-4">
               {[
                 { name: 'Swift-X Integration', status: 'Connected', delay: '14ms' },
                 { name: 'Visa-Quantum Bridge', status: 'Active', delay: '8ms' },
                 { name: 'Fed-Galaxy Relay', status: 'Standby', delay: 'N/A' },
                 { name: 'Euro-Mesh Hub', status: 'Connected', delay: '11ms' }
               ].map((gate, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                    <div>
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">{gate.name}</p>
                       <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">Latency: {gate.delay}</p>
                    </div>
                    <div className={cn("w-2 h-2 rounded-full", gate.status === 'Connected' || gate.status === 'Active' ? 'bg-emerald-500' : 'bg-white/10')} />
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
               <Database className="w-4 h-4 text-cyan-400" />
               Data Interop
            </h3>
            <div className="space-y-6">
               <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Schema Mapping</p>
                  <div className="flex items-center gap-4">
                     <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          className="h-full bg-cyan-500"
                        />
                     </div>
                     <span className="text-[10px] font-black text-white">92%</span>
                  </div>
               </div>
               <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">API Throughput</p>
                  <p className="text-xl font-black text-white tracking-tighter">1.4M REQ/S</p>
               </div>
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
               <Cloud className="w-4 h-4 text-purple-400" />
               Cloud Sovereignty
            </h3>
            <div className="space-y-4">
               {[
                 { region: 'Earth-North', load: 42 },
                 { region: 'Mars-Alpha', load: 15 },
                 { region: 'Luna-Base', load: 8 }
               ].map((region, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <span>{region.region}</span>
                       <span>{region.load}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-purple-500"
                         style={{ width: `${region.load}%` }}
                       />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <footer className="glass-omega p-8 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
               <Terminal className="w-5 h-5 text-blue-400" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white uppercase tracking-widest">Protocol Sandbox</p>
               <p className="text-[9px] font-medium text-slate-500 uppercase mt-0.5">Test new inter-planetary API schemas.</p>
            </div>
         </div>
         <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full active:scale-95 transition-all shadow-xl shadow-white/10">
            Open Sandbox
         </button>
      </footer>
    </div>
  );
};

export default EcosystemPage;
