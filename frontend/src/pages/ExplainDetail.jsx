import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Activity, Search } from 'lucide-react';
import SHAPView from '../components/explain/SHAPView';
import { fetchExplainability, generateEvidencePack } from '../services/explain';
import { toast } from 'react-hot-toast';

const ExplainDetail = () => {
  const { txId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchExplainability(txId);
      setData(result);
      setLoading(false);
    };
    loadData();
  }, [txId]);

  const handleEvidencePack = async (id) => {
    toast.promise(generateEvidencePack(id), {
       loading: 'Assembling Evidence Pack...',
       success: 'Evidence Pack Ready for Download',
       error: 'Failed to assemble pack'
    });
  };

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-bold animate-pulse">Running Neural Explainability Engine...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center bg-dark-700 hover:bg-dark-600 px-4 py-2 rounded-xl text-slate-300 transition-all border border-dark-600 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Intelligence
        </button>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase">
          <Activity size={14} className="text-primary" />
          <span>Realtime Telemetry Active</span>
        </div>
      </div>

      <div className="bg-dark-800 rounded-3xl border border-dark-600 p-8 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
            <Search className="text-primary" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100 font-mono">{txId}</h1>
            <div className="flex items-center mt-2 space-x-4">
               <span className="flex items-center text-sm font-bold text-slate-400">
                 Status: <span className="text-risk-high ml-1">Flagged</span>
               </span>
               <span className="flex items-center text-sm font-bold text-slate-400">
                 Jurisdiction: <span className="text-slate-200 ml-1">Global/SWIFT</span>
               </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Risk Contribution</div>
          <div className="text-5xl font-black text-risk-high">{((data?.overall_risk ?? 0) * 100).toFixed(0)}%</div>
        </div>
      </div>

      <SHAPView data={data} onGeneratePack={handleEvidencePack} />

      <div className="grid grid-cols-2 gap-6 pb-20">
         <div className="bg-dark-800/50 p-6 rounded-3xl border border-dark-600">
            <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center">
              <ShieldCheck size={16} className="text-green-500 mr-2" /> Compliance Verdict
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on the SHAP feature weights, this transaction deviates significantly from the entity's 90-day baseline. 
              The combination of <strong>Hop Count</strong> and <strong>Corridor Risk</strong> suggests a potential layering attempt.
            </p>
         </div>
         <div className="bg-dark-700 p-6 rounded-3xl border border-dark-600 flex flex-col justify-center items-center text-center space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Recommended Action</h4>
            <button className="w-full bg-risk-high hover:bg-red-700 text-white py-3 rounded-2xl font-bold transition-all shadow-lg shadow-risk-high/20">
              Initiate SAR Filing
            </button>
            <button 
              onClick={() => navigate('/cases')}
              className="w-full bg-dark-600 hover:bg-dark-500 text-slate-200 py-3 rounded-2xl font-bold transition-all"
            >
              Assign to New Case
            </button>
         </div>
      </div>
    </div>
  );
};

export default ExplainDetail;
