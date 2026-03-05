import React, { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
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
  ChevronRight,
  TrendingDown,
  TrendingUp,
  FileText,
  AlertCircle,
  Clock,
  CheckCircle2,
  PieChart as PieChartIcon,
  ShieldCheck,
  Percent
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

const creditData = [
  { name: 'Jan', score: 720 },
  { name: 'Feb', score: 725 },
  { name: 'Mar', score: 715 },
  { name: 'Apr', score: 740 },
  { name: 'May', score: 755 },
  { name: 'Jun', score: 780 },
];

export default function CreditLoanPage() {
  const [calculating, setCalculating] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Credit & Loans</h1>
          <p className="text-slate-500 font-medium italic">Monitor your financial reputation and manage intelligent debt.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Apply for Loan
           </Button>
           <Button 
            variant="outline" 
            onClick={() => { setCalculating(true); setTimeout(() => setCalculating(false), 2000); }}
            className="rounded-2xl border-slate-200 font-black text-xs px-6 py-6"
           >
              <RefreshCw className={cn("w-4 h-4 mr-2", calculating && "animate-spin")} />
              Refresh Score
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Credit Score Overview */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -mr-32 -mt-32" />
              <div className="flex justify-between items-start relative z-10">
                 <div>
                    <h3 className="text-xl font-black text-slate-900">Your Credit Reputation</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional Credit Rating</p>
                 </div>
                 <div className="text-right">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">780</span>
                    <span className="text-xs font-bold text-emerald-500 block">EXCELLENT</span>
                 </div>
              </div>

              <div className="h-64 w-full relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={creditData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                       <YAxis hide domain={[600, 850]} />
                       <Tooltip 
                          contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 800 }}
                       />
                       <Bar dataKey="score" radius={[10, 10, 10, 10]} barSize={40}>
                          {creditData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === creditData.length - 1 ? '#10b981' : '#e2e8f0'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                 {[
                   { label: 'Payment History', val: '99%', icon: CheckCircle2, color: 'text-emerald-500' },
                   { label: 'Credit Utilization', val: '12%', icon: Percent, color: 'text-blue-500' },
                   { label: 'Credit Enquiries', val: '2', icon: Search, color: 'text-orange-500' },
                 ].map((stat) => (
                   <div key={stat.label} className="p-4 rounded-3xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                         <stat.icon className={cn("w-3 h-3", stat.color)} /> {stat.label}
                      </p>
                      <p className="text-lg font-black text-slate-900">{stat.val}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Active Loans */}
           <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">Active Borrowing</h3>
                 <Button variant="ghost" className="text-blue-600 font-black uppercase text-xs tracking-widest gap-2">
                    Repayment Schedule <Calendar className="w-4 h-4" />
                 </Button>
              </div>
              <div className="divide-y divide-slate-50">
                 {[
                   { id: '1', type: 'Mortgage', amount: '£420,500', rate: '3.2%', monthly: '£1,840', icon: Building2 },
                   { id: '2', type: 'Auto Loan', amount: '£12,400', rate: '5.4%', monthly: '£250', icon: Smartphone },
                 ].map((loan) => (
                   <div key={loan.id} className="p-8 flex items-center gap-8 hover:bg-slate-50 transition-colors group">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                         <loan.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900 text-lg">{loan.type}</h4>
                         <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{loan.amount} Remaining</p>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-slate-900">{loan.monthly}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{loan.rate} Fixed-Rate</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-slate-900 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Intelligence Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
              <div className="relative z-10 space-y-6">
                 <Zap className="w-8 h-8 text-blue-400" />
                 <div>
                    <h4 className="text-xl font-black italic">Consolidation Engine</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed italic">"I've found a way to consolidate your high-interest debt into one loan at 4.2% APR, saving you £120/mo."</p>
                 </div>
                 <Button className="w-full bg-white text-slate-950 hover:bg-slate-100 font-black rounded-2xl py-6 uppercase text-xs tracking-widest">
                    Run Simulation
                 </Button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Target className="w-4 h-4 text-emerald-500" /> Improvement Tips
              </h4>
              <div className="space-y-4">
                 {[
                   { tip: 'Lower utilization by £2k', impact: 'HIGH' },
                   { tip: 'Avoid new enquiries', impact: 'MED' },
                   { tip: 'Keep old accounts open', impact: 'LOW' },
                 ].map((t) => (
                   <div key={t.tip} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <p className="text-xs font-black text-slate-900">{t.tip}</p>
                      <span className={cn(
                        "text-[9px] font-black px-1.5 py-0.5 rounded",
                        t.impact === 'HIGH' ? "text-emerald-500" : t.impact === 'MED' ? "text-orange-500" : "text-slate-300"
                      )}>{t.impact}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[3.5rem] bg-indigo-600 text-white space-y-4 border-4 border-indigo-500/50 shadow-xl shadow-indigo-600/20 group cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px]" />
              <div className="relative z-10">
                 <FileText className="w-10 h-10 text-white mb-2" />
                 <h4 className="text-lg font-black leading-tight italic">Credit Freeze</h4>
                 <p className="text-xs text-indigo-100/60 font-medium">Instantly block all credit enquiries across main bureaus.</p>
                 <div className="mt-4">
                    <Switch />
                 </div>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <History className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 leading-tight italic">Borrowing Power</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verified Limit: £65,000</p>
              <Button variant="ghost" className="w-full text-blue-600 font-black text-[10px] tracking-widest uppercase group px-0">
                 Download Report <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Building2, Plus } from 'lucide-react';
