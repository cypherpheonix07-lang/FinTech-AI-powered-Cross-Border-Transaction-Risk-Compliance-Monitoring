import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const riskData = [
  { range: '0.0-0.2', count: 450, fill: '#16a34a' },
  { range: '0.2-0.4', count: 320, fill: '#22c55e' },
  { range: '0.4-0.6', count: 180, fill: '#f59e0b' },
  { range: '0.6-0.8', count: 95, fill: '#ea580c' },
  { range: '0.8-1.0', count: 42, fill: '#dc2626' },
];

const countryData = [
  { name: 'Emerging Markets', value: 400, color: '#2563eb' },
  { name: 'High-Risk Zones', value: 300, color: '#dc2626' },
  { name: 'Standard Corridors', value: 300, color: '#16a34a' },
  { name: 'Tax Havens', value: 200, color: '#f59e0b' },
];

const RiskAnalytics = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Risk Intelligence Reports</h1>
          <p className="text-slate-500">Aggregate analytics across all traced paths and accounts.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-dark-700 border border-dark-600 text-slate-300 px-4 py-2 rounded-xl flex items-center hover:bg-dark-600 transition-all">
            <Calendar size={18} className="mr-2" /> Last 30 Days
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center shadow-lg shadow-primary/20">
            <Download size={18} className="mr-2" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-700 p-8 rounded-3xl border border-dark-600 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider text-sm">Path Risk Distribution</h3>
            <Filter size={18} className="text-slate-500 cursor-pointer" />
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-dark-700 p-8 rounded-3xl border border-dark-600 shadow-xl">
          <h3 className="font-bold text-slate-200 uppercase tracking-wider text-sm mb-8">Network Vulnerability</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {countryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-400">{item.name}</span>
                </div>
                <span className="text-slate-200 font-bold">{((item.value / 1200) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-dark-700 p-8 rounded-3xl border border-dark-600 shadow-xl">
        <h3 className="font-bold text-slate-200 uppercase tracking-wider text-sm mb-8">Intermediary Frequency Trends</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { day: 'Mon', hops: 2.1 },
              { day: 'Tue', hops: 2.4 },
              { day: 'Wed', hops: 2.8 },
              { day: 'Thu', hops: 2.3 },
              { day: 'Fri', hops: 3.1 },
              { day: 'Sat', hops: 3.5 },
              { day: 'Sun', hops: 2.9 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="hops" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalytics;
