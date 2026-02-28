import React, { useState } from 'react';
import { FileDown, ShieldCheck, Mail, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

/**
 * SARForm.jsx
 * Subject Access Request form for GDPR compliance.
 */
const SARForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-dark-800 border-2 border-green-500/20 rounded-[2.5rem] p-12 shadow-3xl text-center space-y-6 animate-in zoom-in duration-500">
         <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
            <CheckCircle2 size={48} />
         </div>
         <h3 className="text-2xl font-black text-slate-100 italic tracking-tighter uppercase">Request Registered</h3>
         <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            Subject Access Request (SAR_ID: {Math.floor(Math.random()*10000)}) has been added to the Compliance Pipeline. Data package will be dispatched within 48h.
         </p>
         <button onClick={() => setSubmitted(false)} className="text-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-widest pt-4">
            File Another Request
         </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-800 border-2 border-dark-600 rounded-[2.5rem] p-10 shadow-3xl max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center space-x-4 mb-8">
         <div className="bg-primary/20 p-4 rounded-2xl text-primary">
            <FileDown size={32} />
         </div>
         <div>
            <h3 className="text-xl font-black text-slate-100 italic tracking-tighter uppercase">Subject Access Request</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Exercise Rights Under GDPR Article 15</p>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Identifier (Account ID)</label>
            <input 
              type="text" 
              required
              placeholder="e.g., ACC_4901_22X"
              className="w-full bg-dark-900 border-2 border-dark-700 text-xs text-slate-200 p-4 rounded-2xl focus:border-primary outline-none transition-all"
            />
         </div>

         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registered Verification Email</label>
            <div className="relative">
               <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
               <input 
                 type="email" 
                 required
                 placeholder="investigator@bank.com"
                 className="w-full bg-dark-900 border-2 border-dark-700 text-xs text-slate-200 pl-12 pr-4 py-4 rounded-2xl focus:border-primary outline-none transition-all"
               />
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Request Scope</label>
               <select className="w-full bg-dark-900 border-2 border-dark-700 text-xs text-slate-200 p-4 rounded-2xl focus:border-primary outline-none">
                  <option>Full Trace History</option>
                  <option>Risk Metadata Only</option>
                  <option>KYC Enrichment Data</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Processing Priority</label>
               <div className="flex bg-dark-900 p-1 rounded-2xl border-2 border-dark-700 h-[52px]">
                  {['Standard', 'Urgent'].map(p => (
                    <button key={p} type="button" className={`flex-1 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all ${p === 'Standard' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                       {p}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex items-start space-x-3 mt-4">
            <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
               Submitting this request will trigger a manual audit review. Misleading or fraudulent requests may result in temporary account suspension under local financial regulations.
            </p>
         </div>

         <button type="submit" className="w-full bg-primary py-5 rounded-3xl text-xs font-black text-white shadow-2xl shadow-primary/30 hover:bg-primary-hover transition-all uppercase tracking-widest flex items-center justify-center">
            Initialize Privacy Retrieval
         </button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-6">
         <div className="flex items-center text-[10px] font-bold text-slate-600">
            <Clock size={12} className="mr-1.5" /> Avg. SLA: 4.2h
         </div>
         <div className="flex items-center text-[10px] font-bold text-slate-600">
            <ShieldCheck size={12} className="mr-1.5" /> Zero-Knowledge Proof Active
         </div>
      </div>
    </div>
  );
};

export default SARForm;
