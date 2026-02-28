import React from 'react';
import { ShieldCheck, LogOut, Send, FileText, CheckCircle, Clock } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onTrackTransaction: (id: string) => void;
}

// Mock Data: Synthetic transactions for the MVP
const MOCK_TRANSACTIONS = [
  { id: 'TXN-982374', date: '2025-10-24', amount: '£450.00', recipient: 'Emma Watson', status: 'verified' },
  { id: 'TXN-881233', date: '2025-10-22', amount: '£1,200.00', recipient: 'TechCorp Ltd', status: 'verified' },
  { id: 'TXN-773421', date: '2025-10-21', amount: '£85.50', recipient: 'Local Cafe', status: 'pending' },
];

export default function Dashboard({ onLogout, onTrackTransaction }: DashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Dashboard Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 text-blue-950">
          <ShieldCheck className="w-8 h-8 text-blue-700" />
          <span className="text-xl font-bold tracking-tight">PathGuard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 hidden md:block">
            Welcome back, Alex
          </span>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage and track your secure transfers.</p>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm">
            <Send className="w-4 h-4" /> Send Money Securely
          </button>
        </div>

        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-900">Account Security</h3>
            </div>
            <p className="text-sm text-slate-600">MFA is Active. Last login: Today, 09:41 AM from London, UK.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Audit Logs</h3>
            </div>
            <p className="text-sm text-slate-600">Download your monthly cryptographic proof summaries.</p>
            <button className="text-blue-700 text-sm font-semibold mt-2 hover:underline">Download PDF</button>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">Transaction ID</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Recipient</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_TRANSACTIONS.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{txn.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{txn.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{txn.recipient}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{txn.amount}</td>
                    <td className="px-6 py-4">
                      {txn.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3" /> Verified Path
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <Clock className="w-3 h-3" /> Processing
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onTrackTransaction(txn.id)}
                        className="text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        View Path
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {MOCK_TRANSACTIONS.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No recent transactions found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
