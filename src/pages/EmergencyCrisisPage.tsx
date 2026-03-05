import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Activity, 
  History, 
  RefreshCw, 
  ArrowRight, 
  ChevronRight, 
  PhoneCall, 
  Zap, 
  ShieldOff, 
  LifeBuoy, 
  Siren, 
  Radio, 
  MapPin, 
  Clock,
  UserX,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function EmergencyCrisisPage() {
  const [isFreezeActive, setIsFreezeActive] = useState(false);
  const [countdown, setCountdown] = useState(100);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-rose-600 tracking-tight">Emergency & Crisis Hub</h1>
          <p className="text-slate-500 font-medium italic">Extreme measures for extreme situations. Rapid response protocols.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-2xl border-rose-200 text-rose-600 font-black text-xs px-6 py-6 hover:bg-rose-50">
              <PhoneCall className="w-4 h-4 mr-2" /> Concierge Hotline
           </Button>
           <Button className="bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-rose-600/20">
              <Siren className="w-4 h-4 mr-2 animate-pulse" /> Global Panic Button
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Freeze / Kill Switch */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-rose-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-rose-900/40 border-4 border-rose-600/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="space-y-2">
                       <h3 className="text-3xl font-black">THE KILL SWITCH</h3>
                       <p className="text-rose-100/40 text-sm font-medium">Instantly freeze all cards, transfers, and API access across all global nodes.</p>
                    </div>
                    <div className="p-6 bg-rose-600 text-white rounded-[2rem] shadow-xl shadow-rose-600/40 animate-pulse">
                       <ShieldOff className="w-10 h-10" />
                    </div>
                 </div>

                 <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-4">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-rose-400">
                          <span>Arming Sequence</span>
                          <span>{isFreezeActive ? 'ACTIVE' : 'READY'}</span>
                       </div>
                       <Progress value={isFreezeActive ? 100 : 0} className="h-4 bg-white/5" indicatorClassName="bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
                    </div>
                    <Button 
                      onClick={() => setIsFreezeActive(!isFreezeActive)}
                      className={cn(
                        "rounded-[2rem] px-12 py-8 font-black text-xs uppercase tracking-widest transition-all shadow-xl",
                        isFreezeActive ? "bg-white text-rose-600 hover:bg-rose-50" : "bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/30"
                      )}
                    >
                       {isFreezeActive ? 'REVERSE FREEZE' : 'INITIATE FREEZE'}
                    </Button>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Cloud API', status: 'Shielded' },
                      { label: 'SWIFT Link', status: 'Monitoring' },
                      { label: 'Card Rail', status: 'Shielded' },
                      { label: 'Auth Node', status: 'Protected' },
                    ].map((n) => (
                      <div key={n.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                         <p className="text-[8px] font-black text-rose-400 uppercase tracking-widest leading-none mb-1">{n.label}</p>
                         <p className="text-xs font-black text-white">{n.status}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] border border-rose-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-rose-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">Recovery Protocols</h3>
                 <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1.5 rounded-full">Secure Session</span>
              </div>
              <div className="divide-y divide-rose-50">
                 {[
                   { label: "Dead Man's Switch", desc: 'Auto-transfer to beneficiary after 90 days of inactivity.', icon: UserX, status: 'Inactive' },
                   { label: 'Biometric Affidavit', desc: 'Legally binding facial verification for large recoveries.', icon: UserCheck, status: 'Setup' },
                   { label: 'Off-Chain Seed Recovery', desc: 'Secure retrieval of post-quantum recovery keys.', icon: Lock, status: 'Encrypted' },
                 ].map((item) => (
                   <div key={item.label} className="p-6 flex items-center gap-6 hover:bg-rose-50/30 transition-colors group cursor-pointer">
                      <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                         <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900">{item.label}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.desc}</p>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black px-2 py-1 rounded-lg border border-rose-100 text-rose-500 uppercase tracking-widest">{item.status}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-rose-200 group-hover:text-rose-600 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Intelligence Side */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-rose-100 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
                 <Radio className="w-4 h-4 text-rose-600" /> Crisis Intel Feed
              </h4>
              <div className="space-y-4">
                 {[
                   { event: 'Phishing Surge noted in UK', risk: 'HIGH', time: '12m ago' },
                   { event: 'SWIFT Network Latency', risk: 'MED', time: '2h ago' },
                   { event: 'Identity Leak Probed', risk: 'LOW', time: 'Yesterday' },
                 ].map((e) => (
                   <div key={e.event} className="p-4 rounded-2.5xl bg-rose-50/50 border border-rose-100">
                      <div className="flex justify-between items-start mb-1 text-[10px] font-black">
                         <span className="text-rose-400">{e.time}</span>
                         <span className={cn(
                           e.risk === 'HIGH' ? "text-rose-600" : e.risk === 'MED' ? "text-orange-500" : "text-slate-400"
                         )}>{e.risk} RISK</span>
                      </div>
                      <h5 className="text-sm font-black text-slate-900 italic leading-tight break-words">{e.event}</h5>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-rose-600 font-bold uppercase text-[10px] tracking-widest">
                 Live Security Radar
              </Button>
           </div>

           <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <MapPin className="w-8 h-8 text-rose-400" />
                 <div>
                    <h4 className="text-lg font-black">Travel Protection</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">Traveling to a high-risk region? PathGuard's Geo-Fence will auto-adjust your security thresholds.</p>
                 </div>
                 <Button className="w-full bg-white text-slate-900 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-rose-50 transition-colors">
                    Plan Safe Travel
                 </Button>
              </div>
           </div>

           <div className="p-8 rounded-[3rem] bg-rose-50 border border-rose-100 flex flex-col items-center text-center space-y-4">
              <LifeBuoy className="w-12 h-12 text-rose-500 opacity-40 mb-2" />
              <h4 className="text-lg font-black text-rose-900">Concierge Verification</h4>
              <p className="text-xs text-slate-500 font-medium italic">Speak with a human security elite for multi-sig manual verification.</p>
              <Button variant="outline" className="w-full border-rose-200 text-rose-600 font-black rounded-xl py-6 uppercase text-xs tracking-widest mt-2 hover:bg-rose-600 hover:text-white transition-all">
                 Request Session
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
