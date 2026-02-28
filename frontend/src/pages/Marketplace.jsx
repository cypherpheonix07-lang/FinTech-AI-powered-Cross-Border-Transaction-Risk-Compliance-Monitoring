import React from 'react';
import { 
  LayoutGrid, Star, Download, ShoppingBag, 
  Terminal, Zap, Code 
} from 'lucide-react';

/**
 * Marketplace.jsx
 * Institutional app gallery for third-party extensions and connectors.
 */
const Marketplace = () => {
  const apps = [
    { 
       name: 'ChainGraph Live', 
       dev: 'Nexus Intelligence', 
       category: 'Forensics', 
       rating: 4.8, 
       desc: 'Real-time WebGL visualization of crypto-to-fiat bridge velocity.' 
    },
    { 
       name: 'RiskOracle API', 
       dev: 'ComplianceAI', 
       category: 'Risk', 
       rating: 4.9, 
       desc: 'Enhanced jurisdictional scoring using real-time news and sanction changes.' 
    },
    { 
       name: 'Swift-Bridge-v2', 
       dev: 'Financial Connect', 
       category: 'Ingestion', 
       rating: 4.5, 
       desc: 'Direct ISO-20022 parsing for legacy correspondent banking cores.' 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex justify-between items-start">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-100 tracking-tighter uppercase italic flex items-center">
               <ShoppingBag className="text-primary mr-4" size={40} />
               Forensic App Marketplace
            </h1>
            <p className="text-slate-500 font-medium">Extend Kubera Trace with deep connectors and specialized ML models.</p>
         </div>
         <div className="flex space-x-4">
            <button className="bg-dark-800 border-2 border-dark-600 px-8 py-4 rounded-2xl flex items-center text-xs font-black text-primary hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5">
                <Terminal size={16} className="mr-2" /> Developer Console
            </button>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
         {apps.map((app, i) => (
           <div key={i} className="bg-dark-800 border-2 border-dark-600 rounded-[2.5rem] p-10 flex flex-col hover:border-primary/50 transition-all group relative overflow-hidden shadow-2xl shadow-dark-900">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Zap size={100} />
              </div>

              <div className="flex justify-between items-start mb-8">
                 <div className="bg-dark-900 border border-dark-700 p-5 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                    <LayoutGrid size={28} />
                 </div>
                 <div className="flex items-center space-x-1 text-xs font-black text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span>{app.rating}</span>
                 </div>
              </div>

              <h3 className="text-xl font-black text-slate-100 mb-2">{app.name}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">{app.category} • by {app.dev}</p>
              <p className="text-xs text-slate-400 leading-relaxed mb-10 flex-1">{app.desc}</p>

              <div className="flex items-center justify-between mt-auto">
                 <button className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center shadow-lg shadow-primary/20 transition-all">
                    Connect <Download size={16} className="ml-2" />
                 </button>
              </div>
           </div>
         ))}
      </div>

      {/* Developer Sandbox CTA */}
      <div className="bg-gradient-to-r from-dark-800 to-dark-900 border-2 border-primary/20 rounded-[3rem] p-12 flex items-center justify-between shadow-3xl">
         <div className="flex items-center space-x-8">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
               <Code size={40} />
            </div>
            <div>
               <h4 className="text-2xl font-black text-slate-100 italic tracking-tight">Build for Kubera Trace</h4>
               <p className="text-sm text-slate-500 font-medium">Get a dedicated Sandbox tenant and publish your specialized connectors.</p>
            </div>
         </div>
         <button className="bg-white text-dark-900 px-10 py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl">
            Register for Sandbox
         </button>
      </div>
    </div>
  );
};

export default Marketplace;
