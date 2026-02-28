import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Transaction } from '@/types';

interface Props { transactions: Transaction[]; }

const COLORS = {
  low: 'hsl(152, 70%, 45%)',
  medium: 'hsl(38, 92%, 50%)',
  high: 'hsl(0, 72%, 55%)',
  critical: 'hsl(330, 80%, 55%)',
};

export function RiskDistributionChart({ transactions }: Props) {
  const distribution = transactions.reduce((acc, tx) => {
    acc[tx.riskLevel] = (acc[tx.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(distribution).map(([name, value]) => ({ name, value }));

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Risk Distribution</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3} stroke="none">
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: 'hsl(222, 25%, 10%)', border: '1px solid hsl(222, 20%, 18%)', borderRadius: '8px', fontSize: '12px', color: 'hsl(210, 20%, 92%)' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} formatter={(value) => <span className="text-muted-foreground capitalize">{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
