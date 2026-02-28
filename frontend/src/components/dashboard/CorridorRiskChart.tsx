import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { CorridorRisk } from '@/types';

interface Props { corridors: CorridorRisk[]; }

export function CorridorRiskChart({ corridors }: Props) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Corridor Risk Scores</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={corridors} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
          <XAxis dataKey="corridor" tick={{ fontSize: 11, fill: 'hsl(215, 15%, 50%)' }} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(215, 15%, 50%)' }} />
          <Tooltip contentStyle={{ background: 'hsl(222, 25%, 10%)', border: '1px solid hsl(222, 20%, 18%)', borderRadius: '8px', fontSize: '12px', color: 'hsl(210, 20%, 92%)' }} />
          <Bar dataKey="avgRisk" fill="hsl(187, 85%, 48%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="flagRate" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
