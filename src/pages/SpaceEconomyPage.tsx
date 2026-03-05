import React, { useState } from 'react';
import { 
  Rocket, 
  Orbit, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Satellite, 
  Pickaxe, 
  Box, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  Radar,
  Telescope
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const spaceMarketData = [
  { name: '2023', value: 380 },
  { name: '2024', value: 450 },
  { name: '2025', value: 580 },
  { name: '2026', value: 890 },
];

export default function SpaceEconomyPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Space Economy & Astro-Finance</h1>
          <p className="text-slate-500 font-medium italic">Capital management for orbital assets and extraterrestrial ventures.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Launch Investment
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Radar className="w-4 h-4 mr-2" /> Asset Tracking
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Astro-Market Overview */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 blur-[80px] -mr-32 -mt-32" />
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                       <Pickaxe className="w-6 h-6 text-slate-900" /> Asteroid Mining Index (AMI)
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Unified Extraterrestrial Commodities</p>
                    <div className="mt-8">
                       <h2 className="text-5xl font-black text-slate-900 tracking-tighter">£890<span className="text-2xl text-slate-300">.42</span></h2>
                       <div className="flex items-center gap-2 mt-2">
                          <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black">+£24.8% (YOY)</span>
                       </div>
                    </div>
                 </div>
                 <div className="h-24 w-64 hidden md:block">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={spaceMarketData}>
                          <Area type="monotone" dataKey="value" stroke="#334155" fill="#f1f5f9" strokeWidth={3} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                 <div className="space-y-6">
                    <h4 className="text-sm font-black italic">Active Portfolios</h4>
                    {[
                      { name: 'X-Space Logistics', val: '£12,400', roi: '+12%', status: 'Active' },
                      { name: 'Lunar Colony Fund', val: '£45,800', roi: '+124%', status: 'Growth' },
                    ].map(port => (
                      <div key={port.name} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-slate-300 transition-all">
                         <div>
                            <p className="text-xs font-black text-slate-900">{port.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{port.val}</p>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black text-emerald-600 block">{port.roi}</span>
                            <span className="text-[9px] font-bold text-slate-300 uppercase">{port.status}</span>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="bg-slate-950 p-8 rounded-[3rem] text-white space-y-6">
                    <div className="flex items-center gap-3">
                       <Satellite className="w-6 h-6 text-blue-400" />
                       <h4 className="text-sm font-black italic">Orbital Coverage</h4>
                    </div>
                    <div className="space-y-4">
                       {[
                         { label: 'Asset Visibility', val: 98 },
                         { label: 'Relay Uptime', val: 99.9 },
                       ].map(stat => (
                         <div key={stat.label} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                               <span>{stat.label}</span>
                               <span>{stat.val}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500" style={{ width: `${stat.val}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                    <Button variant="ghost" className="w-full text-white/40 hover:text-white font-black uppercase text-[10px] tracking-widest h-8 px-0">
                       View Constellation Map
                    </Button>
                 </div>
              </div>
           </div>

           {/* Space Logistics Insurance */}
           <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40 border border-white/5">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-3xl font-black italic">Astro-Risk Shield</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Quantum-signed insurance for lunar and orbital transit.</p>
                    </div>
                    <ShieldCheck className="w-12 h-12 text-blue-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Launch Failure', cover: '£2.4M', premium: '0.2%' },
                      { title: 'Debris Impact', cover: '£15M', premium: '0.04%' },
                      { title: 'Cargo Loss', cover: '£5M', premium: '0.12%' },
                    ].map(ins => (
                      <div key={ins.title} className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all cursor-pointer group">
                         <h5 className="text-[10px] font-black uppercase text-white/40 tracking-widest">{ins.title}</h5>
                         <p className="text-xl font-black">{ins.cover}</p>
                         <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Premium: {ins.premium}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Exploration & Feed */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Telescope className="w-4 h-4 text-slate-900" /> Discovery Feed
              </h4>
              <div className="space-y-4">
                 {[
                   { event: 'Asteroid 2024-XY Found', mass: '8.4T Platinum', status: 'Unclaimed' },
                   { event: 'Lunar Gateway Expansion', mass: 'New Hub', status: 'Completed' },
                 ].map((e) => (
                   <div key={e.event} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-2 hover:border-blue-200 transition-all cursor-pointer">
                      <h5 className="text-xs font-black text-slate-900 italic">{e.event}</h5>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-slate-400">{e.mass}</span>
                         <span className="text-[8px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">{e.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Rocket className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black italic">IPO: Orbit-Link</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       First-stage public offering for orbital refueling stations. 12% allocation reserved for PathGuard Elite.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    View Prospectus
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <Globe2 className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic leading-tight">Lunar Real Estate</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aura Plains Sector 4</p>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 Acquisition Portal <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
