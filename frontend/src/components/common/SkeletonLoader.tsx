import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  rows?: number;
  className?: string;
}

export function SkeletonLoader({ rows = 5, className }: SkeletonLoaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4">
          <div className="rounded bg-muted h-4 flex-1" style={{ width: `${60 + Math.random() * 40}%` }} />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 animate-pulse space-y-3">
      <div className="h-3 bg-muted rounded w-1/3" />
      <div className="h-8 bg-muted rounded w-1/2" />
      <div className="h-3 bg-muted rounded w-2/3" />
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-6 gap-4 px-4 py-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 bg-muted rounded animate-pulse" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 px-4 py-3 border-b border-border/30">
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="h-4 bg-muted/50 rounded animate-pulse" style={{ animationDelay: `${(i + j) * 50}ms` }} />
          ))}
        </div>
      ))}
    </div>
  );
}
