import type { Transaction } from '@/types';
import { useNavigate } from 'react-router-dom';
import { RiskBadge, StatusBadge } from '@/components/common/StatusBadge';
import { TableSkeleton } from '@/components/common/SkeletonLoader';

interface Props { transactions: Transaction[]; loading: boolean; }

export function TransactionTable({ transactions, loading }: Props) {
  const navigate = useNavigate();

  if (loading) return <div className="glass-card p-4"><TableSkeleton /></div>;

  if (!transactions.length) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
        <span className="text-xs text-muted-foreground font-mono">{transactions.length} results</span>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Corridor</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} onClick={() => navigate(`/transactions/${tx.id}`)} className="cursor-pointer">
                <td className="font-mono text-xs text-primary">{tx.id}</td>
                <td className="font-mono text-xs">{tx.corridor}</td>
                <td className="font-mono">{tx.currency} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td><RiskBadge level={tx.riskLevel} score={tx.riskScore} /></td>
                <td><StatusBadge status={tx.status} /></td>
                <td className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
