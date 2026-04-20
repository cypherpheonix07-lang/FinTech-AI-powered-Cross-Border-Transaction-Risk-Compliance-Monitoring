import React, { useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import StatsCards from './dashboard/StatsCards';
import QuickActions from './dashboard/QuickActions';
import AnalyticsCharts from './dashboard/AnalyticsCharts';
import CurrencyRates from './dashboard/CurrencyRates';
import ScheduledPayments from './dashboard/ScheduledPayments';
import TransferWizard from './transfers/TransferWizard';

interface DashboardOverviewProps {
  onTrackTransaction: (id: string) => void;
}

const MOCK_TRANSACTIONS = [
  { id: 'TXN-982374', date: '2025-10-24', amount: '£450.00', recipient: 'Emma Watson', status: 'verified' },
  { id: 'TXN-881233', date: '2025-10-22', amount: '£1,200.00', recipient: 'TechCorp Ltd', status: 'verified' },
  { id: 'TXN-773421', date: '2025-10-21', amount: '£85.50', recipient: 'Local Cafe', status: 'pending' },
];

export default function DashboardOverview({ onTrackTransaction }: DashboardOverviewProps) {
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring your global assets with cryptographic precision.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm flex items-center gap-2">
            Download Statements
          </button>
          <button 
            onClick={() => setIsTransferOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Send className="w-4 h-4" /> Send Money
          </button>
        </div>
      </div>

      {/* Primary Stats */}
      <StatsCards />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column: Analytics & Quick Actions */}
        <div className="xl:col-span-3 space-y-8">
          <QuickActions />
          <AnalyticsCharts />
          
          {/* Transactions Table Section */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
              <button className="text-blue-600 text-sm font-bold hover:underline">View All Activity</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]">
                    <th className="px-8 py-5">Reference</th>
                    <th className="px-8 py-5">Recipient</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_TRANSACTIONS.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50/80 transition-all group cursor-pointer border-b border-transparent hover:border-slate-100/50">
                      <td className="px-8 py-5">
                        <button 
                          onClick={() => onTrackTransaction(txn.id)}
                          className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-left font-mono"
                        >
                          {txn.id}
                        </button>
                      </td>
                      <td className="px-8 py-5 text-sm font-semibold text-slate-600">{txn.recipient}</td>
                      <td className="px-8 py-5 text-sm text-slate-500">{txn.date}</td>
                      <td className="px-8 py-5">
                        {txn.status === 'verified' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100/50 animate-pulse">
                            <Clock className="w-3 h-3" /> Processing
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="text-sm font-black text-slate-900">{txn.amount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Currency Rates & Other Sidebar Widgets */}
        <div className="space-y-8">
          <CurrencyRates />
          <ScheduledPayments />
          
          {/* Priority Support CTA */}
          <div className="bg-gradient-to-br from-blue-950 to-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-transform group-hover:scale-110 duration-1000 group-hover:rotate-12">
               <ShieldCheckIcon className="w-40 h-40" />
            </div>
            <h4 className="font-extrabold text-lg mb-2">Priority Support</h4>
            <p className="text-xs text-blue-200/70 mb-6 leading-relaxed font-medium">Dedicated compliance officer available for your account verification.</p>
            <button className="w-full py-4 bg-blue-700 hover:bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-900/40">
              Chat with Officer
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
