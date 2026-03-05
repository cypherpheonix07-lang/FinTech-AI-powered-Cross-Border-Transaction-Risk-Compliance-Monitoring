import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  BrainCircuit, 
  Target, 
  Zap, 
  ChevronRight, 
  ArrowUpRight,
  Activity,
  Layers,
  LineChart as LineChartIcon,
  ScatterChart as ScatterIcon,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

const simulationData = [
  { year: 2024, p10: 50000, p50: 55000, p90: 60000 },
  { year: 2025, p10: 48000, p50: 62000, p90: 75000 },
  { year: 2026, p10: 45000, p50: 70000, p90: 95000 },
  { year: 2027, p10: 42000, p50: 80000, p90: 120000 },
  { year: 2028, p10: 40000, p50: 92000, p90: 155000 },
  { year: 2029, p10: 38000, p50: 108000, p90: 210000 },
  { year: 2030, p10: 35000, p50: 130000, p90: 280000 },
];

const cohortData = [
  { x: 10, y: 30, z: 200, name: 'Gen Z' },
  { x: 30, y: 70, z: 400, name: 'Millennials' },
  { x: 45, y: 50, z: 300, name: 'Gen X' },
  { x: 60, y: 80, z: 500, name: 'Boomers' },
  { x: 80, y: 40, z: 150, name: 'Elite' },
];

export default function AdvancedAnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Advanced Analytics</h1>
          <p className="text-slate-500 font-medium italic">Powered by PathGuard ML-Core v4.2</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <History className="w-4 h-4 mr-2" /> Training Logs
           </Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-blue-600/20">
              <BrainCircuit className="w-4 h-4 mr-2" /> Run Monte Carlo
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monte Carlo Simulation */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
           <div className="flex items-center justify-between">
              <div>
                 <h3 className="text-xl font-black text-slate-900">Portfolio Longevity Simulation</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">10,000 Market Iterations (Monte Carlo)</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase">
                 <span className="flex items-center gap-1.5 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-600" /> Optimistic</span>
                 <span className="flex items-center gap-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-slate-400" /> Predicted</span>
                 <span className="flex items-center gap-1.5 text-red-400"><div className="w-2 h-2 rounded-full bg-red-400" /> Pessimistic</span>
              </div>
           </div>

           <div className="h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationData}>
                  <defs>
                    <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                  <YAxis hide domain={['dataMin - 10000', 'dataMax + 10000']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 800 }}
                  />
                  <Area type="monotone" dataKey="p90" stroke="#2563eb" strokeWidth={0} fillOpacity={1} fill="url(#colorP90)" />
                  <Area type="monotone" dataKey="p50" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} fill="transparent" />
                  <Area type="monotone" dataKey="p10" stroke="#ef4444" strokeWidth={2} fill="transparent" />
                  <Line type="monotone" dataKey="p50" stroke="#1e293b" strokeWidth={3} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
                 <Layers className="w-64 h-64 text-blue-900" />
              </div>
           </div>

           <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Successful Retirement Odds</p>
                 <p className="text-2xl font-black text-slate-900 mt-2">86.4%</p>
              </div>
              <Button className="bg-slate-900 hover:bg-black text-white rounded-xl px-6 font-bold text-xs h-12">
                 Adjust Parameters
              </Button>
           </div>
        </div>

        {/* Predictive Scoring */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-xl shadow-blue-600/20">
              <div className="flex items-center justify-between mb-8">
                 <BrainCircuit className="w-8 h-8 text-blue-200" />
                 <span className="text-[10px] font-black tracking-widest uppercase opacity-60">ML Score</span>
              </div>
              <h3 className="text-4xl font-black mb-2">942</h3>
              <p className="text-blue-100/60 text-sm font-medium mb-8">Your financial efficiency score is in the top 4% of users in your cohort.</p>
              <div className="space-y-4">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Alpha Rating</span>
                    <span>Superior</span>
                 </div>
                 <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[94%]" />
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Zap className="w-4 h-4 text-amber-500" /> Predictive Anomalies
              </h4>
              <div className="space-y-4">
                 {[
                   { title: 'Tax Leakage', impact: '£420/yr', risk: 'HIGH' },
                   { title: 'Interest Drift', impact: '£120/mo', risk: 'MED' },
                 ].map((item) => (
                   <div key={item.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                         <h5 className="text-sm font-black text-slate-900">{item.title}</h5>
                         <span className={cn(
                           "text-[8px] font-black px-1.5 py-0.5 rounded-md",
                           item.risk === 'HIGH' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                         )}>{item.risk}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold italic">Potential Loss: {item.impact}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cohort Analysis (Bubble Chart) */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Cohort Benchmarking</h3>
              <div className="p-2 bg-slate-50 rounded-xl">
                 <Layers className="w-5 h-5 text-slate-400" />
              </div>
           </div>
           
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" hide />
                  <YAxis type="number" dataKey="y" hide />
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', fontWeight: 700 }}
                  />
                  <Scatter name="Cohorts" data={cohortData} fill="#2563eb">
                    {cohortData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#2563eb', '#7c3aed', '#db2777', '#10b981', '#f59e0b'][index % 5]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
           </div>
           
           <p className="text-xs text-slate-500 font-medium text-center italic">
              Bubbles represent spending vs. saving efficiency across demographic cohorts.
           </p>
        </div>

        {/* Attribution Modeling */}
        <div className="bg-slate-900 p-8 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px]" />
           <h3 className="text-xl font-black relative z-10">Decision Attribution</h3>
           
           <div className="space-y-6 relative z-10">
              {[
                { factor: 'Lifestyle Inflation', weight: 42, impact: 'Negative' },
                { factor: 'Market Volatility', weight: 18, impact: 'Neutral' },
                { factor: 'Compounding Interest', weight: 85, impact: 'High Positive' },
              ].map((f) => (
                <div key={f.factor} className="space-y-3">
                   <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-white/80">{f.factor}</span>
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{f.impact}</span>
                   </div>
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${f.weight}%` }} />
                   </div>
                </div>
              ))}
           </div>

           <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-black rounded-2xl py-7 uppercase text-xs tracking-widest group">
              View Attribution Map <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </Button>
        </div>
      </div>
    </div>
  );
}
