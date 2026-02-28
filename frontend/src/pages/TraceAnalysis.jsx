import React, { useState } from 'react';
import { Search, ShieldAlert, TrendingUp, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import useStore from '../app/store';
import GraphCanvas from '../components/graph/GraphCanvas';
import api from '../services/api';

const RiskExplanation = ({ reasons }) => (
  <div className="space-y-3">
    {reasons.map((reason, idx) => (
      <div key={idx} className="flex items-start space-x-3 p-3 bg-dark-900/50 rounded-xl border border-dark-700">
        <div className="mt-0.5">
          <AlertTriangle className="text-risk-medium" size={16} />
        </div>
        <p className="text-sm text-slate-300 italic">"{reason}"</p>
      </div>
    ))}
  </div>
);

const TraceAnalysis = () => {
  const [txId, setTxId] = useState('');
  const [loading, setLoading] = useState(false);
  const { setTracePath, riskScore, riskReasons, selectedTracePath } = useStore();

  const handleTrace = async () => {
    if (!txId) return;
    setLoading(true);
    try {
      const result = await api.get(`/trace/tx/${txId}`);
      // Expecting { path: [nodeIds], edges: [edgeIds], overall_risk: 0.8, reasons: [...] }
      setTracePath(
        { nodes: result.path, edges: result.edges },
        result.overall_risk,
        result.reasons || []
      );
    } catch (error) {
      console.error('Trace failed', error);
    } finally {
      setLoading(false);
    }
  };

  const riskColor = riskScore > 0.6 ? 'text-risk-high' : riskScore > 0.3 ? 'text-risk-medium' : 'text-risk-low';
  const riskBg = riskScore > 0.6 ? 'bg-risk-high' : riskScore > 0.3 ? 'bg-risk-medium' : 'bg-risk-low';

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="bg-dark-700 p-6 rounded-3xl border border-dark-600 shadow-xl flex items-center justify-between">
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Enter Transaction ID (e.g., TX_98234)..."
            className="w-full bg-dark-900 border border-dark-600 rounded-2xl pl-12 pr-4 py-4 text-slate-100 focus:outline-none focus:border-primary transition-all shadow-inner"
            value={txId}
            onChange={(e) => setTxId(e.target.value)}
          />
        </div>
        <button 
          onClick={handleTrace}
          disabled={loading || !txId}
          className="ml-6 bg-primary hover:bg-primary-hover disabled:bg-dark-600 disabled:cursor-not-allowed text-white px-10 py-4 rounded-2xl font-bold flex items-center transition-all shadow-lg shadow-primary/20"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <TrendingUp className="mr-2" size={20} />}
          Start Intelligent Trace
        </button>
      </div>

      <div className="flex-1 flex space-x-6 min-h-0">
        <div className="flex-1 relative min-w-0">
          <GraphCanvas />
          {!selectedTracePath && (
            <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-sm flex items-center justify-center rounded-3xl">
              <div className="text-center bg-dark-800 p-8 rounded-2xl border border-dark-700 shadow-2xl max-w-sm">
                <Search size={48} className="text-slate-600 mx-auto mb-4" />
                <h4 className="text-slate-200 font-bold mb-2">Ready for Analysis</h4>
                <p className="text-slate-500 text-sm">Enter a Transaction ID above to begin the path risk intelligence trace.</p>
              </div>
            </div>
          )}
        </div>

        {selectedTracePath && (
          <div className="w-96 bg-dark-700 rounded-3xl border border-dark-600 shadow-2xl flex flex-col min-w-[24rem]">
            <div className="p-6 border-b border-dark-600">
              <h3 className="text-xl font-bold text-slate-100">Path Diagnostics</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-dark-800 shadow-xl mb-4 ${riskBg} bg-opacity-20`}>
                  <p className={`text-3xl font-black ${riskColor}`}>
                    {(riskScore * 100).toFixed(0)}
                  </p>
                </div>
                <p className={`text-sm font-bold uppercase tracking-widest ${riskColor}`}>
                  {riskScore > 0.6 ? 'High Path Risk' : riskScore > 0.3 ? 'Elevated Risk' : 'Low Risk'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                  <span>Trace Reasoning</span>
                  <ShieldAlert size={14} />
                </div>
                <RiskExplanation reasons={riskReasons} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                  <span>Critical Path</span>
                  <div className="text-primary text-[10px]">3 HOPS</div>
                </div>
                <div className="space-y-2">
                  {selectedTracePath.nodes.map((nodeId, idx) => (
                    <React.Fragment key={nodeId}>
                      <div className="flex items-center space-x-3 p-3 bg-dark-900/30 rounded-lg border border-dark-800">
                        <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-mono text-slate-300">{nodeId}</span>
                      </div>
                      {idx < selectedTracePath.nodes.length - 1 && (
                        <div className="flex justify-center my-1 text-slate-600">
                          <ChevronRight size={16} className="rotate-90" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraceAnalysis;
