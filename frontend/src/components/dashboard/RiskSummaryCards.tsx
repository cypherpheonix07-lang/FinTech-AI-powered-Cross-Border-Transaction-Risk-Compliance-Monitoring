import type { RiskSummary } from '@/types';
import { TrendingUp, AlertTriangle, ShieldX, DollarSign } from 'lucide-react';

interface Props { summary: RiskSummary; }

export function RiskSummaryCards({ summary }: Props) {
  const cards = [
    { label: 'Total Transactions', value: summary.totalTransactions.toLocaleString(), icon: TrendingUp, accent: 'text-primary' },
    { label: 'Flagged', value: summary.flaggedCount.toLocaleString(), icon: AlertTriangle, accent: 'text-warning' },
    { label: 'Blocked', value: summary.blockedCount.toLocaleString(), icon: ShieldX, accent: 'text-destructive' },
    { label: 'Volume Processed', value: `$${(summary.volumeProcessed / 1_000_000).toFixed(1)}M`, icon: DollarSign, accent: 'text-success' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={card.label} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.label}</span>
            <card.icon className={`w-4 h-4 ${card.accent}`} />
          </div>
          <div className={`stat-value ${card.accent}`}>{card.value}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Avg Risk Score: <span className="font-mono text-foreground">{summary.averageRiskScore.toFixed(1)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
