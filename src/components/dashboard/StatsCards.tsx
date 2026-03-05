import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, Users, Wallet, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ElementType;
  trend?: string;
}

function StatCard({ label, value, change, isPositive, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-2xl transition-colors",
          label === 'Available Balance' ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600 group-hover:bg-slate-100"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-lg",
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {isPositive ? '+' : ''}{change}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
          {trend && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{trend}</span>}
        </div>
      </div>
    </div>
  );
}

export default function StatsCards() {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="relative group">
        <StatCard 
          label="Available Balance" 
          value={showBalance ? "£24,560.00" : "••••••"} 
          icon={Wallet} 
          trend="GBP / USD"
        />
        <button 
          onClick={() => setShowBalance(!showBalance)}
          className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <StatCard 
        label="Total Sent" 
        value="£12,300.50" 
        change="12%" 
        isPositive={false} 
        icon={ArrowUpRight} 
      />

      <StatCard 
        label="Total Received" 
        value="£8,450.00" 
        change="8.4%" 
        isPositive={true} 
        icon={ArrowDownLeft} 
      />

      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="p-2 bg-amber-50 text-amber-600 w-fit rounded-xl">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pending</p>
            <p className="text-lg font-bold text-slate-900">3</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="p-2 bg-purple-50 text-purple-600 w-fit rounded-xl">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Active</p>
            <p className="text-lg font-bold text-slate-900">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
