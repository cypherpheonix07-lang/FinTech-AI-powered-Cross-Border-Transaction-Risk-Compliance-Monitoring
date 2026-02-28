import React, { useState } from 'react';
import { 
  Building2, Users, Database, Globe, 
  Settings, Plus, MoreHorizontal, Activity
} from 'lucide-react';

/**
 * TenantAdmin.jsx
 * Control plane for multi-tenant isolation and account management.
 */
const TenantAdmin = () => {
  const [tenants] = useState([
    { id: 'T_101', name: 'Global Bank Alpha', region: 'EU-WEST-1', users: 142, status: 'active', load: 18 },
    { id: 'T_102', name: 'Pacific Trust', region: 'AP-SOUTH-1', users: 58, status: 'active', load: 8 },
    { id: 'T_103', name: 'Nordic AML Unit', region: 'EU-NORTH-1', users: 12, status: 'provisioning', load: 0 }
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-100 flex items-center italic tracking-tighter uppercase">
            <Building2 className="text-primary mr-3" size={32} />
            Tenant Control Plane
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage global institution isolation and resource allocation.</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-2xl font-bold flex items-center shadow-xl shadow-primary/30 transition-all">
          <Plus size={18} className="mr-2" /> Provision New Institution
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {tenants.map((t) => (
          <div key={t.id} className="bg-dark-800 border border-dark-600 rounded-3xl p-8 flex flex-col hover:border-dark-400 transition-all shadow-xl group">
             <div className="flex justify-between items-start mb-8">
                <div className="bg-dark-900 border border-dark-700 p-4 rounded-2xl text-slate-400 group-hover:text-primary transition-colors">
                   <Database size={24} />
                </div>
                <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${t.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                   {t.status}
                </span>
             </div>

             <h3 className="text-xl font-bold text-slate-100 mb-1">{t.name}</h3>
             <p className="text-xs text-slate-500 font-mono mb-8 uppercase tracking-widest">{t.id} • {t.region}</p>

             <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                   <span className="text-slate-500 flex items-center"><Users size={12} className="mr-1" /> Seat Usage</span>
                   <span className="text-slate-200">{t.users} / 500</span>
                </div>
                <div className="h-1.5 w-full bg-dark-900 rounded-full overflow-hidden">
                   <div className="h-full bg-primary" style={{ width: `${(t.users/500)*100}%` }} />
                </div>
             </div>

             <div className="mt-auto pt-6 border-t border-dark-700/50 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                   <Activity size={12} />
                   <span>Real-time Load: {t.load}%</span>
                </div>
                <button className="text-slate-500 hover:text-white p-2">
                   <Settings size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>
      
      {/* Global Health Map Placeholder */}
      <div className="bg-dark-800 border border-dark-600 rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 min-h-[300px]">
         <Globe size={48} className="text-dark-600 opacity-20" />
         <p className="text-xs text-slate-600 italic">Inter-Regional Tenant Traffic Map Visualizing...</p>
      </div>
    </div>
  );
};

export default TenantAdmin;
