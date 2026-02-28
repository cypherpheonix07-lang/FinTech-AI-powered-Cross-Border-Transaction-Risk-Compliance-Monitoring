"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, AlertTriangle, CheckCircle, Search, Info, Loader2 } from 'lucide-react';

const SendMoneyFlow = () => {
  const [step, setStep] = useState('input'); // input, analyzing, result
  const [amount, setAmount] = useState('500');
  const [recipient, setRecipient] = useState('Maria Garcia');
  const [riskVerdict, setRiskVerdict] = useState<any>(null);
  const [merkleInfo, setMerkleInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const SENDER_ID = '6396266b-efca-4b3e-b035-3cb2fa01ace7'; // John Doe
  const RECIPIENT_ID = '0f965472-e48c-4a85-b815-61bc42d37675'; // Maria Garcia

  const handleSend = async () => {
    setIsLoading(true);
    setStep('analyzing');

    try {
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .insert([
          {
            sender_id: SENDER_ID,
            recipient_id: RECIPIENT_ID,
            amount: parseFloat(amount),
            status: 'PENDING'
          }
        ])
        .select()
        .single();

      if (txError) throw txError;

      const txId = txData.id;
      
      const response = await fetch('/api/analyze-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId: txId }),
      });

      if (!response.ok) {
        throw new Error('Analysis API failed');
      }

      const result = await response.json();

      setMerkleInfo(result.merkle);
      setRiskVerdict({
        status: result.verdict === 'FLAGGED' ? 'warning' : 'success',
        title: result.analysis.title,
        verdict: result.verdict === 'FLAGGED' ? '⚠️ Review Needed' : '✅ Safe',
        analogy: result.analysis.description,
        recommendation: result.analysis.recommendation,
        log: {
          transaction_id: txId,
          risk_score: result.riskScore,
          action_taken: result.verdict
        }
      });
      
      setStep('result');
    } catch (error) {
      console.error('Error in Send Flow:', error);
      alert('Failed to initiate secure transfer. Please check console.');
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-500">
      {step === 'input' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="text-blue-600" size={24} />
              Send Money
            </h2>
            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
              PATHGUARD ACTIVE 🛡️
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipient</label>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Send with PathGuard Verification'}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Search size={12} />
            PathGuard Agent will scan 50+ real-time signals to verify this transaction's path.
          </div>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="py-12 flex flex-col items-center justify-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-100 dark:border-blue-900 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-24 h-24 border-t-4 border-blue-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="text-blue-600" size={32} />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">PathGuard Analyzing...</h3>
            <p className="text-gray-500 dark:text-gray-400 animate-pulse">Verifying hops, checking fraud spikes, and validating recipient path.</p>
          </div>
          <div className="w-full max-w-xs bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}

      {step === 'result' && riskVerdict && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className={`flex items-center gap-4 p-4 border rounded-2xl ${
            riskVerdict.status === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800'
          }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              riskVerdict.status === 'success'
                ? 'bg-green-100 dark:bg-green-900/40 text-green-600'
                : 'bg-amber-100 dark:bg-amber-900/40 text-amber-600'
            }`}>
              {riskVerdict.status === 'success' ? <CheckCircle /> : <AlertTriangle />}
            </div>
            <div>
              <h3 className={`font-bold text-lg ${
                riskVerdict.status === 'success' ? 'text-green-900 dark:text-green-200' : 'text-amber-900 dark:text-amber-200'
              }`}>{riskVerdict.title}</h3>
              <p className={`text-sm font-medium ${
                riskVerdict.status === 'success' ? 'text-green-800/80 dark:text-green-300/80' : 'text-amber-800/80 dark:text-amber-300/80'
              }`}>Safety Verdict: {riskVerdict.verdict}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Search size={16} className="text-gray-400" />
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">PathGuard Intelligence Analysis</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {riskVerdict.analogy}
              </p>
            </div>

            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-blue-400" />
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider">Our Recommendation</h4>
              </div>
              <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                {riskVerdict.recommendation}
              </p>
            </div>
          </div>

          {merkleInfo && (
            <div className="p-4 bg-gray-900 rounded-xl border border-blue-500/30 overflow-hidden shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Immutable Merkle Chain</h4>
              </div>
              <div className="space-y-3 font-mono text-[10px]">
                <div>
                  <p className="text-gray-500 mb-1">PREVIOUS BLOCK HASH</p>
                  <p className="text-gray-400 break-all bg-black/40 p-2 rounded border border-gray-800">{merkleInfo.previous_hash}</p>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-4 bg-blue-500/30" />
                </div>
                <div>
                  <p className="text-blue-400 mb-1">CURRENT BLOCK HASH (INTEGRITY VERIFIED)</p>
                  <p className="text-blue-300 break-all bg-blue-900/20 p-2 rounded border border-blue-500/40">{merkleInfo.current_hash}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <button 
              onClick={() => setStep('input')}
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Return to Dashboard
            </button>
            <div className="flex items-center justify-center gap-4">
              <p className="text-xs text-gray-500 font-mono">Risk Score: {riskVerdict.log.risk_score}</p>
              <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium underline underline-offset-4 decoration-gray-300 flex items-center gap-1">
                <Shield size={14} />
                Audit Trail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMoneyFlow;
