import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tenantApi, transactionApi } from '@/services/api';
import { Tenant, Transaction } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { CardSkeleton, TableSkeleton } from '@/components/common/SkeletonLoader';
import { ArrowLeft, Globe, TrendingUp, AlertTriangle, Calendar, CreditCard } from 'lucide-react';

export default function TenantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      Promise.all([
        tenantApi.getTenant(id),
        transactionApi.getTransactions(id, 1, 10)
      ]).then(([t, txs]) => {
        setTenant(t);
        setTransactions(txs.data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return (
    <div className="p-6 space-y-6">
      <CardSkeleton />
      <TableSkeleton />
    </div>
  );

  if (!tenant) return <div className="p-6">Tenant not found</div>;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <button onClick={() => navigate('/tenants')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="w-4 h-4" /> Back to Tenants
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{tenant.name}</h1>
            <StatusBadge status={tenant.status} />
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Globe className="w-3.5 h-3.5" /> {tenant.region} · Organization ID: <span className="font-mono text-primary uppercase">{tenant.id}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-4 py-2 text-center">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Risk Score</div>
            <div className={`text-xl font-bold font-mono ${tenant.riskScore > 50 ? 'text-destructive' : tenant.riskScore > 30 ? 'text-warning' : 'text-success'}`}>
              {tenant.riskScore}
            </div>
          </div>
          <div className="glass-card px-4 py-2 text-center">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Volume</div>
            <div className="text-xl font-bold font-mono text-foreground">
              ${(tenant.transactionVolume / 1000).toFixed(0)}K
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 space-y-4">
          <h3 className="font-semibold text-sm flex items-center gap-2 border-b border-border pb-3">
            <TrendingUp className="w-4 h-4 text-primary" /> Growth Metrics
          </h3>
          <div className="space-y-3">
            {[
              ['Weekly Volume', '+$2.4K', 'success'],
              ['New Corridors', '+3', 'primary'],
              ['Risk Trend', '-4.2%', 'success'],
            ].map(([label, val, color]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className={`text-xs font-bold text-${color}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 space-y-4 md:col-span-2">
          <h3 className="font-semibold text-sm flex items-center gap-2 border-b border-border pb-3">
            <Globe className="w-4 h-4 text-primary" /> Active Corridors
          </h3>
          <div className="flex flex-wrap gap-2">
            {tenant.corridors.map(c => (
              <div key={c} className="px-3 py-1.5 rounded-lg bg-secondary/40 border border-border/50 text-xs font-medium text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" /> Recent Transactions
          </h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} onClick={() => navigate(`/transactions/${tx.id}`)} className="cursor-pointer">
                <td className="font-mono text-xs text-primary">{tx.id.split('-')[0]}</td>
                <td className="text-sm">{tx.receiverName}</td>
                <td className="text-sm font-semibold font-mono">${tx.amount.toLocaleString()}</td>
                <td>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    tx.riskLevel === 'critical' ? 'bg-risk-critical/20 text-risk-critical' :
                    tx.riskLevel === 'high' ? 'bg-risk-high/20 text-risk-high' :
                    tx.riskLevel === 'medium' ? 'bg-risk-medium/20 text-risk-medium' :
                    'bg-risk-low/20 text-risk-low'
                  }`}>
                    {tx.riskLevel}
                  </span>
                </td>
                <td className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
