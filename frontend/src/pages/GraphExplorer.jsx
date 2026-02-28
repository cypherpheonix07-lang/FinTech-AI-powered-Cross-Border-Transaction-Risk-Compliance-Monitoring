import React, { useState } from 'react';
import GraphCanvas from '../components/graph/GraphCanvas';
import TraceInspector from '../components/trace/TraceInspector';
import ExportPanel from '../components/report/ExportPanel';
import useStore from '../app/store';
import { useRealtimeGraph } from '../hooks/useRealtimeGraph';
import { 
  Info, 
  AlertCircle, 
  Globe, 
  Landmark, 
  Layers, 
  Maximize2, 
  Download,
  Activity
} from 'lucide-react';
import clsx from 'clsx';

const GraphExplorer = () => {
  // Activate Realtime Listener
  useRealtimeGraph();

  const [inspectorOpen, setInspectorOpen] = useState(false);
  const { 
    selectedNode, 
    selectedEdge, 
    selectedTracePath,
    isClustered,
    clusterBy,
    setClustering,
    riskScore,
    riskReasons
  } = useStore();

  // Mocked trace data for the inspector drawer
  const traceData = selectedTracePath ? {
    pathId: "PATH_48293",
    hops: selectedTracePath.nodes.map(id => ({
      id,
      bank: "Standard International",
      country: "United Kingdom",
      risk: Math.random(),
      evidence: ["Unusual routing through high-risk corridor", "Account age < 3 months"]
    }))
  } : null;

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Realtime Status Indicator */}
      <div className="flex items-center justify-between bg-dark-900/50 px-6 py-2 rounded-full border border-dark-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Realtime Engine Connected</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-4 w-px bg-dark-700" />
          <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-medium">
            <Activity size={12} />
            <span>5.2k TPS / 0.8ms Latency</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex space-x-6 min-h-0">
        <div className="flex-1 relative group">
          <GraphCanvas />
          
          {/* Advanced Controls Overlay */}
          <div className="absolute top-6 left-6 flex flex-col space-y-3">
            <div className="bg-dark-800/80 backdrop-blur-md border border-dark-700 p-1.5 rounded-2xl flex items-center shadow-2xl">
              <button 
                onClick={() => setClustering(!isClustered, 'bank')}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2",
                  isClustered ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Layers size={14} />
                <span>{isClustered ? 'Uncluster' : 'Cluster by Bank'}</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 flex space-x-3">
             <div className="bg-dark-800/80 backdrop-blur-md border border-dark-700 px-4 py-2 rounded-full flex items-center space-x-4 shadow-xl">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-risk-high" />
                <span className="text-[10px] text-slate-300 font-bold uppercase">Critical</span>
              </div>
              <div className="w-px h-3 bg-dark-600" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-risk-medium" />
                <span className="text-[10px] text-slate-300 font-bold uppercase">Warning</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-96 flex flex-col space-y-6">
          {/* Selection Detail Card */}
          <div className="bg-dark-700 rounded-3xl border border-dark-600 shadow-2xl overflow-hidden flex flex-col flex-1">
            <div className="p-6 border-b border-dark-600 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">Intelligence</h3>
              {selectedTracePath && (
                <button 
                  onClick={() => setInspectorOpen(true)}
                  className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all"
                  title="Open Full Inspector"
                >
                  <Maximize2 size={16} />
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!selectedNode && !selectedEdge ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center italic opacity-60">
                   <Info size={32} className="mb-4 text-dark-600" />
                   <p className="text-sm">Select node or edge for deep telemetry</p>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  {selectedNode && (
                    <div className="space-y-4">
                      <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-600">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Entity ID</span>
                        <span className="text-lg font-mono text-primary font-bold">{selectedNode.id}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-dark-900/50 p-3 rounded-xl border border-dark-600">
                          <Globe size={14} className="text-slate-500 mb-1" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Locale</span>
                          <span className="text-xs text-slate-200 font-medium">{selectedNode.country}</span>
                        </div>
                        <div className="bg-dark-900/50 p-3 rounded-xl border border-dark-600">
                          <Landmark size={14} className="text-slate-500 mb-1" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Gateway</span>
                          <span className="text-xs text-slate-200 font-medium">{selectedNode.bank}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedEdge && (
                     <div className="bg-dark-800 p-4 rounded-xl border border-dark-600">
                       <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">TX Amount</span>
                       <span className="text-2xl font-bold text-slate-100">${selectedEdge.amount?.toLocaleString()}</span>
                     </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Export Panel Integration */}
          {selectedTracePath && (
            <ExportPanel 
              data={{ riskScore, hops: traceData.hops }} 
              pathId={traceData.pathId} 
            />
          )}
        </div>
      </div>

      <TraceInspector 
        isOpen={inspectorOpen} 
        onClose={() => setInspectorOpen(false)} 
        traceData={traceData}
      />
    </div>
  );
};

export default GraphExplorer;
