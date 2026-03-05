import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
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
import { Button } from '@/components/ui/button';

const monthlyData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
  { name: 'Jul', amount: 3490 },
];

const categoryData = [
  { name: 'Housing', value: 35, color: '#2563eb' },
  { name: 'Food', value: 20, color: '#7c3aed' },
  { name: 'Transport', value: 15, color: '#db2777' },
  { name: 'Savings', value: 30, color: '#10b981' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Spending Analytics</h1>
          <p className="text-slate-500 mt-1 font-medium">Deep insights into your global cash flow and habits.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2 text-xs border-slate-200">
            <Calendar className="w-4 h-4" /> This Year
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold gap-2 text-xs shadow-lg shadow-blue-600/20">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Insights</p>
           <h3 className="text-2xl font-black text-slate-900">£42,900.50</h3>
           <div className="flex items-center gap-2 mt-4 text-emerald-600 text-[10px] font-bold bg-emerald-50 w-fit px-2 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3" /> +12.5% vs Last Year
           </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Auto-Savings</p>
           <h3 className="text-2xl font-black text-slate-900">£1,240.00</h3>
           <div className="flex items-center gap-2 mt-4 text-blue-600 text-[10px] font-bold bg-blue-50 w-fit px-2 py-1 rounded-lg">
              <Target className="w-3 h-3" /> 84% of Monthly Goal
           </div>
        </div>
        <div className="bg-blue-950 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-900/20">
           <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">Top Category</p>
           <h3 className="text-2xl font-black">Housing (35%)</h3>
           <p className="text-xs text-blue-200/50 mt-4 leading-relaxed font-medium">Consider high-yield savings to optimize this flow.</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending Trend */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Spending Trends</h3>
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button className="px-3 py-1.5 bg-white text-blue-600 text-[10px] font-black rounded-lg shadow-sm">Trend</button>
               <button className="px-3 py-1.5 text-slate-400 text-[10px] font-bold">Volume</button>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#2563eb" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown (Bar) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Category Comparison</h3>
              <Button variant="ghost" size="sm" className="text-slate-400 font-bold gap-2">
                 <Filter className="w-4 h-4" /> Filter
              </Button>
           </div>
           <div className="h-72 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={categoryData} layout="vertical">
                 <XAxis type="number" hide />
                 <YAxis 
                   dataKey="name" 
                   type="category" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 12, fill: '#64748b', fontWeight: 700 }}
                   width={80}
                 />
                 <Tooltip cursor={{ fill: 'transparent' }} />
                 <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                   {categoryData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}
