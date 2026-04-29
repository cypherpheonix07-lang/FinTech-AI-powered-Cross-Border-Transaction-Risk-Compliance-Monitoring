import React, { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  Globe2, 
  Briefcase, 
  Palmtree, 
  Clock, 
  Coffee, 
  Camera, 
  CreditCard,
  Ticket,
  Utensils
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TravelPlan {
  id: string;
  destination: string;
  dates: string;
  status: 'Confirmed' | 'Draft' | 'Past';
  type: 'Leisure' | 'Business';
  image: string;
  color: string;
}

export default function TravelLifestylePage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const travels: TravelPlan[] = [
    { id: '1', destination: 'Tokyo, Japan', dates: 'Oct 12 - Oct 24', status: 'Confirmed', type: 'Leisure', image: '🗼', color: 'bg-rose-500' },
    { id: '2', destination: 'Zurich, Switzerland', dates: 'Dec 05 - Dec 09', status: 'Draft', type: 'Business', image: '🏔️', color: 'bg-blue-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Travel & Lifestyle</h1>
          <p className="text-slate-500 font-medium italic">Your global companion for elite experiences and seamless mobility.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Book Experience
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Compass className="w-4 h-4 mr-2" /> PathGuard Concierge
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Travel Itineraries */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Plane className="w-6 h-6 text-blue-600" /> Planned Mobility
                 </h3>
                 <div className="flex bg-slate-100 p-1 rounded-2xl">
                    <button 
                      onClick={() => setActiveTab('upcoming')}
                      className={cn(
                        "px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all",
                        activeTab === 'upcoming' ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Active
                    </button>
                    <button 
                      onClick={() => setActiveTab('past')}
                      className={cn(
                        "px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all",
                        activeTab === 'past' ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Past
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {travels
                   .filter(plan => activeTab === 'upcoming' ? plan.status !== 'Past' : plan.status === 'Past')
                   .map((plan) => (
                   <div key={plan.id} className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group overflow-hidden flex flex-col cursor-pointer">
                      <div className={cn("h-40 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-700", plan.color)}>
                         {plan.image}
                      </div>
                      <div className="p-8 space-y-4">
                         <div className="flex justify-between items-start">
                            <div>
                               <h4 className="text-lg font-black text-slate-900">{plan.destination}</h4>
                               <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mt-1">
                                  <Clock className="w-3.5 h-3.5" /> {plan.dates}
                               </div>
                            </div>
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">{plan.type}</span>
                         </div>
                         <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                               <ShieldCheck className="w-3.5 h-3.5" /> Insurance Active
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                         </div>
                      </div>
                   </div>
                 ))}
                 {travels.filter(plan => activeTab === 'upcoming' ? plan.status !== 'Past' : plan.status === 'Past').length === 0 && (
                   <div className="col-span-2 py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">No {activeTab} adventures found.</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Lifestyle Perks */}
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Elite Lifestyle Access</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Curated private experiences and airport lounge access.</p>
                    </div>
                    <Ticket className="w-10 h-10 text-blue-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: Utensils, label: 'Dining', desc: 'No-wait list' },
                      { icon: Coffee, label: 'Lounge', desc: 'DragonPass' },
                      { icon: Camera, label: 'Arts', desc: 'VIP Previews' },
                    ].map((perk) => (
                      <div key={perk.label} className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                         <perk.icon className="w-6 h-6 text-blue-400 mb-3" />
                         <h4 className="text-sm font-black text-white">{perk.label}</h4>
                         <p className="text-[10px] text-white/40 font-bold mt-1 uppercase tracking-tighter">{perk.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Mobility Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Palmtree className="w-4 h-4 text-emerald-500" /> Holiday Savings Pool
              </h4>
              <div className="text-center p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target: Maldives 2026</p>
                 <h4 className="text-3xl font-black text-slate-900 tracking-tighter">£4,200<span className="text-sm text-slate-400">/£8.5k</span></h4>
                 <div className="mt-6">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 rounded-full" style={{ width: '49%' }} />
                    </div>
                 </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20">
                 Increase Daily Rounds
              </Button>
           </div>

           <div className="p-8 rounded-[3.5rem] bg-gradient-to-br from-indigo-800 to-slate-950 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Globe2 className="w-10 h-10 text-rose-400" />
                 <div>
                    <h4 className="text-lg font-black italic">Travel Health Map</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic">Real-time risk monitoring for your upcoming Japan trip. No alerts detected.</p>
                 </div>
                 <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest px-0 flex items-center gap-2 group">
                    View Live Intel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <CreditCard className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic">One-Time Virtual Card</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Safe Travel Spending</p>
              <Button variant="outline" className="w-full border-slate-200 text-slate-950 font-black rounded-xl py-6 uppercase text-xs tracking-widest mt-2 hover:bg-slate-950 hover:text-white transition-all">
                 Generate Card
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
