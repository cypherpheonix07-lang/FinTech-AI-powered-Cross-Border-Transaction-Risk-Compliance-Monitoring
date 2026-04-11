import React, { useState } from 'react';
import { Briefcase, Building, Key, LineChart, FileText, ArrowUpRight, Search, Handshake } from 'lucide-react';

const privateAssets = [
  { id: 'PE-TECH-X', name: 'Tech Growth Fund X', type: 'Private Equity', irr: '22.4%', vintage: '2022', status: 'Raising', minTkt: '$250k' },
  { id: 'VC-SEED-IV', name: 'Web3 Infra Seed IV', type: 'Venture Capital', irr: 'N/A', vintage: '2024', status: 'Deploying', minTkt: '$50k' },
  { id: 'SEC-STRP-A', name: 'Stripe Series E (Sec)', type: 'Secondary', irr: '18.1%', vintage: '2021', status: 'Closed', minTkt: '$100k' },
  { id: 'PD-LND-III', name: 'Direct Lending Fund III', type: 'Private Debt', irr: '9.8%', vintage: '2023', status: 'Distributing', minTkt: '$500k' },
];

export default function PrivateMarketsPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'portfolio' | 'secondary'>('discover');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-800">
            Private Markets & Alternative Assets
          </h1>
          <p className="text-slate-500 mt-2">Private Equity, Venture Capital, & Tokenized Secondary Markets</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors shadow-md shadow-indigo-900/20">
            <Handshake className="w-4 h-4" />
            Access Data Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5 text-indigo-700" />
            <h3 className="font-semibold text-slate-700">Total Commitments</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$120M</div>
          <p className="text-xs text-slate-500 mt-2">Across 8 active funds</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <LineChart className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Net IRR</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">18.4%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Top quartile performance</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Called Capital</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$84.2M</div>
          <p className="text-xs text-slate-500 mt-2">70.1% of total commitments</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Key className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Distributions</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$32.5M</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">DPI: 0.38x</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'discover' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Discover Opportunities
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'portfolio' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-slate-500 hover:text-slate-900'}`}
          >
            My Porfolio
          </button>
          <button 
            onClick={() => setActiveTab('secondary')}
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'secondary' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Secondary Market
          </button>
        </div>

        {activeTab === 'discover' && (
           <div className="p-0">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div className="relative w-full max-w-md">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input 
                     type="text" 
                     placeholder="Search funds, GPs, or strategies..." 
                     className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                   <FileText className="w-4 h-4" />
                   Review KYC Profile
                </button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-slate-200 text-slate-500 text-sm">
                     <th className="p-4 font-medium">Fund / Asset</th>
                     <th className="p-4 font-medium">Strategy</th>
                     <th className="p-4 font-medium">Vintage</th>
                     <th className="p-4 font-medium">Target IRR</th>
                     <th className="p-4 font-medium">Min Ticket</th>
                     <th className="p-4 font-medium">Status</th>
                     <th className="p-4 font-medium">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {privateAssets.map((asset) => (
                     <tr key={asset.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="p-4">
                         <div className="font-bold text-slate-900 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                           {asset.name}
                         </div>
                         <div className="text-xs text-slate-500 mt-1">{asset.id}</div>
                       </td>
                       <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                             {asset.type}
                          </span>
                       </td>
                       <td className="p-4 text-sm text-slate-600 font-medium">{asset.vintage}</td>
                       <td className="p-4 font-bold text-emerald-700">{asset.irr}</td>
                       <td className="p-4 text-sm font-semibold text-slate-700">{asset.minTkt}</td>
                       <td className="p-4">
                          <span className={`text-xs font-bold uppercase tracking-wider ${asset.status === 'Raising' ? 'text-indigo-600' : asset.status === 'Closed' ? 'text-slate-400' : 'text-emerald-600'}`}>
                             {asset.status}
                          </span>
                       </td>
                       <td className="p-4">
                         <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                           View Teaser <ArrowUpRight className="w-3 h-3" />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'discover' && (
           <div className="p-16 text-center text-slate-500">
              <Building className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Accessing Confidential Data Room</h3>
              <p className="max-w-md mx-auto">Please sign the required Non-Disclosure Agreement (NDA) to view active portfolio metrics and secondary order books.</p>
              <button className="mt-6 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                 Sign NDA
              </button>
           </div>
        )}
      </div>

    </div>
  );
}
