import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  MoreVertical, 
  ArrowRight,
  ShieldCheck,
  Bell,
  Wallet,
  Calendar,
  ChevronRight,
  Settings2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Rule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isActive: boolean;
  lastRun?: string;
}

export default function AutomationRulesPage() {
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', name: 'Coffee Round-up', trigger: 'When I spend on Coffee', action: 'Round up and save to House Deposit', isActive: true, lastRun: '2 hours ago' },
    { id: '2', name: 'Salary Shield', trigger: 'When Salary arrives', action: 'Move 20% to Savings Vault', isActive: true, lastRun: '15 days ago' },
    { id: '3', name: 'High Transaction Alert', trigger: 'If transaction > £1,000', action: 'Notify via App & SMS', isActive: false },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Automation Rules</h1>
          <p className="text-slate-500 font-medium">Set up IFTTT-style triggers for your financial life.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-6 rounded-2xl shadow-xl shadow-blue-600/20 group">
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Create New Rule
        </Button>
      </div>

      {/* Recommended Triggers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { icon: Zap, title: 'Smart Round-ups', desc: 'Auto-save spare change from every purchase.', color: 'text-amber-500' },
           { icon: ShieldCheck, title: 'Fraud Guard', desc: 'Instant freeze if card used in high-risk zones.', color: 'text-emerald-500' },
           { icon: Bell, title: 'Bill Reminders', desc: 'Predictive alerts 3 days before any subscription.', color: 'text-blue-500' },
         ].map((item) => (
           <div key={item.title} className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <item.icon className={cn("w-6 h-6", item.color)} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </div>

      {/* Rules List */}
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
         <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Active Smart Rules</h3>
            <Settings2 className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
         </div>

         <div className="divide-y divide-slate-50">
            {rules.map((rule) => (
              <div key={rule.id} className="px-8 py-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50/50 transition-all group">
                 <div className={cn(
                   "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                   rule.isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                 )}>
                    {rule.isActive ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
                 </div>

                 <div className="flex-1">
                    <h4 className="font-black text-slate-900 mb-1">{rule.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                       <span className="text-blue-600/80">{rule.trigger}</span>
                       <ArrowRight className="w-3 h-3" />
                       <span className="text-slate-900">{rule.action}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                       <p className={cn(
                         "text-xs font-bold mt-1",
                         rule.isActive ? "text-emerald-500" : "text-slate-400"
                       )}>
                         {rule.isActive ? 'RUNNING' : 'PAUSED'}
                       </p>
                    </div>
                    {rule.lastRun && (
                      <div className="text-right hidden sm:block">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Run</p>
                         <p className="text-xs font-bold text-slate-900 mt-1">{rule.lastRun}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                       <Switch 
                         checked={rule.isActive} 
                         onCheckedChange={(val) => {
                           setRules(rules.map(r => r.id === rule.id ? { ...r, isActive: val } : r));
                         }}
                       />
                       <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         <div className="p-8 bg-slate-50/50 flex items-center justify-center border-t border-slate-100">
            <button className="text-sm font-black text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2">
               Show History <Calendar className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Rule Builder Preview (Static) */}
      <div className="p-8 md:p-12 rounded-[3.5rem] bg-slate-900 text-white overflow-hidden relative border-4 border-slate-800">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-10 -mr-24 -mt-24" />
         
         <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-600 rounded-xl">
                  <Settings2 className="w-5 h-5 text-white" />
               </div>
               <h3 className="text-xl font-black">Drag-and-Drop Rule Builder</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
               <div className="w-full md:w-64 p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Select Trigger</p>
                  <div className="p-4 bg-white/10 rounded-2xl border border-dashed border-white/20 text-xs font-bold text-white/40">
                     DROP TRIGGER HERE
                  </div>
               </div>
               
               <div className="p-4 bg-blue-600 rounded-full">
                  <ArrowRight className="w-6 h-6 text-white" />
               </div>

               <div className="w-full md:w-64 p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Select Action</p>
                  <div className="p-4 bg-white/10 rounded-2xl border border-dashed border-white/20 text-xs font-bold text-white/40">
                     DROP ACTION HERE
                  </div>
               </div>

               <div className="flex-1 text-center md:text-left">
                  <p className="text-blue-100/60 font-medium leading-relaxed">
                     Our AI can also <span className="text-white font-bold">suggest rules</span> based on your recurring bills and spending habits.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
