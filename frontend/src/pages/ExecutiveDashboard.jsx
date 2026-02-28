import React from 'react';
import { 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, ShieldCheck, Calendar, 
  Download, Share2, Globe 
} from 'lucide-react';

/**
 * ExecutiveDashboard.jsx
 * High-level telemetry for institutional C-suite and regulators.
 */
const ExecutiveDashboard = () => {
  const stats = [
    { label: 'Total Volume Tracked', value: '$4.2B', change: '+12%', color: 'text-primary' },
    { label: 'Risk Interdictions', value: '1,420', change: '+8%', color: 'text-risk-high' },
    { label: 'Avg Latency (ms)', value: '42ms', change: '-4%', color: 'text-green-500' },
    { label: 'Compliance Score', value: '98.8%', change: '+0.2%', color: 'text-slate-200' }
  ];

  return (
    <div className="flex flex-col h-full space-y-8 py-4 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-slate-100 flex items-center italic tracking-tighter uppercase leading-none">
             <ShieldCheck className="text-primary mr-3" size={32} />
             Institutional Executive Dashboard
           </h1>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 ml-1">Platform Telemetry & Compliance Fidelity</p>
        </div>
        <div className="flex space-x-3">
           <button className="bg-dark-800 border-2 border-dark-600 px-6 py-3 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">
              <Calendar size={14} className="mr-2 inline" /> Last 30 Days
           </button>
           <button className="bg-primary px-8 py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <Download size={14} className="mr-2 inline" /> Export PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
         {stats.map((s, i) => (
           <div key={i} className="bg-dark-800 border-2 border-dark-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <TrendingUp size={80} />
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{s.label}</p>
              <div className="flex items-end space-x-3">
                 <span className={`text-3xl font-black ${s.color}`}>{s.value}</span>
                 <span className="text-[10px] font-bold text-green-500 mb-1">{s.change}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
         <div className="col-span-8 bg-dark-800 border-2 border-dark-600 rounded-[3rem] p-10 shadow-3xl flex flex-col">
            <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest mb-8 flex items-center">
               <Globe size={16} className="text-primary mr-2" /> Global Risk Topology Expansion
            </h3>
            <div className="flex-1">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: 'W1', v: 400 }, { name: 'W2', v: 600 }, { name: 'W3', v: 500 }, 
                    { name: 'W4', v: 900 }, { name: 'W5', v: 800 }, { name: 'W6', v: 1200 }
                  ]}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
                    <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="col-span-4 space-y-8">
            <div className="bg-dark-800 border-2 border-dark-600 rounded-[2.5rem] p-8 flex flex-col shadow-2xl">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Corridor Risk Mix</h4>
               <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={[
                          { name: 'EMEA', value: 400 },
                          { name: 'APAC', value: 300 },
                          { name: 'NAM', value: 200 }
                        ]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                           <Cell fill="#3b82f6" />
                           <Cell fill="#10b981" />
                           <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex justify-between mt-4 px-4">
                  {['EMEA', 'APAC', 'NAM'].map((r, i) => (
                    <div key={r} className="flex flex-col items-center">
                       <div className={`w-1.5 h-1.5 rounded-full mb-1 ${i===0 ? 'bg-primary' : i===1 ? 'bg-green-500' : 'bg-risk-high'}`} />
                       <span className="text-[9px] font-black text-slate-500">{r}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary/5 border-2 border-primary/20 rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-all">
               <div>
                  <h4 className="text-xs font-black text-primary uppercase italic tracking-tighter">Scheduled Reports</h4>
                  <p className="text-[10px] text-slate-500 font-medium">3 active automated briefs</p>
               </div>
               <Share2 size={24} className="text-primary group-hover:scale-110 transition-transform" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
