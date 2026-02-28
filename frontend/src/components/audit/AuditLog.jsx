import React from 'react';
import useStore from '../../app/store';
import { ShieldCheck, History, Download, Filter, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

/**
 * AuditLog.jsx
 * Append-only immutable list of all security and investigative actions.
 */
const AuditLog = () => {
  const auditLogs = useStore(state => state.auditLogs);

  const exportAudit = () => {
    const csv = "id,timestamp,actor,action,resourceId\n" + 
      auditLogs.map(l => `${l.id},${l.timestamp},${l.actor},${l.action},${l.resourceId}`).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'Kubera_Audit.csv'; a.click();
  };

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full">
      <div className="p-6 border-b border-dark-600 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-primary" size={24} />
          <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">Compliance Audit Trail</h3>
        </div>
        <button 
          onClick={exportAudit}
          className="bg-dark-700 hover:bg-dark-600 border border-dark-600 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 flex items-center transition-all"
        >
          <Download size={14} className="mr-2" /> Export for Regulator
        </button>
      </div>

      <div className="p-4 border-b border-dark-700 flex space-x-4 bg-dark-900/30">
        <div className="flex-1 relative">
           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
           <input type="text" placeholder="Filter by Actor or Resource..." className="w-full bg-dark-800 border-none rounded-lg pl-10 py-1.5 text-xs text-slate-300 focus:ring-1 focus:ring-primary" />
        </div>
        <button className="p-2 bg-dark-700 rounded-lg text-slate-500 hover:text-white"><Filter size={14} /></button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-dark-800 border-b border-dark-700 z-10">
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Target Resource</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700/50">
            {auditLogs.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-12 text-center text-xs text-slate-600 italic">No audit records generated yet.</td></tr>
            ) : (
              auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-dark-700/20 transition-colors group">
                  <td className="px-6 py-3 text-[10px] text-slate-500 font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                     <span className="text-xs font-bold text-slate-300">@{log.actor.substring(0,8)}</span>
                  </td>
                  <td className="px-6 py-3">
                     <span className={clsx(
                       "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter",
                       log.action.includes('SAR') || log.action.includes('export') ? "bg-primary/20 text-primary" : "bg-dark-700 text-slate-400"
                     )}>
                       {log.action}
                     </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-xs font-mono text-slate-500 group-hover:text-slate-200 transition-colors">{log.resourceId}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;
