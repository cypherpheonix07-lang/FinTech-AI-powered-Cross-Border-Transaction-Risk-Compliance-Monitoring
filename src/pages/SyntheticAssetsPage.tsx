import React from 'react';
import { Layers, Activity, RefreshCw, BarChart3, Database, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const syntheticAssets = [
  { id: 'sSPY', name: 'Synth S&P 500', price: '$5,124.50', change: '+1.2%', trend: 'up', tvl: '$1.2B', collateral: 150 },
  { id: 'sGOLD', name: 'Synth Gold Ounce', price: '$2,310.20', change: '-0.4%', trend: 'down', tvl: '$840M', collateral: 160 },
  { id: 'sTSLA', name: 'Synth Tesla', price: '$176.40', change: '+2.8%', trend: 'up', tvl: '$320M', collateral: 145 },
  { id: 'iEUR', name: 'Inverse Euro', price: '$1.08', change: '-0.1%', trend: 'down', tvl: '$55M', collateral: 200 },
];

export default function SyntheticAssetsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700">
            Synthetic Assets & Derivatives
          </h1>
          <p className="text-slate-500 mt-2">Tokenized Exposure, Inverse Synths, & Collateralized Debt Positions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
            <Layers className="w-4 h-4" />
            Mint New Synth
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Total Collateral</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$4.82B</div>
          <p className="text-xs text-slate-500 mt-2">Locked across all smart contracts</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-teal-600" />
            <h3 className="font-semibold text-slate-700">Active Minters</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">24,592</div>
          <p className="text-xs text-slate-500 mt-2">Unique wallets participating</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">24h Synth Vol</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$840M</div>
          <p className="text-xs text-slate-500 mt-2">Aggregate trading volume</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Global C-Ratio</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">420%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Highly overcollateralized</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-slate-900">Top Synthetic Markets</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search synths..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Asset</th>
                <th className="p-4 font-medium">Oracle Price</th>
                <th className="p-4 font-medium">24h Change</th>
                <th className="p-4 font-medium">Total Value Locked</th>
                <th className="p-4 font-medium">Required C-Ratio</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {syntheticAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        {asset.id[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{asset.id}</div>
                        <div className="text-xs text-slate-500">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{asset.price}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 font-medium ${asset.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {asset.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {asset.change}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{asset.tvl}</td>
                  <td className="p-4 font-medium text-slate-700">{asset.collateral}%</td>
                  <td className="p-4">
                    <button className="px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors opacity-0 group-hover:opacity-100">
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
