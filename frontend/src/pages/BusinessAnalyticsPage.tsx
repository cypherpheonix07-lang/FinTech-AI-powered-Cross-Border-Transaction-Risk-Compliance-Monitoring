import React, { useState } from 'react';
import { 
  BarChart3, 
  Treasury, 
  PieChart, 
  TrendingUp, 
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
  DollarSign, 
  Briefcase, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  TrendingDown,
  Layers
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

const pnlData = [
  { name: 'Income', amount: 42000, color: '#22c55e' },
  { name: 'COGS', amount: 12000, color: '#94a3b8' },
  { name: 'Marketing', amount: 8000, color: '#3b82f6' },
  { name: 'Ops', amount: 6000, color: '#6366f1' },
  { name: 'Net', amount: 16000, color: '#0f172a' },
];

export default function BusinessAnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Business Intel</h1>
          <p className="text-slate-500 font-medium italic">Advanced P&L, burn rate analysis, and departmental finance.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Financial Snapshot
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Layers className="w-4 h-4 mr-2" /> Multi-Org
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* P&L Visualization */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-indigo-600" /> Waterfall Margin Analysis
                 </h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Q4 Projection: ON TRACK</span>
              </div>

              <div className="h-72 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pnlData}>
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                       <Tooltip 
                         cursor={{ fill: 'transparent' }}
                         contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }} 
                       />
                       <Bar dataKey="amount" radius={[12, 12, 12, 12]} barSize={40}>
                          {pnlData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                 {[
                   { label: 'Burn Rate', val: '£8.4K/mo', trend: '-4%', color: 'text-emerald-500' },
                   { label: 'Runway', val: '14.2 Mo', trend: '+1.5', color: 'text-blue-500' },
                   { label: 'EBITDA', val: '24.2%', trend: '+8%', color: 'text-indigo-500' },
                   { label: 'ARPU', val: '£242', trend: '+12%', color: 'text-slate-900' },
                 ].map((stat) => (
                   <div key={stat.label}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h4 className="text-xl font-black text-slate-900 tracking-tight">{stat.val}</h4>
                      <p className={cn("text-[9px] font-black mt-0.5", stat.color)}>{stat.trend}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Cash Flow Forecast */}
           <div className="bg-slate-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40 border border-white/5">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-600/10 blur-[150px] -mr-64 -mt-64" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-3xl font-black italic tracking-tighter text-emerald-400">Cash Flow Intelligence</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Predictive liquidity modeling based on historical burn and receivables.</p>
                    </div>
                    <DollarSign className="w-12 h-12 text-emerald-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Incoming Streams</h4>
                       {[
                         { title: 'SaaS Subscription', val: '£24,400', date: 'Expected 1st' },
                         { title: 'Project P-842', val: '£12,000', date: 'Expected 14th' },
                       ].map(chan => (
                         <div key={chan.title} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                            <div>
                               <p className="text-sm font-black italic">{chan.title}</p>
                               <p className="text-[9px] font-bold text-white/30 uppercase mt-0.5">{chan.val}</p>
                            </div>
                            <span className="text-[10px] font-black text-emerald-400">{chan.date}</span>
                         </div>
                       ))}
                    </div>
                    <div className="bg-white/5 rounded-[3rem] p-8 border border-white/10 flex flex-col justify-center space-y-6">
                       <h4 className="text-sm font-black italic">Liquidity Buffers</h4>
                       <div className="space-y-4">
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                             <div className="bg-emerald-500 h-full w-[84%]" />
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest shadow-inner py-2 px-4 rounded-xl bg-white/5 border border-white/10">
                             <span className="text-white/40 italic">Buffer Confidence</span>
                             <span className="text-emerald-400">HIGH (84%)</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Budgeting & Alerts */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Briefcase className="w-4 h-4 text-slate-900" /> Departmental Budgets
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Engineering', use: 84, cap: '£120k' },
                   { name: 'Marketing Hub', use: 42, cap: '£40k' },
                   { name: 'Support Ops', use: 68, cap: '£15k' },
                 ].map((d) => (
                   <div key={d.name} className="space-y-2 px-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-slate-900">{d.name}</span>
                         <span className="text-slate-400 font-bold">{d.use}% of {d.cap}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                         <div 
                           className={cn(
                             "h-full rounded-full transition-all duration-1000",
                             d.use > 80 ? "bg-rose-500" : "bg-indigo-600"
                           )} 
                           style={{ width: `${d.use}%` }} 
                         />
                      </div>
                   </div>
                 ))}
                 <Button variant="outline" className="w-full rounded-2xl py-6 border-slate-200 font-black text-xs uppercase tracking-widest mt-4 hover:bg-slate-50">
                    Adjust Alloscations
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-indigo-800 to-slate-900 text-white relative overflow-hidden group shadow-xl transition-all hover:shadow-indigo-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <RefreshCw className="w-10 h-10 text-indigo-300 animate-spin-slow" />
                 <div>
                    <h4 className="text-xl font-black italic">Real-time P&L</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic">
                       Every transaction across your merchant hubs, cards, and bank feeds is consolidated instantly.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Export Q4 Report
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                 <TrendingDown className="w-4 h-4 text-rose-500" /> Burn Alerts
              </h4>
              <div className="space-y-3">
                 {[
                   { msg: 'AWS Spike detected', type: 'Warning' },
                   { msg: 'Subscription Overlap', type: 'Savings' },
                 ].map((a) => (
                   <div key={a.msg} className="flex justify-between items-center text-xs font-medium bg-white p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-700 italic">{a.msg}</span>
                      <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-full", a.type === 'Warning' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600')}>{a.type}</span>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-indigo-600 font-bold uppercase text-[10px] tracking-widest group px-0 pt-2">
                 AI Optimization Plan <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

// Missing Lucide icons used in the UI
const Treasury = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18"/><path d="M3 14h18"/><path d="M3 18h18"/><path d="M3 6h18"/><path d="M3 2h18"/><path d="M11 2v16"/><path d="M13 2v16"/></svg>;
