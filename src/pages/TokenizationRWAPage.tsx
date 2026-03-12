import React, { useState } from 'react';
import { Layers, Building, Link as LinkIcon, Activity, PlusCircle, Wallet, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const tvlData = [
  { month: 'Jan', realEstate: 1.2, art: 0.3, ip: 0.1, infra: 0.8 },
  { month: 'Feb', realEstate: 1.4, art: 0.35, ip: 0.15, infra: 0.9 },
  { month: 'Mar', realEstate: 1.8, art: 0.4, ip: 0.18, infra: 1.1 },
  { month: 'Apr', realEstate: 2.1, art: 0.5, ip: 0.25, infra: 1.3 },
  { month: 'May', realEstate: 2.5, art: 0.6, ip: 0.3, infra: 1.5 },
  { month: 'Jun', realEstate: 3.1, art: 0.7, ip: 0.35, infra: 1.8 },
];

const rwaAssets = [
  { id: 'TKN-NY-01', name: 'Manhattan Commercial Real Estate', category: 'Real Estate', apy: '6.5%', tvl: '$45.2M', status: 'Live' },
  { id: 'ART-PICASSO-X', name: 'Fractional Picasso "Le Rêve"', category: 'Fine Art', apy: '12.4% (Est)', tvl: '$12.5M', status: 'Live' },
  { id: 'IP-MUSIC-ROY', name: 'Universal Catalog Royalty Tokens', category: 'Intellectual Property', apy: '8.2%', tvl: '$8.4M', status: 'Live' },
  { id: 'INFRA-WIND-DE', name: 'German Offshore Wind Farm', category: 'Infrastructure', apy: '7.8%', tvl: '$112.5M', status: 'Funding' },
  { id: 'METAL-GOLD-1', name: 'Vaulted Physical Gold (Zurich)', category: 'Commodity', apy: '0.0%', tvl: '$250.0M', status: 'Live' }
];

export default function TokenizationRWAPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'portfolio' | 'tokenize'>('discover');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-fuchsia-600">
            Tokenization of Real-World Assets
          </h1>
          <p className="text-slate-500 mt-2">Fractional ownership, liquidity pooling, and asset programming</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-md shadow-violet-500/20">
            <PlusCircle className="w-4 h-4" />
            Tokenize an Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-violet-600" />
              <h3 className="font-semibold text-slate-700">Total RWA TVL</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 relative z-10">$428.6M</div>
          <p className="text-xs text-emerald-600 font-medium mt-2 relative z-10">+12% vs last month</p>
          <div className="absolute -right-4 -bottom-4 bg-violet-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
        </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-700">Real Estate TVL</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 relative z-10">$215.4M</div>
          <p className="text-xs text-slate-500 mt-2 relative z-10">45 Active Properties</p>
          <div className="absolute -right-4 -bottom-4 bg-emerald-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-slate-700">On-Chain Holders</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 relative z-10">14,204</div>
          <p className="text-xs text-slate-500 mt-2 relative z-10">Unique Wallets</p>
          <div className="absolute -right-4 -bottom-4 bg-amber-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-slate-700">Daily Secondary Vol</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 relative z-10">$5.2M</div>
           <p className="text-xs text-emerald-600 font-medium mt-2 relative z-10">+4.5% (24h)</p>
          <div className="absolute -right-4 -bottom-4 bg-indigo-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-600" />
              RWA TVL Growth by Sector ($B)
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tvlData}>
                  <defs>
                     <linearGradient id="colorRe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInfra" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="realEstate" stackId="1" stroke="#8b5cf6" fill="url(#colorRe)" name="Real Estate" />
                  <Area type="monotone" dataKey="infra" stackId="1" stroke="#10b981" fill="url(#colorInfra)" name="Infrastructure" />
                  <Area type="monotone" dataKey="art" stackId="1" stroke="#f59e0b" fill="#fcd34d" name="Fine Art" />
                  <Area type="monotone" dataKey="ip" stackId="1" stroke="#3b82f6" fill="#93c5fd" name="Intellectual Property" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mb-6">
               <Wallet className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">My RWA Holdings</h3>
            <p className="text-slate-500 text-sm mb-6">Connect your decentralized wallet (MetaMask, Core, Phantom) to view and trade your tokenized real-world assets.</p>
            <button className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-fuchsia-500/20">
               Connect Web3 Wallet
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
               <span>Supports ERC-3643</span>
               <span className="w-1 h-1 rounded-full bg-slate-300"></span>
               <span>ERC-1155</span>
               <span className="w-1 h-1 rounded-full bg-slate-300"></span>
               <span>Polymath</span>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'discover' ? 'text-violet-700 border-b-2 border-violet-700 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Secondary Market Offerings
          </button>
          <button 
            onClick={() => setActiveTab('tokenize')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'tokenize' ? 'text-violet-700 border-b-2 border-violet-700 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Tokenization Engine
          </button>
        </div>

        {activeTab === 'discover' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Asset Name</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Historical APY</th>
                  <th className="p-4 font-medium">Total Volume Locked</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Trade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rwaAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{asset.name}</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">{asset.id}</div>
                    </td>
                    <td className="p-4">
                       <span className="inline-flex items-center px-2.5 py-1 rounded border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
                         {asset.category}
                       </span>
                    </td>
                    <td className="p-4 font-bold text-emerald-600">{asset.apy}</td>
                    <td className="p-4 text-sm font-semibold text-slate-800">{asset.tvl}</td>
                    <td className="p-4">
                       <span className={`text-xs font-bold uppercase tracking-wider ${asset.status === 'Live' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                          {asset.status}
                       </span>
                    </td>
                    <td className="p-4">
                      <button className="text-violet-600 hover:text-violet-800 font-semibold text-sm transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1">
                        Swap <ArrowRight className="w-3 h-3" />
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
