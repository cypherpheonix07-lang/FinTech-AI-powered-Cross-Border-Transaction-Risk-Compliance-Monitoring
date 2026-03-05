import React, { useState, useEffect } from 'react';
import { Landmark, TrendingDown, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

const TaxStrategyDashboard = () => {
  const [taxData, setTaxData] = useState<any>(null);

  useEffect(() => {
    // Mocking Python TaxStrategyEngine response
    setTaxData({
      initial_capital_usd: 10000000.0,
      origin_jurisdiction: "US_DE",
      considered_destinations: ["IE", "SG", "KY"],
      recommended_strategy: "IP Licensing via Irish/Cayman Subsidiary",
      potential_tax_savings_usd: 1550000.0,
      simulation_scenarios: [
        {
          strategy_name: "IP Licensing via Irish/Cayman Subsidiary",
          effective_tax_rate_pct: 4.5,
          estimated_tax_owed_usd: 450000.0,
          net_capital_retained_usd: 9550000.0,
          complexity_level: "HIGH",
          risk_profile: "AGGRESSIVE"
        },
        {
          strategy_name: "Singapore Regional Holding Structuring",
          effective_tax_rate_pct: 8.5,
          estimated_tax_owed_usd: 850000.0,
          net_capital_retained_usd: 9150000.0,
          complexity_level: "MODERATE",
          risk_profile: "BALANCED"
        },
        {
          strategy_name: "Direct Repatriation (US_DE)",
          effective_tax_rate_pct: 20.0,
          estimated_tax_owed_usd: 2000000.0,
          net_capital_retained_usd: 8000000.0,
          complexity_level: "LOW",
          risk_profile: "CONSERVATIVE"
        }
      ]
    });
  }, []);

  if (!taxData) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-800 shadow-xl font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Landmark className="w-8 h-8 text-emerald-600" />
            AI Tax Optimization Strategy
          </h2>
          <p className="text-slate-500 mt-1">Cross-Border Routing & Tax-Loss Harvesting</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Simulated Capital</p>
          <p className="text-2xl font-black font-mono text-slate-900">
            ${(taxData.initial_capital_usd / 1000000).toFixed(1)}M USD
          </p>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-emerald-800 font-bold text-lg mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Recommended Structure
            </h3>
            <p className="text-emerald-900 font-medium">{taxData.recommended_strategy}</p>
          </div>
          <div className="text-right bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estimated Tax Savings</p>
            <p className="text-3xl font-bold text-emerald-600 font-mono">
              +${(taxData.potential_tax_savings_usd / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4" /> Routing Scenarios Compared
      </h3>
      
      <div className="space-y-4">
        {taxData.simulation_scenarios.map((scenario: any, idx: number) => (
          <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
            idx === 0 ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {idx + 1}
                </span>
                <h4 className="font-bold text-slate-800">{scenario.strategy_name}</h4>
                {idx === 0 && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase">Best Outcome</span>}
              </div>
              
              <div className="flex items-center gap-4 text-xs mt-2 pl-9">
                <span className={`px-2 py-1 rounded border font-medium ${
                  scenario.risk_profile === 'AGGRESSIVE' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  scenario.risk_profile === 'BALANCED' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {scenario.risk_profile} RISK
                </span>
                <span className="text-slate-500">Complexity: <span className="font-semibold text-slate-700">{scenario.complexity_level}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-8 text-right min-w-[250px]">
              <div>
                <p className="text-xs text-slate-500 mb-1">Effective Tax Rate</p>
                <p className="font-mono font-medium text-slate-700">{scenario.effective_tax_rate_pct.toFixed(2)}%</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300" />
              <div>
                <p className="text-xs text-slate-500 mb-1">Net Retained Capital</p>
                <p className={`font-mono text-lg font-bold ${idx === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                  ${(scenario.net_capital_retained_usd / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxStrategyDashboard;
