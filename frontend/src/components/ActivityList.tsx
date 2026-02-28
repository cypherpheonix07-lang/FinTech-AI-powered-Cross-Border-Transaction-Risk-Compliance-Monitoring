import { format } from "date-fns";
import { CheckCircle, AlertTriangle, OctagonX } from "lucide-react";
import type { Activity } from "@/lib/safeStepData";

const statusConfig = {
  safe: { icon: CheckCircle, label: "Safe", color: "text-safe", bg: "bg-safe/10" },
  warning: { icon: AlertTriangle, label: "Check", color: "text-amber", bg: "bg-amber/10" },
  blocked: { icon: OctagonX, label: "Blocked", color: "text-danger", bg: "bg-danger/10" },
};

export function ActivityList({ items }: { items: Activity[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const s = statusConfig[item.status];
        const Icon = s.icon;
        return (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border"
          >
            <div className={`rounded-xl p-2.5 ${s.bg}`}>
              <Icon className={`h-6 w-6 ${s.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base truncate">{item.recipient}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(item.date), "MMM dd · h:mm a")}
              </p>
              {item.note && (
                <p className="text-xs text-muted-foreground mt-1">⚠️ {item.note}</p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-base">${item.amount}</p>
              <span className={`text-xs font-semibold ${s.color}`}>{s.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
