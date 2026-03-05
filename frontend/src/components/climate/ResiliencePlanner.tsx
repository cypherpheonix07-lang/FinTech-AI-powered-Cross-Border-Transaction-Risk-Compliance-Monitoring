import React, { useState, useEffect } from 'react';
import { CloudRain, AlertTriangle, ShieldCheck, Droplets, Flame } from 'lucide-react';

const ResiliencePlanner = () => {
  const [assessment, setAssessment] = useState<any>(null);

  useEffect(() => {
    // Mocking the Python ClimateRiskAnalyzer response for a Coastal Real Estate portfolio
    setAssessment({
      asset_id: "AST_MIAMI_99",
      asset_type: "Coastal_Real_Estate",
      coordinates: "25.7617° N, 80.1918° W",
      climate_risk_score: 82.5,
      risk_status: "CRITICAL_RISK",
      estimated_capital_at_risk_usd: 12000000.0, // 80% of $15M
      recommended_action: "Immediate divestment or massive resilience retrofit required. Uninsurable within 5 years.",
      underlying_climate_data: {
        sea_level_rise_10yr_prob: 0.35,
        extreme_heat_days_increase: 42,
        flood_zone_transition_prob: 0.58,
        wildfire_exposure_index: 0.12
      }
    });
  }, []);

  if (!assessment) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-800 shadow-xl font-sans">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <CloudRain className="w-8 h-8 text-sky-500" />
            Climate Resilience Planner
          </h2>
          <p className="text-slate-500 mt-1 cursor-help" title={assessment.coordinates}>
            Asset: {assessment.asset_id} • {assessment.asset_type.replace(/_/g, ' ')}
          </p>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-sm font-semibold text-slate-500 mb-1">Composite Risk Score</span>
           <div className="flex items-center gap-2">
             <span className={`text-2xl font-black ${
               assessment.risk_status === 'CRITICAL_RISK' ? 'text-rose-600' :
               assessment.risk_status === 'HIGH_RISK' ? 'text-amber-600' : 'text-emerald-600'
             }`}>
               {assessment.climate_risk_score.toFixed(1)}<span className="text-sm">/100</span>
             </span>
             <StatusBadge status={assessment.risk_status} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Capital at Risk (10yr Projection)</h3>
              <p className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
                ${(assessment.estimated_capital_at_risk_usd / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-700">AI Recommendation:</p>
            <p className="text-sm text-slate-600 italic mt-1">{assessment.recommended_action}</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg relative overflow-hidden">
          {/* subtle water effect background */}
          <div className="absolute inset-0 bg-blue-500/10 blur-xl"></div>
          
          <h3 className="font-semibold mb-4 relative z-10">Underlying Climate Drivers</h3>
          <div className="space-y-4 relative z-10">
            <DriverRow 
              icon={<Droplets className="text-blue-400" />} 
              label="Sea Level Rise Prob." 
              value={`${(assessment.underlying_climate_data.sea_level_rise_10yr_prob * 100).toFixed(0)}%`} 
            />
            <DriverRow 
              icon={<Flame className="text-amber-400" />} 
              label="Extreme Heat Days" 
              value={`+${assessment.underlying_climate_data.extreme_heat_days_increase}`} 
            />
            <DriverRow 
              icon={<CloudRain className="text-indigo-400" />} 
              label="Flood Zone Transition" 
              value={`${(assessment.underlying_climate_data.flood_zone_transition_prob * 100).toFixed(0)}%`} 
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-2 transition-all">
          <ShieldCheck className="w-5 h-5" />
          Purchase Parametric Insurance
        </button>
        <button className="flex-1 py-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition-all shadow-sm">
          Issue Green Bond for Retrofit
        </button>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const mapping: any = {
    "CRITICAL_RISK": "bg-rose-100 text-rose-700 border-rose-200",
    "HIGH_RISK": "bg-amber-100 text-amber-700 border-amber-200",
    "MODERATE_RISK": "bg-blue-100 text-blue-700 border-blue-200",
    "LOW_RISK": "bg-emerald-100 text-emerald-700 border-emerald-200"
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold border ${mapping[status] || mapping["LOW_RISK"]}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

const DriverRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      {React.cloneElement(icon as React.ReactElement, { className: `w-4 h-4 ${(icon as React.ReactElement).props.className}` })}
      <span className="text-xs text-slate-300">{label}</span>
    </div>
    <span className="text-sm font-bold text-white font-mono">{value}</span>
  </div>
);

export default ResiliencePlanner;
