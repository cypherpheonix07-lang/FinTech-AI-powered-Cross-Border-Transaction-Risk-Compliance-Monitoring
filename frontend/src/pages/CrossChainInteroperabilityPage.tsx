import React, { useState, useEffect } from 'react';
import { Network, Link2, ShieldAlert, Zap, Repeat, ArrowRight, LayoutDashboard, Shuffle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { apiFetch } from '../lib/api';

const bridgeVolumeData = [
  { time: '00:00', ethereum: 120, bsc: 85, arbitrum: 45, polygon: 65, optimism: 25 },
  { time: '04:00', ethereum: 150, bsc: 110, arbitrum: 82, polygon: 90, optimism: 35 },
  { time: '08:00', ethereum: 250, bsc: 130, arbitrum: 140, polygon: 120, optimism: 80 },
  { time: '12:00', ethereum: 420, bsc: 210, arbitrum: 280, polygon: 210, optimism: 150 },
  { time: '16:00', ethereum: 380, bsc: 185, arbitrum: 220, polygon: 180, optimism: 110 },
  { time: '20:00', ethereum: 210, bsc: 124, arbitrum: 132, polygon: 110, optimism: 60 },
];

export interface CrossChainTransfer {
  id: string;
  sourceChain: string;
  destinationChain: string;
  asset: string;
  amount: string;
  status: 'Pending' | 'Verifying' | 'Completed' | 'Failed';
  protocol: 'LayerZero' | 'Wormhole' | 'Synapse' | 'CCIP';
  timestamp: string;
}

export default function CrossChainInteroperabilityPage() {
  const [activeTab, setActiveTab] = useState<'bridges' | 'messaging' | 'security'>('bridges');
  const [transfers, setTransfers] = useState<CrossChainTransfer[]>([]);
  const [health, setHealth] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transfersData, healthData] = await Promise.all([
          apiFetch<CrossChainTransfer[]>('/web3-bridge/cross-chain/transfers'),
          apiFetch<Record<string, string>>('/web3-bridge/cross-chain/health')
        ]);
        setTransfers(transfersData);
        setHealth(healthData);
      } catch (error) {
        console.error('Failed to fetch cross-chain data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-700">
            Cross-Chain Interoperability
          </h1>
          <p className="text-slate-500 mt-2">Omnichain routing, message passing architecture, and bridge security</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md shadow-orange-500/20">
            <Shuffle className="w-4 h-4" />
            Cross-Chain Swap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-slate-700">Connected Chains</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">24</div>
          <p className="text-xs text-slate-500 mt-2">EVM & Non-EVM supported</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Repeat className="w-5 h-5 text-rose-600" />
            <h3 className="font-semibold text-slate-700">24h Bridge Vol</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$84.5M</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+12.4% vs yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Avg Finality</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">12s</div>
          <p className="text-xs text-slate-500 mt-2">Across top 5 routes</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Threat Vectors</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">0</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Active exploits detected</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-slate-900 flex items-center gap-2">
                 <Link2 className="w-5 h-5 text-orange-600" />
                 Bridge Liquidity Outflows ($M)
               </h3>
               <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> ETH</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-amber-500"></div> BSC</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> ARB</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-purple-500"></div> POLY</span>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={bridgeVolumeData}>
                   <defs>
                     <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorBsc" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorArb" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorPoly" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                   <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                     itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                   />
                   <Area type="monotone" dataKey="ethereum" stackId="1" stroke="#3b82f6" fill="url(#colorEth)" name="Ethereum" />
                   <Area type="monotone" dataKey="bsc" stackId="1" stroke="#f59e0b" fill="url(#colorBsc)" name="BNB Chain" />
                   <Area type="monotone" dataKey="arbitrum" stackId="1" stroke="#6366f1" fill="url(#colorArb)" name="Arbitrum" />
                   <Area type="monotone" dataKey="polygon" stackId="1" stroke="#a855f7" fill="url(#colorPoly)" name="Polygon" />
                   <Area type="monotone" dataKey="optimism" stackId="1" stroke="#ef4444" fill="url(#colorOpt)" name="Optimism" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center relative overflow-hidden">
             <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-orange-100">
               <ShieldAlert className="w-7 h-7" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Bridge Security Monitor</h3>
             <p className="text-slate-500 text-sm mb-6 leading-relaxed">
               Continuous monitoring of validator signatures, optimistic fraud proofs, and token contract supply discrepancies across omnichain protocols.
             </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-semibold text-slate-700">LayerZero Relayers</span>
                   </div>
                   <span className="text-sm font-bold text-emerald-600">{health['LayerZero'] || 'Secure'}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-semibold text-slate-700">Wormhole Guardians</span>
                   </div>
                   <span className="text-sm font-bold text-emerald-600">{health['Wormhole'] || '19/19 Active'}</span>
                </div>
                 <div className="flex justify-between items-center px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-semibold text-slate-700">CCIP (Chainlink)</span>
                   </div>
                   <span className="text-sm font-bold text-emerald-600">{health['CCIP'] || 'Active'}</span>
                </div>
              </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('bridges')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'bridges' ? 'text-orange-600 border-b-2 border-orange-600 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Recent Cross-Chain Transfers
          </button>
          <button 
            onClick={() => setActiveTab('messaging')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'messaging' ? 'text-orange-600 border-b-2 border-orange-600 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Arbitrary Message Passing (AMP)
          </button>
        </div>

        {activeTab === 'bridges' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Tx ID / Explorer</th>
                  <th className="p-4 font-medium">Source → Destination</th>
                  <th className="p-4 font-medium">Asset & Amount</th>
                  <th className="p-4 font-medium">Bridge Protocol</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transfers.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="font-mono text-xs font-medium text-blue-600 hover:underline cursor-pointer">{tx.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                         {tx.sourceChain} <ArrowRight className="w-3 h-3 text-slate-400" /> {tx.destinationChain}
                      </div>
                    </td>
                    <td className="p-4">
                       <span className="font-bold text-slate-900">{tx.amount} </span>
                       <span className="text-slate-500 text-xs font-semibold">{tx.asset}</span>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-600">{tx.protocol}</td>
                    <td className="p-4">
                       <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : tx.status === 'Failed' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>
                          {tx.status}
                       </span>
                    </td>
                    <td className="p-4">
                      <button className="text-orange-600 hover:text-orange-800 font-semibold text-sm transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1">
                        Trace <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">Syncing with Bridge Liquidity Hub...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
