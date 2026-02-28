import React from 'react';
import { 
  CreditCard, PieChart, TrendingUp, Download, 
  ArrowUpRight, AlertCircle, Sparkles 
} from 'lucide-react';

/**
 * BillingAdmin.jsx
 * Monetization and usage transparency for tenant accounts.
 */
const BillingAdmin = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-3xl font-black text-slate-100 flex items-center italic tracking-tighter uppercase">
              <CreditCard className="text-primary mr-3" size={32} />
              Billing & Consumption
            </h1>
            <p className="text-slate-500 text-sm mt-1">Institutional plan transparency and API consumption metrics.</p>
         </div>
         <div className="bg-dark-800 border border-dark-600 px-6 py-3 rounded-2xl flex items-center space-x-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Balance</span>
            <span className="text-xl font-black text-green-500">$12,482.00</span>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
         {/* Usage Metrics */}
         <div className="col-span-8 space-y-8">
            <div className="bg-dark-800 border border-dark-600 rounded-3xl p-8 shadow-2xl">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest flex items-center">
                    <TrendingUp size={16} className="text-primary mr-2" /> Cumulative Trace Consumption
                  </h3>
                  <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase flex items-center">
                    Month-to-Date <ArrowUpRight size={12} className="ml-1" />
                  </button>
               </div>
               
               <div className="h-64 flex items-end justify-between space-x-2 px-4">
                  {[40, 65, 30, 85, 45, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/10 hover:bg-primary/30 transition-all rounded-t-xl group relative" style={{ height: `${h}%` }}>
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-bold p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                         {h}k
                       </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between mt-4 px-4 text-[9px] font-bold text-slate-600 uppercase">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="bg-dark-800 border border-dark-600 rounded-3xl p-6">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">API Call Efficiency</h4>
                  <div className="text-3xl font-black text-slate-100">98.4%</div>
                  <div className="text-[10px] text-green-500 font-bold mt-1">+2.4% from average</div>
               </div>
               <div className="bg-dark-800 border border-dark-600 rounded-3xl p-6">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Cached Risk Hits</h4>
                  <div className="text-3xl font-black text-slate-100">4,204</div>
                  <div className="text-[10px] text-slate-600 font-bold mt-1">Saved $420.40 in credits</div>
               </div>
            </div>
         </div>

         {/* Plan Sidebar */}
         <div className="col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-primary to-primary-hover rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <Sparkles size={120} className="absolute -bottom-10 -right-10 opacity-10" />
                <h4 className="text-sm font-black uppercase mb-2">Institutional Tier</h4>
                <div className="text-3xl font-black mb-6 italic tracking-tighter">ENTERPRISE PLUS</div>
                <ul className="space-y-3 mb-8">
                   {[
                     'Unlimited Tenancy Isolation',
                     'SLA-Backed GNN Processing',
                     'Dedicated Inference Pool',
                     '24/7 Red-Team Monitoring'
                   ].map(item => (
                     <li key={item} className="text-[10px] font-bold flex items-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2" /> {item}
                     </li>
                   ))}
                </ul>
                <button className="w-full bg-white text-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">
                   Manage Licenses
                </button>
            </div>

            <div className="bg-dark-800 border border-dark-600 rounded-3xl p-6 flex items-start space-x-4">
               <div className="bg-risk-medium/20 p-3 rounded-2xl text-risk-medium">
                  <AlertCircle size={24} />
               </div>
               <div>
                  <h4 className="text-xs font-bold text-slate-200">Payment Overdue</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Add a backup credit instrument to ensure 100% trace uptime.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BillingAdmin;
