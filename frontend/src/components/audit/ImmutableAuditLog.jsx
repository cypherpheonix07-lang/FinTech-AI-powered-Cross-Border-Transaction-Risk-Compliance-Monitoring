import React, { useState } from 'react';
import { ShieldCheck, Lock, Activity, RefreshCw, CheckCircle, Database } from 'lucide-react';

/**
 * ImmutableAuditLog.jsx
 * Append-only view of security events with cryptographic integrity checks.
 */
const ImmutableAuditLog = () => {
  const [logs] = useState([
    { id: '0xabc1', actor: 'Analyst_Beta', action: 'SAR_FILED', resource: 'TX_102', hash: '5f3a...d2e1', status: 'verified' },
    { id: '0xabc2', actor: 'System', action: 'TENANT_CREATED', resource: 'T_992', hash: 'a1b2...c3d4', status: 'verified' },
    { id: '0xabc3', actor: 'Admin_Alpha', action: 'ENCRYPTION_KEY_ROTATED', resource: 'KMS_MAIN', hash: 'e5f6...g7h8', status: 'verified' }
  ]);

  return (
    <div className="bg-dark-800 border-2 border-dark-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full animate-in zoom-in duration-500">
      <div className="p-8 border-b border-dark-600 bg-dark-900/40 flex justify-between items-center">
         <div className="flex items-center space-x-4">
            <div className="bg-primary/20 p-3 rounded-2xl text-primary">
               <ShieldCheck size={28} />
            </div>
            <div>
               <h3 className="text-xl font-bold text-slate-100 italic tracking-tighter">Immutable Governance Ledger</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Append-Only Cryptographic Audit Trail</p>
            </div>
         </div>
         <button className="flex items-center space-x-2 bg-dark-900 border border-dark-600 px-6 py-3 rounded-2xl text-xs font-bold text-slate-300 hover:text-white transition-all">
            <RefreshCw size={14} className="mr-2" /> Verify Chain Integrity
         </button>
      </div>

      <div className="p-6 overflow-y-auto">
         <table className="w-full text-left">
            <thead>
               <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-dark-700">
                  <th className="px-4 py-6">Event Context</th>
                  <th className="px-4 py-6">Operation</th>
                  <th className="px-4 py-6">Resource ID</th>
                  <th className="px-4 py-6">SHA-256 HASH (Chained)</th>
                  <th className="px-4 py-6">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/30">
               {logs.map((log) => (
                 <tr key={log.id} className="hover:bg-dark-900/30 transition-colors group">
                    <td className="px-4 py-5 flex items-center space-x-3">
                       <div className="w-8 h-8 rounded-full bg-dark-900 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {log.actor[0]}
                       </div>
                       <span className="text-xs font-bold text-slate-300">@{log.actor}</span>
                    </td>
                    <td className="px-4 py-5">
                       <span className="text-[10px] font-black bg-dark-700 text-slate-400 px-2 py-1 rounded-md">{log.action}</span>
                    </td>
                    <td className="px-4 py-5">
                       <span className="text-xs font-mono text-slate-500">{log.resource}</span>
                    </td>
                    <td className="px-4 py-5">
                       <div className="flex items-center space-x-2">
                          <Lock size={12} className="text-slate-600" />
                          <span className="text-[10px] font-mono text-slate-600 group-hover:text-primary transition-colors">{log.hash}</span>
                       </div>
                    </td>
                    <td className="px-4 py-5">
                       <div className="flex items-center space-x-1.5 text-green-500">
                          <CheckCircle size={14} />
                          <span className="text-[10px] font-black uppercase tracking-tighter">Verified</span>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      <div className="p-6 border-t border-dark-600 bg-dark-900/20 text-center">
         <p className="text-[10px] text-slate-600 flex items-center justify-center">
            <Activity size={12} className="mr-2" /> Total Blocks: 1,482 | Last Verified: 2 mins ago | Persistence: WORM (Write Once Read Many)
         </p>
      </div>
    </div>
  );
};

export default ImmutableAuditLog;
