import React, { useState } from 'react';
import { Network, Globe, DollarSign, Activity, Percent, ArrowRightLeft, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const fxData = [
  { time: '04:00', eurusd: 1.0842, usdjpy: 151.20, gbpusd: 1.2650 },
  { time: '08:00', eurusd: 1.0855, usdjpy: 150.85, gbpusd: 1.2685 },
  { time: '12:00', eurusd: 1.0830, usdjpy: 151.45, gbpusd: 1.2640 },
  { time: '16:00', eurusd: 1.0875, usdjpy: 150.50, gbpusd: 1.2710 },
  { time: '20:00', eurusd: 1.0890, usdjpy: 150.10, gbpusd: 1.2745 },
];

const activeSwaps = [
  { pair: 'EUR/USD', type: 'Overnight (O/N)', rate: '5.25%', direction: 'Pay Fixed, Rec Float', maturity: 'Tomorrow' },
  { pair: 'USD/JPY', type: 'Cross-Currency', rate: '1.45%', direction: 'Rec Fixed, Pay Float', maturity: '3 Months' },
  { pair: 'GBP/USD', type: 'Forward', rate: '1.2780', direction: 'Long GBP', maturity: '1 Month' },
  { pair: 'AUD/USD', type: 'Options (Call)', rate: '0.6650', direction: 'Long Delta', maturity: '2 Weeks' },
];

export default function FXCurrenciesPage() {
  const [activeTab, setActiveTab] = useState<'spot' | 'swaps' | 'arbitrage'>('spot');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600">
            Foreign Exchange (FX) & Currencies
          </h1>
          <p className="text-slate-500 mt-2">Institutional Spot, Swaps, Forwards, & Cross-Border Payment Routing</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
            <ArrowRightLeft className="w-4 h-4" />
            Execute Trade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Daily Adv (Global)</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$7.5T</div>
          <p className="text-xs text-slate-500 mt-2">Average Daily Volume</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">DXY Index</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">104.25</div>
          <p className="text-xs text-rose-600 font-medium mt-2">-0.45% (24h)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Percent className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Avg Spread</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">0.2 <span className="text-lg">pips</span></div>
          <p className="text-xs text-slate-500 mt-2">EUR/USD Institutional</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Active Nodes</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">14,204</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Providing Liquidity</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('spot')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'spot' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Live Spot Markets
          </button>
          <button 
            onClick={() => setActiveTab('swaps')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'swaps' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Swaps & Derivatives
          </button>
          <button 
            onClick={() => setActiveTab('arbitrage')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'arbitrage' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Routing Arbitrage
          </button>
        </div>

        {activeTab === 'spot' && (
          <div className="p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Major Pairs Intraday
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fxData}>
                  <defs>
                    <linearGradient id="colorEUR" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="eurusd" name="EUR/USD" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEUR)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'swaps' && (
          <div className="p-0">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-slate-200 text-slate-500 text-sm bg-slate-50">
                     <th className="p-4 font-medium">Currency Pair</th>
                     <th className="p-4 font-medium">Instrument Type</th>
                     <th className="p-4 font-medium">Rate / Strike</th>
                     <th className="p-4 font-medium">Position</th>
                     <th className="p-4 font-medium">Maturity</th>
                     <th className="p-4 font-medium">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {activeSwaps.map((swap, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors group">
                       <td className="p-4 font-bold text-slate-900">{swap.pair}</td>
                       <td className="p-4 text-sm text-slate-600 font-medium">{swap.type}</td>
                       <td className="p-4 font-bold text-emerald-700">{swap.rate}</td>
                       <td className="p-4 text-sm text-slate-800">{swap.direction}</td>
                       <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                             <Clock className="w-3 h-3" />
                             {swap.maturity}
                          </span>
                       </td>
                       <td className="p-4">
                         <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors opacity-0 group-hover:opacity-100">
                           Manage
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'arbitrage' && (
           <div className="p-16 text-center">
              <Network className="w-16 h-16 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Cross-Border Routing Engine Active</h3>
              <p className="max-w-md mx-auto text-slate-500">The PathGuard algorithm is currently scanning 45+ liquidity venues (traditional CLOBs + decentralized AMMs) for execution arbitrage.</p>
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-100">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 Optimizing Payment Paths
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
