import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Activity, 
  History, 
  Lock, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle,
  FileText,
  Globe2,
  Scale,
  Gavel,
  PieChart as PieChartIcon,
  Search,
  Download,
  Eye,
  Zap,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

const complianceData = [
  { region: 'UK (FCA)', status: 98, color: '#10b981' },
  { region: 'EU (ESMA)', status: 92, color: '#2563eb' },
  { region: 'US (SEC)', status: 85, color: '#7c3aed' },
  { region: 'SG (MAS)', status: 100, color: '#f59e0b' },
];

export default function ComplianceSuitePage() {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Regulatory & Compliance Suite</h1>
          <p className="text-slate-500 font-medium italic">Real-time cross-border compliance mapping & reporting.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Download className="w-4 h-4 mr-2" /> Global Report
           </Button>
           <Button 
            variant="outline" 
            onClick={() => { setIsUpdating(true); setTimeout(() => setIsUpdating(false), 2000); }}
            className="rounded-2xl border-slate-200 font-black text-xs px-6 py-6"
           >
              <RefreshCw className={cn("w-4 h-4 mr-2", isUpdating && "animate-spin")} />
              Sync Law Database
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Compliance Radar */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                       <Gavel className="w-6 h-6 text-indigo-600" /> Regional Compliance Index
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Audit Score by Jurisdiction</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-widest">Global Avg: 94%</span>
                 </div>
              </div>

              <div className="h-80 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={complianceData}>
                     <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                     <YAxis hide domain={[0, 100]} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 800 }}
                     />
                     <Bar dataKey="status" radius={[12, 12, 0, 0]} barSize={40}>
                        {complianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:border-indigo-200 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-500">
                       <Scale className="w-6 h-6" />
                    </div>
                    <div>
                       <h5 className="text-sm font-black text-slate-900">Law Change Alert</h5>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New AMLD6 Directives</p>
                    </div>
                    <ArrowRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                 </div>
                 <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-500">
                       <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                       <h5 className="text-sm font-black text-slate-900">Audit Proofs</h5>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">124 Proofs Vaulted</p>
                    </div>
                    <ArrowRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                 </div>
              </div>
           </div>

           {/* Active AML Monitoring */}
           <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">AML & Sanctions Screening</h3>
                 <Button variant="ghost" className="text-indigo-600 font-black uppercase text-xs tracking-widest gap-2">
                    Live Feed <Activity className="w-4 h-4" />
                 </Button>
              </div>
              <div className="divide-y divide-slate-50">
                 {[
                   { id: '1', tx: 'TX-8429-A', status: 'Cleared', score: 0.02, detail: 'Low Risk • Source Verfied' },
                   { id: '2', tx: 'TX-8430-B', status: 'Manual Review', score: 0.64, detail: 'Sanction List Match (Name)' },
                   { id: '3', tx: 'TX-8431-C', status: 'Cleared', score: 0.12, detail: 'Behavioral Match OK' },
                 ].map((item) => (
                   <div key={item.id} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors group">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black border-2 border-white shadow-sm",
                        item.status === 'Cleared' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                      )}>
                         {item.tx[0]}
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900">{item.tx}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.detail}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-slate-900">Score: {item.score}</p>
                         <div className="w-24 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div className={cn(
                              "h-full rounded-full",
                              item.score > 0.5 ? "bg-orange-500" : "bg-emerald-500"
                            )} style={{ width: `${item.score * 100}%` }} />
                         </div>
                      </div>
                      <MoreVertical className="w-5 h-5 text-slate-300" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Intelligence Side */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-950 p-8 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px]" />
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <ShieldCheck className="w-8 h-8 text-indigo-400" />
                    <span className="text-[8px] font-black bg-indigo-600 px-2.5 py-1 rounded-lg uppercase tracking-widest">NIST COMPLIANT</span>
                 </div>
                 <div>
                    <h4 className="text-xl font-black italic">Compliance AI Advisor</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed italic">"Your recent transfer to Liechtenstein triggered a new SEC reporting requirement. I've automatically prepared the Form D draft for your review."</p>
                 </div>
                 <Button className="w-full bg-white text-slate-950 hover:bg-slate-100 font-black rounded-2xl py-6 uppercase text-xs tracking-widest">
                    Review Drafts
                 </Button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Globe2 className="w-4 h-4 text-blue-600" /> Regulatory Nodes
              </h4>
              <div className="space-y-4">
                 {[
                   { city: 'London', status: 'Syncing', ping: '12ms' },
                   { city: 'Brussels', status: 'Stable', ping: '18ms' },
                   { city: 'Washington', status: 'Delayed', ping: '120ms' },
                 ].map((n) => (
                   <div key={n.city} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div>
                         <p className="text-xs font-black text-slate-900">{n.city}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{n.ping}</p>
                      </div>
                      <span className={cn(
                        "text-[9px] font-black px-2 py-0.5 rounded-lg border",
                        n.status === 'Stable' ? "bg-emerald-50 border-emerald-100 text-emerald-500" : "bg-orange-50 border-orange-100 text-orange-500"
                      )}>{n.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[3.5rem] bg-indigo-600 text-white flex flex-col items-center text-center space-y-4 border-4 border-indigo-500/50 shadow-xl shadow-indigo-600/20">
              <FileText className="w-12 h-12 text-indigo-200 opacity-40 mb-2" />
              <h4 className="text-lg font-black leading-tight italic">Automated <br /> Tax Reporting</h4>
              <p className="text-xs text-indigo-100/60 font-medium">Real-time capital gains calculation across 140+ countries.</p>
              <Button className="w-full bg-white text-indigo-600 font-black rounded-xl py-6 uppercase text-xs tracking-widest mt-2 active:scale-95 transition-all">
                 Configure Tax Hub
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
