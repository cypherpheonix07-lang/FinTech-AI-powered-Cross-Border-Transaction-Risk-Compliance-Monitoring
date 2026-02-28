import { useAppDispatch, useAppSelector } from '@/store';
import { selectAlerts, setAlerts } from '@/store/slices/alertSlice';
import { Activity, Brain, Bell, CheckCircle, Shield, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAlerts);
  const [health, setHealth] = useState<SystemHealth[]>([]);
  const [models, setModels] = useState<ModelMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminApi.getSystemHealth(), adminApi.getModelMetrics(), adminApi.getAlerts()]).then(([h, m, a]) => {
      setHealth(h); setModels(m); dispatch(setAlerts(a)); setLoading(false);
    });
  }, [dispatch]);

  if (loading) return <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">System monitoring & management</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 border border-border">
          <TabsTrigger value="overview" className="gap-2"><Activity className="w-3.5 h-3.5" /> Overview</TabsTrigger>
          <TabsTrigger value="users" className="gap-2"><Shield className="w-3.5 h-3.5" /> Users</TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2"><Share2 className="w-3.5 h-3.5" /> Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          {/* System Health */}
          <div className="glass-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">System Health</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Service</th><th>Status</th><th>Latency</th><th>Uptime</th><th>Last Check</th></tr>
              </thead>
              <tbody>
                {health.map(s => (
                  <tr key={s.service}>
                    <td className="font-medium">{s.service}</td>
                    <td><StatusBadge status={s.status} /></td>
                    <td className="font-mono text-xs">{s.latency}ms</td>
                    <td className="font-mono text-xs">{s.uptime}%</td>
                    <td className="text-xs text-muted-foreground">{new Date(s.lastCheck).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model Metrics */}
            <div className="glass-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Model Performance</h3>
              </div>
              <div className="p-5 space-y-4">
                {models.map(m => (
                  <div key={m.modelName} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm text-foreground">{m.modelName}</span>
                      <span className="text-xs text-muted-foreground font-mono">{m.predictions.toLocaleString()} predictions</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-center">
                      {[
                        ['Accuracy', m.accuracy],
                        ['Precision', m.precision],
                        ['Recall', m.recall],
                        ['F1', m.f1Score],
                      ].map(([label, val]) => (
                        <div key={label as string}>
                          <div className="text-xs text-muted-foreground">{label as string}</div>
                          <div className="text-sm font-bold font-mono text-foreground">{((val as number) * 100).toFixed(1)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Queue */}
            <div className="glass-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Alert Queue</h3>
                <span className="ml-auto text-xs font-mono bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">
                  {alerts.filter(a => !a.acknowledged).length} unread
                </span>
              </div>
              <div className="divide-y divide-border/50">
                {alerts.map(a => (
                  <div key={a.id} className={`px-5 py-3 flex items-start gap-3 ${!a.acknowledged ? 'bg-secondary/20' : ''}`}>
                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                      a.severity === 'critical' ? 'bg-risk-critical' :
                      a.severity === 'error' ? 'bg-destructive' :
                      a.severity === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{a.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.source} · {new Date(a.timestamp).toLocaleTimeString()}</p>
                    </div>
                    {a.acknowledged && <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="animate-fade-in">
          <UserManagement />
        </TabsContent>

        <TabsContent value="integrations" className="animate-fade-in">
          <IntegrationMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
