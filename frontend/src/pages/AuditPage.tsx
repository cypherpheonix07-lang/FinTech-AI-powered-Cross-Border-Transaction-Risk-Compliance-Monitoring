import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAuditLogs, selectAudit, setAuditFilters } from '@/store/slices/auditSlice';
import { TableSkeleton } from '@/components/common/SkeletonLoader';
import { FileText, Download, Search } from 'lucide-react';

export default function AuditPage() {
  const dispatch = useAppDispatch();
  const { logs, total, loading, filters } = useAppSelector(selectAudit);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  useEffect(() => { dispatch(fetchAuditLogs()); }, [dispatch, filters]);

  const exportCsv = () => {
    const csv = ['ID,User,Action,Resource,Details,IP,Timestamp',
      ...logs.map(l => `${l.id},${l.userName},${l.action},${l.resource},"${l.details}",${l.ipAddress},${l.timestamp}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'audit_logs.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const detail = selectedLog ? logs.find(l => l.id === selectedLog) : null;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Audit Logs</h1>
          <p className="text-sm text-muted-foreground">{total} records</p>
        </div>
        <button onClick={exportCsv} className="flex items-center gap-2 px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <select value={filters.action} onChange={e => dispatch(setAuditFilters({ action: e.target.value }))}
            className="flex-1 bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="">All Actions</option>
            {['LOGIN', 'LOGOUT', 'VIEW_TRANSACTION', 'FLAG_TRANSACTION', 'EXPORT_REPORT', 'UPDATE_RULE'].map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <select value={filters.resource} onChange={e => dispatch(setAuditFilters({ resource: e.target.value }))}
          className="bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="">All Resources</option>
          {['auth', 'transactions', 'rules', 'users', 'reports', 'settings'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {loading ? <div className="glass-card p-4"><TableSkeleton /></div> : (
        <div className="glass-card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>User</th><th>Action</th><th>Resource</th><th>IP</th><th>Time</th></tr>
            </thead>
            <tbody>
              {logs.map(l => (
                <tr key={l.id} onClick={() => setSelectedLog(l.id)} className="cursor-pointer">
                  <td className="font-mono text-xs text-primary">{l.id}</td>
                  <td className="text-sm">{l.userName}</td>
                  <td><span className="px-2 py-0.5 rounded text-xs font-mono bg-secondary text-secondary-foreground">{l.action}</span></td>
                  <td className="text-xs text-muted-foreground">{l.resource}</td>
                  <td className="font-mono text-xs text-muted-foreground">{l.ipAddress}</td>
                  <td className="text-xs text-muted-foreground">{new Date(l.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedLog(null)}>
          <div className="glass-card p-6 max-w-md w-full mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{detail.id}</h3>
            </div>
            <div className="space-y-3 text-sm">
              {[['User', detail.userName], ['Action', detail.action], ['Resource', detail.resource], ['Details', detail.details], ['IP Address', detail.ipAddress], ['Timestamp', new Date(detail.timestamp).toLocaleString()]].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono text-foreground text-right max-w-[60%]">{val}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelectedLog(null)} className="mt-4 w-full py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
