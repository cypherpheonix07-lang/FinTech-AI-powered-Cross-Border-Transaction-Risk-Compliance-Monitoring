import React, { useState } from 'react';
import { 
  Users, Search, ShieldCheck, Globe, 
  Share2, ArrowUpRight, MessageSquare, Lock 
} from 'lucide-react';

/**
 * ForensicsPortal.jsx
 * Federated investigation hub for cross-tenant pattern discovery.
 */
const ForensicsPortal = () => {
  const [activeTab, setActiveTab] = useState('global');

  const federatedAlerts = [
    { tenant: 'Bank_Alpha', pattern: 'MENA_MULE_RING', match: 0.94, status: 'Consented' },
    { tenant: 'Pacific_Trust', pattern: 'CRYPTO_BRIDGE_SYPHON', match: 0.82, status: 'Consented' },
    { tenant: 'Nordic_AML', pattern: 'STRUCTURED_STRUCTURING', match: 0.75, status: 'Consented' }
  ];

  return (
    <div className="flex flex-col h-full space-y-8 py-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-slate-100 flex items-center italic tracking-tighter uppercase leading-none">
             <Users className="text-primary mr-3" size={32} />
             Federated Forensics Portal
           </h1>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Cross-Institutional Pattern Synthesis & Cooperative Search</p>
        </div>
        <div className="flex items-center space-x-3 bg-primary/5 border border-primary/20 px-6 py-3 rounded-2xl">
           <Lock size={14} className="text-primary" />
           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Co-Op Mode Active</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">
         {/* Global Match Feed */}
         <div className="col-span-8 flex flex-col space-y-6">
            <div className="bg-dark-800 border-2 border-dark-600 rounded-[3rem] p-10 shadow-3xl flex-1 flex flex-col overflow-hidden">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest flex items-center">
                     <Search size={16} className="text-primary mr-2" /> Global Pattern Match Feed
                  </h3>
                  <div className="flex space-x-6">
                     {['global', 'consecutive', 'watchlisted'].map(tab => (
                       <button 
                         key={tab} 
                         onClick={() => setActiveTab(tab)}
                         className={`text-[10px] font-black uppercase tracking-wider pb-1 border-b-2 transition-all ${activeTab === tab ? 'text-primary border-primary' : 'text-slate-600 border-transparent hover:text-slate-400'}`}
                       >
                         {tab}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {federatedAlerts.map((alert, i) => (
                    <div key={i} className="bg-dark-900/50 border border-dark-700 p-6 rounded-3xl flex items-center justify-between group hover:border-primary/40 transition-all cursor-pointer">
                       <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 rounded-2xl bg-dark-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                             <Globe size={24} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-slate-100">{alert.pattern}</h4>
                             <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-0.5">Contributor: {alert.tenant} • Status: {alert.status}</p>
                          </div>
                       </div>
                       <div className="text-right flex items-center space-x-6">
                          <div>
                             <p className="text-[10px] font-black text-slate-500 uppercase">Pattern Match</p>
                             <p className="text-2xl font-black text-primary">{(alert.match * 100).toFixed(0)}%</p>
                          </div>
                          <ArrowUpRight size={20} className="text-slate-700 group-hover:text-primary transition-colors" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Collaboration & Privacy Panel */}
         <div className="col-span-4 space-y-8 flex flex-col h-full">
            <div className="bg-dark-800 border-2 border-dark-600 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
               <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest flex items-center">
                  <Share2 size={16} className="text-primary mr-2" /> Federation Controls
               </h3>
               <div className="p-6 bg-dark-900/50 border border-dark-700 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                     <span>Cooperative Sharing</span>
                     <div className="w-10 h-5 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-lg" />
                     </div>
                  </div>
                  <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
                     Opt-in to share anonymized graph topologies for cross-banking risk identification. Your PII is never exposed.
                  </p>
               </div>
               <button className="w-full bg-dark-900 border-2 border-dark-700 py-4 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all flex items-center justify-center">
                  <MessageSquare size={14} className="mr-2" /> Forensic Peer Chat
               </button>
            </div>

            <div className="bg-primary/5 border-2 border-primary/20 rounded-[2.5rem] p-8 flex-1 flex flex-col justify-center text-center space-y-4">
               <ShieldCheck size={48} className="text-primary mx-auto opacity-40" />
               <h4 className="text-sm font-black text-slate-100 uppercase italic italic">Privacy First Governance</h4>
               <p className="text-[10px] text-slate-500 font-medium px-4">All cross-tenant queries use Differential Privacy to ensure single records cannot be re-identified.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ForensicsPortal;
