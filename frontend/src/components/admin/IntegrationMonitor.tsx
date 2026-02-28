import { Share2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const mockWebhooks = [
  { id: '1', name: 'Stripe Payment Hook', url: 'https://api.riskmonitor.io/webhooks/stripe', status: 'active', lastSuccess: '2 mins ago' },
  { id: '2', name: 'Swift Network Sync', url: 'https://api.riskmonitor.io/webhooks/swift', status: 'error', lastSuccess: '1 hour ago' },
  { id: '3', name: 'Plaid Identity Verify', url: 'https://api.riskmonitor.io/webhooks/plaid', status: 'active', lastSuccess: '10 mins ago' },
];

export function IntegrationMonitor() {
  return (
    <div className="space-y-6">
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Share2 className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Webhook Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Integration</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Last Success</th>
              </tr>
            </thead>
            <tbody>
              {mockWebhooks.map(w => (
                <tr key={w.id}>
                  <td className="text-sm font-medium">{w.name}</td>
                  <td className="text-xs font-mono text-muted-foreground">{w.url}</td>
                  <td>
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${w.status === 'active' ? 'text-success' : 'text-destructive'}`}>
                      {w.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {w.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="text-xs text-muted-foreground">{w.lastSuccess}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Queue Lag</div>
            <div className="text-xl font-bold font-mono text-foreground">142ms</div>
            <div className="text-[10px] text-success font-medium">Within SLA (-12ms)</div>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Active Conns</div>
            <div className="text-xl font-bold font-mono text-foreground">1,204</div>
            <div className="text-[10px] text-muted-foreground font-medium">+15% vs yesterday</div>
          </div>
        </div>
      </div>
    </div>
  );
}
