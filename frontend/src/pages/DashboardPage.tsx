import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchTransactions, selectTransactions } from '@/store/slices/transactionSlice';
import { fetchRiskSummary, fetchCorridorRisks, selectRisk } from '@/store/slices/riskSlice';
import { useTenant } from '@/hooks/useTenant';
import { useWebSocket } from '@/hooks/useWebSocket';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { RiskSummaryCards } from '@/components/dashboard/RiskSummaryCards';
import { RiskDistributionChart } from '@/components/dashboard/RiskDistributionChart';
import { CorridorRiskChart } from '@/components/dashboard/CorridorRiskChart';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import { Activity } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { activeTenantId } = useTenant();
  const { items, loading: txLoading } = useAppSelector(selectTransactions);
  const { summary, corridors, loading: riskLoading } = useAppSelector(selectRisk);
  const { connect } = useWebSocket(activeTenantId || undefined);

  useEffect(() => {
    dispatch(fetchTransactions({ tenantId: activeTenantId || undefined }));
    dispatch(fetchRiskSummary(activeTenantId || undefined));
    dispatch(fetchCorridorRisks());
    connect();
  }, [dispatch, activeTenantId, connect]);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Risk Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time cross-border payment monitoring</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
          <Activity className="w-3.5 h-3.5 text-success animate-pulse-glow" />
          <span className="text-xs font-medium text-success">Live</span>
        </div>
      </div>

      {riskLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : summary && (
        <RiskSummaryCards summary={summary} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskDistributionChart transactions={items} />
        <CorridorRiskChart corridors={corridors} />
      </div>

      <TransactionTable transactions={items} loading={txLoading} />
    </div>
  );
}
