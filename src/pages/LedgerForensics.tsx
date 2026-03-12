import React from 'react';
import { 
  History, 
  Search, 
  ShieldCheck, 
  ChevronRight, 
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_ENTRIES = [
  {
    id: 'LED-001',
    timestamp: '2026-03-09 22:45:01',
    transactionId: 'TXN-88293-AZ',
    accountId: 'ACC-9923',
    type: 'DEBIT',
    amount: '1,250.00',
    currency: 'USD',
    description: 'Transfer to Global Logistics Corp',
    auditHash: 'PROOF-88293-9923-DEBIT',
    status: 'VERIFIED'
  },
  {
    id: 'LED-002',
    timestamp: '2026-03-09 22:45:01',
    transactionId: 'TXN-88293-AZ',
    accountId: 'ACC-5521',
    type: 'CREDIT',
    amount: '1,012,450.00',
    currency: 'JPY',
    description: 'Received from Alex Rivera (Ex: 148.2)',
    auditHash: 'PROOF-88293-5521-CREDIT',
    status: 'VERIFIED'
  },
  {
    id: 'LED-003',
    timestamp: '2026-03-09 22:45:01',
    transactionId: 'TXN-88293-AZ',
    accountId: 'SYSTEM_FEE',
    type: 'FEE',
    amount: '1.25',
    currency: 'USD',
    description: 'Processing fee for TXN-88293-AZ',
    auditHash: 'PROOF-88293-FEE',
    status: 'VERIFIED'
  }
];

export default function LedgerForensics() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-blue-600">
              <History className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Nuclear Financial Forensics</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ledger <span className="text-blue-600">Audit Trail</span></h1>
           <p className="text-sm font-medium text-slate-500 max-w-xl">
             Every dollar, every cent, cryptographically linked. Access the immutable double-entry record of the PathGuard Nucleus.
           </p>
        </div>

        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
             <Download className="w-4 h-4" /> Export Audit Log
           </button>
           <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
             <ShieldCheck className="w-4 h-4" /> Verify Entire Ledger
           </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume', value: '$12.4M', icon: Zap, color: 'blue' },
          { label: 'Atomic Success', value: '99.99%', icon: ShieldCheck, color: 'emerald' },
          { label: 'Active Currencies', value: '42', icon: Lock, color: 'purple' },
          { label: 'Precision Errors', value: '0', icon: History, color: 'slate' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm space-y-3">
             <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", `bg-${stat.color}-100 text-${stat.color}-600`)}>
                <stat.icon className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   placeholder="Filter by Transaction ID or Audit Hash..." 
                   className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
                 />
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                <Filter className="w-5 h-5" />
              </button>
           </div>
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
             Streaming 3 new entries...
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full border-collapse">
              <thead>
                 <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                    <th className="px-6 py-4 text-left font-black">Timestamp</th>
                    <th className="px-6 py-4 text-left font-black">Transaction ID</th>
                    <th className="px-6 py-4 text-left font-black">Type</th>
                    <th className="px-6 py-4 text-right font-black">Value</th>
                    <th className="px-6 py-4 text-center font-black">Audit Proof</th>
                    <th className="px-6 py-4 text-right font-black">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {MOCK_ENTRIES.map((entry) => (
                   <tr key={entry.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-6 py-5 whitespace-nowrap">
                         <p className="text-sm font-bold text-slate-900 leading-none mb-1">{entry.timestamp.split(' ')[1]}</p>
                         <p className="text-[10px] font-medium text-slate-400">{entry.timestamp.split(' ')[0]}</p>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900 tracking-tight">{entry.transactionId}</span>
                            <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase">Atomic</span>
                         </div>
                         <p className="text-[10px] font-medium text-slate-400 mt-1">{entry.description}</p>
                      </td>
                      <td className="px-6 py-5">
                         <div className={cn(
                           "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border",
                           entry.type === 'DEBIT' && "bg-orange-50 border-orange-100 text-orange-600",
                           entry.type === 'CREDIT' && "bg-emerald-50 border-emerald-100 text-emerald-600",
                           entry.type === 'FEE' && "bg-blue-50 border-blue-100 text-blue-600"
                         )}>
                            {entry.type === 'DEBIT' && <ArrowUpRight className="w-3 h-3" />}
                            {entry.type === 'CREDIT' && <ArrowDownLeft className="w-3 h-3" />}
                            {entry.type === 'FEE' && <Lock className="w-3 h-3" />}
                            <span className="text-[10px] font-black uppercase tracking-tight">{entry.type}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                         <p className="text-sm font-black text-slate-900">{entry.amount}</p>
                         <p className="text-[10px] font-bold text-slate-400">{entry.currency}</p>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-1 rounded-md mb-1">
                               <ShieldCheck className="w-3 h-3 text-blue-400" />
                               <span className="text-[9px] font-mono font-bold text-slate-400">{entry.auditHash.split('-').pop()}</span>
                            </div>
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{entry.status}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                         <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <ChevronRight className="w-5 h-5" />
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
           <button className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all">
             View Full Ancestry of This Hash Chain
           </button>
        </div>
      </div>
    </div>
  );
}
