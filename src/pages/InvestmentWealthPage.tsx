import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  History, 
  Target, 
  Zap, 
  RefreshCw, 
  Layers, 
  Briefcase, 
  Globe2, 
  Search, 
  Calendar,
  DollarSign,
  Maximize2,
  Lock,
  ChevronRight
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

const portfolioData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 48500 },
  { name: 'Mar', value: 47000 },
  { name: 'Apr', value: 52000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 59420 },
];

const allocationData = [
  { name: 'Equities', value: 45, color: '#2563eb' },
  { name: 'Crypto', value: 25, color: '#7c3aed' },
  { name: 'Real Estate', value: 20, color: '#10b981' },
  { name: 'Cash', value: 10, color: '#f59e0b' },
];

export default function InvestmentWealthPage() {
  const [rebalancing, setRebalancing] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Investment & Wealth</h1>
          <p className="text-slate-500 font-medium italic">Autonomous wealth management & institutional-grade portfolio tools.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <TrendingUp className="w-4 h-4 mr-2" /> Buy / Sell Assets
           </Button>
           <Button 
            variant="outline" 
            onClick={() => { setRebalancing(true); setTimeout(() => setRebalancing(false), 2000); }}
            className="rounded-2xl border-slate-200 font-black text-xs px-6 py-6"
           >
              <RefreshCw className={cn("w-4 h-4 mr-2", rebalancing && "animate-spin")} />
              Auto-Rebalance
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Portfolio Overview */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Net Worth</p>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter">£59,420<span className="text-2xl text-slate-300">.80</span></h2>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black">+£2,410 (4.2%)</span>
                       <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">This Month</span>
                    </div>
                 </div>
                 <div className="h-16 w-48 hidden md:block">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={portfolioData}>
                          <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b98110" strokeWidth={3} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="h-80 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData}>
                       <defs>
                          <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dx={-10} />
                       <Tooltip 
                          contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 800 }}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2563eb" 
                          strokeWidth={4} 
                          fillOpacity={1} 
                          fill="url(#wealthGradient)" 
                          animationDuration={1500}
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                 {[
                   { label: 'Dividend Yield', val: '3.2%', icon: DollarSign, color: 'text-blue-600' },
                   { label: 'Risk Score', val: 'Low/Med', icon: ShieldCheck, color: 'text-emerald-600' },
                   { label: 'Strategy', val: 'Aggressive', icon: Target, color: 'text-indigo-600' },
                   { label: 'Assets', val: '24', icon: Layers, color: 'text-slate-600' },
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

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-6">
                 <h3 className="text-xl font-black text-slate-900">Asset Allocation</h3>
                 <div className="h-64 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                             data={allocationData}
                             innerRadius={60}
                             outerRadius={80}
                             paddingAngle={8}
                             dataKey="value"
                          >
                             {allocationData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                          <Tooltip />
                       </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Diversified</p>
                       <p className="text-2xl font-black text-slate-900 tracking-tighter">94%</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    {allocationData.map((a) => (
                      <div key={a.name} className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                         <span className="text-xs font-bold text-slate-600">{a.name}</span>
                         <span className="text-[10px] font-black text-slate-400 ml-auto">{a.value}%</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
                 <div className="relative z-10 space-y-8">
                    <h3 className="text-xl font-black italic">Wealth Advisor AI</h3>
                    <div className="space-y-4">
                       <div className="p-5 rounded-3xl bg-white/5 border border-white/10 italic text-xs leading-relaxed text-indigo-100/60">
                          "I've detected a 12% drift in your UK Equities allocation. A rebalance could save you £340 in potential tracking error this quarter."
                       </div>
                       <div className="flex flex-col gap-3">
                          <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest">
                             Explain Strategy
                          </Button>
                          <Button variant="ghost" className="w-full text-white/40 hover:text-white font-black uppercase text-[10px] tracking-widest h-12">
                             Dismiss Advice
                          </Button>
                       </div>
                    </div>
                    <div className="pt-6 border-t border-white/5 space-y-4">
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Optimization Nodes</p>
                       <div className="flex gap-2">
                          {['Tax-Loss', 'Dividend', 'ESG', 'Risk'].map(tag => (
                            <span key={tag} className="text-[8px] font-black bg-white/5 px-2 py-1 rounded border border-white/10 uppercase tracking-tighter">{tag}</span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Intelligence & Actions */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Briefcase className="w-4 h-4 text-blue-600" /> Investment Hubs
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Retirement (SIPP)', val: '£24,500', icon: Calendar },
                   { name: 'ISA Portfolio', val: '£18,220', icon: Globe2 },
                   { name: 'Speculative', val: '£16,700', icon: Zap },
                 ].map((h) => (
                   <div key={h.name} className="p-5 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-blue-600 transition-colors">
                            <h.icon className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-xs font-black text-slate-900">{h.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{h.val}</p>
                         </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                   </div>
                 ))}
                 <Button variant="outline" className="w-full rounded-2xl py-6 border-slate-200 font-black text-xs uppercase tracking-widest mt-2">
                    Create New Hub
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative overflow-hidden shadow-xl shadow-blue-600/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Maximize2 className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black italic">Secondary Markets</h4>
                    <p className="text-blue-100/60 text-xs font-semibold leading-relaxed mt-2">Access exclusive fractional shares in late-stage startups and tokenized private equity.</p>
                 </div>
                 <Button className="w-full bg-white text-blue-700 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors shadow-lg">
                    Explore Listings
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-6">
              <div className="flex items-center justify-between">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Integrity</h4>
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center gap-4">
                 <Lock className="w-5 h-5 text-slate-300" />
                 <p className="text-[10px] font-medium text-slate-500 italic">Self-custody via Hardware Key enabled for all trade signing.</p>
              </div>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 Tax-Loss Harvesting <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
