import React, { useState } from 'react';
import useStore from '../app/store';
import CaseCard from '../components/case/CaseCard';
import CaseEditor from '../components/case/CaseEditor';
import { Plus, Filter, Search, ShieldAlert, BarChart } from 'lucide-react';

const Cases = () => {
  const { cases, addCase } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const filteredCases = cases.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCase = (caseData) => {
    setSelectedCaseId(caseData.id);
    setIsEditorOpen(true);
  };

  const handleCreateCase = () => {
    const newCase = {
      title: 'New Forensic Investigation',
      status: 'open',
      analyst: 'Architect_Current',
      txIds: [],
      comments: []
    };
    addCase(newCase);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center">
            <ShieldAlert className="text-risk-high mr-3" size={32} />
            Investigation Command
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage entity flags, layering patterns, and case-ready intelligence.</p>
        </div>
        <button 
          onClick={handleCreateCase}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-2xl font-bold flex items-center transition-all shadow-xl shadow-primary/20 group"
        >
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Initialize Case
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total active', val: cases.length, icon: ShieldAlert, color: 'text-primary' },
          { label: 'Unresolved', val: cases.filter(c => c.status === 'open').length, icon: AlertCircle, color: 'text-risk-high' },
          { label: 'Success Rate', val: '94%', icon: BarChart, color: 'text-green-500' },
          { label: 'Avg Latency', val: '1.4h', icon: Clock, color: 'text-slate-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-dark-800 border border-dark-600 p-6 rounded-3xl">
            <stat.icon size={16} className={clsx("mb-2", stat.color)} />
            <div className="text-2xl font-bold text-slate-100">{stat.val}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, title, or analyst..."
            className="w-full bg-dark-800 border border-dark-600 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-dark-800 border border-dark-600 px-6 py-3 rounded-2xl text-slate-300 flex items-center hover:bg-dark-700 transition-colors">
          <Filter size={18} className="mr-2" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredCases.map((c) => (
          <CaseCard key={c.id} caseData={c} onClick={handleOpenCase} />
        ))}
      </div>

      <CaseEditor 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        caseId={selectedCaseId} 
      />
    </div>
  );
};

// Helper components for stats
const Clock = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const AlertCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default Cases;
