import React, { useState } from 'react';
import { 
  TreePine, 
  Wind, 
  Droplets, 
  Sun, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Leaf, 
  Globe2, 
  ChevronRight, 
  Zap,
  Sparkles,
  RefreshCw,
  Heart,
  Activity,
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

const carbonData = [
  { month: 'Jan', emitted: 4.2, offset: 2.1 },
  { month: 'Feb', emitted: 3.8, offset: 2.8 },
  { month: 'Mar', emitted: 4.5, offset: 3.2 },
  { month: 'Apr', emitted: 3.2, offset: 4.1 },
  { month: 'May', emitted: 3.5, offset: 4.8 },
  { month: 'Jun', emitted: 3.1, offset: 5.2 },
];

const esgBreakdown = [
  { name: 'Environmental', value: 45, color: '#10b981' },
  { name: 'Social', value: 30, color: '#2563eb' },
  { name: 'Governance', value: 25, color: '#7c3aed' },
];

export default function ESGInvestingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">ESG & Sustainable Investing</h1>
          <p className="text-slate-500 font-medium italic">Align your portfolio with your values. Impact-first finance.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-emerald-600/20">
              <Leaf className="w-4 h-4 mr-2" /> Green Bonds
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Globe2 className="w-4 h-4 mr-2" /> Offset Footprint
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ESG Score & Impact */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-emerald-950 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-emerald-900/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                 <div className="w-40 h-40 rounded-full border-8 border-emerald-500/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-8 border-emerald-500 border-t-transparent rounded-full animate-spin duration-[3000ms]" />
                    <div className="flex flex-col items-center">
                       <span className="text-5xl font-black">A+</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Impact Score</span>
                    </div>
                 </div>
                 <div>
                    <h3 className="text-xl font-black">Climate Champion</h3>
                    <p className="text-emerald-100/60 text-sm font-medium mt-2">Your portfolio avoids 2.4 tons of CO2 compared to the S&P 500 average.</p>
                 </div>
                 <div className="w-full h-px bg-white/10" />
                 <div className="grid grid-cols-3 gap-4 w-full">
                    <div>
                       <p className="text-[8px] font-black uppercase text-emerald-400">Trees</p>
                       <p className="text-lg font-black mt-1">142</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black uppercase text-emerald-400">Carbon</p>
                       <p className="text-lg font-black mt-1">12t</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black uppercase text-emerald-400">Water</p>
                       <p className="text-lg font-black mt-1">45k L</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">ESG Breakdown</h4>
              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={esgBreakdown}
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {esgBreakdown.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                 {esgBreakdown.map((item) => (
                   <div key={item.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                         <span className="text-xs font-bold text-slate-600">{item.name}</span>
                      </div>
                      <span className="text-xs font-black text-slate-900">{item.value}%</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Carbon Offset Charts */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-black text-slate-900">Carbon Tracking & Neutrality</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Kilograms of CO2e per Month</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2">
                       <Zap className="w-3 h-4" /> AI Optimized
                    </span>
                 </div>
              </div>

              <div className="h-80 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={carbonData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                     <YAxis hide />
                     <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 800 }}
                     />
                     <Bar dataKey="emitted" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={20} />
                     <Bar dataKey="offset" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
                   </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-500">
                       <Sun className="w-6 h-6" />
                    </div>
                    <div>
                       <h5 className="text-sm font-black text-slate-900">Solar Farm Project</h5>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Karnataka, India</p>
                    </div>
                    <ArrowUpRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                 </div>
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-500">
                       <Wind className="w-6 h-6" />
                    </div>
                    <div>
                       <h5 className="text-sm font-black text-slate-900">Wind Turbine Alpha</h5>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">North Sea, UK</p>
                    </div>
                    <ArrowUpRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                 </div>
              </div>
           </div>

           {/* Sustainable Projects Feed */}
           <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">Impact Opportunities</h3>
                 <Button variant="ghost" className="text-blue-600 font-black uppercase text-xs tracking-widest">View All</Button>
              </div>
              <div className="divide-y divide-slate-50">
                 {[
                   { id: '1', title: 'Ocean Rejuvenation Fund', company: 'SeaGuard', yield: '4.2%', risk: 'Low', color: 'bg-blue-600' },
                   { id: '2', title: 'Sustainable Agriculture Bond', company: 'SoilCare', yield: '5.8%', risk: 'Med', color: 'bg-amber-600' },
                   { id: '3', title: 'Vertical Farming Series A', company: 'FreshCity', yield: '12.4%', risk: 'High', color: 'bg-emerald-600' },
                 ].map((proj) => (
                   <div key={proj.id} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white border-2 border-white shadow-sm group-hover:scale-110 transition-transform", proj.color)}>
                         {proj.title[0]}
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900">{proj.title}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{proj.company}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-emerald-600">{proj.yield} Yield</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Impact Optimized</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
