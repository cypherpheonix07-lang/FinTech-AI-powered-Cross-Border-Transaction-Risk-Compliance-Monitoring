import React, { useState } from 'react';
import { 
  Droplet, 
  Wind, 
  Sun, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Leaf, 
  Mountain, 
  Trees, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Factory
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
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const resourceFlow = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 52 },
  { name: 'Wed', value: 48 },
  { name: 'Thu', value: 65 },
  { name: 'Fri', value: 72 },
  { name: 'Sat', value: 68 },
  { name: 'Sun', value: 80 },
];

export default function NaturalResourcesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Natural Resources & Commodities</h1>
          <p className="text-slate-500 font-medium italic">Tokenized ownership and real-time trading of Earth's critical assets.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Purchase Resource
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <BarChart3 className="w-4 h-4 mr-2" /> Market Depth
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Resource Market Hub */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                       <Mountain className="w-6 h-6 text-emerald-600" /> Commodity Flow
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-Time Extraction & Trade Volume</p>
                 </div>
                 <div className="h-16 w-48">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={resourceFlow}>
                          <Area type="monotone" dataKey="value" stroke="#059669" fill="#ecfdf5" strokeWidth={3} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                 <div className="space-y-6">
                    <h4 className="text-sm font-black italic">Active Ventures</h4>
                    {[
                      { name: 'Lithium Delta-9', location: 'Atacama, CL', val: '£24K/ton', trend: '+12.4%', icon: Factory },
                      { name: 'Basin-2 Water Rights', location: 'Colorado, US', val: '£0.8K/AF', trend: '+4.2%', icon: Droplet },
                    ].map(ven => (
                      <div key={ven.name} className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center gap-6 hover:border-emerald-200 transition-all cursor-pointer group">
                         <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                            <ven.icon className="w-6 h-6" />
                         </div>
                         <div className="flex-1">
                            <h5 className="text-sm font-black text-slate-900">{ven.name}</h5>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{ven.location}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black text-slate-900">{ven.val}</p>
                            <span className="text-[10px] font-black text-emerald-600">{ven.trend}</span>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-emerald-900/40">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
                    <div className="relative z-10 space-y-6">
                       <h4 className="text-xl font-black italic">Sustainability Index</h4>
                       <div className="h-32 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={resourceFlow.slice(0, 5)}>
                                <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                                   {resourceFlow.slice(0, 5).map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#334155'} />
                                   ))}
                                </Bar>
                             </BarChart>
                          </ResponsiveContainer>
                       </div>
                       <p className="text-xs text-white/40 font-medium italic">"Your current resource portfolio is 84% ESG aligned. Consider tokenizing your forest offset to increase liquidity."</p>
                       <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest shadow-xl shadow-emerald-600/20">
                          Optimize ESG
                       </Button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Carbon Credit Registry */}
           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-emerald-900 to-slate-950 text-white relative overflow-hidden group shadow-xl border border-emerald-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Global Carbon Ledger</h3>
                       <p className="text-emerald-100/40 text-sm font-medium mt-1">Institutional-grade verification for cross-border carbon trading.</p>
                    </div>
                    <Leaf className="w-10 h-10 text-emerald-400" />
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Spot Price', val: '£84.20' },
                      { label: 'Verified Offset', val: '42.8T' },
                      { label: 'Market Cap', val: '£2.4B' },
                      { label: 'Uptime', val: '100%' },
                    ].map(m => (
                      <div key={m.label}>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{m.label}</p>
                         <p className="text-lg font-black">{m.val}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Intelligence Side */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Trees className="w-4 h-4 text-emerald-600" /> Land Restoration ROI
              </h4>
              <div className="p-6 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 text-center">
                 <h2 className="text-4xl font-black text-emerald-700 tracking-tighter">14.2%</h2>
                 <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Average Recovery Yield</p>
              </div>
              <div className="space-y-4">
                 <div className="p-4 rounded-3xl bg-white border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">Soil Quality Index</span>
                    <span className="text-[10px] font-black text-emerald-500">OPTIMAL</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed text-center">
                    Bio-sensors active across all tokenized hectares. Data signed via Quantum Core.
                 </p>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[100px]" />
              <div className="relative z-10 space-y-6">
                 <Wind className="w-10 h-10 text-blue-400" />
                 <div>
                    <h4 className="text-xl font-black italic underline decoration-blue-500 underline-offset-8">Wind Rights Exchange</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-4">Trade altitude-specific wind generation rights across established wind farms in the North Sea.</p>
                 </div>
                 <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Access Orderbook
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic leading-tight">Circular Economy <br /> Vault</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recycling Revenue Tracking</p>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 View Yield Report <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
