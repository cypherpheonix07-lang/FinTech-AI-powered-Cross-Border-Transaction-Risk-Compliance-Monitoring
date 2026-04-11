import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Car, 
  Home, 
  Umbrella, 
  Activity, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  AlertCircle,
  FileText,
  DollarSign,
  Briefcase,
  Plane,
  LifeBuoy,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Policy {
  id: string;
  name: string;
  type: 'Health' | 'Life' | 'Auto' | 'Home' | 'Travel';
  premium: string;
  coverage: string;
  expiry: string;
  status: 'Active' | 'Pending' | 'Expiring Soon';
  icon: any;
}

export default function InsuranceHubPage() {
  const policies: Policy[] = [
    { id: '1', name: 'Global Health Elite', type: 'Health', premium: '£240/mo', coverage: '£1.5M', expiry: 'Dec 2026', status: 'Active', icon: Heart },
    { id: '2', name: 'Tesla Model S Pro', type: 'Auto', premium: '£85/mo', coverage: 'Full', expiry: 'Sep 2026', status: 'Active', icon: Car },
    { id: '3', name: 'Waterfront Estate', type: 'Home', premium: '£110/mo', coverage: '£2.4M', expiry: 'Aug 2026', status: 'Expiring Soon', icon: Home },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Insurance Management Hub</h1>
          <p className="text-slate-500 font-medium italic">Unified protection management & AI coverage optimization.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Add New Policy
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Activity className="w-4 h-4 mr-2" /> Claims Center
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Policies List */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">Your Protection Stack</h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3 Active Policies</span>
              </div>
              <div className="divide-y divide-slate-50">
                 {policies.map((policy) => (
                   <div key={policy.id} className="p-8 flex items-center gap-8 hover:bg-slate-50 transition-colors group">
                      <div className={cn(
                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-2 transition-all group-hover:scale-110",
                        policy.status === 'Active' ? "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-emerald-500/10" : "bg-orange-50 border-orange-100 text-orange-600 shadow-none"
                      )}>
                         <policy.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900 text-lg flex items-center gap-2">
                            {policy.name}
                         </h4>
                         <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{policy.type} • Coverage: {policy.coverage}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                         <p className="text-xl font-black text-slate-900 tracking-tight">{policy.premium}</p>
                         <span className={cn(
                           "text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest",
                           policy.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                         )}>
                            {policy.status}
                         </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-slate-900 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>

           {/* Coverage Health Radar */}
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Coverage Intelligence</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Real-time gap analysis across your entire risk profile.</p>
                    </div>
                    <Umbrella className="w-10 h-10 text-blue-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                       {[
                         { label: 'Health Protection', val: 94 },
                         { label: 'Assets & Wealth', val: 68 },
                         { label: 'Travel & Mobility', val: 82 },
                       ].map(track => (
                         <div key={track.label} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                               <span>{track.label}</span>
                               <span>{track.val}%</span>
                            </div>
                            <Progress value={track.val} className="h-2 bg-white/5" indicatorClassName="bg-blue-600" />
                         </div>
                       ))}
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col justify-center text-center space-y-4">
                       <AlertCircle className="w-10 h-10 text-orange-400 mx-auto" />
                       <h4 className="text-lg font-black italic">Gap Detected</h4>
                       <p className="text-xs text-white/40 font-medium">Your current life insurance doesn't account for your recent mortgage increase.</p>
                       <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest mt-2">
                          Fix Coverage Gap
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Claims & Quotes */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <History className="w-4 h-4 text-blue-600" /> Recent Claims
              </h4>
              <div className="space-y-4">
                 {[
                   { event: 'Travel Delay (BA241)', status: 'Approved', val: '£250' },
                   { event: 'iPhone 15 Screen Rep', status: 'In Review', val: '£180' },
                 ].map((c) => (
                   <div key={c.event} className="p-5 rounded-2.5xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all cursor-pointer">
                      <div>
                         <p className="text-xs font-black text-slate-900">{c.event}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{c.status}</p>
                      </div>
                      <span className="text-xs font-black text-slate-900">{c.val}</span>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                    View All Claims <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-indigo-900 to-slate-950 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Briefcase className="w-10 h-10 text-indigo-400" />
                 <div>
                    <h4 className="text-xl font-black italic">Resilience Score</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       Your ability to withstand a 6-month loss of income.
                    </p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-4xl font-black tracking-tighter text-white">840</span>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">SUPERIOR</span>
                 </div>
                 <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Improve Score
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <LifeBuoy className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 leading-tight italic">Emergency Assistance</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available 24/7 Worldwide</p>
              <Button variant="outline" className="w-full border-slate-200 text-slate-950 font-black rounded-xl py-6 uppercase text-xs tracking-widest mt-2 hover:bg-slate-950 hover:text-white transition-all">
                 Speak to an Agent
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
