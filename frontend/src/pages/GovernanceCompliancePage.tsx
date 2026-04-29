import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, Activity, Zap, FileText, 
  Search, RefreshCcw, Database, Layers, 
  Network, Scale, Gavel, UserCheck, Eye,
  AlertCircle, CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

const ComplianceGauge = ({ label, value, color }: any) => (
  <div className="flex flex-col items-center gap-4 p-6 glass-omega rounded-3xl border border-white/10">
    <div className="relative w-24 h-24 flex items-center justify-center">
       <svg className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
          <motion.circle 
            cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="4" 
            strokeDasharray="251.2"
            animate={{ strokeDashoffset: 251.2 - (251.2 * value / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={color}
          />
       </svg>
       <span className="absolute text-xl font-black text-white tracking-tighter">{value}%</span>
    </div>
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{label}</span>
  </div>
);

const GovernanceCompliancePage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-8 h-8 text-emerald-500" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Ultimate <span className="text-emerald-500">Governance</span> & Compliance
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             Autonomous Regulatory Compliance & Interstellar Governance v4.0
          </p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Full Compliance: 99.8%</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ComplianceGauge label="Anti-Money Laundering" value={100} color="text-emerald-500" />
        <ComplianceGauge label="Know Your Customer" value={98} color="text-blue-500" />
        <ComplianceGauge label="Interstellar Trade Law" value={94} color="text-amber-500" />
        <ComplianceGauge label="Quantum Security Audit" value={100} color="text-cyan-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
               <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
                  <Gavel className="w-6 h-6 text-emerald-500" />
                  Active Governance Proposals
               </h2>
               <div className="space-y-4">
                  {[
                    { title: 'Update Mars-Base Liquidity Caps', status: 'Voting', support: 84.2, id: 'AEGIS_PROP_881' },
                    { title: 'Deploy Quantum Relay S4', status: 'Passed', support: 99.1, id: 'AEGIS_PROP_880' },
                    { title: 'Revise Neural Data Privacy Policy', status: 'Review', support: 0, id: 'AEGIS_PROP_879' }
                  ].map((prop, i) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group cursor-pointer">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{prop.id}</p>
                             <h3 className="text-sm font-black text-white uppercase italic tracking-tight">{prop.title}</h3>
                          </div>
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                            prop.status === 'Voting' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                            prop.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          )}>
                             {prop.status}
                          </span>
                       </div>
                       {prop.support > 0 && (
                         <div className="space-y-2">
                            <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                               <span>Community Support</span>
                               <span>{prop.support}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${prop.support}%` }}
                                 className="h-full bg-emerald-500"
                               />
                            </div>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
               <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
                  <Activity className="w-6 h-6 text-blue-500" />
                  Real-time Compliance Stream
               </h2>
               <div className="space-y-3">
                  {[
                    { msg: 'Transaction 0x88A2 verified against Earth-Law v4.2', type: 'Success' },
                    { msg: 'Neural data integrity check passed for User BRAIN_88', type: 'Success' },
                    { msg: 'Potential anomaly in Mars-Relay node 04 - Investigating', type: 'Warning' },
                    { msg: 'Asset rotation complete in Quantum Vault 01', type: 'Success' }
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                       {log.type === 'Success' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                       <p className="text-[10px] font-medium text-slate-400">{log.msg}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <ShieldCheck className="w-24 h-24 text-white" />
               </div>
               <h3 className="text-lg font-black text-white italic tracking-tighter mb-2">Automated Audit</h3>
               <p className="text-[10px] font-medium text-slate-500 leading-relaxed mb-8">
                  Initiate an app-wide compliance audit. This will scan all active neural sessions and quantum keys.
               </p>
               <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
                  Run Full Audit
               </button>
            </div>

            <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
               <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                  <Scale className="w-4 h-4 text-emerald-500" />
                  Jurisdiction Mapping
               </h3>
               <div className="space-y-4">
                  {[
                    { name: 'Earth Federation', active: true },
                    { name: 'Lunar Accord', active: true },
                    { name: 'Mars Colony 1', active: true },
                    { name: 'Deep Space Belt', active: false }
                  ].map((jur, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                       <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{jur.name}</span>
                       <div className={cn("w-2 h-2 rounded-full", jur.active ? 'bg-emerald-500' : 'bg-white/10')} />
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-blue-700 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <FileText className="w-16 h-16 text-white" />
               </div>
               <h3 className="text-sm font-black text-white italic mb-1">Reports Engine</h3>
               <p className="text-[10px] font-medium text-white/70 leading-relaxed mb-6">Generate inter-planetary compliance reports for regulatory review.</p>
               <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-white transition-all">Generate Report</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GovernanceCompliancePage;
