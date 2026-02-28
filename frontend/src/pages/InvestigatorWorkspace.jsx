import React, { useState } from 'react';
import { 
  Briefcase, Activity, ShieldAlert, Users, 
  MessageSquare, Layers, Download, Search 
} from 'lucide-react';
import LiveNotes from '../components/collab/LiveNotes';
import CaseCard from '../components/case/CaseCard';

/**
 * InvestigatorWorkspace.jsx
 * Unified command center for analyst teams.
 */
const InvestigatorWorkspace = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Stat Bar */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Active Tasks', value: '12', icon: Activity, color: 'text-primary' },
          { label: 'Critical Escalations', value: '3', icon: ShieldAlert, color: 'text-risk-high' },
          { label: 'Team Presence', value: '5', icon: Users, color: 'text-green-400' },
          { label: 'Review Latency', value: '14m', icon: Briefcase, color: 'text-slate-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-dark-800 border border-dark-600 p-6 rounded-3xl shadow-xl flex items-center space-x-4">
             <div className={`${stat.color} bg-dark-900/50 p-4 rounded-2xl`}>
                <stat.icon size={24} />
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
         {/* Main Workspace Area */}
         <div className="col-span-8 flex flex-col space-y-6">
            <div className="bg-dark-800 border border-dark-600 rounded-3xl flex-1 overflow-hidden shadow-2xl flex flex-col">
               <div className="p-6 border-b border-dark-600 flex justify-between items-center bg-dark-800/50">
                  <div className="flex space-x-8">
                     {['active', 'assigned', 'monitoring'].map(tab => (
                       <button 
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`text-xs font-bold uppercase tracking-widest transition-all pb-2 border-b-2 ${activeTab === tab ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                       >
                         {tab} Workspace
                       </button>
                     ))}
                  </div>
                  <div className="flex items-center bg-dark-900 border border-dark-600 px-4 py-2 rounded-xl">
                     <Search size={14} className="text-slate-500 mr-2" />
                     <input type="text" placeholder="Filter cases..." className="bg-transparent border-none text-[10px] text-slate-300 focus:ring-0 w-32" />
                  </div>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <CaseCard isLarge />
                  <CaseCard isLarge />
               </div>
            </div>
         </div>

         {/* Collaboration Sidebar */}
         <div className="col-span-4 flex flex-col space-y-6">
            <div className="flex-1">
               <LiveNotes />
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6">
                <h4 className="text-xs font-bold text-primary uppercase mb-4 flex items-center">
                  <Layers size={14} className="mr-2" /> Quick Export Pipeline
                </h4>
                <p className="text-[10px] text-slate-500 mb-6 font-medium">Generate regulator-ready Evidence Packs (ZIP/PDF) for the current selection.</p>
                <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-xl shadow-primary/20">
                   <Download size={18} className="mr-2" /> Generate SAR Bundle
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default InvestigatorWorkspace;
