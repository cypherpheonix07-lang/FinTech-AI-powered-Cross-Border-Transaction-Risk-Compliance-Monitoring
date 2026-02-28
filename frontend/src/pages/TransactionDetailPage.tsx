import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchTransaction, selectTransactions } from '@/store/slices/transactionSlice';
import { RiskBadge, StatusBadge } from '@/components/common/StatusBadge';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selected: tx, loading } = useAppSelector(selectTransactions);

  useEffect(() => {
    if (id) dispatch(fetchTransaction(id));
  }, [id, dispatch]);

  if (loading || !tx) return <div className="p-6 space-y-4"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>;

  const featureData = tx.features.map(f => ({ name: f.name, contribution: +(f.contribution * 100).toFixed(1) }));

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-foreground font-mono">{tx.id}</h1>
        <RiskBadge level={tx.riskLevel} score={tx.riskScore} />
        <StatusBadge status={tx.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meta */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Transaction Details</h3>
          {[
            ['Corridor', tx.corridor],
            ['Amount', `${tx.currency} ${tx.amount.toLocaleString()}`],
            ['Sender', tx.senderName],
            ['Receiver', tx.receiverName],
            ['Timestamp', new Date(tx.timestamp).toLocaleString()],
            ['Payment Method', tx.metadata.paymentMethod],
            ['Purpose', tx.metadata.purpose],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-mono text-foreground">{value}</span>
            </div>
          ))}
        </div>

        {/* Risk Breakdown */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Risk Breakdown</h3>
          <div className="space-y-3">
            {tx.features.map(f => (
              <div key={f.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{f.name}</span>
                  <span className="font-mono text-foreground">{(f.contribution * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${f.contribution * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Feature Contribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={featureData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(215, 15%, 50%)' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'hsl(215, 15%, 50%)' }} width={100} />
              <Tooltip contentStyle={{ background: 'hsl(222, 25%, 10%)', border: '1px solid hsl(222, 20%, 18%)', borderRadius: '8px', fontSize: '12px', color: 'hsl(210, 20%, 92%)' }} />
              <Bar dataKey="contribution" fill="hsl(187, 85%, 48%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Explanation */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Risk Explanation</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This transaction scored <span className="text-foreground font-mono">{tx.riskScore}/100</span> on the risk scale.
          The primary risk factor is <span className="text-foreground">{tx.features.sort((a, b) => b.contribution - a.contribution)[0]?.name}</span> contributing{' '}
          <span className="text-foreground font-mono">{(tx.features.sort((a, b) => b.contribution - a.contribution)[0]?.contribution * 100).toFixed(1)}%</span> to the overall score.
          The corridor <span className="text-foreground font-mono">{tx.corridor}</span> has a baseline risk factor that has been factored into the assessment.
        </p>
      </div>
    </div>
  );
}
