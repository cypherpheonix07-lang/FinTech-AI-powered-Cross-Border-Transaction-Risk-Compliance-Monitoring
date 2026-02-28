import { CheckCircle, AlertTriangle, OctagonX } from "lucide-react";
import type { CheckResult } from "@/lib/safeStepData";

const config = {
  safe: {
    bg: "bg-safe/10 glow-safe",
    icon: CheckCircle,
    iconColor: "text-safe",
    border: "border-safe/30",
  },
  warning: {
    bg: "bg-amber/10 glow-warning",
    icon: AlertTriangle,
    iconColor: "text-amber",
    border: "border-amber/30",
  },
  danger: {
    bg: "bg-danger/10 glow-danger",
    icon: OctagonX,
    iconColor: "text-danger",
    border: "border-danger/30",
  },
};

export function TrafficLight({ result }: { result: CheckResult }) {
  const c = config[result.level];
  const Icon = c.icon;

  return (
    <div className={`rounded-3xl border-2 ${c.border} ${c.bg} p-6 text-center animate-bounce-in`}>
      <div className="flex justify-center mb-4">
        <div className={`rounded-full p-4 ${c.bg}`}>
          <Icon className={`h-16 w-16 ${c.iconColor}`} />
        </div>
      </div>
      <h2 className={`text-2xl font-extrabold mb-2 ${c.iconColor}`}>
        {result.title}
      </h2>
      <p className="text-base leading-relaxed text-foreground/80">
        {result.message}
      </p>
    </div>
  );
}
