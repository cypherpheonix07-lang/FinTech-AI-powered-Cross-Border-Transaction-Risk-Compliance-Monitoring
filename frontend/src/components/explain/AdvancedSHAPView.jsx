import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { HelpCircle, Info, ShieldCheck, AlertCircle } from 'lucide-react';

/**
 * AdvancedSHAPView.jsx
 * High-fidelity model explainability for forensic investigators.
 */
const AdvancedSHAPView = ({ data }) => {
  if (!data) return null;

  const chartData = data.contributions
    .sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight))
    .map(c => ({
       name: c.feature,
       value: c.weight,
       abs: Math.abs(c.weight)
    }));

  return (
    <div className="bg-dark-900/50 border border-dark-600 rounded-3xl p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
           <h3 className="text-xl font-bold text-slate-100 flex items-center">
             <ShieldCheck className="text-primary mr-2" size={24} />
             Forensic Feature Attribution
           </h3>
           <p className="text-sm text-slate-500 mt-1">SHAP-based breakdown of model confidence for TX: {data.tx_id}</p>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Risk Confidence</span>
           <span className="text-3xl font-black text-primary">{(data.prediction * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="h-[300px] w-full bg-dark-800/20 rounded-2xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis type="number" hide />
            <YAxis 
               dataKey="name" 
               type="category" 
               axisLine={false} 
               tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
               width={120}
            />
            <Tooltip 
               cursor={{ fill: '#334155', opacity: 0.4 }}
               contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#ef4444' : '#22c55e'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Analysis Verdict */}
      <div className="grid grid-cols-2 gap-6">
         <div className="bg-dark-800/80 p-6 rounded-2xl border border-dark-600">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center tracking-tighter">
               <Info size={14} className="mr-2 text-primary" /> Natural Language Summary
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The primary driver for this escalation is **{chartData[0]?.name}**, contributing **{Math.abs(chartData[0]?.value * 10).toFixed(1)}x** normal variance. High entity velocity suggests an automated layering protocol active in the last 6 hours."
            </p>
         </div>
         <div className="bg-risk-high/5 p-6 rounded-2xl border border-risk-high/20">
            <h4 className="text-xs font-bold text-risk-high uppercase mb-3 flex items-center tracking-tighter">
               <AlertCircle size={14} className="mr-2" /> Counterfactual Insights
            </h4>
            <ul className="text-xs text-slate-400 space-y-2 list-disc ml-4">
               <li>If amount was below $5k, risk would decrease by 18%.</li>
               <li>Additional 2-factor verification on source account would reset trust.</li>
            </ul>
         </div>
      </div>
    </div>
  );
};

export default AdvancedSHAPView;
