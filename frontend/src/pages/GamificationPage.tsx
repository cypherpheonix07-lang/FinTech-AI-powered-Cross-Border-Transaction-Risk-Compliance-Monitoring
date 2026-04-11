import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Flame, 
  Crown, 
  ShieldCheck, 
  Gift, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Award,
  Medal,
  RefreshCw,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: any;
  status: 'locked' | 'unlocked' | 'near';
  progress?: number;
}

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<'quest' | 'leaderboard' | 'rewards'>('quest');

  const achievements: Achievement[] = [
    { id: '1', title: 'Global Voyager', desc: 'Transfer to 10+ different countries.', icon: ShieldCheck, status: 'unlocked' },
    { id: '2', title: 'Elite Saver', desc: 'Maintain £10k+ balance for 3 months.', icon: Trophy, status: 'near', progress: 75 },
    { id: '3', title: 'Social Butterfly', desc: 'Join 5+ collaborative workspaces.', icon: Star, status: 'locked' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rewards & Reputation</h1>
          <p className="text-slate-500 font-medium">Climb the ranks and earn exclusive perks as you save.</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2.5xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-black text-slate-900">12,450</span>
           </div>
           <div className="w-px h-6 bg-slate-100" />
           <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-black text-slate-900">15 Day Streak</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Quests & Achievements */}
        <div className="lg:col-span-8 space-y-8">
           {/* Level Progress */}
           <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                 <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="50%" cy="50%" r="45%" className="stroke-white/5 fill-transparent stroke-[12]" />
                       <circle cx="50%" cy="50%" r="45%" className="stroke-blue-500 fill-transparent stroke-[12] transition-all duration-1000" style={{ strokeDasharray: '283', strokeDashoffset: '70' }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-3xl font-black">Lv. 24</span>
                       <span className="text-[10px] font-black uppercase text-white/40">Master</span>
                    </div>
                 </div>
                 <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-black">Quest: The Multi-Currency Master</h2>
                    <p className="text-blue-100/60 font-medium">Complete one more transfer in JPY or SGD to reach Level 25 and unlock $0 transfer fees for 30 days.</p>
                    <div className="flex gap-4 pt-2">
                       <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl px-8 font-black text-xs uppercase tracking-widest h-12">Resume Quest</Button>
                       <Button variant="ghost" className="text-white/60 hover:text-white font-bold text-xs">View All Levels</Button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Tabs */}
           <div className="flex bg-slate-100 p-1.5 rounded-[2rem] w-fit border border-slate-200 shadow-inner">
              {[
                { id: 'quest', label: 'Active Quests', icon: Zap },
                { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
                { id: 'rewards', label: 'Redeem Shop', icon: Gift },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-tighter transition-all",
                    activeTab === tab.id ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
           </div>

           {activeTab === 'quest' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((ach) => (
                  <div key={ach.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group overflow-hidden relative">
                     <div className="flex justify-between items-start mb-6">
                        <div className={cn(
                          "p-4 rounded-2.5xl transition-all group-hover:scale-110",
                          ach.status === 'unlocked' ? "bg-emerald-50 text-emerald-600" : ach.status === 'near' ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-300"
                        )}>
                           <ach.icon className="w-6 h-6" />
                        </div>
                        {ach.status === 'locked' && <Lock className="w-4 h-4 text-slate-300" />}
                     </div>
                     <h3 className="text-lg font-black text-slate-900 mb-1">{ach.title}</h3>
                     <p className="text-sm text-slate-500 font-medium mb-6">{ach.desc}</p>
                     
                     {ach.status === 'near' && (
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                             <span>Progress</span>
                             <span className="text-slate-900">{ach.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-amber-500 w-3/4" />
                          </div>
                       </div>
                     )}
                     
                     {ach.status === 'unlocked' && (
                       <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit uppercase tracking-widest">
                          <Award className="w-3.5 h-3.5" /> Achievement Unlocked
                       </div>
                     )}
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'leaderboard' && (
             <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h3 className="text-xl font-black text-slate-900">Regional Leaderboard</h3>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank: #4,204</span>
                </div>
                <div className="divide-y divide-slate-50">
                   {[
                     { rank: 1, name: 'Alex M.', points: '42,000 XP', badge: 'Whale 🐋', avatar: 'AM' },
                     { rank: 2, name: 'Sarah L.', points: '38,500 XP', badge: 'Alpha 🦁', avatar: 'SL' },
                     { rank: 3, name: 'Dinesh K.', points: '31,200 XP', badge: 'Eagle 🦅', avatar: 'DK' },
                   ].map((user) => (
                     <div key={user.rank} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors">
                        <span className={cn(
                          "text-2xl font-black w-8 text-center",
                          user.rank === 1 ? "text-amber-500" : user.rank === 2 ? "text-slate-400" : "text-orange-400"
                        )}>{user.rank}</span>
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-sm font-black text-blue-600 border-2 border-white shadow-sm">
                           {user.avatar}
                        </div>
                        <div className="flex-1">
                           <h4 className="font-black text-slate-900">{user.name}</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.badge}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-black text-slate-900">{user.points}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        {/* Right: Fortune Wheel / Perks */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden group shadow-xl shadow-blue-600/20">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10 space-y-8 flex flex-col items-center text-center">
                 <div className="w-48 h-48 bg-white/10 rounded-full border-4 border-white/20 p-4 relative animate-in zoom-in duration-1000">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-white/40 flex items-center justify-center group-hover:rotate-180 transition-transform duration-[2000ms]">
                       <RefreshCw className="w-12 h-12 text-white/60" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2">
                       <div className="w-4 h-8 bg-amber-400 rounded-b-full shadow-lg" />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black">Daily Wheel</h3>
                    <p className="text-indigo-100/60 font-medium text-sm mt-2">Spin to win fee discounts, XP boosters, or cashback.</p>
                 </div>
                 <Button className="w-full bg-white text-indigo-600 hover:bg-white/90 font-black rounded-2xl py-7 uppercase text-xs tracking-widest active:scale-95 transition-all shadow-xl">
                    Spin for 100 XP
                 </Button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Medal className="w-4 h-4 text-indigo-600" /> Exclusive Perks
              </h4>
              <div className="space-y-4">
                 {[
                   { perk: '0% FX Fees', cost: '15,000 XP', active: false },
                   { perk: 'Priority Support', cost: 'Active Lv. 20', active: true },
                 ].map((p) => (
                   <div key={p.perk} className="flex items-center justify-between p-4 rounded-2.5xl bg-slate-50 border border-slate-100">
                      <div>
                         <p className="text-sm font-black text-slate-900">{p.perk}</p>
                         <p className="text-[10px] font-bold text-slate-400">{p.cost}</p>
                      </div>
                      <ChevronRight className={cn("w-5 h-5", p.active ? "text-emerald-500" : "text-slate-300")} />
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-blue-600 font-black uppercase text-xs tracking-widest group">
                 Redeem Perks <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Lock, History } from 'lucide-react';
