import React, { useState } from 'react';
import { 
  Heart, 
  Scroll, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Users, 
  Key, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  Gavel,
  Fingerprint,
  Anchor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function LegacyPlanningPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Legacy Hub</h1>
          <p className="text-slate-500 font-medium italic">Estate planning, digital inheritance, and philanthropic directives.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> New Directive
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Scroll className="w-4 h-4 mr-2" /> View Will
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Estate Overview */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-rose-500" /> Generational Wealth Transfer
                 </h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-inner py-1.5 px-4 rounded-full bg-slate-50">Legal Status: VERIFIED</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { label: 'Assigned Heirs', val: '4 members', status: 'Active' },
                   { label: 'Asset coverage', val: '84%', status: 'Updating' },
                   { label: 'Succession Logic', val: 'Multi-Sig', status: 'Secured' },
                 ].map((box) => (
                   <div key={box.label} className="p-8 rounded-[2.5xl] bg-slate-50 border border-slate-100 flex flex-col justify-between group hover:bg-slate-900 hover:border-slate-900 transition-all cursor-pointer">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-500 transition-colors">{box.label}</p>
                         <h4 className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors mt-1">{box.val}</h4>
                      </div>
                      <span className="text-[9px] font-black uppercase text-indigo-600 group-hover:text-indigo-400 mt-4">{box.status}</span>
                   </div>
                 ))}
              </div>

              <div className="space-y-6">
                 <h4 className="text-sm font-black italic">Succession Path</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Primary Beneficiary', share: '60%', heir: 'Sarah J. (Child)' },
                      { name: 'Secondary Trust', share: '30%', heir: 'PathGuard Trust Fund' },
                    ].map(path => (
                      <div key={path.name} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm flex items-center justify-between">
                         <div>
                            <p className="text-xs font-black text-slate-900">{path.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 italic">{path.heir}</p>
                         </div>
                         <div className="text-right text-lg font-black text-indigo-600 tracking-tighter">
                            {path.share}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Digital Afterlife & Vault */}
           <div className="bg-slate-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40 border border-white/5">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-rose-600/10 blur-[150px] -mr-64 -mt-64" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-3xl font-black italic tracking-tighter">Digital Legacy Vault</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Automated transfer of private keys, platform credentials, and digital archives.</p>
                    </div>
                    <Key className="w-12 h-12 text-rose-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 space-y-6">
                       <h4 className="text-sm font-black italic">Trigger Logic</h4>
                       <div className="space-y-4">
                          {[
                            { event: 'Inactivity Period', val: '180 Days' },
                            { event: 'Legal Proof of Passing', val: 'Required' },
                            { event: 'Manual Dead-Man Switch', val: 'Enabled' },
                          ].map(t => (
                            <div key={t.event} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">
                               <span>{t.event}</span>
                               <span className="text-white">{t.val}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-6">
                       <p className="text-xs text-white/40 font-medium leading-relaxed italic">
                          "Ensure my digital memories and crypto-assets are transferred only after 6 months of absolute account inactivity."
                       </p>
                       <Button className="bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-all shadow-xl">
                          Configure Triggers
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Philanthropy & Legal */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Gavel className="w-4 h-4 text-slate-900" /> Legal Compliance
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Last Will & Testament', status: 'Electronically Notarized' },
                   { name: 'Medical Directive', status: 'Signed' },
                   { name: 'Power of Attorney', status: 'Pending Review' },
                 ].map((doc) => (
                   <div key={doc.name} className="p-5 rounded-2.5xl bg-slate-50 border border-slate-100 flex flex-col gap-1 group cursor-pointer hover:border-indigo-200 transition-all">
                      <span className="text-xs font-black text-slate-900">{doc.name}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase italic">{doc.status}</span>
                   </div>
                 ))}
                 <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest mt-2 hover:bg-indigo-50">
                    Add Legal Witness
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-rose-950 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Anchor className="w-10 h-10 text-rose-300" />
                 <div>
                    <h4 className="text-xl font-black italic">Philanthropic Impact</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       Allocate a percentage of your estate to climate research or community funds automatically.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-rose-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Set Endowments
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-4 flex flex-col items-center text-center">
              <Users className="w-10 h-10 text-slate-200" />
              <h4 className="text-lg font-black text-slate-900 italic tracking-tight">Family Access</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-4 leading-relaxed">
                 Invite your trusted heirs to view their future holdings and receive orientation.
              </p>
              <Button variant="ghost" className="w-full text-indigo-600 font-bold uppercase text-[10px] tracking-widest group px-0 pt-2">
                 Invite Heirs <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
