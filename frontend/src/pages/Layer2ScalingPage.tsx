import React, { useState } from 'react';
import { Layers, Zap, ShieldCheck, Activity, ArrowRight, Server, Database, Container } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const rollupPerformanceData = [
  { time: '00:00', optimistic: 1200, zk: 850, sidechain: 1500 },
  { time: '04:00', optimistic: 1500, zk: 1100, sidechain: 1820 },
  { time: '08:00', optimistic: 2500, zk: 2100, sidechain: 2400 },
  { time: '12:00', optimistic: 4200, zk: 3950, sidechain: 3800 },
  { time: '16:00', optimistic: 3800, zk: 3450, sidechain: 3200 },
  { time: '20:00', optimistic: 2100, zk: 1840, sidechain: 2100 },
];

const l2Networks = [
  { id: 'ARB-1', name: 'Arbitrum One', type: 'Optimistic Rollup', tvl: '$12.4B', tps: '18.5', status: 'Optimal' },
  { id: 'OP-MAIN', name: 'Optimism', type: 'Optimistic Rollup', tvl: '$6.2B', tps: '12.4', status: 'Optimal' },
  { id: 'ZK-ERA', name: 'zkSync Era', type: 'ZK Rollup', tvl: '$3.5B', tps: '24.2', status: 'Verifying' },
  { id: 'BASE-1', name: 'Base', type: 'Optimistic Rollup', tvl: '$4.1B', tps: '15.8', status: 'Optimal' },
  { id: 'STARK-1', name: 'Starknet', type: 'ZK Rollup', tvl: '$1.2B', tps: '45.0', status: 'Optimal' },
];

export default function Layer2ScalingPage() {
  const [activeTab, setActiveTab] = useState<'networks' | 'bridging' | 'sequencers'>('networks');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">
            Layer 2 Scaling Solutions
          </h1>
          <p className="text-slate-500 mt-2">Rollup management, sequencer monitoring, and throughput optimization</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20">
            <Container className="w-4 h-4" />
            Deploy Custom Rollup
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Total L2 TVL</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$27.4B</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+5.2% vs last week</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Aggregate TPS</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">116.4</div>
          <p className="text-xs text-slate-500 mt-2">Peak: 450.2 (Starknet Stress Test)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Fraud Proof Window</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">7 Days</div>
          <p className="text-xs text-slate-500 mt-2">Standard for Optimistic</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Sequencer Health</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">100%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">No downtime detected</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
               <Activity className="w-5 h-5 text-indigo-600" />
               Rollup Throughput (TPS Comparison)
             </h3>
             <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Optimistic</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-purple-500"></div> ZK</span>
             </div>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={rollupPerformanceData}>
                 <defs>
                   <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorZk" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                   itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                 />
                 <Area type="monotone" dataKey="optimistic" stroke="#6366f1" strokeWidth={2} fill="url(#colorOpt)" name="Optimistic Rollups" />
                 <Area type="monotone" dataKey="zk" stroke="#a855f7" strokeWidth={2} fill="url(#colorZk)" name="ZK Rollups" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center relative overflow-hidden">
           <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-indigo-100">
             <Database className="w-7 h-7" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">Data Availability (DA)</h3>
           <p className="text-slate-500 text-sm mb-6 leading-relaxed">
             Optimizing L1 data posting costs via EIP-4844 Blobs, Celestia, and EigenDA integrations. Current cost reduction: 94%.
           </p>
           <div className="space-y-4">
              <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                 <span className="text-sm font-semibold text-slate-700">L1 Gas (Calldata)</span>
                 <span className="text-sm font-bold text-slate-400 line-through">$45.20</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
                 <span className="text-sm font-semibold text-slate-700">L1 Gas (Blobs)</span>
                 <span className="text-sm font-bold text-emerald-600">$1.20</span>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Active L2 Networks</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Network Name</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Total TVL</th>
                <th className="p-4 font-medium">Avg TPS</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {l2Networks.map((network) => (
                <tr key={network.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-bold text-slate-900">{network.name}</td>
                  <td className="p-4">
                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                        {network.type}
                     </span>
                  </td>
                  <td className="p-4 text-sm font-semibold text-slate-800">{network.tvl}</td>
                  <td className="p-4 font-mono text-sm">{network.tps}</td>
                  <td className="p-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${network.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${network.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                        {network.status}
                     </span>
                  </td>
                  <td className="p-4">
                    <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                      Bridge <ArrowRight className="w-3 h-3" />
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
