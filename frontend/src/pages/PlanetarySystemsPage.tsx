import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Radio, Satellite, Zap, Activity, 
  MapPin, Navigation, Database, Search, 
  Layers, Network, ShieldCheck, Heart, 
  Clock, Sun, Moon
} from 'lucide-react';
import { cn } from '../lib/utils';

const PlanetaryGlobe = () => (
  <div className="relative h-80 glass-omega rounded-[2rem] border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/0,0,1,0,0/1200x800?access_token=pk.eyJ1IjoiYW50aWdyYXZpdHkiLCJhIjoiY2x4bXd4ZDR4MG50ZjJscXN4YnN4eXN4eSJ9')] bg-cover opacity-10 grayscale" />
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border border-emerald-500/10 rounded-full" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-64 h-64 border border-blue-500/10 rounded-full scale-125" 
          />
          <div className="absolute inset-0 m-auto w-48 h-48 bg-gradient-to-br from-blue-600/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse" />
          <Globe className="absolute inset-0 m-auto w-24 h-24 text-white opacity-40" />
       </div>
    </div>
    
    {/* Orbital Nodes */}
    {[
      { top: '20%', left: '30%', name: 'LEO_RELAY_01' },
      { top: '60%', left: '70%', name: 'MARS_COMMS' },
      { top: '40%', left: '15%', name: 'LUNAR_GATE' }
    ].map((node, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute flex items-center gap-2"
        style={{ top: node.top, left: node.left }}
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{node.name}</span>
      </motion.div>
    ))}

    <div className="absolute bottom-6 left-8 flex items-center gap-6">
       <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">9 Nodes Operational</span>
       </div>
       <div className="flex items-center gap-2 text-slate-500">
          <Clock className="w-3 h-3" />
          <span className="text-[10px] font-mono tracking-widest text-white/50">PLANETARY_TIME: 14:22:01 UTC</span>
       </div>
    </div>
  </div>
);

const PlanetaryFeatureCard = ({ title, desc, icon: Icon, value, color }: any) => (
  <div className="glass-omega p-6 rounded-3xl border border-white/10 group hover:border-white/20 transition-all">
    <div className="flex items-start justify-between mb-6">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10", color)}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <Activity className="w-4 h-4 text-slate-500" />
       </div>
    </div>
    <h3 className="text-sm font-black text-white uppercase italic mb-2 tracking-tight">{title}</h3>
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed mb-6">{desc}</p>
    <div className="flex items-center justify-between">
       <span className="text-xl font-black text-white tracking-tighter">{value}</span>
       <div className="flex -space-x-2">
          {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border border-zinc-900 bg-zinc-800" />)}
       </div>
    </div>
  </div>
);

const PlanetarySystemsPage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-emerald-500" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Planetary <span className="text-emerald-500">Systems</span> Core
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Multi-Planetary Financial Infrastructure (MPFI) v2.0
          </p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
              Relay Status
           </button>
           <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
              Initiate Sync
           </button>
        </div>
      </header>

      <PlanetaryGlobe />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <PlanetaryFeatureCard 
          title="Relay Latency"
          desc="Speed of light corrected transaction propagation."
          icon={Radio}
          value="24.0ms"
          color="text-emerald-400"
        />
        <PlanetaryFeatureCard 
          title="CBDC Bridge"
          desc="Cross-planetary central bank digital currency exchange."
          icon={Zap}
          value="ACTIVE"
          color="text-blue-400"
        />
        <PlanetaryFeatureCard 
          title="Orbital Nodes"
          desc="LEO and GEO based validation nodes for global reach."
          icon={Satellite}
          value="14 Active"
          color="text-indigo-400"
        />
        <PlanetaryFeatureCard 
          title="Trust Fabric"
          desc="Distributed ledger for multi-planetary jurisdiction."
          icon={ShieldCheck}
          value="Pass"
          color="text-cyan-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Layers className="w-6 h-6 text-blue-500" />
               Global Liquidity Fabric
            </h2>
            <div className="space-y-6">
               {[
                 { name: 'Earth-Mars Bridge', cap: '$840B', status: 'Optimal', load: 42 },
                 { name: 'Lunar Settlement Hub', cap: '$120B', status: 'Stable', load: 15 },
                 { name: 'Deep Space Relay', cap: '$14.2T', status: 'High Load', load: 88 }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-colors">
                    <div className="flex justify-between items-center mb-4">
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</p>
                          <p className="text-lg font-black text-white tracking-tighter uppercase">{item.cap}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-white uppercase tracking-widest">{item.status}</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Load: {item.load}%</p>
                       </div>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${item.load}%` }}
                         transition={{ duration: 1 + i }}
                         className={cn("h-full", item.load > 80 ? 'bg-amber-500' : 'bg-blue-500')}
                       />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Navigation className="w-6 h-6 text-emerald-500" />
               Orbital Comms
            </h2>
            <div className="space-y-4">
               {[
                 { node: 'SAT-ALPHA', strength: 98, status: 'UP' },
                 { node: 'SAT-BETA', strength: 42, status: 'SYNC' },
                 { node: 'LUNAR-G1', strength: 100, status: 'UP' },
                 { node: 'MARS-R1', strength: 84, status: 'UP' }
               ].map((sat, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                       <Radio className="w-4 h-4 text-emerald-500" />
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">{sat.node}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="flex gap-0.5">
                          {[...Array(4)].map((_, j) => (
                             <div key={j} className={cn("w-0.5 h-2 rounded-full", j < (sat.strength/25) ? 'bg-emerald-500' : 'bg-white/10')} />
                          ))}
                       </div>
                       <span className={cn("text-[8px] font-black px-1.5 py-0.5 rounded", sat.status === 'UP' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>
                          {sat.status}
                       </span>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-600 to-blue-700 rounded-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Satellite className="w-16 h-16 text-white" />
               </div>
               <h3 className="text-sm font-black text-white italic mb-1">Deep Space Auth</h3>
               <p className="text-[10px] font-medium text-white/70 leading-relaxed mb-6">Verify inter-planetary signatures via relativistic hash.</p>
               <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-white transition-all">Verify Relay</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PlanetarySystemsPage;
