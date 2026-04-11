import React from 'react';
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

const data = [
  { name: 'Mon', sent: 400, received: 240 },
  { name: 'Tue', sent: 300, received: 139 },
  { name: 'Wed', sent: 200, received: 980 },
  { name: 'Thu', sent: 278, received: 390 },
  { name: 'Fri', sent: 189, received: 480 },
  { name: 'Sat', sent: 239, received: 380 },
  { name: 'Sun', sent: 349, received: 430 },
];

const categoryData = [
  { name: 'Bills', value: 400, color: '#2563eb' },
  { name: 'Shopping', value: 300, color: '#7c3aed' },
  { name: 'Food', value: 300, color: '#db2777' },
  { name: 'Other', value: 200, color: '#94a3b8' },
];

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Activity Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-slate-900">Transaction Volume</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Last 7 Days</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Sent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-200" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Received</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
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
                dataKey="sent" 
                stroke="#2563eb" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSent)" 
              />
              <Area 
                type="monotone" 
                dataKey="received" 
                stroke="#94a3b8" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
        <div className="mb-6">
          <h3 className="font-bold text-slate-900">Spending by Category</h3>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">This Month</p>
        </div>
        
        <div className="flex-1 min-h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
            <p className="text-xl font-bold text-slate-900 leading-none mt-1">£1,200</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {categoryData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-slate-600">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">£{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
