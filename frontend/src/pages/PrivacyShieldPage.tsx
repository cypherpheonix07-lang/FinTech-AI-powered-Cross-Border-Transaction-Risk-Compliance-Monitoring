import React, { useState } from 'react';
import { 
  ShieldCheck, 
  EyeOff, 
  Lock, 
  Ghost, 
  Database, 
  Activity, 
  History, 
  ChevronRight, 
  Zap, 
  AlertCircle,
  Fingerprint,
  Users,
  Globe2,
  Trash2,
  RefreshCw,
  Search,
  ShieldAlert,
  ServerOff,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function PrivacyShieldPage() {
  const [isAnonymizing, setIsAnonymizing] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Shield</h1>
          <p className="text-slate-500 font-medium italic">Control your digital footprint and anonymize your financial data.</p>
        </div>
        <div className="flex gap-2">
           <Button 
            variant="outline" 
            onClick={() => { setIsAnonymizing(true); setTimeout(() => setIsAnonymizing(false), 2000); }}
            className="rounded-2xl border-slate-200 font-black text-xs px-6 py-6"
           >
              <RefreshCw className={cn("w-4 h-4 mr-2", isAnonymizing && "animate-spin")} />
              Cycle Virtual ID
           </Button>
           <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-indigo-600/20">
              <Ghost className="w-4 h-4 mr-2" /> Enable Stealth Mode
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Privacy Controls */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black">Data Anonymization Engine</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Strip PII (Personally Identifiable Information) from all outgoing transaction metadata.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                       <Database className="w-8 h-8 text-indigo-400" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <EyeOff className="w-6 h-6 text-indigo-400" />
                          <Switch checked={true} />
                       </div>
                       <h4 className="text-lg font-black">Merchant Masking</h4>
                       <p className="text-xs text-white/40 mt-1 leading-relaxed">Merchants only see a one-time virtual card holder name: "PathGuard User #842".</p>
                    </div>
                    <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <Globe2 className="w-6 h-6 text-indigo-400" />
                          <Switch checked={true} />
                       </div>
                       <h4 className="text-lg font-black">IP Obfuscation</h4>
                       <p className="text-xs text-white/40 mt-1 leading-relaxed">Route your app traffic through our zero-log global privacy mesh.</p>
                    </div>
                 </div>

                 <div className="p-6 rounded-[2rem] bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <ShieldCheck className="w-6 h-6 text-indigo-500" />
                       <span className="text-sm font-medium">Your Privacy Rating: <span className="text-indigo-400 font-black">ULTIMATE</span></span>
                    </div>
                    <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest px-0">Security Audit</Button>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">Digital Rights & Requests</h3>
                 <Button variant="ghost" className="text-blue-600 font-black uppercase text-xs tracking-widest flex items-center gap-2">
                    GDPR Dashboard <Search className="w-4 h-4" />
                 </Button>
              </div>
              <div className="divide-y divide-slate-50">
                 {[
                   { label: 'Right to be Forgotten', icon: Trash2, desc: 'Purge your history from non-essential nodes.', status: 'Ready' },
                   { label: 'Data Portability', icon: RefreshCw, desc: 'Export full financial history in encrypted JSON.', status: 'Exporting...' },
                   { label: 'Consent Manager', icon: UserCheck, desc: 'Review 3rd party API access permissions.', status: '12 Active' },
                 ].map((item) => (
                   <div key={item.label} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                         <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900">{item.label}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 uppercase tracking-widest">{item.status}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-indigo-600 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Side Column: Privacy Intel */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4 text-red-500" /> Leakage Monitor
              </h4>
              <div className="space-y-4">
                 <div className="flex flex-col items-center text-center p-6 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                       <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h5 className="text-sm font-black text-slate-900">No Leaks Found</h5>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Cross-referenced with 14,000 public data dumps.</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 space-y-2">
                    <div className="flex items-center gap-2 text-orange-600">
                       <AlertCircle className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Privacy Tip</span>
                    </div>
                    <p className="text-[10px] font-medium text-orange-800 leading-relaxed">
                       You have 3 inactive subscriptions sharing data with 3rd parties. Revoke access?
                    </p>
                    <Button variant="ghost" className="w-full text-orange-600 font-black text-[9px] uppercase tracking-widest hover:text-orange-700 h-8">Resolve Now</Button>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[3.5rem] bg-gradient-to-br from-indigo-900 to-slate-900 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <ServerOff className="w-8 h-8 text-indigo-400" />
                 <div>
                    <h4 className="text-lg font-black">Zero-Knowledge Cloud</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">Even PathGuard engineers cannot view your balance. All storage is end-to-end encrypted with your local keys.</p>
                 </div>
                 <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest px-0 flex items-center gap-2">
                    Transparency Report <ArrowRight className="w-4 h-4" />
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Recent Privacy Events</h4>
              <div className="space-y-4">
                 {[
                   { event: 'ID Rotation', time: '2h ago', icon: RefreshCw },
                   { event: 'Metadata Purge', time: 'Yesterday', icon: Trash2 },
                 ].map((e) => (
                   <div key={e.event} className="flex items-center gap-3">
                      <e.icon className="w-3.5 h-3.5 text-slate-400" />
                      <div className="flex-1 flex justify-between">
                         <span className="text-xs font-bold text-slate-600">{e.event}</span>
                         <span className="text-[10px] font-medium text-slate-400">{e.time}</span>
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
