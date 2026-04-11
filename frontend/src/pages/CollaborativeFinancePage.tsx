import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Lock, 
  Settings2, 
  Plus, 
  ChevronRight, 
  FileText, 
  Calendar, 
  MessageSquare,
  Building2,
  Suitcase,
  UserPlus,
  ArrowUpRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Workspace {
  id: string;
  name: string;
  type: 'Family' | 'Couple' | 'Business' | 'Trust';
  members: number;
  balance: string;
  recentActivity: string;
  color: string;
}

export default function CollaborativeFinancePage() {
  const workspaces: Workspace[] = [
    { id: '1', name: 'The Rivera Family', type: 'Family', members: 4, balance: '£12,450.00', recentActivity: 'Alex added £500 to Grocery Fund', color: 'bg-blue-600' },
    { id: '2', name: 'Startup Venture X', type: 'Business', members: 3, balance: '£45,200.00', recentActivity: 'Jane approved Invoice #402', color: 'bg-indigo-600' },
    { id: '3', name: 'Home Renovation', type: 'Couple', members: 2, balance: '£3,800.00', recentActivity: 'Last payment: £1,200 for Flooring', color: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Collaborative Finance</h1>
          <p className="text-slate-500 font-medium">Shared workspaces with role-based permissions and joint goals.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
          <UserPlus className="w-4 h-4 mr-2" /> Invite Member
        </Button>
      </div>

      {/* Main Workspaces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {workspaces.map((ws) => (
           <div key={ws.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group overflow-hidden relative">
              <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 -mr-12 -mt-12", ws.color)} />
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className={cn("p-3 rounded-2.5xl text-white shadow-lg", ws.color)}>
                    {ws.type === 'Business' ? <Building2 className="w-6 h-6" /> : ws.type === 'Family' ? <Users className="w-6 h-6" /> : <Heart className="w-6 h-6 text-white" />}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{ws.type}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">{ws.name}</h3>
              <p className="text-2xl font-black text-slate-900 mb-6">{ws.balance}</p>
              
              <div className="space-y-4 pt-4 border-t border-slate-50">
                 <div className="flex items-center gap-3">
                    <History className="w-4 h-4 text-slate-400" />
                    <p className="text-xs font-bold text-slate-500 truncate">{ws.recentActivity}</p>
                 </div>
                 <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                         {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-300">
                       +{ws.members - 3}
                    </div>
                 </div>
              </div>
              
              <button className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                 Enter Workspace <ArrowRight className="w-3 h-3" />
              </button>
           </div>
         ))}

         <button className="aspect-square rounded-[3rem] border-4 border-dashed border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-4 group">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
               <Plus className="w-8 h-8 text-slate-300 group-hover:text-blue-600" />
            </div>
            <p className="text-sm font-black text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">Create Workspace</p>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Joint Goals & Permissions */}
         <div className="bg-slate-950 p-10 rounded-[4rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-slate-900/50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
            <h3 className="text-2xl font-black relative z-10">Permission Dashboard</h3>
            <p className="text-blue-100/60 font-medium relative z-10 max-w-sm">Manage exactly what your family or team can see and do.</p>
            
            <div className="space-y-4 relative z-10">
               {[
                 { role: 'Admin', desc: 'Full control over funds and members', icon: ShieldCheck, color: 'text-emerald-400' },
                 { role: 'Viewer', desc: 'Can only see transaction history', icon: Eye, color: 'text-blue-400' },
                 { role: 'Contributor', desc: 'Can add funds but not withdraw', icon: Plus, color: 'text-amber-400' },
               ].map((role) => (
                 <div key={role.role} className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className={cn("p-3 rounded-2xl bg-white/5", role.color)}>
                       <role.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <h4 className="text-sm font-black">{role.role}</h4>
                       <p className="text-[11px] text-white/40 font-bold">{role.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                 </div>
               ))}
            </div>
         </div>

         {/* Document Vault Integration */}
         <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-black text-slate-900">Shared Vault</h3>
               <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-500 font-medium italic">Securely share contracts, wills, and business documents.</p>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { name: 'House Title', size: '2.4 MB', type: 'PDF' },
                 { name: 'Venture Agreement', size: '1.1 MB', type: 'DOCX' },
                 { name: 'Family Will', size: '0.8 MB', type: 'PDF' },
                 { name: 'Tax Filing 2024', size: '4.5 MB', type: 'ZIP' },
               ].map((file) => (
                 <div key={file.name} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-2 bg-white rounded-xl shadow-sm">
                          <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                       </div>
                       <span className="text-[8px] font-black text-slate-300">{file.type}</span>
                    </div>
                    <h5 className="text-xs font-black text-slate-900 truncate">{file.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{file.size}</p>
                 </div>
               ))}
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl py-7 uppercase text-xs tracking-widest shadow-lg shadow-blue-600/10">
               Access All Documents
            </Button>
         </div>
      </div>
    </div>
  );
}

// Add missing icon imports
import { Heart, History, Eye } from 'lucide-react';
