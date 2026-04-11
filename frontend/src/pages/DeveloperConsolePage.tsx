import React, { useState } from 'react';
import { 
  Terminal, 
  Key, 
  Code2, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Cpu, 
  Webhook, 
  Server, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  Database,
  ExternalLink,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DeveloperConsolePage() {
  const [activeTab, setActiveTab] = useState('keys');

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Developer Console</h1>
          <p className="text-slate-500 font-medium italic">API keys, webhook management, and sandbox environments.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Create API Key
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6 text-blue-600">
              <BookOpen className="w-4 h-4 mr-2" /> Docs
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* API & Webhook Management */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
                 {['Keys', 'Webhooks', 'Logs', 'Sandbox'].map((t) => (
                   <button 
                     key={t}
                     onClick={() => setActiveTab(t.toLowerCase())}
                     className={cn(
                       "px-8 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all",
                       activeTab === t.toLowerCase() ? "bg-white shadow-md text-slate-900" : "text-slate-400 hover:text-slate-600"
                     )}
                   >
                     {t}
                   </button>
                 ))}
              </div>

              <div className="space-y-8">
                 {activeTab === 'keys' && (
                   <div className="space-y-6">
                      <h4 className="text-sm font-black italic">Active API Keys</h4>
                      <div className="space-y-4">
                         {[
                           { name: 'Production Main', key: 'pk_live_********************42', created: '20 Oct 2025' },
                           { name: 'Staging App', key: 'pk_test_********************84', created: '14 Nov 2025' },
                         ].map(k => (
                           <div key={k.name} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group group-hover:border-blue-200 transition-all">
                              <div>
                                 <p className="text-xs font-black text-slate-900">{k.name}</p>
                                 <code className="text-[10px] font-mono text-slate-400 mt-1 block">{k.key}</code>
                              </div>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg bg-white border border-slate-200"><Copy className="w-3.5 h-3.5" /></Button>
                                 <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg bg-white border border-slate-200"><Lock className="w-3.5 h-3.5" /></Button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {activeTab === 'webhooks' && (
                   <div className="space-y-6">
                      <h4 className="text-sm font-black italic">Webhook Endpoints</h4>
                      <div className="p-10 rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center text-center space-y-4">
                         <Webhook className="w-10 h-10 text-slate-200" />
                         <p className="text-xs text-slate-400 font-medium">No external webhooks configured yet.</p>
                         <Button className="bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest px-8">Add Endpoint</Button>
                      </div>
                   </div>
                 )}
              </div>
           </div>

           {/* API Usage & Analytics */}
           <div className="bg-slate-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40 border border-white/5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Traffic Intelligence</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Real-time API request patterns and terminal latency.</p>
                    </div>
                    <Activity className="w-10 h-10 text-blue-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="grid grid-cols-2 gap-6 w-full">
                       {[
                         { label: 'Requests', val: '84.2K', color: 'text-white' },
                         { label: 'Avg Latency', val: '12ms', color: 'text-emerald-400' },
                         { label: 'Error Rate', val: '0.002%', color: 'text-rose-400' },
                         { label: 'Data Egress', val: '12.4 GB', color: 'text-blue-400' },
                       ].map(track => (
                         <div key={track.label}>
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{track.label}</p>
                            <p className={cn("text-2xl font-black tracking-tighter", track.color)}>{track.val}</p>
                         </div>
                       ))}
                    </div>
                    <div className="bg-white/5 rounded-[3rem] p-8 border border-white/10 space-y-6 flex flex-col justify-center">
                       <h4 className="text-sm font-black italic">System Health</h4>
                       <div className="space-y-4">
                          {[
                            { label: 'API Gateway', status: 'Optimal' },
                            { label: 'Auth Service', status: 'Optimal' },
                            { label: 'Database Mesh', status: 'Optimal' },
                          ].map(s => (
                            <div key={s.label} className="flex justify-between items-center">
                               <span className="text-[10px] font-bold text-white/40">{s.label}</span>
                               <span className="text-[10px] font-black text-emerald-400 uppercase">{s.status}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: SDKs & Environment */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Code2 className="w-4 h-4 text-blue-600" /> SDK & Libraries
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'PathGuard Node SDK', lang: 'JavaScript' },
                   { name: 'PathGuard-Py', lang: 'Python' },
                   { name: 'Native iOS Hub', lang: 'Swift' },
                 ].map((sdk) => (
                   <div key={sdk.name} className="p-5 rounded-2.5xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-all">
                      <div>
                         <p className="text-xs font-black text-slate-900">{sdk.name}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{sdk.lang}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full rounded-2xl py-6 border-slate-200 font-black text-xs uppercase tracking-widest mt-2 bg-slate-50 border-dashed border-2 text-slate-400">
                    Request Go SDK
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-indigo-950 text-white relative overflow-hidden shadow-xl shadow-indigo-900/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px]" />
              <div className="relative z-10 space-y-6 italic">
                 <Zap className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black tracking-tight">Rapid Sandbox</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 shadow-inner">
                       Launch a full isolated banking environment for testing your logic without moving real funds.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-indigo-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Spin Up Sandbox
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <Database className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic">Data Export</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-4 leading-relaxed">
                 Schedule daily CSV, JSON or Parquet exports of your merchant activity.
              </p>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 Manage Streams <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

// Missing Lucide icons used in the UI
const BookOpen = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const Copy = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
