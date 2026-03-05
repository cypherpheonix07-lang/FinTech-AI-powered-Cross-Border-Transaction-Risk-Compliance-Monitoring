import React, { useState, useEffect } from 'react';
import { Factory, FileSignature, Receipt, TrendingDown } from 'lucide-react';

const SupplyChainDashboard = () => {
  const [factoringQuote, setFactoringQuote] = useState<any>(null);
  const [loc_data, setLocData] = useState<any>(null);

  useEffect(() => {
    // Mocking Python TradeFinanceEngine responses
    setFactoringQuote({
      invoice_id: "INV-9942",
      face_value_usd: 120000.0,
      buyer_rating: "AA",
      days_to_maturity: 60,
      discount_rate_applied: 0.329, // 0.329%
      total_fee_usd: 994.52,
      advance_amount_usd: 119005.48,
      effective_apr: 2.0,
      status: "APPROVED_FOR_FUNDING"
    });

    setLocData({
      loc_id: "LOC_834912",
      buyer: "GlobalTech_Corp",
      seller: "Shenzhen_Manufacturing",
      guaranteed_amount_usd: 550000.0,
      conditions_precedent: ["Goods loaded on vessel", "Export customs cleared"],
      status: "DRAFTED",
      required_oracles: ["Bill_of_Lading_API", "Customs_Clearance_API"]
    });
  }, []);

  if (!factoringQuote) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-800 shadow-xl font-sans">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Factory className="w-8 h-8 text-indigo-600" />
            Supply Chain & Trade Finance
          </h2>
          <p className="text-slate-500 mt-1">Automated Factoring & Smart Letters of Credit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Invoice Factoring Engine */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
          
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-6">
            <Receipt className="w-5 h-5 text-indigo-500" /> Invoice Factoring Quote
          </h3>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs text-slate-500 mb-1">Invoice {factoringQuote.invoice_id}</p>
              <p className="text-3xl font-bold text-slate-900 font-mono">${(factoringQuote.face_value_usd).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 font-bold rounded text-sm mb-1">
                {factoringQuote.buyer_rating} Rated Buyer
              </span>
              <p className="text-xs text-slate-500">Matures in {factoringQuote.days_to_maturity} days</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm text-slate-600">Discount Rate Applied</span>
              <span className="font-mono font-medium text-amber-600">{factoringQuote.discount_rate_applied}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm text-slate-600">Total Fees</span>
              <span className="font-mono font-medium text-rose-600">-${(factoringQuote.total_fee_usd).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
              <span className="font-bold text-slate-800">Advance Amount (Immediate)</span>
              <span className="font-mono font-bold text-emerald-600 text-lg">${(factoringQuote.advance_amount_usd).toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center justify-center gap-2 transition-all">
            <TrendingDown className="w-4 h-4" />
            Accept Factoring Advance
          </button>
        </div>

        {/* Smart Letter of Credit */}
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-6">
            <FileSignature className="w-5 h-5 text-emerald-400" /> Smart Letter of Credit
          </h3>

          <div className="flex items-center gap-4 mb-6">
             <div className="flex-1 p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-xs text-slate-400 mb-1">Importer (Buyer)</p>
               <p className="font-semibold">{loc_data.buyer.replace('_', ' ')}</p>
             </div>
             <div className="flex-1 p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-xs text-slate-400 mb-1">Exporter (Seller)</p>
               <p className="font-semibold">{loc_data.seller.replace('_', ' ')}</p>
             </div>
          </div>

          <div className="mb-6">
             <p className="text-xs text-slate-400 mb-2">Guaranteed Amount</p>
             <p className="text-3xl font-mono text-emerald-400">${(loc_data.guaranteed_amount_usd).toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Conditions Precedent for Release</p>
              <ul className="space-y-2">
                {loc_data.conditions_precedent.map((cond: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {cond}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded block">
              <p className="text-xs font-semibold text-slate-400 mb-2">Required Oracle Invocations</p>
              <div className="flex flex-wrap gap-2">
                 {loc_data.required_oracles.map((oracle: string, idx: number) => (
                   <span key={idx} className="px-2 py-1 bg-slate-950 text-slate-300 text-xs font-mono rounded border border-slate-800">
                     {oracle}
                   </span>
                 ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SupplyChainDashboard;
