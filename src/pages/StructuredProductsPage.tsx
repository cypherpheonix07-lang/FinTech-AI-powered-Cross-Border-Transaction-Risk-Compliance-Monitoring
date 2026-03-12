import React from 'react';
import { Network, Zap, Settings2, BarChart2, Briefcase, PlusCircle, ArrowRight } from 'lucide-react';

const products = [
  { name: 'Principal Protected Note (BTC)', apy: '4.5% - 12.0%', risk: 'Low', term: '6 Months', type: 'Yield Enhancement' },
  { name: 'ETH Dual Investment', apy: '18.2%', risk: 'Medium', term: '30 Days', type: 'Options-Based' },
  { name: 'DeFi Bluechip Index', apy: '8.4%', risk: 'Medium', term: 'Open', type: 'Index Vault' },
  { name: 'Leveraged Staking (stETH)', apy: '11.5%', risk: 'High', term: 'Open', type: 'Recursive Borrowing' }
];

export default function StructuredProductsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
            Structured Products & Engineering
          </h1>
          <p className="text-slate-500 mt-2">Automated Yield Generation, Options Vaults, & Custom Product Synthesizer</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md shadow-orange-500/20">
            <PlusCircle className="w-4 h-4" />
            Build Custom Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Zap, label: 'Active Vaults', val: '42' },
          { icon: Database, label: 'Total Value Structured', val: '$1.4B' },
          { icon: BarChart2, label: 'Average Vault APY', val: '14.2%' },
          { icon: Briefcase, label: 'My Subscriptions', val: '3' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <stat.icon className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-x64 bg-gradient-to-br from-orange-50 to-transparent rounded-bl-full opacity-50 z-0"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">The PathGuard Synthesizer</h2>
            <p className="text-slate-600 leading-relaxed">
              Design bespoke financial instruments by combining underlying assets, derivatives, and algorithmic execution logic. Create products tailored exactly to your risk-return profile.
            </p>
            <div className="flex gap-4 pt-2">
               <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
                 <Settings2 className="w-4 h-4" /> Start Visual Builder
               </button>
               <button className="flex items-center gap-2 px-5 py-3 text-slate-600 font-medium rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors">
                 Use AI Assistant
               </button>
            </div>
          </div>
          <div className="w-full lg:w-1/3 aspect-square max-w-sm rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-xl flex items-center justify-center border border-slate-700">
             <Network className="w-24 h-24 text-orange-400 opacity-80" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 px-1">Curated Vaults</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded-md mb-2 inline-block">{p.type}</span>
                    <h4 className="text-lg font-bold text-slate-900">{p.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 font-medium">Est. APY</div>
                    <div className="text-2xl font-bold text-emerald-600">{p.apy}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-100">
                   <div>
                     <div className="text-xs text-slate-500 font-medium">Risk Level</div>
                     <div className={`text-sm font-semibold mt-1 ${p.risk === 'High' ? 'text-rose-600' : p.risk === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>{p.risk}</div>
                   </div>
                   <div>
                     <div className="text-xs text-slate-500 font-medium">Lockup Term</div>
                     <div className="text-sm font-semibold text-slate-700 mt-1">{p.term}</div>
                   </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                Deposit into Vault <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Missing icon definition
function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}
