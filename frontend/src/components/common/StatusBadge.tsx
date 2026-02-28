import type { RiskLevel } from '@/types';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  className?: string;
}

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const badgeClass = {
    low: 'risk-badge-low',
    medium: 'risk-badge-medium',
    high: 'risk-badge-high',
    critical: 'risk-badge-critical',
  }[level];

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide', badgeClass, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', {
        'bg-risk-low': level === 'low',
        'bg-risk-medium': level === 'medium',
        'bg-risk-high': level === 'high',
        'bg-risk-critical': level === 'critical',
      })} />
      {level}
      {score !== undefined && <span className="font-mono ml-1">({score})</span>}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: 'risk-badge-low',
    healthy: 'risk-badge-low',
    completed: 'risk-badge-low',
    pending: 'risk-badge-medium',
    degraded: 'risk-badge-medium',
    onboarding: 'risk-badge-medium',
    suspended: 'risk-badge-high',
    flagged: 'risk-badge-high',
    down: 'risk-badge-critical',
    blocked: 'risk-badge-critical',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide', colors[status] || 'bg-muted text-muted-foreground')}>
      {status}
    </span>
  );
}
