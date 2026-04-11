import React from 'react';
import { 
  Send, 
  ArrowDownCircle, 
  QrCode, 
  CalendarClock, 
  PlusCircle, 
  ArrowUpCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  { icon: Send, label: 'Send Money', color: 'bg-blue-600', textColor: 'text-white' },
  { icon: ArrowDownCircle, label: 'Request', color: 'bg-emerald-50', textColor: 'text-emerald-600' },
  { icon: QrCode, label: 'Scan QR', color: 'bg-slate-50', textColor: 'text-slate-600' },
  { icon: CalendarClock, label: 'Schedule', color: 'bg-slate-50', textColor: 'text-slate-600' },
  { icon: PlusCircle, label: 'Top Up', color: 'bg-slate-50', textColor: 'text-slate-600' },
  { icon: ArrowUpCircle, label: 'Withdraw', color: 'bg-slate-50', textColor: 'text-slate-600' },
];

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Quick Actions</h3>
        <button className="text-blue-600 text-xs font-bold uppercase tracking-wider hover:underline">Edit</button>
      </div>
      
      <div className="flex items-center gap-6 min-w-max md:min-w-0 md:justify-between lg:justify-start lg:gap-8">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            className="flex flex-col items-center gap-3 group transition-all"
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 active:scale-95 group-hover:shadow-lg group-hover:shadow-blue-600/10",
              action.color,
              action.textColor
            )}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
