import React from 'react';
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

const rates = [
  { pair: 'GBP/USD', rate: '1.2642', change: '+0.45%', isUp: true },
  { pair: 'EUR/GBP', rate: '0.8546', change: '-0.12%', isUp: false },
  { pair: 'GBP/JPY', rate: '189.34', change: '+1.20%', isUp: true },
  { pair: 'GBP/AED', rate: '4.6432', change: '-0.05%', isUp: false },
];

export default function CurrencyRates() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900">Exchange Rates</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-wider">Live Market Data</p>
        </div>
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {rates.map((rate, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 group-hover:bg-white transition-colors uppercase tracking-tight">
                {rate.pair.split('/')[1]}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{rate.pair}</p>
                <div className="flex items-center gap-1">
                  {rate.isUp ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                  <span className={`text-[10px] font-bold ${rate.isUp ? 'text-emerald-600' : 'text-red-600'}`}>{rate.change}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 tracking-tight">{rate.rate}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-slate-200/50 active:scale-95">
        View All Markets
      </button>
    </div>
  );
}
