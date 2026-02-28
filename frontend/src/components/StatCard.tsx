import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "danger" | "success" | "warning";
}

const variantStyles = {
  default: "text-primary",
  danger: "text-destructive",
  success: "text-success",
  warning: "text-warning",
};

export function StatCard({ title, value, subtitle, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4 text-center">
        <div className={cn("mx-auto rounded-full bg-secondary p-2 w-fit mb-2", variantStyles[variant])}>
          <Icon className="h-4 w-4" />
        </div>
        <p className={cn("text-2xl font-bold font-mono", variantStyles[variant])}>{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
        {subtitle && <p className="text-[10px] text-muted-foreground/70 mt-0.5">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
