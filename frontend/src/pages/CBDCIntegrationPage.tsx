import React, { useState } from 'react';
import { Landmark, Globe, Shield, RefreshCw, Send, History, ArrowRight, ShieldCheck, Banknote } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const cbdcFlowData = [
  { time: '00:00', ecb: 120, fed: 85, pboc: 450, boe: 65 },
  { time: '04:00', ecb: 150, fed: 110, pboc: 820, boe: 90 },
  { time: '08:00', ecb: 850, fed: 210, pboc: 540, boe: 780 },
  { time: '12:00', ecb: 1420, fed: 950, pboc: 210, boe: 1100 },
  { time: '16:00', ecb: 890, fed: 1850, pboc: 110, boe: 450 },
  { time: '20:00', ecb: 210, fed: 1240, pboc: 320, boe: 120 },
];

const wholesaleCorridors = [
  { id: 'mBridge-1', route: 'PBOC (e-CNY) ↔ HKMA (e-HKD)', volume: '¥14.2B', latency: '4.2ms', status: 'Optimal' },
  { id: 'Jura-Fx', route: 'BdF (wEUR) ↔ SNB (wCHF)', volume: '€2.1B', latency: '8.5ms', status: 'Optimal' },
  { id: 'Dunbar-A', route: 'MAS (wSGD) ↔ RBA (wAUD)', volume: 'A$850M', latency: '12.1ms', status: 'Congested' },
  { id: 'Cedar-1', route: 'Fed (wUSD) ↔ MAS (wSGD)', volume: '$4.5B', latency: '6.4ms', status: 'Optimal' },
];

export default function CBDCIntegrationPage() {
  const [activeTab, setActiveTab] = useState<'wholesale' | 'retail' | 'settlement'>('wholesale');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-700">
            CBDC Integration & Settlement
          </h1>
          <p className="text-slate-500 mt-2">Central Bank Digital Currency Cross-Border Corridors & PvP Settlement</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Send className="w-4 h-4" />
            Initiate wCBDC Transfer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Landmark className="w-5 h-5 text-indigo-700" />
            <h3 className="font-semibold text-slate-700">Supported Networks</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">14</div>
          <p className="text-xs text-slate-500 mt-2">Wholesale & Retail CBDCs</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">24h Settlement Vol</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$28.4B</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Atomic PvP Executions</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Nostro/Vostro Sync</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">100%</div>
          <p className="text-xs text-slate-500 mt-2">Real-time reconciliation</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Active Corridors</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">8</div>
          <p className="text-xs text-amber-600 font-medium mt-2">Multi-CBDC bridges live</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
               <Activity className="w-5 h-5 text-indigo-600" />
               Global wCBDC Velocity (24h Traffic)
             </h3>
             <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-600"></div> e-CNY</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> FedNow (wUSD)</span>
             </div>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={cbdcFlowData}>
                 <defs>
                   <linearGradient id="colorFed" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorPboc" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                   itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                 />
                 <Area type="monotone" dataKey="pboc" name="PBOC (e-CNY)" stroke="#2563eb" fill="url(#colorPboc)" />
                 <Area type="monotone" dataKey="fed" name="Federal Reserve (wUSD)" stroke="#10b981" fill="url(#colorFed)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Banknote className="w-32 h-32 text-indigo-600" />
           </div>
           <div className="relative z-10">
             <div className="w-14 h-14 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-indigo-100">
               <Shield className="w-7 h-7" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Atomic Settlement (PvP)</h3>
             <p className="text-slate-500 text-sm mb-6 leading-relaxed">
               Payment-versus-Payment protocol guarantees that wholesale cross-border transfers occur simultaneously. If one leg fails, the entire transaction reverts, eliminating Herstatt settlement risk completely.
             </p>
             <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                   <span className="text-slate-600">Herstatt Risk Exposure</span>
                   <span className="text-emerald-600">0.00%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[100%]"></div>
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('wholesale')}
            className={`px-6 py-4 font-semibold text-sm transition-colors flex items-center gap-2 ${activeTab === 'wholesale' ? 'text-indigo-700 border-b-2 border-indigo-700 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <Globe className="w-4 h-4" /> Multi-CBDC Bridge Hubs
          </button>
          <button 
            onClick={() => setActiveTab('retail')}
            className={`px-6 py-4 font-semibold text-sm transition-colors flex items-center gap-2 ${activeTab === 'retail' ? 'text-indigo-700 border-b-2 border-indigo-700 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <Banknote className="w-4 h-4" /> Retail CBDC Provisioning
          </button>
        </div>

        {activeTab === 'wholesale' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Bridge ID</th>
                  <th className="p-4 font-medium">Corridor Route</th>
                  <th className="p-4 font-medium">24h Locked Volume</th>
                  <th className="p-4 font-medium">Clearance Latency</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wholesaleCorridors.map((corridor) => (
                  <tr key={corridor.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 font-mono text-sm text-slate-500">{corridor.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{corridor.route}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-800">{corridor.volume}</td>
                    <td className="p-4 font-mono text-sm">{corridor.latency}</td>
                    <td className="p-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${corridor.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${corridor.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                          {corridor.status}
                       </span>
                    </td>
                    <td className="p-4">
                      <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1">
                        View Node <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
