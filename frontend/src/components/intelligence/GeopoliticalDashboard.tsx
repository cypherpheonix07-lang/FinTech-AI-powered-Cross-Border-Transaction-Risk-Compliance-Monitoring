import React, { useState, useEffect } from 'react';
import { Globe, AlertOctagon, ShieldAlert, Navigation } from 'lucide-react';

const GeopoliticalDashboard = () => {
  const [intel, setIntel] = useState<any>(null);

  useEffect(() => {
    // Mocking the Python GeopoliticalRiskIntel response for a high-risk route
    setIntel({
      route_assessed: ["US", "TR", "RU"],
      max_geopolitical_risk_score: 95.0,
      primary_risk_driver: "Extreme Volatility/Sanctions in RU",
      sanctions_alerts: [
        {
          entity_name: "Bank_in_RU",
          is_sanctioned: true,
          matched_lists: ["OFAC_SDN", "EU_CONSOLIDATED"],
          last_screened: new Date().toISOString()
        }
      ],
      recommended_action: "BLOCKED_SANCTIONS",
      timestamp: new Date().toISOString()
    });
  }, []);

  if (!intel) return null;

  return (
    <div className="bg-[#1e1e24] border border-red-900/30 rounded-xl p-6 text-slate-200 shadow-2xl font-sans">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Globe className="w-8 h-8 text-rose-500" />
            Geopolitical Risk Intelligence
          </h2>
          <p className="text-slate-400 mt-1">Real-time sanctions & stability forecasting</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Max Route Risk</p>
            <p className={`text-2xl font-black font-mono ${intel.max_geopolitical_risk_score > 80 ? 'text-rose-500' : 'text-amber-500'}`}>
              {intel.max_geopolitical_risk_score}<span className="text-sm">/100</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Route Visualization */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-6">
            <Navigation className="w-4 h-4" /> Transfer Path Detection
          </h3>
          
          <div className="flex items-center justify-between relative">
            <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-slate-700 -z-10"></div>
            {intel.route_assessed.map((node: string, index: number) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm z-10 
                  ${node === 'RU' || node === 'IR' ? 'bg-rose-900 border-rose-500 text-rose-200' : 
                    node === 'TR' ? 'bg-amber-900 border-amber-500 text-amber-200' : 
                    'bg-slate-800 border-blue-500 text-blue-200'}`}>
                  {node}
                </div>
                {index === 0 ? <span className="text-xs mt-2 text-slate-400">Origin</span> :
                 index === intel.route_assessed.length - 1 ? <span className="text-xs mt-2 text-slate-400">Destination</span> :
                 <span className="text-xs mt-2 text-slate-400">Correspondent</span>}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-rose-950/20 border border-rose-500/20 rounded-lg">
            <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">Primary Risk Driver</p>
            <p className="text-sm text-slate-300">{intel.primary_risk_driver}</p>
          </div>
        </div>

        {/* Sanctions & OFAC Alerts */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
           <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-6">
            <AlertOctagon className="w-4 h-4 text-rose-500" /> Compliance Hard-Stops
          </h3>

          {intel.sanctions_alerts.length > 0 ? (
            <div className="space-y-4">
              {intel.sanctions_alerts.map((alert: any, idx: number) => (
                <div key={idx} className="bg-rose-500/10 border-l-4 border-rose-500 p-4 rounded-r-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-rose-400">{alert.entity_name}</h4>
                    <span className="text-xs font-mono text-rose-500/70">MATCH FOUND</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {alert.matched_lists.map((list: string) => (
                      <span key={list} className="px-2 py-1 bg-rose-900/50 text-rose-200 text-xs rounded border border-rose-500/30 font-mono">
                        {list}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-emerald-500/50">
              No active sanctions detected on route.
            </div>
          )}

          <div className={`mt-6 p-4 rounded-lg flex items-start gap-4 ${
            intel.recommended_action === "BLOCKED_SANCTIONS" ? "bg-red-500/20 border border-red-500/50 text-red-100" :
            "bg-amber-500/20 border border-amber-500/50 text-amber-100"
          }`}>
            <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold tracking-wide">{intel.recommended_action.replace('_', ' ')}</p>
              <p className="text-sm opacity-80 mt-1">Transaction halted due to jurisdictional risks. Compliance officer review mandated.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeopoliticalDashboard;
