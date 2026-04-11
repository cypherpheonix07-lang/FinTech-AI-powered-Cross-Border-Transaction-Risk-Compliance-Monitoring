import React, { useState } from 'react';
import { 
  Store, 
  CreditCard, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Briefcase, 
  PieChart, 
  Users, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  ArrowRight,
  Calculator,
  Receipt
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function MerchantHubPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Merchant Hub</h1>
          <p className="text-slate-500 font-medium italic">Integrated point-of-sale, invoicing, and global checkout management.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> New Invoice
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Store className="w-4 h-4 mr-2" /> POS Config
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Overview */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Receipt className="w-6 h-6 text-blue-600" /> Merchant Performance
                 </h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store: Main Street Branch</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { label: 'Gross Sales', val: '£142,420', trend: '+12.4%', color: 'text-emerald-500' },
                   { label: 'Refund Rate', val: '0.42%', trend: '-2.1%', color: 'text-blue-500' },
                   { label: 'Avg Ticket', val: '£84.20', trend: '+4.8%', color: 'text-slate-900' },
                 ].map((stat) => (
                   <div key={stat.label} className="p-8 rounded-[2.5xl] bg-slate-50 border border-slate-100 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</h4>
                      <p className={cn("text-[10px] font-black mt-2", stat.color)}>{stat.trend} from last month</p>
                   </div>
                 ))}
              </div>

              <div className="space-y-6">
                 <h4 className="text-sm font-black italic">Recent Batches</h4>
                 <div className="overflow-x-auto rounded-3xl border border-slate-100">
                    <table className="w-full text-left text-xs font-medium border-collapse">
                       <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                             <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Batch ID</th>
                             <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Sales</th>
                             <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Status</th>
                             <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {[
                            { id: 'BCH-0942', sales: '£12,400', status: 'Settled' },
                            { id: 'BCH-0941', sales: '£14,800', status: 'Settled' },
                            { id: 'BCH-0940', sales: '£9,240', status: 'Pending' },
                          ].map(batch => (
                            <tr key={batch.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                               <td className="px-6 py-4 font-black text-slate-900">{batch.id}</td>
                               <td className="px-6 py-4 text-slate-600">{batch.sales}</td>
                               <td className="px-6 py-4 font-black text-blue-600">{batch.status}</td>
                               <td className="px-6 py-4 text-slate-400">View Logs</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Invoicing Tools */}
           <div className="bg-slate-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-blue-900/40 border border-white/5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Smart Invoicing</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Cross-border tax-compliant invoicing with auto-reminders.</p>
                    </div>
                    <Briefcase className="w-10 h-10 text-blue-400" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-4">
                       <Calculator className="w-10 h-10 text-white/20" />
                       <h4 className="text-sm font-black italic">Tax & VAT Engine</h4>
                       <p className="text-[10px] text-white/40 font-medium">Automatic calculation for 140+ countries based on recent OECD updates.</p>
                       <Button variant="ghost" className="text-blue-400 font-black uppercase text-[10px] tracking-widest">Config Settings</Button>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Pending Payment Flow</h4>
                       {[
                         { client: 'Acme Corp', amount: '£12,400', due: '2d' },
                         { client: 'Globex Inc', amount: '£4,200', due: 'Overdue' },
                       ].map(inv => (
                         <div key={inv.client} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all">
                            <div>
                               <p className="text-xs font-black">{inv.client}</p>
                               <span className="text-[9px] font-bold text-white/40 uppercase">{inv.amount}</span>
                            </div>
                            <span className={cn("text-[10px] font-black", inv.due === 'Overdue' ? 'text-rose-400' : 'text-emerald-400')}>{inv.due}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Terminals & Integration */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-blue-600" /> Virtual Terminals
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Web Portal', status: 'Online' },
                   { name: 'Terminal #842', status: 'Offline' },
                   { name: 'Mobile POS', status: 'Online' },
                 ].map((t) => (
                   <div key={t.name} className="p-5 rounded-2.5xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-all">
                      <span className="text-xs font-black text-slate-900">{t.name}</span>
                      <div className="flex items-center gap-2">
                         <div className={cn("w-1.5 h-1.5 rounded-full", t.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300')} />
                         <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{t.status}</span>
                      </div>
                   </div>
                 ))}
                 <Button variant="outline" className="w-full rounded-2xl py-6 border-slate-200 font-black text-xs uppercase tracking-widest mt-2 hover:bg-blue-50 transition-colors">
                    Add Terminal
                 </Button>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-blue-700 to-indigo-900 text-white relative overflow-hidden shadow-xl shadow-blue-600/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Link className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black italic">Developer Hooks</h4>
                    <p className="text-white/40 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       Connect your custom store-front via our high-speed API or pre-built Shopify integration.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-blue-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Get API Credentials
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner flex flex-col items-center text-center space-y-4">
              <Plus className="w-10 h-10 text-slate-300 opacity-40" />
              <h4 className="text-lg font-black text-slate-900 italic">Merchant Perks</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-4 leading-relaxed">
                 Reduced fees on cross-border settlements for high-volume partners.
              </p>
              <Button variant="ghost" className="w-full text-blue-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 Apply for Elite <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
