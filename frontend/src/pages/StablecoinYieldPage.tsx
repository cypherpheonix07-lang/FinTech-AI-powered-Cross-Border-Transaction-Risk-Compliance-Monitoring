import React, { useState } from 'react';
import { DollarSign, Droplet, ArrowRight, Zap, Coins, TrendingUp, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const yieldData = [
  { day: 'Mon', usdc: 4.8, usdt: 5.2, dai: 4.5, frax: 6.1 },
  { day: 'Tue', usdc: 4.9, usdt: 5.1, dai: 4.6, frax: 6.3 },
  { day: 'Wed', usdc: 5.2, usdt: 5.4, dai: 4.8, frax: 6.8 },
  { day: 'Thu', usdc: 5.0, usdt: 5.1, dai: 4.5, frax: 6.2 },
  { day: 'Fri', usdc: 5.4, usdt: 5.6, dai: 4.9, frax: 7.1 },
  { day: 'Sat', usdc: 5.3, usdt: 5.5, dai: 4.8, frax: 6.9 },
  { day: 'Sun', usdc: 5.5, usdt: 5.8, dai: 5.1, frax: 7.4 },
];

const yieldStrategies = [
  { id: '1', name: 'Aave V3 Market Making', asset: 'USDC', protocol: 'Aave', apy: '5.5%', risk: 'Low', tvl: '$1.2B' },
  { id: '2', name: 'Curve 3Pool LP', asset: 'USDT/USDC/DAI', protocol: 'Curve', apy: '8.2%', risk: 'Medium', tvl: '$450M' },
  { id: '3', name: 'Delta-Neutral Basis', asset: 'USDT', protocol: 'Binance/Synthetix', apy: '14.5%', risk: 'High', tvl: '$85M' },
  { id: '4', name: 'MakerDAO DSR', asset: 'DAI', protocol: 'Maker', apy: '5.0%', risk: 'Low', tvl: '$2.1B' },
];

export default function StablecoinYieldPage() {
  const [activeAsset, setActiveAsset] = useState<string>('All');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-800">
            Stablecoin Yield Optimization
          </h1>
          <p className="text-slate-500 mt-2">Automated liquidity provision, delta-neutral strategies, and smart routing</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
            <Zap className="w-4 h-4" />
            Auto-Compound All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Total Deposited</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$2.45M</div>
          <p className="text-xs text-slate-500 mt-2">Across 4 protocols</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Blended APY</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">8.4%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+1.2% above benchmark</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Coins className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Est. Daily Yield</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$563.84</div>
          <p className="text-xs text-slate-500 mt-2">Auto-converting to USDC</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Impermanent Loss</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">0.01%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Stable-to-Stable Pairs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-slate-900 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-emerald-600" />
                 Historical APY Trends (7D)
               </h3>
               <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> USDC</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> USDT</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-amber-500"></div> DAI</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-purple-500"></div> FRAX</span>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={yieldData}>
                   <defs>
                     <linearGradient id="colorUsdc" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorUsdt" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorDai" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorFrax" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(val) => `${val}%`} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                     itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                   />
                   <Area type="monotone" dataKey="usdc" stroke="#3b82f6" strokeWidth={2} fill="url(#colorUsdc)" />
                   <Area type="monotone" dataKey="usdt" stroke="#10b981" strokeWidth={2} fill="url(#colorUsdt)" />
                   <Area type="monotone" dataKey="dai" stroke="#f59e0b" strokeWidth={2} fill="url(#colorDai)" />
                   <Area type="monotone" dataKey="frax" stroke="#a855f7" strokeWidth={2} fill="url(#colorFrax)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center relative overflow-hidden">
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-emerald-100">
               <SlidersHorizontal className="w-7 h-7" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Router Active</h3>
             <p className="text-slate-500 text-sm mb-6 leading-relaxed">
               The PathGuard yield optimizer is actively rebalancing liquidity pairs across 12 EVM chains to chase maximum safe yield without incurring excess gas fees.
             </p>
             <div className="space-y-4">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-sm font-semibold text-slate-700">Auto-Rebalance</span>
                   </div>
                   <span className="text-sm font-bold text-emerald-600">ON</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-semibold text-slate-700">Max Gas Gwei</span>
                   </div>
                   <span className="text-sm font-bold text-slate-900">45</span>
                </div>
             </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-emerald-600" />
            Top Curated Strategies
          </h3>
          <div className="flex gap-2">
            {['All', 'USDC', 'USDT', 'DAI'].map((asset) => (
               <button 
                  key={asset}
                  onClick={() => setActiveAsset(asset)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeAsset === asset ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               >
                  {asset}
               </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Strategy Name</th>
                <th className="p-4 font-medium">Underlying Asset</th>
                <th className="p-4 font-medium">Protocol</th>
                <th className="p-4 font-medium">Current APY</th>
                <th className="p-4 font-medium">Risk Profile</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {yieldStrategies.filter(s => activeAsset === 'All' || s.asset.includes(activeAsset)).map((strategy) => (
                <tr key={strategy.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-bold text-slate-900">{strategy.name}</td>
                  <td className="p-4">
                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                        {strategy.asset}
                     </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600">{strategy.protocol}</td>
                  <td className="p-4 font-bold text-emerald-600">{strategy.apy}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${strategy.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' : strategy.risk === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                       {strategy.risk}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                      Deposit <ArrowRight className="w-3 h-3" />
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
