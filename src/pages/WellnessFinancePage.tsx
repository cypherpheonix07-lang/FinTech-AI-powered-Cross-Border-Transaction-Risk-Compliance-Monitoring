import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  Globe2, 
  Salad, 
  Dumbbell, 
  Moon, 
  Zap as Energy,
  Smile,
  Target,
  Clock,
  CheckCircle2,
  Stethoscope,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const healthData = [
  { name: 'Mon', stress: 45, energy: 70 },
  { name: 'Tue', stress: 52, energy: 65 },
  { name: 'Wed', stress: 38, energy: 82 },
  { name: 'Thu', stress: 60, energy: 55 },
  { name: 'Fri', stress: 42, energy: 75 },
  { name: 'Sat', stress: 30, energy: 90 },
  { name: 'Sun', stress: 25, energy: 95 },
];

export default function WellnessFinancePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Health & Wellness Finance</h1>
          <p className="text-slate-500 font-medium italic">Biometric-driven financial optimization & preventative health rewards.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Sync Wearable
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Stethoscope className="w-4 h-4 mr-2" /> Medical Vault
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vitality Hub */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-rose-500" /> Vitality Monitor
                 </h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sync: Apple Watch Ultra</span>
              </div>

              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthData}>
                       <defs>
                          <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                       <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }} />
                       <Area type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} fill="url(#energyGrad)" />
                       <Area type="monotone" dataKey="stress" stroke="#rose-500" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                 {[
                   { label: 'Sleep Score', val: '84/100', icon: Moon, color: 'text-indigo-500' },
                   { label: 'Daily Steps', val: '12,420', icon: Activity, color: 'text-emerald-500' },
                   { label: 'Avg Heart Rate', val: '62 bpm', icon: Heart, color: 'text-rose-500' },
                   { label: 'Calorie Burn', val: '2,840 kcal', icon: Energy, color: 'text-orange-500' },
                 ].map((stat) => (
                   <div key={stat.label}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                         <stat.icon className={cn("w-3 h-3", stat.color)} /> {stat.label}
                      </p>
                      <p className="text-xl font-black text-slate-900 tracking-tight">{stat.val}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Health Rewards & Insurance Hook */}
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Vitality Paybacks</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Earn premium reductions by maintaining a healthy lifestyle.</p>
                    </div>
                    <Energy className="w-10 h-10 text-rose-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                       <h4 className="text-lg font-black italic text-emerald-400">Premium Discount</h4>
                       <p className="text-4xl font-black tracking-tighter">-15%</p>
                       <p className="text-xs text-white/40 font-medium">Applied to your "Global Health Elite" policy for meeting step goals 20/30 days.</p>
                       <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest px-0">Claim Reward</Button>
                    </div>
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Upcoming Challenges</h4>
                       {[
                         { title: 'Sleep Consistent', reward: '£10 Cash', progress: 80 },
                         { title: 'HIIT Sesh (3x)', reward: '50 PG points', progress: 33 },
                       ].map(chall => (
                         <div key={chall.title} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                               <span>{chall.title}</span>
                               <span className="text-emerald-400">{chall.reward}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-600" style={{ width: `${chall.progress}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Action Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Salad className="w-4 h-4 text-emerald-500" /> Wellness Marketplace
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Equinox Global', desc: 'Premium Membership', price: '£120/mo' },
                   { name: 'Headspace Pro', desc: 'Mental Resilience', price: 'Free (Elite)' },
                   { name: 'AG1 Greens', desc: 'Monthly Supply', price: '£65/mo' },
                 ].map((p) => (
                   <div key={p.name} className="p-5 rounded-2.5xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all cursor-pointer">
                      <div>
                         <p className="text-xs font-black text-slate-900">{p.name}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{p.desc}</p>
                      </div>
                      <span className="text-[10px] font-black text-slate-900">{p.price}</span>
                   </div>
                 ))}
                 <Button variant="outline" className="w-full rounded-2xl py-6 border-slate-200 font-black text-xs uppercase tracking-widest mt-2">
                    Explore All Perks
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-indigo-700 to-indigo-900 text-white relative overflow-hidden shadow-xl shadow-indigo-600/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <ShieldCheck className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black italic text-gradient-to-r from-blue-400 to-emerald-400">BioVault Enabled</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       Your genomic data and health records are encrypted using your unique biometric hash.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-indigo-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Access Medical Records
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <Smile className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic">Mood & Spend Tracker</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-4">Correlation found: High stress leads to impulsive dining.</p>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 Analyze Insights <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
