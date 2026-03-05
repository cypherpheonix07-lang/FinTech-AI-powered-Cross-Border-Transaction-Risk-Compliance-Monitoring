import React, { useState, useEffect } from 'react';
import { BrainCircuit, Fingerprint, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const NeuralInterface = () => {
  const [bciState, setBciState] = useState<any>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authResult, setAuthResult] = useState<any>(null);

  useEffect(() => {
    // Simulated live polling from BCI headset
    const interval = setInterval(() => {
      if(!isAuthorizing && !authResult) {
        setBciState({
          cognitive_load: Math.random() * (0.85 - 0.40) + 0.40,
          focus_level: Math.random() * (0.99 - 0.50) + 0.50,
          stress_indicator: Math.random() * (0.65 - 0.20) + 0.20,
          decision_fatigue: Math.random() * (0.70 - 0.10) + 0.10,
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isAuthorizing, authResult]);

  const handleAuthorization = () => {
    setIsAuthorizing(true);
    setAuthResult(null);

    // Simulate backend authorization delay
    setTimeout(() => {
      // Logic based on Python NeuralAuthSimulator rules
      let result = { status: "APPROVED", reason: "Neural signature verified." };
      
      if (bciState.stress_indicator > 0.70) {
        result = { status: "DENIED", reason: "Elevated stress detected. Potential duress. Transfer locked." };
      } else if (bciState.focus_level < 0.60) {
        result = { status: "DENIED", reason: "Insufficient mental focus. Please concentrate and try again." };
      } else if (bciState.cognitive_load > 0.85) {
        result = { status: "FALLBACK", reason: "High cognitive load. Please use hardware key." };
      }

      setAuthResult(result);
      setIsAuthorizing(false);
    }, 1500);
  };

  const getBarColor = (value: number, isInverseBad: boolean = false) => {
    if (isInverseBad) {
      if (value < 0.4) return 'bg-rose-500';
      if (value < 0.6) return 'bg-amber-400';
      return 'bg-emerald-400';
    } else {
      if (value > 0.75) return 'bg-rose-500';
      if (value > 0.6) return 'bg-amber-400';
      return 'bg-emerald-400';
    }
  };

  return (
    <div className="bg-[#111827] border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-2xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-rose-400" />
            Neural Authentication
          </h2>
          <p className="text-slate-400 mt-1">Brain-Computer Interface (BCI) Auth</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-400">Headset Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Real-time metrics */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> Live Cognitive State
          </h3>
          
          <MetricBar label="Cognitive Load" value={bciState?.cognitive_load || 0} color={getBarColor(bciState?.cognitive_load || 0)} />
          <MetricBar label="Mental Focus" value={bciState?.focus_level || 0} color={getBarColor(bciState?.focus_level || 0, true)} />
          <MetricBar label="Stress Indicator" value={bciState?.stress_indicator || 0} color={getBarColor(bciState?.stress_indicator || 0)} />
          <MetricBar label="Decision Fatigue" value={bciState?.decision_fatigue || 0} color={getBarColor(bciState?.decision_fatigue || 0)} />
        </div>

        {/* Action Area */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col justify-center items-center text-center">
          
          {!authResult ? (
            <>
              <div className="p-4 bg-slate-900 rounded-full border-4 border-slate-700 mb-6 relative">
                 <Fingerprint className={`w-12 h-12 text-slate-400 ${isAuthorizing ? 'animate-pulse text-rose-400' : ''}`} />
                 {isAuthorizing && (
                   <div className="absolute inset-0 rounded-full border-4 border-rose-500/50 animate-ping"></div>
                 )}
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Authorize $50,000 Transfer</h4>
              <p className="text-sm text-slate-400 mb-6">Focus clearly on your intent to approve this transaction.</p>
              
              <button 
                onClick={handleAuthorization}
                disabled={isAuthorizing || !bciState}
                className={`w-full py-3 rounded-lg font-bold tracking-wide transition-all ${
                  isAuthorizing 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50'
                }`}
              >
                {isAuthorizing ? 'Scanning Neural Pattern...' : 'Initiate Thought Auth'}
              </button>
            </>
          ) : (
            <div className="w-full flex justify-center items-center flex-col animate-in fade-in zoom-in duration-300">
              {authResult.status === "APPROVED" && <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />}
              {authResult.status === "DENIED" && <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />}
              {authResult.status === "FALLBACK" && <ShieldAlert className="w-16 h-16 text-amber-500 mb-4" />}
              
              <h4 className={`text-xl font-bold mb-2 ${
                authResult.status === "APPROVED" ? "text-emerald-400" :
                authResult.status === "DENIED" ? "text-rose-500" : "text-amber-500"
              }`}>
                {authResult.status === "APPROVED" ? "Transaction Verified" : 
                 authResult.status === "DENIED" ? "Authorization Blocked" : "Manual Fallback Required"}
              </h4>
              <p className="text-sm text-slate-300 mb-6 px-4 leading-relaxed">{authResult.reason}</p>
              
              <button 
                onClick={() => setAuthResult(null)}
                className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
              >
                Reset Scanner
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div>
    <div className="flex justify-between items-center mb-1 drop-shadow-md">
      <span className="text-xs font-medium text-slate-300">{label}</span>
      <span className="text-xs font-mono text-slate-400">{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-700/50 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ease-out ${color}`} style={{ width: `${value * 100}%` }}></div>
    </div>
  </div>
);

export default NeuralInterface;
