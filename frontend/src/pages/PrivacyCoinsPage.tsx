import React, { useState } from 'react';
import { Shield, Lock, EyeOff, Activity, ArrowRight, ShieldAlert, Key, Fingerprint, Database } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const privacyTrendData = [
  { day: 'Mon', shielded: 450, transparent: 1200 },
  { day: 'Tue', shielded: 620, transparent: 1150 },
  { day: 'Wed', shielded: 840, transparent: 1300 },
  { day: 'Thu', shielded: 1200, transparent: 1450 },
  { day: 'Fri', shielded: 1800, transparent: 1100 },
  { day: 'Sat', shielded: 2400, transparent: 950 },
  { day: 'Sun', shielded: 3100, transparent: 820 },
];

const shieldedPools = [
  { id: 'POOL-XMR', name: 'Monero Stealth Pool', asset: 'XMR', tvl: '450,000 XMR', anonSet: '24 (Ring Size)', status: 'Optimal' },
  { id: 'POOL-ZEC', name: 'Zcash Orchard Pool', asset: 'ZEC', tvl: '1.2M ZEC', anonSet: '1,000,000+', status: 'Shielding' },
  { id: 'POOL-RAIL', name: 'Railgun Privacy Relayer', asset: 'WETH/USDC', tvl: '$45M', anonSet: 'Dynamic', status: 'Optimal' },
  { id: 'POOL-AZTEC', name: 'Aztec Connect ZK-Rollup', asset: 'DAI', tvl: '$12M', anonSet: 'Recursive ZK', status: 'Paused' },
];

export default function PrivacyCoinsPage() {
  const [activeTab, setActiveTab] = useState<'shielded' | 'audit' | 'mixing'>('shielded');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">
            Privacy Coins & Confidential Transactions
          </h1>
          <p className="text-slate-500 mt-2">Zero-knowledge proofs, Ring signatures, and stealth address orchestration for financial sovereignty</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Lock className="w-4 h-4" />
            Shield Assets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-700">Shielded TVL</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$1.4B</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+15% Shielding Rate</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <EyeOff className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Protocol Anonymity</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">99.9%</div>
          <p className="text-xs text-slate-500 mt-2">Heuristic Resistance Score</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Key className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">View Keys Generated</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">14,205</div>
          <p className="text-xs text-slate-500 mt-2">Regulatory Audit Enabled</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="font-semibold text-slate-700">Compliance Bridging</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">Active</div>
          <p className="text-xs text-rose-600 font-medium mt-2">ZK-KYC proof required</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
               <Activity className="w-5 h-5 text-slate-700" />
               Transparent vs Shielded Volume ($M)
             </h3>
             <div className="flex gap-4">
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-900"></div> Shielded</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-200"></div> Transparent</span>
             </div>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={privacyTrendData}>
                 <defs>
                   <linearGradient id="colorShield" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                   itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                 />
                 <Area type="monotone" dataKey="shielded" stroke="#0f172a" strokeWidth={3} fill="url(#colorShield)" name="Shielded Transactions" />
                 <Area type="monotone" dataKey="transparent" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="Transparent Transactions" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center relative overflow-hidden">
           <div className="w-14 h-14 bg-slate-50 text-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-100">
             <Fingerprint className="w-7 h-7" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">Zero-Knowledge Proofs</h3>
           <p className="text-slate-500 text-sm mb-6 leading-relaxed">
             Generate cryptographic proofs that a transaction is valid without revealing the value, sender, or receiver. Utilizes ZK-SNARKs and Bulletproofs.
           </p>
           <div className="space-y-4">
              <div className="flex justify-between items-center px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
                 <span className="text-sm font-semibold text-emerald-800">Proof Generation Time</span>
                 <span className="text-sm font-bold text-emerald-700">0.8s</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-indigo-50 rounded-xl border border-indigo-100">
                 <span className="text-sm font-semibold text-indigo-800">Proof Size</span>
                 <span className="text-sm font-bold text-indigo-700">~250 Bytes</span>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Active Shielded Liquidity Pools</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Pool ID</th>
                <th className="p-4 font-medium">Asset Pair</th>
                <th className="p-4 font-medium">Total Shielded TVL</th>
                <th className="p-4 font-medium">Anonymity Set</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shieldedPools.map((pool) => (
                <tr key={pool.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-mono text-xs text-slate-500">{pool.id}</td>
                  <td className="p-4 font-bold text-slate-900">{pool.name}</td>
                  <td className="p-4 text-sm font-semibold text-slate-800">{pool.tvl}</td>
                  <td className="p-4">
                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700">
                        {pool.anonSet}
                     </span>
                  </td>
                  <td className="p-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${pool.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${pool.status === 'Optimal' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                        {pool.status}
                     </span>
                  </td>
                  <td className="p-4">
                    <button className="text-slate-900 hover:text-slate-600 font-semibold text-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                      Unshield <ArrowRight className="w-3 h-3" />
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
