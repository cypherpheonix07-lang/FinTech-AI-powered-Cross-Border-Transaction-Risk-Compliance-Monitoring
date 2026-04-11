import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, Compass, Activity, ShieldCheck, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const allocationData = [
  { name: 'Equities (Global)', value: 25, color: '#3b82f6' },
  { name: 'Fixed Income (Treasuries)', value: 40, color: '#10b981' },
  { name: 'Commodities (Gold/Oil)', value: 20, color: '#f59e0b' },
  { name: 'Crypto/Digital Assets', value: 15, color: '#8b5cf6' },
];

const riskPremia = [
  { factor: 'Value', premium: '+2.4%', status: 'active', correlation: '0.12' },
  { factor: 'Momentum', premium: '+4.1%', status: 'active', correlation: '0.45' },
  { factor: 'Carry (FX / Yield)', premium: '+1.8%', status: 'neutral', correlation: '-0.05' },
  { factor: 'Volatility (Short)', premium: '+6.2%', status: 'warning', correlation: '0.82' },
];

export default function RiskParityPage() {
  const [targetVol, setTargetVol] = useState('10');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">
            Risk Parity & Alternative Risk Premia
          </h1>
          <p className="text-slate-500 mt-2">All-Weather Portfolios, Volatility Targeting, & Factor Harvesting</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Compass className="w-4 h-4" />
            Rebalance Portfolio
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 space-y-6">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
            <ShieldAlert className="w-5 h-5 text-slate-600" />
            Portfolio Risk Engine
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span>Target Annualized Volatility</span>
                <span className="text-blue-600">{targetVol}%</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="25" 
                value={targetVol} 
                onChange={(e) => setTargetVol(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Conservative (4%)</span>
                <span>Aggressive (25%)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
               <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-500">Current Est. Volatility</span>
                  <span className="font-bold text-slate-900">{parseFloat(targetVol) * 0.98}%</span>
               </div>
               <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-500">Max Drawdown (Hist)</span>
                  <span className="font-bold text-slate-900 text-rose-600">-{parseFloat(targetVol) * 1.5}%</span>
               </div>
               <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-500">Sharpe Ratio (Proj)</span>
                  <span className="font-bold text-emerald-600">1.45</span>
               </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-4">
               <div className="flex items-start gap-3">
                 <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                 <div>
                   <h4 className="text-sm font-semibold text-slate-800">Dynamic Hedging Active</h4>
                   <p className="text-xs text-slate-500 mt-1">
                     The system is currently shorting VIX futures to harvest volatility premium while maintaining tail-risk tail hedges.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-slate-600" />
            Risk Contribution (Not Capital Allocation)
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-[300px]">
            <div className="w-full md:w-1/2 h-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={allocationData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={100}
                     paddingAngle={2}
                     dataKey="value"
                   >
                     {allocationData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     itemStyle={{ fontWeight: 'bold' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Equal Risk Budgeting</h4>
              {allocationData.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-900">{item.value}% Risk</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-500 mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                Notice: Capital allocation is dynamically adjusted using leverage to maintain exact 25% risk contribution per asset class.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Alternative Risk Premia (ARP) Harvesting
          </h3>
          <p className="text-sm text-slate-500 mt-1">Extracting non-directional returns across isolated market anomalies.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Risk Factor</th>
                <th className="p-4 font-medium">Est. Premium (Annual)</th>
                <th className="p-4 font-medium">Eq. Correlation</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {riskPremia.map((rp, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{rp.factor}</td>
                  <td className="p-4 font-bold text-emerald-600">{rp.premium}</td>
                  <td className="p-4 text-slate-600">{rp.correlation}</td>
                  <td className="p-4">
                    {rp.status === 'active' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Harvesting</span>}
                    {rp.status === 'neutral' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Neutral</span>}
                    {rp.status === 'warning' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Drawdown Alert</span>}
                  </td>
                  <td className="p-4">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">Manage</button>
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
