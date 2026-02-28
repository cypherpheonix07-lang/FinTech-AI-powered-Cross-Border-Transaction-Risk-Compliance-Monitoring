import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '@/hooks/useTenant';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Globe, TrendingUp, AlertTriangle } from 'lucide-react';

export default function TenantPage() {
  const { tenants, loading, loadTenants } = useTenant();
  const navigate = useNavigate();

  useEffect(() => { loadTenants(); }, [loadTenants]);

  if (loading) return <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Tenants</h1>
        <p className="text-sm text-muted-foreground">Multi-tenant organization management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tenants.map((t, i) => (
          <div 
            key={t.id} 
            onClick={() => navigate(`/tenants/${t.id}`)}
            className="glass-card p-5 animate-fade-in hover:border-primary/30 transition-colors cursor-pointer group" 
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-foreground">{t.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Globe className="w-3 h-3" /> {t.region}</p>
              </div>
              <StatusBadge status={t.status} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Volume</div>
                <div className="text-sm font-bold font-mono text-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-primary" />{(t.transactionVolume / 1000).toFixed(0)}K
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Risk Score</div>
                <div className={`text-sm font-bold font-mono ${t.riskScore > 50 ? 'text-destructive' : t.riskScore > 30 ? 'text-warning' : 'text-success'}`}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" />{t.riskScore}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Corridors</div>
                <div className="text-sm font-bold font-mono text-foreground">{t.corridors.length}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {t.corridors.map(c => (
                <span key={c} className="px-2 py-0.5 rounded text-xs font-mono bg-secondary text-secondary-foreground">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
