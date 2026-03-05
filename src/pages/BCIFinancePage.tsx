import React, { useState } from 'react';
import { 
  Cpu, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Activity, 
  Dna, 
  Eye, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  TrendingUp,
  Brain,
  Fingerprint
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

const neuralActivity = [
  { name: '00:00', delta: 12, theta: 45, alpha: 80 },
  { name: '04:00', delta: 8, theta: 55, alpha: 70 },
  { name: '08:00', delta: 15, theta: 40, alpha: 90 },
  { name: '12:00', delta: 25, theta: 30, alpha: 60 },
  { name: '16:00', delta: 20, theta: 35, alpha: 85 },
  { name: '20:00', delta: 10, theta: 50, alpha: 95 },
];

export default function BCIFinancePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">BCI Finance Hub</h1>
          <p className="text-slate-500 font-medium italic">Brain-Computer Interface driven financial management and neural sovereignty.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Connect Neural Link
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Activity className="w-4 h-4 mr-2" /> Synaptic Feed
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Neural Dashboard */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <BrainCircuit className="w-6 h-6 text-blue-600" /> Synaptic Engagement
                 </h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> Neural Stream: ACTIVE
                 </span>
              </div>

              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={neuralActivity}>
                       <defs>
                          <linearGradient id="neuralGrad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                       <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }} />
                       <Area type="monotone" dataKey="alpha" stroke="#2563eb" strokeWidth={3} fill="url(#neuralGrad)" />
                       <Area type="monotone" dataKey="theta" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                 {[
                   { label: 'Attention Span', val: '92%', icon: Eye, color: 'text-blue-500' },
                   { label: 'Creative Load', val: '45%', icon: Brain, color: 'text-indigo-500' },
                   { label: 'Neural Entropy', val: '0.04', icon: Zap, color: 'text-orange-500' },
                   { label: 'Auth Confidence', val: '99.9%', icon: ShieldCheck, color: 'text-emerald-500' },
                 ].map((stat) => (
                   <div key={stat.label}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                         <stat.icon className={cn("w-3 h-3", stat.color)} /> {stat.label}
                      </p>
                      <p className="text-xl font-black text-slate-900 tracking-tight">{stat.val}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Thought-to-Transaction & Sovereignty */}
           <div className="bg-slate-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40 border border-white/5">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/10 blur-[150px] -mr-64 -mt-64" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-3xl font-black italic tracking-tighter">Neuro-Sovereignty</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Encrypted neural intent processing and private key derivation.</p>
                    </div>
                    <Lock className="w-12 h-12 text-indigo-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Intent Channels</h4>
                       {[
                         { title: 'Payment Intent', desc: 'Secure Confirmation', status: 'Ready' },
                         { title: 'Trade Visualization', desc: 'Execution Logic', status: 'Standby' },
                       ].map(chan => (
                         <div key={chan.title} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                            <div>
                               <p className="text-sm font-black italic">{chan.title}</p>
                               <p className="text-[9px] font-bold text-white/30 uppercase mt-0.5">{chan.desc}</p>
                            </div>
                            <span className="text-[10px] font-black text-indigo-400">{chan.status}</span>
                         </div>
                       ))}
                    </div>
                    <div className="bg-white/5 rounded-[3rem] p-8 border border-white/10 flex flex-col items-center text-center space-y-6">
                       <Fingerprint className="w-12 h-12 text-white/20" />
                       <h4 className="text-base font-black italic">Intent Verification</h4>
                       <p className="text-xs text-white/40 font-medium leading-relaxed italic">
                          "Confirm £1,200 transfer to Savings Vault? <br /> Simply visualize the transaction signature."
                       </p>
                       <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-all shadow-xl">
                          Confirm via Thought
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Neural Specs & History */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Cpu className="w-4 h-4 text-slate-900" /> System Metrics
              </h4>
              <div className="space-y-4">
                 <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Signal-to-Noise Ratio</p>
                    <div className="flex items-center gap-4">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tighter">42.8 dB</h2>
                       <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">CRYSTAL</span>
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Latency (Round-Trip)</p>
                    <div className="flex items-center gap-4">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tighter">8.4 ms</h2>
                       <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">ULTRA-FAST</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-indigo-700 to-slate-900 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Dna className="w-10 h-10 text-indigo-300" />
                 <div>
                    <h4 className="text-xl font-black italic">Personalization 3.0</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       Your dashboard layout dynamically adjusts based on your cognitive load and current focus.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Manage Plugins
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                 <History className="w-4 h-4" /> Cognitive History
              </h4>
              <div className="space-y-3">
                 {[
                   { event: 'Focus Deep-Work', dur: '4h 12m' },
                   { event: 'Impulse Alert', dur: 'Triggered' },
                   { event: 'Neural Signature Update', dur: 'Success' },
                 ].map((e) => (
                   <div key={e.event} className="flex justify-between items-center text-xs font-medium">
                      <span className="text-slate-600 italic">{e.event}</span>
                      <span className="text-slate-400 uppercase font-black text-[9px]">{e.dur}</span>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-indigo-600 font-bold uppercase text-[10px] tracking-widest group px-0 pt-2">
                 Download Brain-PDF <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
