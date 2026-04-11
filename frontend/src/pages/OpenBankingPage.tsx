import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Link, 
  Unlink, 
  Activity, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  Smartphone, 
  Building2, 
  Globe2, 
  ArrowRight,
  Database,
  ArrowUpRight,
  Shield,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ConnectedBank {
  id: string;
  name: string;
  balance: number;
  currency: string;
  status: 'Synced' | 'Relinking Required' | 'Syncing';
  lastSync: string;
  logoColor: string;
}

export default function OpenBankingPage() {
  const [banks, setBanks] = useState<ConnectedBank[]>([
    { id: '1', name: 'HSBC Premium', balance: 12450.80, currency: 'GBP', status: 'Synced', lastSync: '2m ago', logoColor: 'bg-red-600' },
    { id: '2', name: 'Chase Sapphire', balance: 8900.00, currency: 'USD', status: 'Synced', lastSync: '1h ago', logoColor: 'bg-blue-600' },
    { id: '3', name: 'Revolut Ultra', balance: 450.25, currency: 'EUR', status: 'Relinking Required', lastSync: '3 days ago', logoColor: 'bg-slate-900' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Open Banking Aggregator</h1>
          <p className="text-slate-500 font-medium italic">Unify all your accounts into one secure, real-time command center.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Connect New Bank
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <RefreshCw className="w-4 h-4 mr-2" /> Sync All
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Connected Accounts List */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">External Connections</h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3 Active Nodes</span>
              </div>
              <div className="divide-y divide-slate-50">
                 {banks.map((bank) => (
                   <div key={bank.id} className="p-8 flex items-center gap-8 hover:bg-slate-50 transition-colors group">
                      <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white font-black text-xl transition-all group-hover:scale-110", bank.logoColor)}>
                         {bank.name[0]}
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900 text-lg">{bank.name}</h4>
                         <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Last Synced: {bank.lastSync}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                         <p className="text-xl font-black text-slate-900 tracking-tight">{bank.currency} {bank.balance.toLocaleString()}</p>
                         <span className={cn(
                           "text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest",
                           bank.status === 'Synced' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                         )}>
                            {bank.status}
                         </span>
                      </div>
                      <Button variant="ghost" className="p-2 h-10 w-10 text-slate-300 hover:text-red-500 transition-all rounded-xl">
                         {bank.status === 'Synced' ? <Unlink className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
                      </Button>
                   </div>
                 ))}
              </div>
           </div>

           {/* Data Intelligence Hook */}
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Financial Data Mesh</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Unified transaction feed from all 12+ connected providers.</p>
                    </div>
                    <Database className="w-10 h-10 text-blue-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Aggregated Flow', value: '£42,800', change: '+12%', icon: ArrowUpRight },
                      { label: 'Avg Fee %', value: '0.04%', change: '-2%', icon: ArrowRight },
                      { label: 'Sync Health', value: '98.2%', change: 'Stable', icon: Activity },
                    ].map((m) => (
                      <div key={m.label} className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-3">
                         <div className="flex justify-between">
                            <m.icon className="w-5 h-5 text-blue-400" />
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">{m.change}</span>
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">{m.label}</p>
                            <p className="text-2xl font-black">{m.value}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="p-6 rounded-[2rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <ShieldCheck className="w-6 h-6 text-blue-500" />
                       <span className="text-sm font-medium">All data is TLS 1.3 encrypted and PSD2 compliant.</span>
                    </div>
                    <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest px-0">Privacy Mesh Settings</Button>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Aggregation Status */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Building2 className="w-4 h-4 text-blue-600" /> Partner Coverage
              </h4>
              <div className="space-y-4">
                 <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <Globe2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h5 className="text-sm font-black text-slate-900 italic">450+ Institutions</h5>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ready to Connect</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                       <Zap className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Smart Suggestion</span>
                    </div>
                    <p className="text-[10px] font-medium text-blue-800 leading-relaxed">
                       PathGuard can auto-detect missing bank accounts by scanning your email receipts. Enable "PathFinder"?
                    </p>
                    <Button variant="ghost" className="w-full text-blue-600 font-black text-[9px] uppercase tracking-widest hover:text-blue-700 h-8">Enable PathFinder</Button>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[3.5rem] bg-gradient-to-br from-blue-700 to-indigo-900 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Smartphone className="w-8 h-8 text-white" />
                 <div>
                    <h4 className="text-lg font-black italic">Dynamic Pay-By-Bank</h4>
                    <p className="text-white/60 text-xs font-medium leading-relaxed">Move funds directly between external accounts without manual wire transfers.</p>
                 </div>
                 <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest px-0 flex items-center gap-2 group">
                    View Direct Pay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Consent History</h4>
              <div className="space-y-4">
                 {[
                   { event: 'Access Renewed', target: 'HSBC', it: '12d ago' },
                   { event: 'New Link', target: 'Chase', it: 'Yesterday' },
                 ].map((e) => (
                   <div key={e.target} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="flex-1 flex justify-between">
                         <span className="text-xs font-bold text-slate-600">{e.event} ({e.target})</span>
                         <span className="text-[9px] font-medium text-slate-400">{e.it}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest">
                 Manage All Permissions
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
