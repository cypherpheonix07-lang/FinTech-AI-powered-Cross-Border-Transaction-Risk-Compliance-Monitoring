import React from 'react';
import { Leaf, Hexagon, Droplets, ArrowUpRight, ArrowDownRight, Activity, Box, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const priceData = [
  { time: '09:00', gold: 2310.2, wheat: 582.4, carbon: 84.5 },
  { time: '10:00', gold: 2315.8, wheat: 584.1, carbon: 85.2 },
  { time: '11:00', gold: 2308.5, wheat: 581.0, carbon: 86.4 },
  { time: '12:00', gold: 2312.4, wheat: 580.5, carbon: 87.1 },
  { time: '13:00', gold: 2320.1, wheat: 583.2, carbon: 86.8 },
  { time: '14:00', gold: 2318.5, wheat: 586.4, carbon: 88.2 },
];

const commoditiesList = [
  { id: 'T-GOLD', name: 'Tokenized Physical Gold (oz)', spot: '$2,318.50', chg: '+0.36%', status: 'Bullish', category: 'Precious Metals' },
  { id: 'EU-CRB-V2', name: 'EU Carbon Allowance (EUA)', spot: '€88.20', chg: '+4.37%', status: 'Bullish', category: 'Environmental' },
  { id: 'WHT-CBOT', name: 'Soft Winter Wheat (bu)', spot: '$5.86', chg: '+0.68%', status: 'Neutral', category: 'Agriculture' },
  { id: 'WTI-CRDE', name: 'WTI Crude Oil (bbl)', spot: '$82.40', chg: '-1.24%', status: 'Bearish', category: 'Energy' },
  { id: 'LITH-BATT', name: 'Battery Grade Lithium', spot: '$14,250', chg: '-0.85%', status: 'Bearish', category: 'Rare Earths' },
];

export default function CommoditiesResourcesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-yellow-600">
            Commodities & Natural Resources
          </h1>
          <p className="text-slate-500 mt-2">Physical Metals, Agricultural Yields, & Carbon Credit Markets</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Box className="w-4 h-4" />
            Trade Commodities
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-yellow-400 transition-colors">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <Hexagon className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-slate-700">Precious Metals</span>
             </div>
             <div className="text-2xl font-bold text-slate-900">$2,318.50 <span className="text-sm font-medium text-emerald-600 ml-2">oz</span></div>
             <p className="text-xs text-slate-500 mt-1">XAU/USD Spot (Vaulted)</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
            <ArrowUpRight className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-emerald-400 transition-colors">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-slate-700">Carbon Credits</span>
             </div>
             <div className="text-2xl font-bold text-slate-900">€88.20 <span className="text-sm font-medium text-emerald-600 ml-2">ton</span></div>
             <p className="text-xs text-slate-500 mt-1">EU ETS Verified Allowances</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
            <ArrowUpRight className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-400 transition-colors">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-slate-700">Energy (WTI)</span>
             </div>
             <div className="text-2xl font-bold text-slate-900">$82.40 <span className="text-sm font-medium text-rose-600 ml-2">bbl</span></div>
             <p className="text-xs text-slate-500 mt-1">Crude Oil Front Month</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
            <ArrowDownRight className="w-6 h-6 text-rose-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-600" />
          Live Spot Pricing (Intraday)
        </h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis yAxisId="left" domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#eab308'}} width={80} />
              <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#10b981'}} width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Line yAxisId="left" type="monotone" dataKey="gold" name="Gold (Left)" stroke="#eab308" strokeWidth={3} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="carbon" name="Carbon (Right)" stroke="#10b981" strokeWidth={3} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="wheat" name="Wheat (Right)" stroke="#8b5cf6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
           <h3 className="font-bold text-slate-900">Market Monitor</h3>
           <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Commodity</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Spot Price</th>
                <th className="p-4 font-medium">24h Change</th>
                <th className="p-4 font-medium">Market Status</th>
                <th className="p-4 font-medium w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {commoditiesList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">{item.id}</div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{item.category}</td>
                  <td className="p-4 font-semibold text-slate-900">{item.spot}</td>
                  <td className="p-4">
                     <span className={`inline-flex items-center gap-1 font-bold ${item.chg.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.chg.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {item.chg}
                     </span>
                  </td>
                  <td className="p-4">
                     <span className={`text-xs font-semibold uppercase tracking-wider ${item.status === 'Bullish' ? 'text-emerald-600' : item.status === 'Bearish' ? 'text-rose-600' : 'text-amber-600'}`}>
                        {item.status}
                     </span>
                  </td>
                  <td className="p-4">
                    <button className="text-slate-400 hover:text-emerald-600 font-semibold text-sm transition-colors opacity-0 group-hover:opacity-100">
                      Trade
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
