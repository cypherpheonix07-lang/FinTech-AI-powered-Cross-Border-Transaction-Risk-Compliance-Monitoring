import React from 'react';
import { 
  X, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Clock, 
  Download, 
  Share2, 
  AlertTriangle,
  ExternalLink,
  MapPin,
  Building2,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  recipient: string;
  status: string;
  category: string;
  type: string;
}

interface TransactionModalProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionModal({ transaction, isOpen, onClose }: TransactionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-blue-950/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="bg-slate-50 p-8 border-b border-slate-100 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
              transaction.type === 'sent' ? "bg-slate-900 text-white" : "bg-emerald-600 text-white"
            )}>
              {transaction.type === 'sent' ? <ArrowUpRight className="w-7 h-7" /> : <ArrowDownLeft className="w-7 h-7" />}
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Transaction Details</p>
              <h2 className="text-2xl font-black text-slate-900 leading-none">{transaction.amount}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white text-slate-400 hover:text-slate-600 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recipient / Sender</p>
              <p className="text-sm font-bold text-slate-900">{transaction.recipient}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</p>
              <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100">
                {transaction.category}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date & Time</p>
              <p className="text-sm font-bold text-slate-900">{transaction.date}, 02:45 PM</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reference ID</p>
              <p className="text-sm font-mono font-bold text-slate-900">{transaction.id}</p>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Cryptographic Audit Trail */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Cryptographic Audit Trail</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 relative">
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-100" />
                <div className="w-6 h-6 rounded-full bg-emerald-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs font-bold text-slate-900">Initiated at PathGuard Vault</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">Proof: SHA-256 c72b...d4a1</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-100" />
                <div className="w-6 h-6 rounded-full bg-emerald-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs font-bold text-slate-900">Clearing Bank (HSBC HK) Verified</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">Signed by node: hk-node-04</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-blue-600">Reaching Beneficiary Account</p>
                  <p className="text-[10px] text-blue-400 font-medium mt-1 uppercase tracking-wider">Final Hop Pending...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-slate-900 uppercase">PathGuard Protection</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">This transaction is covered by our Zero-Loss guarantee and is cryptographically immutable on the PathGuard ledger.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-4">
          <Button variant="ghost" className="bg-white border-slate-200 font-bold gap-2 text-xs h-12">
            <Download className="w-4 h-4" /> Download Receipt
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 text-xs h-12 shadow-lg shadow-blue-600/20">
            <Share2 className="w-4 h-4" /> Share Proof
          </Button>
          <button className="col-span-2 text-center text-[10px] font-bold text-red-500 uppercase tracking-tighter hover:underline flex items-center justify-center gap-1.5 mt-2">
            <AlertTriangle className="w-3 h-3" /> Report or Dispute Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
