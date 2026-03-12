import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/lib/utils';

const MOCK_FORECAST = [
  { day: 'Mar 10', balance: 12500, low: 12000, high: 13000 },
  { day: 'Mar 15', balance: 11800, low: 11000, high: 12500 },
  { day: 'Mar 20', balance: 13200, low: 12200, high: 14200 },
  { day: 'Mar 25', balance: 12900, low: 11500, high: 14000 },
  { day: 'Mar 30', balance: 14500, low: 13000, high: 16000 },
];

export default function AICoachDashboard() {
  const [activeNudges, setActiveNudges] = useState([
    {
      id: 1,
      type: 'HABIT',
      title: 'Loss Aversion Alert',
      message: "You've spent 15% more on dining this week. Redirecting $50 to your \"Japan Trip\" goal now would offset the impact.",
      icon: AlertCircle,
      color: 'orange'
    },
    {
      id: 2,
      type: 'OPTIMIZATION',
      title: 'Subscription Audit',
      message: 'We found 3 unused subscriptions costing you $42/mo. Shall I initiate the automated cancellation?',
      icon: Zap,
      color: 'blue'
    }
  ]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <Brain className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Finance Pilot</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Financial <span className="text-blue-600">Coach</span></h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-2xl">
           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-black text-blue-700 uppercase">RL Model v4.2 Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forecast */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">30-Day Cash Flow Forecast</h3>
                <p className="text-xs font-medium text-slate-400 mt-1">Stochastic LSTM Modeling (95% Confidence)</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-blue-600">$14,500</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Predicted EOM Balance</p>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_FORECAST}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}}
                    dy={10}
                  />
                  <YAxis 
                    hide 
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#2563eb" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scenario Planner Stub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                   <h4 className="font-bold">Bull Scenario</h4>
                   <p className="text-xs text-slate-400">Predicted +$2,400 surplus if dining costs are optimized.</p>
                </div>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                   Activate Auto-save Path
                </button>
             </div>
             <div className="bg-white p-6 rounded-[2rem] border border-slate-200 space-y-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900">Risk Scenario</h4>
                   <p className="text-xs text-slate-400">Potential - $500 deficit detected for April rent cycle.</p>
                </div>
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                   View Mitigation Steps
                </button>
             </div>
          </div>
        </div>

        {/* Right Column: Nudges & Intelligence */}
        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-8 h-8 opacity-20" />
             </div>
             <h3 className="text-xl font-bold mb-2">Neural Insights</h3>
             <p className="text-xs text-blue-100 mb-6 leading-relaxed">
               Our RL-engine detected a mental accounting bias in your "Travel" bucket. You're treating refunds as "free money" rather than principal.
             </p>
             <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                   <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                   <span className="text-[10px] font-bold uppercase tracking-tight">Bias Corrected (+0.8 Financial Health)</span>
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Active Behavioral Nudges</h4>
            {activeNudges.map(nudge => (
              <div key={nudge.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 hover:border-blue-200 transition-all group cursor-pointer shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={cn("mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0", 
                    nudge.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  )}>
                    <nudge.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900">{nudge.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{nudge.message}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase pt-2 group-hover:gap-3 transition-all">
                       Take Action <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-6 rounded-[2rem] border border-dashed border-slate-300">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">Goal Adherence Engine</p>
             <div className="flex justify-between items-end gap-1 h-12 mb-4 px-2">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="w-full bg-blue-200 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
             </div>
             <p className="text-[9px] text-center font-medium text-slate-500 italic">Your adherence to the "Snowball Debt" path is 82% this month.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
