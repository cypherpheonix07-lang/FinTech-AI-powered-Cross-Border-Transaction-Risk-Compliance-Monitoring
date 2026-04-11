import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Activity, 
  History, 
  Lock, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle,
  Gavel,
  Zap,
  Globe2,
  Users,
  Settings2,
  Filter,
  CheckCircle2,
  UserCheck,
  Building,
  Target,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

export default function GovernancePolicyPage() {
  const [limit, setLimit] = useState([5000]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Policy & Governance Engine</h1>
          <p className="text-slate-500 font-medium italic">Programmable financial rules for personal and collaborative accounts.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-blue-600/20">
              <Plus className="w-4 h-4 mr-2" /> New Policy
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Policies */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                       <Scale className="w-6 h-6 text-blue-600" /> Active Global Rules
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional-Grade Account Safeguards</p>
                 </div>
                 <Button variant="ghost" className="text-blue-600 font-black uppercase text-xs tracking-widest gap-2">
                    Policy Audit <History className="w-4 h-4" />
                 </Button>
              </div>

              <div className="space-y-6">
                 <div className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 space-y-8 group hover:border-blue-200 transition-all">
                    <div className="flex justify-between items-start">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
                             <Target className="w-6 h-6" />
                          </div>
                          <div>
                             <h4 className="text-lg font-black italic">Cumulative Spending Limit</h4>
                             <p className="text-xs text-slate-400 font-medium">Auto-block transactions if monthly total exceeds limit.</p>
                          </div>
                       </div>
                       <Switch checked={true} />
                    </div>
                    <div className="space-y-6 px-2">
                       <div className="flex justify-between text-xs font-black uppercase">
                          <span className="text-slate-400">Monthly Cap</span>
                          <span className="text-blue-600">£{limit[0].toLocaleString()}</span>
                       </div>
                       <Slider value={limit} onValueChange={setLimit} max={100000} step={1000} className="py-4" />
                       <div className="flex justify-between text-[10px] font-bold text-slate-400">
                          <span>£0</span>
                          <span>£100k+</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all cursor-pointer">
                       <div className="flex justify-between items-start">
                          <Globe2 className="w-8 h-8 text-blue-400" />
                          <Switch checked={true} />
                       </div>
                       <h4 className="text-md font-black italic leading-tight">Geographic Whitelisting</h4>
                       <p className="text-xs text-slate-400 font-medium leading-relaxed">Limit transfers to specific regions: UK, EU, Singapore.</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all cursor-pointer">
                       <div className="flex justify-between items-start">
                          <Clock className="w-8 h-8 text-indigo-400" />
                          <Switch checked={false} />
                       </div>
                       <h4 className="text-md font-black italic leading-tight">Time-Based Locking</h4>
                       <p className="text-xs text-slate-400 font-medium leading-relaxed">Restrict outbound activity between 11 PM and 6 AM.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Collaborative Voting Controls */}
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black flex items-center gap-3">
                          <Users className="w-8 h-8 text-blue-400" /> Collaborative DAO Governance
                       </h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Multi-signature requirements for shared family or business funds.</p>
                    </div>
                 </div>

                 <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-black uppercase tracking-widest text-white/60">Quorum Requirement</span>
                       <span className="text-xl font-black italic">2 of 3 Members</span>
                    </div>
                    <div className="flex gap-4">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black">M{i}</div>
                               <span className="text-xs font-bold text-white/80">Member {i}</span>
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                         </div>
                       ))}
                    </div>
                    <div className="pt-4 border-t border-white/5">
                       <p className="text-[10px] text-white/30 italic">Rule: Any transfer over £5,000 requires 66.6% approval rating.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Controls */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Settings2 className="w-4 h-4 text-blue-600" /> Smart Filters
              </h4>
              <div className="space-y-4">
                 {[
                   { label: 'Gambling Block', active: true },
                   { label: 'Crypto Exchanges', active: true },
                   { label: 'Unverified Merchants', active: false },
                 ].map((f) => (
                   <div key={f.label} className="flex justify-between items-center py-2 px-1">
                      <span className="text-xs font-bold text-slate-600">{f.label}</span>
                      <Switch checked={f.active} />
                   </div>
                 ))}
              </div>
              <Button className="w-full bg-slate-900 hover:bg-black text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest shadow-xl shadow-slate-900/10">
                 Apply Global Filter
              </Button>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-indigo-700 to-blue-800 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Building className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black">Corporate Mode</h4>
                    <p className="text-indigo-100/60 text-xs font-semibold leading-relaxed mt-2 italic">Mirror your company's existing signing mandates and hierarchies directly into PathGuard.</p>
                 </div>
                 <Button className="w-full bg-white text-indigo-700 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Upgrade to Enterprise
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <History className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 leading-tight">Compliance Snapshot</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last Audit: 12 Minutes Ago</p>
              <Button variant="ghost" className="w-full text-blue-600 font-black text-[10px] tracking-widest uppercase group px-0">
                 Download Audit Log <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Plus } from 'lucide-react';
