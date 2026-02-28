import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: string;
  bgColor: string;
}

export function DashboardCard({ title, description, icon: Icon, to, color, bgColor }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-lg transition-all active:scale-[0.97] touch-target"
      onClick={() => navigate(to)}
    >
      <div className="flex items-center gap-4">
        <div className={`rounded-2xl p-4 ${bgColor}`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
        <div>
          <p className="font-bold text-lg">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}
