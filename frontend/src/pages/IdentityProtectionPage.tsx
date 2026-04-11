import React, { useState } from 'react';
import { 
  ShieldAlert, 
  UserCheck, 
  Lock, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Fingerprint, 
  Eye, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  AlertTriangle,
  Mail,
  Smartphone,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function IdentityProtectionPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Identity Guard</h1>
          <p className="text-slate-500 font-medium italic">Dark web monitoring, identity theft protection, and credential restoration.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <ShieldAlert className="w-4 h-4 mr-2" /> Scan Dark Web
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <UserCheck className="w-4 h-4 mr-2" /> Verify ID
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Protection Score & Alerts */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" /> Protection Status
                 </h3>
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Monitoring Enabled
                 </span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-12">
                 <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                       <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - 0.94)} className="text-emerald-500" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-5xl font-black text-slate-900 tracking-tighter">94</span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Score</span>
                    </div>
                 </div>

                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {[
                      { label: 'Monitored Assets', val: '42 items', icon: Globe },
                      { label: 'Recent Breaches', val: '0 detected', icon: AlertTriangle },
                      { label: 'SSN Status', val: 'Protected', icon: Fingerprint },
                      { label: 'Email Defense', val: 'Advanced', icon: Mail },
                    ].map((item) => (
                      <div key={item.label} className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center gap-4">
                         <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <item.icon className="w-5 h-5 text-indigo-600" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                            <p className="text-sm font-black text-slate-900">{item.val}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-sm font-black italic">Active Monitoring Logs</h4>
                 <div className="space-y-4">
                    {[
                      { source: 'Dark Web Scan', status: 'Clear', time: '10m ago' },
                      { source: 'Credit File Lock', status: 'Secured', time: '1h ago' },
                      { source: 'Data Broker Removal', status: 'In Progress', time: '4h ago' },
                    ].map((log) => (
                      <div key={log.source} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                               <Scan className="w-5 h-5 text-indigo-500" />
                            </div>
                            <span className="text-xs font-black text-slate-900 italic">{log.source}</span>
                         </div>
                         <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{log.status}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{log.time}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Restoration Concierge */}
           <div className="bg-slate-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40 border border-white/5">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/10 blur-[150px] -mr-64 -mt-64" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-3xl font-black italic tracking-tighter">Identity Restoration</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">24/7 dedicated caseworker support for credential recovery.</p>
                    </div>
                    <Smartphone className="w-12 h-12 text-indigo-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
                       <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto">
                          <Eye className="w-8 h-8 text-indigo-400" />
                       </div>
                       <h4 className="text-lg font-black italic">Wallet Theft Kill-Switch</h4>
                       <p className="text-xs text-white/40 font-medium leading-relaxed">
                          Lost your physical wallet? One click alerts all issuers, freezes credit, and starts document replacement.
                       </p>
                       <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest transition-all">
                          Activate Kill-Switch
                       </Button>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-indigo-500/10 border border-indigo-500/20 space-y-6">
                       <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                          <Lock className="w-8 h-8 text-emerald-400" />
                       </div>
                       <h4 className="text-lg font-black italic">Credential Vault</h4>
                       <p className="text-xs text-white/40 font-medium leading-relaxed">
                          Securely store encrypted copies of passports, visas, and certifications with multi-sig recovery.
                       </p>
                       <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-all">
                          Manage Vault
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Security News & Protection Plans */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Zap className="w-4 h-4 text-orange-500" /> Threat Intelligence
              </h4>
              <div className="space-y-4">
                 {[
                   { title: 'New Ransomware Variant', severity: 'Critical' },
                   { title: 'Data Broker Database Leak', severity: 'High' },
                   { title: 'Phishing Campaign: Tax Hub', severity: 'Medium' },
                 ].map((news) => (
                   <div key={news.title} className="p-5 rounded-2.5xl bg-slate-50 border border-slate-100 space-y-2 group cursor-pointer hover:border-orange-200 transition-all">
                      <div className="flex justify-between items-center">
                         <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-full", 
                            news.severity === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                            news.severity === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600')}>
                            {news.severity}
                         </span>
                         <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-orange-500 transition-colors" />
                      </div>
                      <p className="text-xs font-black text-slate-800 leading-tight italic">{news.title}</p>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full text-indigo-600 font-bold uppercase text-[10px] tracking-widest mt-2 group">
                    See All Alerts <ChevronRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-indigo-700 to-indigo-950 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <ShieldAlert className="w-10 h-10 text-indigo-300" />
                 <div>
                    <h4 className="text-xl font-black italic">Family Protection</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       Extend monitoring and restoration services to up to 5 family members including children.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-indigo-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Upgrade to Elite
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-4 flex flex-col items-center text-center">
              <Globe2 className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic tracking-tight">Global Removal</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-4 leading-relaxed">
                 We've sent 14 automated opt-out requests to data brokers on your behalf this month.
              </p>
              <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest mt-2">
                 View Data Brokers
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
