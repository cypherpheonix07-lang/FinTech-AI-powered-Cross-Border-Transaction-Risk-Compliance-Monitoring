"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, CheckCircle, Clock, Loader2, Info } from 'lucide-react';

const PathTracker = () => {
  const [latestTx, setLatestTx] = useState<any>(null);
  const [hops, setHops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLatestTransaction();

    // Subscribe to new transactions and updates
    const txSubscription = supabase
      .channel('tx-changes')
      .on('postgres_changes', { event: '*', table: 'transactions' }, payload => {
        console.log('TX Change received:', payload);
        fetchLatestTransaction();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(txSubscription);
    };
  }, []);

  const fetchLatestTransaction = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setLatestTx(data);
        fetchHops(data.id);
      }
    } catch (err) {
      console.error('Error fetching tx:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHops = async (txId: string) => {
    const { data, error } = await supabase
      .from('transaction_hops')
      .select('*')
      .eq('transaction_id', txId)
      .order('hop_order', { ascending: true });

    if (!error) {
      setHops(data || []);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-12 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!latestTx) {
    return (
      <div className="w-full max-w-2xl mx-auto p-12 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-2xl">🔍</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No active transactions</h3>
        <p className="text-sm text-gray-500">Initiate a transfer to see the PathGuard tracker in action.</p>
      </div>
    );
  }

  // Predefined steps for MVP if no hops exist yet
  const defaultSteps = [
    { name: 'Sender (You)', status: 'COMPLETED', description: 'Transaction Initiated' },
    { name: 'Regional Gateway', status: latestTx.status === 'FLAGGED' ? 'FLAGGED' : 'PENDING', description: 'Verifying Gateway...' },
    { name: 'Central Clearing', status: 'PENDING', description: 'Awaiting Hop Verification' },
    { name: 'Recipient Bank', status: 'PENDING', description: 'Awaiting Final Release' },
  ];

  const stepsToDisplay = hops.length > 0 ? hops : defaultSteps;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="text-blue-600" size={24} />
            PathGuard Tracker
          </h2>
          <p className="text-xs text-gray-500 font-mono">TX-ID: {latestTx.id.substring(0, 13)}...</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          latestTx.status === 'FLAGGED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
          latestTx.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
          'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
        }`}>
          {latestTx.status}
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800 -ml-[1px]" />

        <div className="space-y-8">
          {stepsToDisplay.map((step, idx) => (
            <div key={idx} className="relative pl-10">
              <div 
                className={`absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center -translate-x-1/2 border-4 bg-white dark:bg-gray-900 
                  ${step.status === 'COMPLETED' ? 'border-green-500 text-green-500' : 
                    step.status === 'FLAGGED' ? 'border-amber-500 text-amber-500 animate-pulse' : 
                    step.status === 'PENDING' ? 'border-gray-200 dark:border-gray-800 text-gray-400' :
                    'border-blue-500 text-blue-500 animate-pulse'}`}
              >
                {step.status === 'COMPLETED' ? (
                  <CheckCircle size={16} />
                ) : step.status === 'FLAGGED' ? (
                  <Clock size={16} />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>

              <div>
                <h3 className={`font-bold ${step.status === 'PENDING' ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white'}`}>
                  {step.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {step.description || (step.status === 'FLAGGED' ? 'Verification paused for safety review' : 'Awaiting processing')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {latestTx.status === 'FLAGGED' && (
        <div className="mt-10 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50">
          <div className="flex gap-3">
            <Info className="text-amber-600 dark:text-amber-400 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 uppercase tracking-tight">Agent Intervention Active</h4>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1 leading-relaxed">
                Our PathGuard Agent has detected a suspicious hop pattern. The transaction is currently being audited by a compliance specialist.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathTracker;
