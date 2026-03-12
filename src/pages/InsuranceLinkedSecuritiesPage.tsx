import React, { useState } from 'react';
import { ShieldCheck, CloudLightning, Activity, BarChart, Wind, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const payoutData = [
  { month: 'Jan', expectedRate: 1.2 },
  { month: 'Feb', expectedRate: 1.5 },
  { month: 'Mar', expectedRate: 1.3 },
  { month: 'Apr', expectedRate: 2.1 },
  { month: 'May', expectedRate: 4.5 }, // Hurricane season start
  { month: 'Jun', expectedRate: 8.2 },
  { month: 'Jul', expectedRate: 12.5 },
];

const activeBonds = [
  { id: 'CAT-NA-24', name: 'N.A. Wind & Quake 2024', apy: '11.5%', type: 'Cat Bond', risk: 'High', status: 'Active' },
  { id: 'AGRI-EU-Q3', name: 'EU Crop Yield Deficit', apy: '7.8%', type: 'Weather Deriv', risk: 'Medium', status: 'Active' },
  { id: 'PAND-GL-25', name: 'Global Health Parametric', apy: '14.2%', type: 'Parametric', risk: 'High', status: 'Trigger Watch' },
  { id: 'FLOOD-ASIA', name: 'SE Asia Monsoon Risk', apy: '9.1%', type: 'Cat Bond', risk: 'Medium', status: 'Active' },
];

export default function InsuranceLinkedSecuritiesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-emerald-700">
            Insurance-Linked Securities (ILS)
          </h1>
          <p className="text-slate-500 mt-2">Catastrophe Bonds, Parametric Weather Derivatives, & Risk Transfer Pools</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            Underwrite Risk
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all cursor-pointer">
           <div className="absolute -right-4 -bottom-4 bg-emerald-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <Activity className="w-5 h-5" />
                  Total ILS AUM
                </div>
                <span className="text-2xl font-bold text-slate-900">$2.4B</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Capital backing catastrophic and weather-related risk transfer instruments.</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all cursor-pointer">
           <div className="absolute -right-4 -bottom-4 bg-amber-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-amber-700 font-semibold">
                  <CloudLightning className="w-5 h-5" />
                  Avg. Premium Yield
                </div>
                <span className="text-2xl font-bold text-slate-900">10.2%</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Uncorrelated yield generated from underwriting premiums.</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group border-rose-200 bg-rose-50/30">
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-rose-700 font-semibold">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                  Active Triggers
                </div>
                <span className="text-2xl font-bold text-rose-700">1</span>
              </div>
              <p className="text-sm text-rose-600 mb-4 font-medium">Global Health Parametric bond nearing threshold.</p>
              <button className="text-xs font-bold text-white bg-rose-600 px-3 py-1.5 rounded-md hover:bg-rose-700 transition">View Details</button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-emerald-600" />
            Seasonal Risk Modeling (N.A. Hurricane Model)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={payoutData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="expectedRate" stroke="#ef4444" strokeWidth={3} fill="url(#colorRisk)" name="Expected Trigger Prob." />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <div className="text-center space-y-4">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                 <Wind className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-slate-800">Parametric Oracle Feeds</h3>
               <p className="text-slate-500 text-sm px-4">Smart contracts automatically disburse funds based on real-time NOAA and USGS oracle data, bypassing claims adjustment delays.</p>
               
               <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between px-4 text-sm font-semibold">
                  <div className="text-slate-600">Active Oracles</div>
                  <div className="text-blue-600 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 14 Nodes</div>
               </div>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-600" />
            Live ILS Offerings
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Instrument</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Target APY</th>
                <th className="p-4 font-medium">Risk Level</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeBonds.map((bond) => (
                <tr key={bond.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{bond.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{bond.id}</div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{bond.type}</td>
                  <td className="p-4 font-bold text-emerald-600">{bond.apy}</td>
                  <td className="p-4">
                     <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${bond.risk === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                        {bond.risk}
                     </span>
                  </td>
                  <td className="p-4">
                     {bond.status === 'Active' ? (
                       <span className="text-emerald-600 font-medium text-sm flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Normal</span>
                     ) : (
                       <span className="text-rose-600 font-bold text-sm flex items-center gap-1 animate-pulse"><AlertTriangle className="w-3 h-3" /> Watch</span>
                     )}
                  </td>
                  <td className="p-4">
                    <button className="text-slate-400 hover:text-emerald-600 font-medium text-sm transition-colors flex items-center gap-1">
                      Invest <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
