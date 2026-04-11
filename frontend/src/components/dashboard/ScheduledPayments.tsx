import React from 'react';
import { Calendar, ArrowRight, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const upcoming = [
  { id: '1', title: 'Adobe Creative Cloud', amount: '£49.99', date: 'Oct 28', category: 'Subscription' },
  { id: '2', title: 'Office Rent', amount: '£2,400.00', date: 'Nov 01', category: 'Business' },
  { id: '3', title: 'British Gas', amount: '£140.00', date: 'Nov 05', category: 'Utilities' },
];

export default function ScheduledPayments() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900">Scheduled Payments</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-wider">Upcoming Activity</p>
        </div>
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
          <Calendar className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {upcoming.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.category}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tight">{item.date}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 tracking-tight">{item.amount}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full py-3 bg-blue-600/5 hover:bg-blue-600/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
        View Full Calendar
      </button>
    </div>
  );
}
