import React from 'react';
import { Home, Lightbulb, Factory, ArrowRight, Layers, Activity, Hammer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const roiData = [
  { year: '2019', realEstate: 4.2, infrastructure: 5.1, energy: 6.8 },
  { year: '2020', realEstate: 2.1, infrastructure: 4.8, energy: 7.2 },
  { year: '2021', realEstate: 8.5, infrastructure: 6.2, energy: 9.5 },
  { year: '2022', realEstate: 11.2, infrastructure: 7.5, energy: 14.2 },
  { year: '2023', realEstate: 6.8, infrastructure: 8.1, energy: 11.5 },
  { year: 'YTD', realEstate: 3.4, infrastructure: 4.2, energy: 5.8 },
];

const opportunities = [
  { id: 'RE-LND-01', type: 'Commercial RE', name: 'London Prime Office Tower', yield: '5.8%', term: '7 Yrs', minIn: '$50k' },
  { id: 'IN-TLL-08', type: 'Infrastructure', name: 'EU Toll Road Network', yield: '7.2%', term: '15 Yrs', minIn: '$100k' },
  { id: 'EN-SOL-JP', type: 'Energy Grid', name: 'Tokyo Solar Farm Dev', yield: '9.4%', term: '10 Yrs', minIn: '$25k' },
  { id: 'RE-LOG-US', type: 'Industrial RE', name: 'US Fulfillment Centers', yield: '6.5%', term: '5 Yrs', minIn: '$50k' },
];

export default function RealAssetsInfrastructurePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-stone-600 to-stone-800">
            Real Assets & Infrastructure
          </h1>
          <p className="text-slate-500 mt-2">Fractional Real Estate, Public-Private Partnerships & Energy Tokenization</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition-colors shadow-md shadow-stone-500/20">
            <Layers className="w-4 h-4" />
            Explore Primary Offerings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div>
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
               <Home className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-800">Real Estate (RE)</h3>
             <p className="text-slate-500 text-sm mt-2">Tokenized prime commercial, residential, and industrial assets.</p>
           </div>
           <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
             <div className="text-2xl font-bold text-slate-900">$4.2B</div>
             <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Avg 6.2% Yield</div>
           </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div>
             <div className="w-12 h-12 bg-stone-50 text-stone-600 rounded-full flex items-center justify-center mb-4">
               <Factory className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-800">Core Infrastructure</h3>
             <p className="text-slate-500 text-sm mt-2">Toll roads, ports, data centers, and telecommunications.</p>
           </div>
           <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
             <div className="text-2xl font-bold text-slate-900">$8.1B</div>
             <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Avg 7.8% Yield</div>
           </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div>
             <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
               <Lightbulb className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-800">Energy & Transition</h3>
             <p className="text-slate-500 text-sm mt-2">Renewable developments, grid improvements, and transition metals.</p>
           </div>
           <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
             <div className="text-2xl font-bold text-slate-900">$2.9B</div>
             <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Avg 9.5% Yield</div>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-stone-600" />
              Historical Returns by Sector (Unlevered)
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiData}>
                  <defs>
                    <linearGradient id="colorRE" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInfra" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#78716c" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#78716c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="realEstate" name="Real Estate" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRE)" />
                  <Area type="monotone" dataKey="infrastructure" name="Infrastructure" stroke="#78716c" strokeWidth={2} fillOpacity={1} fill="url(#colorInfra)" />
                  <Area type="monotone" dataKey="energy" name="Energy Transition" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorEn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center text-center">
             <Hammer className="w-16 h-16 text-slate-200 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-slate-800">Build-to-Core Access</h3>
             <p className="text-slate-500 text-sm mt-2 mb-6 px-4">Co-invest alongside institutional sponsors in ground-up development and major value-add renovations before they become stabilized core assets.</p>
             <button className="px-5 py-3 bg-stone-50 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors">
               View Development Pipeline
             </button>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-slate-600" />
            Live Syndications & Offerings
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Asset Name</th>
                <th className="p-4 font-medium">Sector</th>
                <th className="p-4 font-medium">Target Cash Yield</th>
                <th className="p-4 font-medium">Hold Period</th>
                <th className="p-4 font-medium">Min Investment</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {opportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-bold text-slate-900">{opp.name}</td>
                  <td className="p-4">
                     <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                        {opp.type}
                     </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-600">{opp.yield}</td>
                  <td className="p-4 text-sm font-medium text-slate-600">{opp.term}</td>
                  <td className="p-4 text-sm font-semibold text-slate-800">{opp.minIn}</td>
                  <td className="p-4">
                    <button className="text-stone-500 hover:text-stone-900 font-medium text-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                      Details <ArrowRight className="w-3 h-3" />
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
