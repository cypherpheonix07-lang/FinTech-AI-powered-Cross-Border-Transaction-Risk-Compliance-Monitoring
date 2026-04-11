import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownLeft,
  CheckCircle,
  Clock,
  X,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import TransactionModal from '@/components/transactions/TransactionModal';

const ALL_TRANSACTIONS = [
  { id: 'TXN-982374', date: '2025-10-24', amount: '£450.00', recipient: 'Emma Watson', status: 'verified', category: 'Personal', type: 'sent' },
  { id: 'TXN-881233', date: '2025-10-22', amount: '£1,200.00', recipient: 'TechCorp Ltd', status: 'verified', category: 'Business', type: 'sent' },
  { id: 'TXN-773421', date: '2025-10-21', amount: '£85.50', recipient: 'Local Cafe', status: 'pending', category: 'Food', type: 'sent' },
  { id: 'TXN-662311', date: '2025-10-20', amount: '£2,500.00', recipient: 'Global Bank', status: 'verified', category: 'Transfer', type: 'received' },
  { id: 'TXN-554122', date: '2025-10-19', amount: '£120.00', recipient: 'Amazon UK', status: 'verified', category: 'Shopping', type: 'sent' },
  { id: 'TXN-441099', date: '2025-10-18', amount: '£340.00', recipient: 'British Gas', status: 'verified', category: 'Bills', type: 'sent' },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<any>(null);

  const categories = ['All', 'Personal', 'Business', 'Food', 'Shopping', 'Bills', 'Transfer'];

  const filteredTransactions = ALL_TRANSACTIONS.filter(txn => {
    const matchesSearch = txn.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || txn.id.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || txn.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage and export your full cryptographic audit history.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search ID or name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-2.5 rounded-xl border transition-all flex items-center gap-2 text-sm font-bold",
              showFilters ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Sidebar/Tray */}
      {showFilters && (
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Quick Filters</h3>
            <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                  selectedCategory === cat 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bulk Actions & Export */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {filteredTransactions.length} results found
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-600 font-bold gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export CSV
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600 font-bold gap-2">
            <FileText className="w-4 h-4 text-red-600" /> Save as PDF
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]">
                <th className="px-8 py-5 w-12"><input type="checkbox" className="rounded-md border-slate-300" /></th>
                <th className="px-8 py-5">Activity</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Amount</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.map((txn) => (
                <tr 
                  key={txn.id} 
                  onClick={() => setSelectedTxn(txn)}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600"
                >
                  <td className="px-8 py-5 w-12" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded-md border-slate-200" />
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        txn.type === 'sent' ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {txn.type === 'sent' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{txn.recipient}</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{txn.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                      {txn.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{txn.date}</td>
                  <td className="px-8 py-5">
                    {txn.status === 'verified' ? (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-amber-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Pending</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={cn(
                      "text-sm font-black tracking-tight",
                      txn.type === 'sent' ? "text-slate-900" : "text-emerald-600"
                    )}>
                      {txn.type === 'received' ? '+' : '-'}{txn.amount}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedTxn && (
        <TransactionModal 
          isOpen={!!selectedTxn} 
          onClose={() => setSelectedTxn(null)} 
          transaction={selectedTxn}
        />
      )}
    </div>
  );
}
