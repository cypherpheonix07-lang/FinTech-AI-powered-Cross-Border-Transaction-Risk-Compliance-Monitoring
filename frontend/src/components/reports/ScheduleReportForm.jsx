import React, { useState } from 'react';
import { Clock, Mail, AlertTriangle, Send, Save } from 'lucide-react';

/**
 * ScheduleReportForm.jsx
 * Configures automated delivery of forensic and executive audits.
 */
const ScheduleReportForm = () => {
  const [schedule, setSchedule] = useState({
    frequency: 'weekly',
    recipients: '',
    format: 'PDF',
    scopes: ['Risk_Summary', 'Tenant_Health']
  });

  return (
    <div className="bg-dark-800 border-2 border-dark-600 rounded-[2.5rem] p-10 shadow-3xl max-w-2xl mx-auto animate-in zoom-in duration-500">
      <div className="flex items-center space-x-4 mb-10">
         <div className="bg-primary/20 p-4 rounded-2xl text-primary">
            <Clock size={32} />
         </div>
         <div>
            <h3 className="text-xl font-black text-slate-100 italic tracking-tighter uppercase">Automated Briefing Scheduler</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Configure immutable snapshot delivery protocols.</p>
         </div>
      </div>

      <div className="space-y-8">
         <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Frequency</label>
               <select 
                 className="w-full bg-dark-900 border-2 border-dark-700 text-xs text-slate-200 p-4 rounded-2xl focus:border-primary transition-all outline-none"
                 value={schedule.frequency}
                 onChange={(e) => setSchedule({...schedule, frequency: e.target.value})}
               >
                  <option value="daily">Daily Recap</option>
                  <option value="weekly">Weekly Forensic Audit</option>
                  <option value="monthly">Monthly Executive Summary</option>
               </select>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Output Format</label>
               <div className="flex bg-dark-900 p-1 rounded-2xl border-2 border-dark-700">
                  {['PDF', 'EXCEL', 'JSON'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setSchedule({...schedule, format: f})}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${schedule.format === f ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {f}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-center block">Audit Recipients</label>
            <div className="relative">
               <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
               <input 
                 type="text" 
                 placeholder="admin@institution.com, compliance-team@external.org"
                 className="w-full bg-dark-900 border-2 border-dark-700 text-xs text-slate-200 pl-12 pr-4 py-4 rounded-2xl focus:border-primary outline-none"
               />
            </div>
         </div>

         <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center">
               <AlertTriangle size={14} className="mr-2" /> Compliance Scope Verification
            </h4>
            <div className="flex flex-wrap gap-3">
               {['Risk Topology', 'Audit Ledger', 'GNN Latency', 'Sanction Hits'].map(tag => (
                 <button key={tag} className="bg-dark-900 border border-dark-600 px-4 py-2 rounded-xl text-[9px] font-bold text-slate-400 hover:border-primary transition-all">
                    {tag}
                 </button>
               ))}
            </div>
         </div>

         <div className="flex space-x-4 pt-4">
            <button className="flex-1 bg-dark-900 border-2 border-dark-700 py-5 rounded-3xl text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest flex items-center justify-center">
               <Send size={16} className="mr-2" /> Test Delivery
            </button>
            <button className="flex-1 bg-primary py-5 rounded-3xl text-xs font-black text-white shadow-2xl shadow-primary/30 hover:bg-primary-hover transition-all uppercase tracking-widest flex items-center justify-center">
               <Save size={16} className="mr-2" /> Save Protocol
            </button>
         </div>
      </div>
    </div>
  );
};

export default ScheduleReportForm;
