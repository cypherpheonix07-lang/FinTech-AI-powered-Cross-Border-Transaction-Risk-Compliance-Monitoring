import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, Save, History } from 'lucide-react';

/**
 * ConsentAdmin.jsx
 * Dashboard for managing institutional and user data privacy consents.
 */
const ConsentAdmin = () => {
  const [consents, setConsents] = useState([
    { id: 'C1', scope: 'TRACING', status: 'ACTIVE', last_updated: '2026-02-10' },
    { id: 'C2', scope: 'ML_TRAINING', status: 'REVOKED', last_updated: '2026-02-12' },
    { id: 'C3', scope: 'THIRD_PARTY_SHARING', status: 'ACTIVE', last_updated: '2026-02-15' }
  ]);

  return (
    <div className="flex flex-col h-full space-y-8 py-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-slate-100 flex items-center italic tracking-tighter uppercase leading-none">
             <Shield className="text-primary mr-3" size={32} />
             Consent Governance Center
           </h1>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Manage Transparency & Data Processing Rights</p>
        </div>
        <button className="bg-primary px-8 py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
           Review All Policies
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1">
         <div className="col-span-8 bg-dark-800 border-2 border-dark-600 rounded-[3rem] p-10 shadow-3xl flex flex-col">
            <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest mb-8 flex items-center">
               <History size={16} className="text-primary mr-2" /> Active Consent Surface
            </h3>
            
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
               {consents.map(c => (
                 <div key={c.id} className="bg-dark-900 border border-dark-700 p-6 rounded-3xl flex items-center justify-between group hover:border-primary/40 transition-all">
                    <div className="flex items-center space-x-6">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-risk-high/10 text-risk-high'}`}>
                          {c.status === 'ACTIVE' ? <Lock size={24} /> : <AlertTriangle size={24} />}
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-100">{c.scope}</h4>
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-0.5">Last Audited: {c.last_updated} • Trace ID: {c.id}</p>
                       </div>
                    </div>
                    <div className="flex items-center space-x-4">
                       <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${c.status === 'ACTIVE' ? 'bg-risk-high/10 text-risk-high hover:bg-risk-high/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}>
                          {c.status === 'ACTIVE' ? 'Revoke' : 'Grant'}
                       </button>
                       <button className="p-2 text-slate-600 hover:text-primary transition-colors">
                          <Eye size={18} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="col-span-4 bg-dark-800 border-2 border-dark-600 rounded-[2.5rem] p-8 shadow-2xl space-y-8 flex flex-col">
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4">
               <h4 className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center">
                  <Save size={14} className="mr-2" /> Global Privacy Override
               </h4>
               <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
                  Applying changes here will broadcast immutable consent updates to all downstream ML processors.
               </p>
               <button className="w-full bg-primary py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:scale-[1.02] transition-all">
                  Sync Governance Ledger
               </button>
            </div>

            <div className="flex-1 flex flex-col justify-center text-center space-y-4 px-4">
               <Lock size={48} className="text-slate-700 mx-auto opacity-40" />
               <h4 className="text-xs font-black text-slate-100 uppercase italic">GDPR Article 17/21 Active</h4>
               <p className="text-[10px] text-slate-500 font-medium">
                  Right to erasure and right to object are natively enforced in the Core Path engine.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ConsentAdmin;
