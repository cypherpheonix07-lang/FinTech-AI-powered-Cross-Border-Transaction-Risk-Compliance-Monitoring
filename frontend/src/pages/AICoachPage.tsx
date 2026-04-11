import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Zap, 
  BrainCircuit, 
  ChevronRight, 
  ArrowUpRight,
  Lightbulb,
  Clock,
  PieChart,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const forecastData = [
  { day: 'Now', flow: 4200 },
  { day: '10d', flow: 3800 },
  { day: '20d', flow: 5200 },
  { day: '30d', flow: 4900 },
  { day: '40d', flow: 6100 },
  { day: '50d', flow: 5800 },
  { day: '60d', flow: 7200 },
];

export default function AICoachPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* AI Header Section */}
      <div className="relative p-8 md:p-12 rounded-[3rem] bg-blue-950 text-white overflow-hidden shadow-2xl shadow-blue-900/40">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500 rounded-full blur-[100px] opacity-10 -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center border border-white/20 shadow-2xl group">
             <BrainCircuit className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="text-center md:text-left flex-1">
             <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Hello Alex, I'm PathGuard <span className="text-blue-400">Genius.</span></h1>
             <p className="text-blue-200/70 font-medium text-lg max-w-xl">I've analyzed your cash flow patterns. You're on track to save an extra £1,200 this quarter.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-7 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
             Start Deep Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Predictive Forecasting */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
           <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Predictive Cash Flow</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">60-Day Intelligence Projection</p>
              </div>
              <div className="flex gap-2">
                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                    <TrendingUp className="w-3 h-3" /> Growth Detected
                 </div>
              </div>
           </div>

           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="aiForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                  <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="flow" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#aiForecast)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50">
              <div className="text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">30 Days</p>
                 <p className="text-sm font-black text-slate-900">£4,900</p>
              </div>
              <div className="text-center border-x border-slate-100 px-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">60 Days</p>
                 <p className="text-lg font-black text-blue-600">£7,200</p>
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confidence</p>
                 <p className="text-sm font-black text-emerald-600">92%</p>
              </div>
           </div>
        </div>

        {/* Behavioral Nudges & Insights */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-emerald-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-900/20 group hover:scale-[1.02] transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                 <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-xl font-black mb-2">Power Move</h4>
              <p className="text-emerald-100/60 text-sm font-medium leading-relaxed mb-6">
                 We found 3 unused subscriptions costing you <span className="text-white font-bold">£24.99/mo.</span> Cancel them now to boost your savings goal.
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                 Action Suggestions <ArrowUpRight className="w-3 h-3" />
              </button>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <Target className="w-5 h-5 text-blue-600" />
                 <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Saving Pathways</h3>
              </div>
              
              <div className="space-y-4">
                 {[
                   { label: 'House Deposit', progress: 72, color: 'bg-blue-600' },
                   { label: 'New Car', progress: 45, color: 'bg-emerald-500' },
                   { label: 'Emergency Fund', progress: 100, color: 'bg-slate-900' }
                 ].map((goal) => (
                   <div key={goal.label} className="space-y-2 group cursor-pointer">
                      <div className="flex justify-between items-end">
                         <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{goal.label}</span>
                         <span className="text-[10px] font-black text-slate-400">{goal.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div 
                           className={cn("h-full transition-all duration-1000", goal.color)} 
                           style={{ width: `${goal.progress}%` }} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Recommendations Marketplace (Mini) */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
           <Lightbulb className="w-6 h-6 text-amber-500" />
           <h3 className="text-xl font-black text-slate-900">AI Smart Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: 'Tax-Loss Harvesting', desc: 'Optimize your portfolio for upcoming tax season.', icon: PieChart, tag: 'INVESTING' },
             { title: 'Smart Bill Negotiation', desc: 'Let our AI negotiate your British Gas bills.', icon: Wallet, tag: 'SAVINGS' },
             { title: 'Portfolio Rebalance', desc: 'Your risk score has drifted. Fix exposure.', icon: BrainCircuit, tag: 'WEALTH' },
           ].map((item) => (
             <div key={item.title} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <item.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                </div>
                <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest bg-blue-100 px-2 py-0.5 rounded-full mb-2 inline-block">
                  {item.tag}
                </span>
                <h4 className="text-sm font-black text-slate-900 mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
