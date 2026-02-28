import React, { useState } from 'react';
import { 
  Database, ShieldCheck, Search, 
  ChevronRight, Lock, ExternalLink, Filter 
} from 'lucide-react';

/**
 * DataCatalog.jsx
 * Enterprise schema governance and metadata search.
 */
const DataCatalog = () => {
  const [activeDataset, setActiveDataset] = useState('payments_v1');

  const datasets = [
    { id: 'payments_v1', name: 'Global Payment Streams', size: '1.4 TB', owner: 'Core_Payments' },
    { id: 'risk_scores_v1', name: 'Risk Inference Logs', size: '420 GB', owner: 'Intelligence_Ops' },
    { id: 'sanctions_cache', name: 'External Sanctions Mirror', size: '12 GB', owner: 'Compliance' }
  ];

  return (
    <div className="flex flex-col h-full space-y-8 py-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-slate-100 flex items-center italic tracking-tighter uppercase">
             <Database className="text-primary mr-3" size={32} />
             Platform Schema Registry
           </h1>
           <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">Data Sovereignty & Governance Catalog</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="bg-dark-800 border-2 border-dark-600 px-6 py-3 rounded-2xl flex items-center shadow-xl">
              <Search size={14} className="text-slate-500 mr-3" />
              <input type="text" placeholder="Search datasets or fields..." className="bg-transparent border-none text-[10px] text-slate-100 focus:ring-0 w-48" />
           </div>
           <button className="bg-dark-800 border-2 border-dark-600 p-3 rounded-2xl text-slate-400 hover:text-white transition-all">
              <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
         {/* Catalog Navigator */}
         <div className="col-span-4 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {datasets.map(d => (
              <button 
                key={d.id}
                onClick={() => setActiveDataset(d.id)}
                className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${activeDataset === d.id ? 'bg-primary/5 border-primary shadow-lg shadow-primary/5' : 'bg-dark-800 border-dark-600 hover:border-dark-400'}`}
              >
                 <div className="flex items-center space-x-4">
                    <div className={`${activeDataset === d.id ? 'bg-primary text-white' : 'bg-dark-900 text-slate-500'} p-4 rounded-2xl transition-all`}>
                       <Database size={20} />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-100">{d.name}</h4>
                       <span className="text-[10px] font-bold text-slate-500 uppercase">{d.size} • {d.owner}</span>
                    </div>
                 </div>
                 <ChevronRight size={14} className={`${activeDataset === d.id ? 'text-primary' : 'text-slate-700'} group-hover:translate-x-1 transition-transform`} />
              </button>
            ))}
         </div>

         {/* Field Explorer */}
         <div className="col-span-8 bg-dark-800 border-2 border-dark-600 rounded-[2.5rem] overflow-hidden shadow-3xl flex flex-col">
            <div className="p-8 border-b border-dark-600 bg-dark-900/40 flex justify-between items-center">
               <div>
                  <h3 className="text-lg font-bold text-slate-100">{activeDataset}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                     <span className="text-[10px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase">Verified Source</span>
                     <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded uppercase flex items-center">
                        <Lock size={10} className="mr-1" /> Retention: 7y
                     </span>
                  </div>
               </div>
               <button className="text-primary hover:text-primary-hover flex items-center text-xs font-bold">
                  Edit Metadata <ExternalLink size={14} className="ml-2" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
               <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-dark-700">
                       <th className="pb-6">Field Component</th>
                       <th className="pb-6">Type</th>
                       <th className="pb-6 text-center">Privacy</th>
                       <th className="pb-6">Governance Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700/30">
                     {[
                       { name: 'origin_node_id', type: 'UUID', pii: false, desc: 'Primary key of the sending institución in the graph.' },
                       { name: 'beneficiary_alias', type: 'STRING', pii: true, desc: 'Optional customer-defined alias for the destination.' },
                       { name: 'tx_amount_base', type: 'DECIMAL', pii: false, desc: 'Transaction value normalized to the institution base currency.' }
                     ].map((f, i) => (
                       <tr key={i} className="group hover:bg-dark-900/40 transition-colors">
                          <td className="py-5 font-mono text-xs text-primary font-bold">{f.name}</td>
                          <td className="py-5 text-[10px] font-black text-slate-500">{f.type}</td>
                          <td className="py-5">
                             <div className="flex justify-center">
                                {f.pii ? (
                                  <span className="text-risk-high bg-risk-high/10 px-2 py-0.5 rounded text-[9px] font-black shadow-inner shadow-risk-high/5">PII</span>
                                ) : (
                                  <ShieldCheck size={14} className="text-slate-700" />
                                )}
                             </div>
                          </td>
                          <td className="py-5 text-xs text-slate-400 max-w-xs">{f.desc}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DataCatalog;
