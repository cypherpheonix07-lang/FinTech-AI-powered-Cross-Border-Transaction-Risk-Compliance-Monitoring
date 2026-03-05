import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ShieldCheck, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'security' | 'transaction' | 'info' | 'alert';
  unread: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Security Alert', description: 'New login detected from Chrome on Windows.', time: '2 mins ago', type: 'security', unread: true },
  { id: '2', title: 'Transfer Verified', description: 'Your transfer of £450.00 to Emma Watson is complete.', time: '1 hour ago', type: 'transaction', unread: true },
  { id: '3', title: 'New Feature', description: 'Real-time path tracking is now available for all cards.', time: '5 hours ago', type: 'info', unread: false },
  { id: '4', title: 'Verification Required', description: 'Please update your identity documents for higher limits.', time: '1 day ago', type: 'alert', unread: false },
];

export default function NotificationCenter({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60]" onClick={onClose} />
      
      {/* Popover */}
      <div className="absolute right-0 top-full mt-4 w-screen max-w-[400px] bg-white rounded-[2rem] shadow-2xl border border-slate-200 z-[70] overflow-hidden animate-in slide-in-from-top-4 duration-300 origin-top-right">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900">Notifications</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Account Activity</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={markAllRead}
              className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline"
            >
              Mark all read
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[450px] overflow-y-auto no-scrollbar divide-y divide-slate-50">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={cn(
                "p-5 flex gap-4 transition-colors cursor-pointer group",
                n.unread ? "bg-blue-50/30 hover:bg-blue-50/50" : "hover:bg-slate-50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                n.type === 'security' && "bg-red-50 text-red-500",
                n.type === 'transaction' && "bg-emerald-50 text-emerald-500",
                n.type === 'info' && "bg-blue-50 text-blue-500",
                n.type === 'alert' && "bg-amber-50 text-amber-500",
              )}>
                {n.type === 'security' && <ShieldCheck className="w-5 h-5" />}
                {n.type === 'transaction' && <CheckCircle2 className="w-5 h-5" />}
                {n.type === 'info' && <Info className="w-5 h-5" />}
                {n.type === 'alert' && <AlertCircle className="w-5 h-5" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={cn("text-sm font-bold", n.unread ? "text-slate-900" : "text-slate-600")}>{n.title}</p>
                  <span className="text-[10px] font-medium text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">{n.description}</p>
              </div>

              {n.unread && (
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <button className="w-full p-4 text-center bg-slate-50 border-t border-slate-100 group transition-all">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            View All Notifications <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>
    </>
  );
}
