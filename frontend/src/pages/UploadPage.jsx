import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import api from '../services/api';
import useStore from '../app/store';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, ingested, building
  const [summary, setSummary] = useState(null);
  const { setGraphData, setLoading } = useStore();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setStatus('uploading');
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/ingest/csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSummary(response);
      setStatus('ingested');
    } catch (error) {
      console.error('Upload failed', error);
      setStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  const handleBuildGraph = async () => {
    setStatus('building');
    setLoading(true);
    
    try {
      const graphData = await api.post('/graph/build');
      setGraphData(graphData.nodes, graphData.edges);
      navigate('/explorer');
    } catch (error) {
      console.error('Graph build failed', error);
      setStatus('ingested');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-100 mb-4">Transaction Intelligence Ingestion</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Upload your cross-border transaction CSV files to build node networks and run risk intelligence paths.
        </p>
      </div>

      <div className="bg-dark-700 border-2 border-dashed border-dark-600 rounded-3xl p-12 text-center transition-all hover:border-primary/50">
        {!file ? (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-dark-900 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Upload className="text-primary" size={32} />
            </div>
            <div>
              <p className="text-slate-200 font-semibold text-lg">Click or drag to upload CSV</p>
              <p className="text-slate-500 text-sm mt-1">Standard SWIFT/ISO20022 format supported</p>
            </div>
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              id="file-upload"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="file-upload"
              className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-colors shadow-lg shadow-primary/20"
            >
              Select File
            </label>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-4 bg-dark-900 p-6 rounded-2xl border border-dark-600 border-dashed max-w-md mx-auto">
              <FileText className="text-slate-400" size={32} />
              <div className="text-left">
                <p className="text-slate-200 font-medium truncate w-48">{file.name}</p>
                <p className="text-slate-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              {status === 'ingested' && <CheckCircle2 className="text-green-500 ml-auto" />}
            </div>

            <div className="flex justify-center space-x-4">
              {status === 'idle' && (
                <button 
                  onClick={handleUpload}
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-lg shadow-primary/20"
                >
                  Start Ingestion <ArrowRight className="ml-2" size={20} />
                </button>
              )}
              
              {status === 'uploading' && (
                <button disabled className="bg-dark-600 text-slate-400 px-8 py-3 rounded-xl font-bold flex items-center cursor-not-allowed">
                  <Loader2 className="animate-spin mr-2" size={20} /> Processing...
                </button>
              )}

              {status === 'ingested' && (
                <button 
                  onClick={handleBuildGraph}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-lg shadow-green-900/20"
                >
                  Build Neural Graph <Network className="ml-2" size={20} />
                </button>
              )}
              
              {status === 'building' && (
                <button disabled className="bg-dark-600 text-slate-400 px-8 py-3 rounded-xl font-bold flex items-center cursor-not-allowed">
                  <Loader2 className="animate-spin mr-2" size={20} /> Mapping Network...
                </button>
              )}

              <button 
                onClick={() => { setFile(null); setStatus('idle'); }}
                className="text-slate-500 hover:text-slate-300 px-6 py-3 font-medium transition-colors"
                disabled={status === 'uploading' || status === 'building'}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {status === 'ingested' && summary && (
        <div className="mt-8 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-dark-700/50 p-4 rounded-2xl border border-dark-700">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total Records</p>
            <p className="text-xl font-bold text-slate-200">{summary.total_records || 0}</p>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-2xl border border-dark-700">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Accounts Found</p>
            <p className="text-xl font-bold text-slate-200">{summary.unique_accounts || 0}</p>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-2xl border border-dark-700">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Time Elapsed</p>
            <p className="text-xl font-bold text-slate-200">1.2s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
