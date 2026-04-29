import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle, 
  Clock, 
  Activity, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  Eye,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import StatsCards from './dashboard/StatsCards';
import AnalyticsCharts from './dashboard/AnalyticsCharts';
import TransferWizard from './transfers/TransferWizard';

interface DashboardOverviewProps {
  onTrackTransaction: (id: string) => void;
}

const MOCK_TRANSACTIONS = [
  { id: 'TXN-982374', date: '2025-10-24', amount: '£450.00', recipient: 'Emma Watson', status: 'verified', risk: 'Low' },
  { id: 'TXN-881233', date: '2025-10-22', amount: '£1,200.00', recipient: 'TechCorp Ltd', status: 'verified', risk: 'Low' },
  { id: 'TXN-773421', date: '2025-10-21', amount: '£85.50', recipient: 'Local Cafe', status: 'pending', risk: 'Med' },
];

export default function DashboardOverview({ onTrackTransaction }: DashboardOverviewProps) {
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Nexus Global Status Bar */}
      <div className="bg-slate-900 text-white px-8 py-3 rounded-2xl flex items-center justify-between border border-white/5 shadow-2xl">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Network Optimal</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
               <Globe className="w-3.5 h-3.5 text-blue-400" />
               <span className="text-[10px] font-bold text-slate-400">Global Liquidity: $4.2B Volume (24h)</span>
            </div>
         </div>
         <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
            <span>NODE_NY_01</span>
            <span>2026-04-29 12:45 UTC</span>
         </div>
      </div>

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Command Center</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Autonomous Monitoring & Multi-Chain Orchestration.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            Audit Log
          </button>
          <button 
            onClick={() => setIsTransferOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-current" /> New Transfer
          </button>
        </div>
      </div>

      {/* Advanced Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <StatsCards />
            
            {/* Real-time Flow Analytics */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <Activity className="w-48 h-48" />
               </div>
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                     <TrendingUp className="w-6 h-6 text-blue-600" /> Capital Velocity
                  </h3>
                  <div className="flex gap-2">
                     {['1H', '24H', '7D'].map(t => (
                       <button key={t} className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all", t === '24H' ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200")}>
                          {t}
                       </button>
                     ))}
                  </div>
               </div>
               <div className="h-[300px]">
                  <AnalyticsCharts />
               </div>
            </div>

            {/* AI Fraud/Risk Nexus */}
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200 shadow-inner grid md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-rose-600">
                     <AlertTriangle className="w-5 h-5" />
                     <h4 className="text-xs font-black uppercase tracking-[0.2em]">Risk Anomalies Detected</h4>
                  </div>
                  <div className="space-y-4">
                     {[
                       { type: 'Unusual Volume', route: 'Dubai → Seychelles', score: 84, color: 'text-rose-500' },
                       { type: 'Identity Drift', route: 'Local Node 14', score: 12, color: 'text-emerald-500' },
                     ].map((risk, i) => (
                       <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                          <div>
                             <p className="text-xs font-black text-slate-900">{risk.type}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{risk.route}</p>
                          </div>
                          <div className={cn("text-lg font-black", risk.color)}>{risk.score}%</div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-2xl shadow-blue-600/30">
                  <Shield className="w-10 h-10 mb-4" />
                  <div>
                     <h4 className="text-xl font-black italic">Sentinel AI Active</h4>
                     <p className="text-white/60 text-xs font-medium leading-relaxed mt-2">Our neural networks are currently processing 12k+ signals to secure your capital.</p>
                  </div>
                  <button className="mt-6 w-full py-4 bg-white text-blue-600 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                     View AI Insights
                  </button>
               </div>
            </div>
         </div>

         {/* Side Command Column */}
         <div className="space-y-8">
            {/* Live Ledger Forensics */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                     <Eye className="w-4 h-4 text-blue-600" /> Active Forensic Traces
                  </h3>
                  <span className="text-[10px] font-black text-blue-600 animate-pulse">LIVE</span>
               </div>
               <div className="space-y-4">
                  {MOCK_TRANSACTIONS.map(txn => (
                    <div key={txn.id} onClick={() => onTrackTransaction(txn.id)} className="p-5 rounded-2.5xl bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-white transition-all cursor-pointer group">
                       <div className="flex justify-between items-start mb-3">
                          <p className="text-[10px] font-mono text-slate-400">{txn.id}</p>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                       </div>
                       <p className="text-sm font-black text-slate-900">{txn.recipient}</p>
                       <div className="flex items-center justify-between mt-3">
                          <span className="text-[10px] font-bold text-slate-500">{txn.amount}</span>
                          <span className={cn(
                            "text-[8px] font-black uppercase px-2 py-0.5 rounded-full border",
                            txn.risk === 'Low' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>Risk: {txn.risk}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Security Posture Widget */}
            <div className="bg-[#020617] p-10 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px]" />
               <Lock className="w-10 h-10 text-blue-400" />
               <div>
                  <h4 className="text-xl font-black italic">Nexus Guardian</h4>
                  <p className="text-white/40 text-xs font-medium mt-2 leading-relaxed">System security is currently at Level 5. All shards synchronized.</p>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                     <span>Sharding Health</span>
                     <span className="text-blue-400">Optimal</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600" style={{ width: '92%' }} />
                  </div>
               </div>
               <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Security Console
               </button>
            </div>
         </div>
      </div>

      <TransferWizard 
        isOpen={isTransferOpen} 
        onClose={() => setIsTransferOpen(false)} 
      />
    </div>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.355r-.343-.194L11.657 20.94a11.955 11.955 0 01-8.618-3.04m8.961-3.04a11.959 11.959 0 013.535 3.04m-7.07 0L12 21.355" />
    </svg>
  );
}
