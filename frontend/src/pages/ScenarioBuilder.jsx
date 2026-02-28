import React, { useState } from 'react';
import ScenarioForm from '../components/scenario/ScenarioForm';
import { Database, Download, Upload, History, Terminal } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ScenarioBuilder = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleSynthesize = async (config) => {
    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:8000/simulate/scenario', config);
      setResult(response.data);
      toast.success('Synthetic Intelligence Generated');
    } catch (err) {
      toast.error('Simulation Engine Failure');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCSV = () => {
    if (!result?.csv) return;
    const blob = new Blob([result.csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scenario_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center">
            <Database className="text-primary mr-3" size={32} />
            Scenario Synthesis Lab
          </h1>
          <p className="text-slate-500 text-sm mt-1">Design adversarial patterns to stress-test your risk models.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-dark-800 border border-dark-600 p-3 rounded-2xl text-slate-400 hover:text-white transition-all">
            <History size={18} />
          </button>
          <button className="bg-dark-800 border border-dark-600 p-3 rounded-2xl text-slate-400 hover:text-white transition-all">
            <Terminal size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <ScenarioForm onSubmit={handleSynthesize} loading={isGenerating} />
        </div>
        <div className="col-span-4 space-y-6">
          <div className="bg-dark-800 border border-dark-600 rounded-3xl p-6 shadow-xl h-full flex flex-col">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-6 tracking-widest">Synthesis Output</h4>
            
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <Upload size={48} className="text-dark-600 mb-4" />
                <p className="text-xs text-slate-400 italic">Engine ready. Awaiting parameters.</p>
              </div>
            ) : (
              <div className="flex-1 space-y-6 flex flex-col">
                <div className="bg-dark-900 border border-dark-700 p-4 rounded-2xl font-mono text-[10px] text-green-500 overflow-hidden line-clamp-10 flex-1">
                  {result.csv}
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={downloadCSV}
                    className="w-full bg-dark-700 hover:bg-dark-600 border border-dark-600 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center transition-all"
                  >
                    <Download size={14} className="mr-2" /> Download Dataset
                  </button>
                  <button className="w-full bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary py-3 rounded-xl font-bold text-xs flex items-center justify-center transition-all">
                    <Upload size={14} className="mr-2" /> Direct Ingestion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Warning */}
      <div className="bg-dark-900/50 p-6 rounded-3xl border border-warning/10 text-center">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          Warning: Synthetic data is for testing only. Not to be used for regulatory filing or legal evidence.
        </p>
      </div>
    </div>
  );
};

export default ScenarioBuilder;
