import React, { useState } from 'react';
import { 
  FileCode, 
  Music, 
  Lightbulb, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Cpu, 
  BookOpen, 
  Hash, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  TrendingUp,
  Microscope,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const royaltyData = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1450 },
  { name: 'Mar', value: 1300 },
  { name: 'Apr', value: 1800 },
  { name: 'May', value: 2100 },
  { name: 'Jun', value: 2420 },
];

export default function IPDigitalRightsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">IP & Digital Rights Market</h1>
          <p className="text-slate-500 font-medium italic">Monetize and trade intellectual property, royalties, and AI usage rights.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Register IP
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Award className="w-4 h-4 mr-2" /> Royalty Dashboard
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* IP Portfolio Hub */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32" />
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                       <Lightbulb className="w-6 h-6 text-indigo-600" /> Aggregated Royalties
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Yield from Digital Assets</p>
                    <div className="mt-8">
                       <h2 className="text-5xl font-black text-slate-900 tracking-tighter">£2,420<span className="text-2xl text-slate-300">.80</span></h2>
                       <div className="flex items-center gap-2 mt-2">
                          <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black">+£320 (15.2%)</span>
                       </div>
                    </div>
                 </div>
                 <div className="h-24 w-64 hidden md:block">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={royaltyData}>
                          <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                             {royaltyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === royaltyData.length - 1 ? '#4f46e5' : '#e2e8f0'} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                 <div className="space-y-6">
                    <h4 className="text-sm font-black italic">Active IP Assets</h4>
                    {[
                      { name: 'Fusion Engine Patent', type: 'Patent', share: '5.2%', yield: '£840/mo', icon: Microscope },
                      { name: 'Synth-Wave Catalog', type: 'Music', share: '12%', yield: '£420/mo', icon: Music },
                    ].map(ip => (
                      <div key={ip.name} className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center gap-6 hover:border-indigo-200 transition-all cursor-pointer group">
                         <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                            <ip.icon className="w-6 h-6" />
                         </div>
                         <div className="flex-1">
                            <h5 className="text-sm font-black text-slate-900">{ip.name}</h5>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{ip.type} • {ip.share}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black text-slate-900">{ip.yield}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
                    <div className="relative z-10 space-y-6">
                       <h4 className="text-xl font-black italic">AI Model Leasing</h4>
                       <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/40">
                             <span>Model: GPT-Nexus v4</span>
                             <span className="text-emerald-400">ACTIVE</span>
                          </div>
                          <p className="text-xs text-white/60 font-medium italic">"Your trained financial sub-model has been used 1.2M times this month, generating £1,160 in usage fees."</p>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500" style={{ width: '84%' }} />
                          </div>
                       </div>
                       <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/20">
                          Deploy New Model
                       </Button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Legal & Smart Registry */}
           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-indigo-900 to-slate-950 text-white relative overflow-hidden group shadow-xl border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">IP Smart Registry</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Quantum-signed deeds for instant intellectual property transfer.</p>
                    </div>
                    <FileCode className="w-10 h-10 text-indigo-400" />
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Protected', val: '24 Items' },
                      { label: 'Pending Audit', val: '2' },
                      { label: 'Est. Valuation', val: '£1.4M' },
                      { label: 'Verified Nodes', val: '12/12' },
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
                 <Award className="w-4 h-4 text-indigo-600" /> Licensing Power
              </h4>
              <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-indigo-600/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter relative z-10">High</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 relative z-10">Market Authority Score</p>
              </div>
              <div className="space-y-4">
                 <div className="p-4 rounded-3xl bg-white border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">Global Enforcemnt</span>
                    <span className="text-[10px] font-black text-emerald-500">ENABLED</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed text-center px-4">
                    Automated DMCA & Patent Takedown mesh active across 140 jurisdictions.
                 </p>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-indigo-700 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Cpu className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black italic underline decoration-white/20 underline-offset-8">Data Marketplace</h4>
                    <p className="text-indigo-100/60 text-xs font-semibold leading-relaxed mt-4">Sell your anonymized transaction data patterns to institutional research firms.</p>
                 </div>
                 <Button className="w-full bg-white text-indigo-900 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Access Data Vault
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <BookOpen className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic leading-tight">IP Auction <br /> Center</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Live Fractional Bidding</p>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 Explore Auctions <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
