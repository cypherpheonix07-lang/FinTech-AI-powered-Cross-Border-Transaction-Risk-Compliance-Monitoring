import React, { useState } from 'react';
import { Zap, Link2, Activity, ArrowRight, ShieldCheck, History, Send, Repeat, Wallet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const lightningTrafficData = [
  { time: '00:00', msats: 450, channels: 1200 },
  { time: '04:00', msats: 820, channels: 1250 },
  { time: '08:00', msats: 2400, channels: 1300 },
  { time: '12:00', msats: 4800, channels: 1450 },
  { time: '16:00', msats: 3200, channels: 1400 },
  { time: '20:00', msats: 1100, channels: 1350 },
];

const lightningChannels = [
  { id: 'chan-88a', node: 'PathGuard-Liquidity-1', capacity: '2.5 BTC', localBalance: '1.8 BTC', remoteBalance: '0.7 BTC', status: 'Active' },
  { id: 'chan-21b', node: 'Kraken-Lightning', capacity: '1.0 BTC', localBalance: '0.2 BTC', remoteBalance: '0.8 BTC', status: 'Active' },
  { id: 'chan-99c', node: 'Bitfinex-LN', capacity: '5.0 BTC', localBalance: '4.5 BTC', remoteBalance: '0.5 BTC', status: 'Closing' },
  { id: 'chan-44d', node: 'Wallet-Of-Satoshi', capacity: '0.5 BTC', localBalance: '0.3 BTC', remoteBalance: '0.2 BTC', status: 'Active' },
];

export default function LightningNetworkPage() {
  const [activeTab, setActiveTab] = useState<'channels' | 'payments' | 'routing'>('channels');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-700">
            Lightning Network Micro-Payments
          </h1>
          <p className="text-slate-500 mt-2">Instant settlements, channel liquidity management, and submarine swap orchestration</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md shadow-amber-500/20">
            <Send className="w-4 h-4" />
            Open New Channel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Daily Volume</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">45,204</div>
          <p className="text-xs text-slate-500 mt-2">Micro-transactions (msats)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Link2 className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-slate-700">Active Channels</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">142</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">100% Connectivity</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Total Capacity</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">12.5 BTC</div>
          <p className="text-xs text-slate-500 mt-2">Liquidity Score: 94/100</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Avg Fee</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">0.02%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Across 12 hops</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
               <Activity className="w-5 h-5 text-amber-600" />
               Payment Velocity (msats/s)
             </h3>
             <div className="flex gap-2 text-xs font-semibold text-slate-500">
               Live LN Stream
             </div>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={lightningTrafficData}>
                 <defs>
                   <linearGradient id="colorMsats" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                   itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                 />
                 <Area type="monotone" dataKey="msats" stroke="#f59e0b" strokeWidth={3} fill="url(#colorMsats)" name="msats Processed" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center relative overflow-hidden">
           <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-amber-100">
             <Repeat className="w-7 h-7" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">Submarine Swaps</h3>
           <p className="text-slate-500 text-sm mb-6 leading-relaxed">
             Seamlessly move funds between the Bitcoin base layer and Lightning Network channels using off-chain to on-chain atomic swaps.
           </p>
           <div className="space-y-4">
              <button className="w-full flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                 <span className="text-sm font-semibold text-slate-700">Loop In (L1 → LN)</span>
                 <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
              <button className="w-full flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                 <span className="text-sm font-semibold text-slate-700">Loop Out (LN → L1)</span>
                 <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Active Liquidity Channels</h3>
          <div className="flex gap-2">
             <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">
                LDK Node: Online
             </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Channel ID</th>
                <th className="p-4 font-medium">Peer Node</th>
                <th className="p-4 font-medium">Capacity</th>
                <th className="p-4 font-medium">Balance (Local/Remote)</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lightningChannels.map((chan) => (
                <tr key={chan.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-mono text-xs text-slate-500">{chan.id}</td>
                  <td className="p-4 font-bold text-slate-900">{chan.node}</td>
                  <td className="p-4 text-sm font-semibold text-slate-800">{chan.capacity}</td>
                  <td className="p-4">
                     <div className="flex flex-col gap-1">
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex">
                           <div className="bg-amber-500 h-full" style={{ width: '70%' }}></div>
                           <div className="bg-indigo-400 h-full" style={{ width: '30%' }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold">
                           <span className="text-amber-600">{chan.localBalance} (Local)</span>
                           <span className="text-indigo-600">{chan.remoteBalance} (Remote)</span>
                        </div>
                     </div>
                  </td>
                  <td className="p-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${chan.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${chan.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                        {chan.status}
                     </span>
                  </td>
                  <td className="p-4">
                    <button className="text-amber-600 hover:text-amber-800 font-semibold text-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                      Settings <ArrowRight className="w-3 h-3" />
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
