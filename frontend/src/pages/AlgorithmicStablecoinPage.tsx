import React, { useState } from 'react';
import { Settings, BarChart2, Activity, ShieldAlert, RefreshCcw, ArrowRight, DollarSign, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const pegData = [
  { time: '00:00', price: 1.0001, volume: 120 },
  { time: '04:00', price: 0.9998, volume: 150 },
  { time: '08:00', price: 0.9992, volume: 320 },
  { time: '12:00', price: 0.9985, volume: 850 }, // De-peg event
  { time: '13:00', price: 1.0015, volume: 1200 }, // AMO intervention
  { time: '16:00', price: 1.0003, volume: 450 },
  { time: '20:00', price: 1.0000, volume: 210 },
];

const amoOperations = [
  { id: 'AMO-FXS-1', strategy: 'Fractional Reserve (FXS)', action: 'Minting', collateralRatio: '85.2%', status: 'Active' },
  { id: 'AMO-CRV-2', strategy: 'Curve 3Pool Metapool', action: 'Adding Liquidity', collateralRatio: '100%', status: 'Active' },
  { id: 'AMO-LEND-1', strategy: 'Aave Lending', action: 'Supplying USDC', collateralRatio: '100%', status: 'Paused' },
  { id: 'AMO-PEG-1', strategy: 'Peg Stability Module (PSM)', action: 'Arbitrage Buyback', collateralRatio: 'N/A', status: 'Intervening' },
];

export default function AlgorithmicStablecoinPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'amo' | 'governance'>('overview');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-blue-800">
            Algorithmic Stablecoin Management
          </h1>
          <p className="text-slate-500 mt-2">Peg Stability Modules (PSM), Algorithmic Market Operations (AMO), and Seigniorage</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors shadow-md shadow-cyan-500/20">
            <Cpu className="w-4 h-4" />
            Deploy Custom AMO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-slate-700">Current Peg</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$1.0000</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Target maintained</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Collateral Ratio (CR)</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">85.2%</div>
          <p className="text-xs text-slate-500 mt-2">Target CR: 85.0%</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Circulating Supply</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">4.2B</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">+250M (24h issuance)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-slate-700">Protocol Owned Liq (POL)</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$1.8B</div>
          <p className="text-xs text-slate-500 mt-2">Generating $2.4M daily yield</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-600" />
              Peg Stability Monitor (Intraday)
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pegData}>
                  <defs>
                     <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis domain={[0.995, 1.005]} axisLine={false} tickLine={false} tick={{fill: '#0891b2'}} tickFormatter={(val) => `$${val.toFixed(3)}`} />
                  {/* Reference line for $1.00 Peg */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} stroke="#ef4444" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#0891b2" strokeWidth={3} fill="url(#colorPrice)" name="USD Price" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100">
               <RefreshCcw className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Automated Mint/Redeem</h3>
            <p className="text-slate-500 text-sm mb-6 px-4">
              The protocol dynamically adjusts supply based on the PID controller. Users can mint new stablecoins by locking approved collateral and governance tokens.
            </p>
            <div className="flex gap-4 w-full">
               <button className="flex-1 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200">
                 Mint (Issue)
               </button>
               <button className="flex-1 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                 Redeem
               </button>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'overview' ? 'text-cyan-700 border-b-2 border-cyan-700 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Algorithmic Market Operations (AMOs)
          </button>
          <button 
            onClick={() => setActiveTab('governance')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'governance' ? 'text-cyan-700 border-b-2 border-cyan-700 bg-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Monetary Policy & Governance
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Controller ID</th>
                  <th className="p-4 font-medium">Strategy Type</th>
                  <th className="p-4 font-medium">Current Action</th>
                  <th className="p-4 font-medium">Effective CR</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {amoOperations.map((operation) => (
                  <tr key={operation.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="font-mono text-xs text-slate-500">{operation.id}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{operation.strategy}</td>
                    <td className="p-4 text-sm font-medium text-slate-600">{operation.action}</td>
                    <td className="p-4 font-bold text-slate-800">{operation.collateralRatio}</td>
                    <td className="p-4">
                       <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${operation.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : operation.status === 'Intervening' ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                          {operation.status}
                       </span>
                    </td>
                    <td className="p-4">
                      <button className="text-cyan-600 hover:text-cyan-800 font-semibold text-sm transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1">
                        Configure <ArrowRight className="w-3 h-3" />
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
