import React, { useState } from 'react';
import { 
  Users, 
  Split, 
  Users2, 
  MessageCircle, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  Heart, 
  MessageSquare,
  Repeat,
  ShieldCheck,
  Zap,
  Clock,
  ChevronRight,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FeedItem {
  id: string;
  user: { name: string, avatar: string };
  action: string;
  amount?: string;
  recipient?: string;
  time: string;
  likes: number;
  comments: number;
}

export default function SocialBankingPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'requests'>('feed');

  const feedItems: FeedItem[] = [
    { id: '1', user: { name: 'Sarah Wilson', avatar: 'SW' }, action: 'paid for', amount: '£12.50', recipient: 'Friday Drinks 🍺', time: '2m ago', likes: 12, comments: 2 },
    { id: '2', user: { name: 'James Chen', avatar: 'JC' }, action: 'split', amount: '£45.00', recipient: 'Dinner at Nobu 🍱', time: '1h ago', likes: 24, comments: 5 },
    { id: '3', user: { name: 'Elena Rodriguez', avatar: 'ER' }, action: 'saved', amount: '£200.00', recipient: 'Ibiza Trip 🏝️', time: '3h ago', likes: 56, comments: 8 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Social Banking</h1>
          <p className="text-slate-500 font-medium">Split bills, track group expenses, and save together.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-blue-600/20">
              <Split className="w-4 h-4 mr-2" /> Split New Bill
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Plus className="w-4 h-4 mr-2" /> New Group
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Feed & Groups */}
        <div className="lg:col-span-8 space-y-8">
           {/* Tabs Navigation */}
           <div className="flex bg-slate-100 p-1.5 rounded-[2rem] w-fit border border-slate-200 shadow-inner">
              {[
                { id: 'feed', label: 'Activity Feed', icon: MessageCircle },
                { id: 'groups', label: 'Groups & Pools', icon: Users2 },
                { id: 'requests', label: 'Pending Requests', icon: Repeat },
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

           {activeTab === 'feed' && (
             <div className="space-y-4">
                {feedItems.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                           <span className="text-sm font-black text-blue-600">{item.user.avatar}</span>
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-black text-slate-900 leading-tight">
                              {item.user.name} <span className="font-bold text-slate-400">{item.action}</span> {item.recipient}
                           </p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.time}</p>
                        </div>
                        {item.amount && (
                          <div className="text-right">
                             <p className="text-lg font-black text-slate-900">{item.amount}</p>
                          </div>
                        )}
                     </div>
                     
                     <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">
                           <Heart className="w-3.5 h-3.5" /> {item.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors">
                           <MessageSquare className="w-3.5 h-3.5" /> {item.comments}
                        </button>
                        <button className="ml-auto p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                           <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                     </div>
                  </div>
                ))}
             </div>
           )}

            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-2 duration-500">
                 {[
                   { name: 'Ibiza Trip 🏝️', balance: '£1,420 / £2,500', members: 6, color: 'bg-emerald-500' },
                   { name: 'Rent & Utilities 🏠', balance: '£850 / £850', members: 3, color: 'bg-blue-600', completed: true },
                   { name: 'Dinner Group 🍱', balance: '£42.50', members: 4, color: 'bg-amber-500' },
                 ].map((group) => (
                   <div key={group.name} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
                      <div className={cn("absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 -mr-8 -mt-8", group.color)} />
                      <div className="flex justify-between items-start mb-8 relative z-10">
                         <div className={cn("p-3 rounded-2.5xl text-white shadow-lg", group.color)}>
                            <Users2 className="w-6 h-6" />
                         </div>
                         <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                                 {String.fromCharCode(64 + i)}
                              </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                               +{group.members - 3}
                            </div>
                         </div>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{group.name}</h3>
                      <div className="space-y-2">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Pool Balance</span>
                            <span className="text-slate-900">{group.balance}</span>
                         </div>
                         <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={cn("h-full transition-all duration-1000", group.color, group.completed ? 'w-full' : 'w-3/5')} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500">
                 {[
                   { name: 'Dinesh K.', for: 'Uber to Airport', amount: '£18.50', time: '12h ago', status: 'Pending' },
                   { name: 'Chloe M.', for: 'Birthday Gift', amount: '£40.00', time: '1d ago', status: 'Pending' },
                   { name: 'Marcus T.', for: 'Joint Pizza Night', amount: '£12.00', time: '3d ago', status: 'Action Required' },
                 ].map((req) => (
                   <div key={req.name + req.for} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-orange-200 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                            <Repeat className="w-5 h-5 text-slate-400" />
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-900">{req.name}</p>
                            <p className="text-xs text-slate-400 font-medium italic">"{req.for}"</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-slate-900">{req.amount}</p>
                         <div className="flex gap-2 mt-2">
                            <Button className="bg-blue-600 text-white rounded-xl px-4 py-1.5 font-black text-[10px] uppercase h-8">Pay</Button>
                            <Button variant="ghost" className="rounded-xl px-4 py-1.5 font-bold text-[10px] uppercase h-8 text-slate-400">Decline</Button>
                         </div>
                      </div>
                   </div>
                 ))}
                 <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No more pending requests</p>
                 </div>
              </div>
            )}

        {/* Right Column: Challenges & Requests */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-blue-950 p-8 rounded-[3rem] text-white shadow-2xl shadow-blue-900/40 group overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-600/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <Target className="w-8 h-8 text-blue-400" />
                    <span className="bg-emerald-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">LIVE</span>
                 </div>
                 <div>
                    <h4 className="text-xl font-black mb-1">Savings Challenge</h4>
                    <p className="text-blue-200/60 text-sm font-medium">Save £200 this week with friends to unlock the "Elite Saver" badge.</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                    <div className="text-center flex-1">
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Rank</p>
                       <p className="text-lg font-black mt-0.5">#4</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center flex-1">
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Reward</p>
                       <p className="text-lg font-black mt-0.5">50 XP</p>
                    </div>
                 </div>
                 <Button className="w-full bg-white text-blue-950 hover:bg-blue-50 font-black rounded-2xl py-6 uppercase text-xs tracking-widest active:scale-95 transition-all">
                    Join Challenge
                 </Button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                 <Repeat className="w-4 h-4 text-blue-600" /> Payment Requests
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Dinesh K.', for: 'Uber to Airport', amount: '£18.50', time: '12h ago' },
                   { name: 'Chloe M.', for: 'Birthday Gift', amount: '£40.00', time: '1d ago' },
                 ].map((req) => (
                   <div key={req.name} className="p-4 rounded-2.5xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <p className="text-sm font-black text-slate-900">{req.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 italic">"{req.for}"</p>
                         </div>
                         <p className="text-sm font-black text-slate-900">{req.amount}</p>
                      </div>
                      <div className="flex gap-2">
                         <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-4 font-black text-[10px] uppercase h-9 shadow-lg shadow-blue-600/10">Pay Now</Button>
                         <Button variant="ghost" className="rounded-xl px-4 py-4 font-bold text-[10px] uppercase h-9 text-slate-400">Ignore</Button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
