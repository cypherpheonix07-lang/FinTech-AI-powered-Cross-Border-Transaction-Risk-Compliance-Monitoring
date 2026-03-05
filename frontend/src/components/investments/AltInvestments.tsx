import React, { useState, useEffect } from 'react';
import { Briefcase, Landmark, TrendingUp, Paintbrush, Car } from 'lucide-react';

const AltInvestments = () => {
  const [valuation, setValuation] = useState<any>(null);

  useEffect(() => {
    // Mocking Python AlternativeAssetsTracker responses
    setValuation({
      total_portfolio_value_usd: 5568500.0,
      asset_count: 3,
      diversification_score: 60.0, // 3 out of 5 asset classes
      holdings: [
        {
          asset_id: "ALT_ART_001",
          name: "Untitled (1982) - Basquiat (Fractional)",
          class: "Fine_Art",
          shares: 5000,
          current_price: 112.50,
          position_value_usd: 562500.0
        },
        {
          asset_id: "ALT_CAR_042",
          name: "1962 Ferrari 250 GTO (Fractional)",
          class: "Classic_Cars",
          shares: 1000,
          current_price: 486.00,
          position_value_usd: 486000.0
        },
        {
          asset_id: "ALT_RE_991",
          name: "Trophy Asset: 432 Park Ave Penthouse",
          class: "Real_Estate",
          shares: 50000,
          current_price: 90.40,
          position_value_usd: 4520000.0
        }
      ]
    });
  }, []);

  if (!valuation) return null;

  const getIconForClass = (assetClass: string) => {
    switch (assetClass) {
      case 'Fine_Art': return <Paintbrush className="w-5 h-5 text-fuchsia-500" />;
      case 'Classic_Cars': return <Car className="w-5 h-5 text-red-500" />;
      case 'Real_Estate': return <Landmark className="w-5 h-5 text-emerald-500" />;
      default: return <Briefcase className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-[#fdfdfd] border border-slate-200 rounded-xl p-6 text-slate-800 shadow-xl font-sans">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-indigo-600" />
            Alternative Investments
          </h2>
          <p className="text-slate-500 mt-1">Fractional Ownership & Illiquid Assets</p>
        </div>
        <div className="flex items-center gap-4 text-right">
           <div>
             <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Portfolio Value</p>
             <p className="text-2xl font-black font-mono text-slate-900">
               ${(valuation.total_portfolio_value_usd).toLocaleString()}
             </p>
           </div>
           <div className="pl-4 border-l border-slate-200">
             <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Diversification</p>
             <div className="flex items-center gap-2">
               <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500" style={{ width: `${valuation.diversification_score}%`}}></div>
               </div>
               <span className="text-sm font-bold text-indigo-700">{valuation.diversification_score}%</span>
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        {valuation.holdings.map((asset: any) => (
          <div key={asset.asset_id} className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow group flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                {getIconForClass(asset.class)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{asset.name}</h3>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-xs uppercase font-medium tracking-wide">
                    {asset.class.replace('_', ' ')}
                  </span>
                  • {asset.shares.toLocaleString()} Shares
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-mono text-xl font-bold text-slate-900">
                ${(asset.position_value_usd).toLocaleString()}
              </p>
              <p className="text-sm text-emerald-600 flex items-center justify-end gap-1 mt-1 font-medium">
                <TrendingUp className="w-3 h-3" />
                ${asset.current_price.toFixed(2)}/sh
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AltInvestments;
