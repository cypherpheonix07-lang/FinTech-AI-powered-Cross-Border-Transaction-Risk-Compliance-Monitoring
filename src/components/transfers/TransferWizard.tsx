import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Building2, 
  Globe,
  Wallet,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_RECIPIENTS = [
  { id: '1', name: 'Emma Watson', bank: 'Barclays Bank', avatar: 'EW' },
  { id: '2', name: 'TechCorp Ltd', bank: 'HSBC UK', avatar: 'TC' },
  { id: '4', name: 'James Blake', bank: 'Monzo', avatar: 'JB' },
  { id: '5', name: 'Global Logistics', bank: 'JP Morgan Chase', avatar: 'GL' },
];

interface TransferWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransferWizard({ isOpen, onClose }: TransferWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('GBP');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const simulateTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      handleNext();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-blue-950/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Globe className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-xl font-black text-slate-900 leading-none">Global Transfer</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Step {step} of 4</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 min-h-[400px]">
          {/* Step 1: Select Recipient */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Who are you sending to?</h3>
                <p className="text-sm text-slate-500">Select a verified beneficiary from your list.</p>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search name or ID..." 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                {MOCK_RECIPIENTS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRecipient(r);
                      handleNext();
                    }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/5 transition-all text-left active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-sm font-black text-slate-600 font-mono">
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{r.name}</p>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{r.bank}</p>
                    </div>
                    <ChevronRight className="ml-auto w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Enter Amount */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-bold text-slate-900">Enter Amount</h3>
                <p className="text-sm text-slate-500">Sending to <span className="font-bold text-slate-900">{selectedRecipient?.name}</span></p>
              </div>

              <div className="relative flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-slate-400 tracking-tighter">£</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                    placeholder="0.00"
                    className="text-6xl font-black text-slate-900 bg-transparent border-none outline-none w-48 text-center placeholder:text-slate-100 tracking-tighter"
                  />
                </div>
                <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-slate-100 rounded-full">
                   <span className="text-[10px] font-bold text-slate-600">WALLET BALANCE: £24,560.00</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                 {['50', '100', '500'].map(val => (
                   <button 
                     key={val}
                     onClick={() => setAmount(val)}
                     className="py-3 rounded-2xl border border-slate-100 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                   >
                     + £{val}
                   </button>
                 ))}
              </div>

              <div className="flex gap-4">
                <Button variant="ghost" onClick={handleBack} className="flex-1 h-14 rounded-2xl font-bold bg-slate-100 text-slate-600">
                  Back
                </Button>
                <Button 
                  disabled={!amount || parseFloat(amount) <= 0}
                  onClick={handleNext} 
                  className="flex-[2] h-14 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-bold text-slate-900">Review Transfer</h3>
                <p className="text-sm text-slate-500">Verify details before cryptographic signing.</p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Recipient</span>
                  <span className="font-bold text-slate-900">{selectedRecipient?.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Bank</span>
                  <span className="font-bold text-slate-900">{selectedRecipient?.bank}</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Amount</span>
                  <span className="font-bold text-slate-900">£{parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Fee</span>
                  <span className="font-bold text-emerald-600 tracking-wider">£0.00 (Free)</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Total to Deduct</span>
                  <span className="text-xl font-black text-blue-600">£{parseFloat(amount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={simulateTransfer}
                  disabled={isProcessing}
                  className="w-full h-16 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 flex flex-col pt-1"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                       Validating Path...
                    </div>
                  ) : (
                    <>
                      <span className="text-lg">Securely Sign & Send</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Requires MFA Confirmation</span>
                    </>
                  )}
                </Button>
                <button onClick={onClose} className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">
                  Cancel Transfer
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 animate-in zoom-in-95 duration-700">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl shadow-emerald-500/10">
                 <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Transfer Sent!</h3>
                <p className="text-sm text-slate-500 max-w-xs mt-2 mx-auto">
                  Funds are on the way to <span className="font-bold text-slate-900">{selectedRecipient?.name}</span>. Cryptographic proof has been generated.
                </p>
              </div>
              
              <div className="w-full bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Receipt ID</p>
                 <p className="text-xs font-mono font-bold text-slate-900">PATH-TX-8829-QX12</p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Button onClick={onClose} className="w-full h-14 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white">
                  Back to Dashboard
                </Button>
                <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center justify-center gap-1">
                   Track Real-time Path <ShieldCheck className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
