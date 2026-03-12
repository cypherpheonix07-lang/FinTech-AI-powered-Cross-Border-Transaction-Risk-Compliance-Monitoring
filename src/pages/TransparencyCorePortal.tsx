import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Search, 
  Clock, 
  Network, 
  Lock, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Mock data for hash chain visualization
const mockChainHops = [
  { id: '1', node: 'Originating Bank', location: 'London, UK', status: 'Verified', timestamp: '10:00:01', hash: '0x8f2...a1c' },
  { id: '2', node: 'Correspondent Node A', location: 'Frankfurt, DE', status: 'Verified', timestamp: '10:00:05', hash: '0x3d4...b8e' },
  { id: '3', node: 'Liquidity Bridge', location: 'Digital/Cloud', status: 'Verified', timestamp: '10:00:12', hash: '0xe7c...f90' },
  { id: '4', node: 'Destination Portal', location: 'New York, USA', status: 'Processing', timestamp: '10:00:15', hash: '0x1a2...c4d' },
];

const mockAuditData = [
  { time: '09:00', load: 45, integrity: 99.8 },
  { time: '10:00', load: 78, integrity: 99.9 },
  { time: '11:00', load: 60, integrity: 99.7 },
  { time: '12:00', load: 85, integrity: 99.9 },
  { time: '13:00', load: 55, integrity: 99.8 },
];

const TransparencyCorePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'verifier' | 'auditor'>('visualizer');
  const [searchHash, setSearchHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [timeSliderValue, setTimeSliderValue] = useState(100);

  const handleVerify = () => {
    // Simulate API call
    setVerificationResult({
      status: 'VERIFIED',
      id: 'TX-99827-PQ',
      timestamp: new Date().toISOString(),
      pqcStrength: 'Lattice-1024',
      integrityScore: 100
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-['Outfit']">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Transparency Core Portal
          </h1>
          <p className="text-slate-400 mt-2">Every dollar's journey, visible and verifiable.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('visualizer')}
            className={`px-6 py-2 rounded-full transition ${activeTab === 'visualizer' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 border border-slate-800'}`}
          >
            Flow Visualizer
          </button>
          <button 
            onClick={() => setActiveTab('verifier')}
            className={`px-6 py-2 rounded-full transition ${activeTab === 'verifier' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 border border-slate-800'}`}
          >
            Proof Verifier
          </button>
          <button 
            onClick={() => setActiveTab('auditor')}
            className={`px-6 py-2 rounded-full transition ${activeTab === 'auditor' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 border border-slate-800'}`}
          >
            Forensic Auditor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Interface */}
        <div className="col-span-8 space-y-8">
          {activeTab === 'visualizer' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 h-[600px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Network className="text-blue-400" /> Transaction Hop Network
                </h3>
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/20">
                  Real-time Monitoring Active
                </span>
              </div>
              
              <div className="flex-1 flex items-center justify-between relative px-12">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-indigo-500/20 -translate-y-1/2 blur-sm" />
                
                {mockChainHops.map((hop, index) => (
                  <motion.div 
                    key={hop.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${hop.status === 'Verified' ? 'border-blue-500 bg-blue-500/20' : 'border-slate-700 bg-slate-800'}`}>
                      {hop.status === 'Verified' ? <ShieldCheck className="w-6 h-6 text-blue-400" /> : <Activity className="w-6 h-6 text-slate-500" />}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="font-semibold text-sm">{hop.node}</p>
                      <p className="text-xs text-slate-500">{hop.location}</p>
                      <p className="text-[10px] text-blue-400/60 mt-1 font-mono">{hop.hash}</p>
                    </div>
                    {index < mockChainHops.length - 1 && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="absolute top-6 left-12 w-full h-0.5 bg-blue-500"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-slate-500 text-xs">Total Hops</p>
                  <p className="text-2xl font-bold mt-1">4/4</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-slate-500 text-xs">Avg. Latency</p>
                  <p className="text-2xl font-bold mt-1 text-green-400">12ms</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-slate-500 text-xs">Hash Integrity</p>
                  <p className="text-2xl font-bold mt-1 text-blue-400">SECURE</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-slate-500 text-xs">Proof Method</p>
                  <p className="text-2xl font-bold mt-1">ZKP-SNARK</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'verifier' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8"
            >
              <div className="max-w-xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                  <Lock className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Public Verification Portal</h2>
                <p className="text-slate-400 mb-8">Input your Transfer ID or Transaction Hash to verify the cryptographic journey of your assets.</p>
                
                <div className="relative mb-6">
                  <input 
                    type="text" 
                    value={searchHash}
                    onChange={(e) => setSearchHash(e.target.value)}
                    placeholder="Enter Hash/Transfer ID..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
                
                <button 
                  onClick={handleVerify}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition shadow-xl shadow-blue-500/25"
                >
                  Verify Cryptographic Path
                </button>

                <AnimatePresence>
                  {verificationResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-12 text-left bg-slate-950/50 border border-blue-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="text-green-400" />
                        <h4 className="text-lg font-semibold text-green-400">Path Verified by PathGuard Nodes</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Transaction ID</span>
                          <span className="font-mono">{verificationResult.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">PQC Strength</span>
                          <span className="font-mono text-blue-400">{verificationResult.pqcStrength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Integrity Score</span>
                          <span className="font-mono">{verificationResult.integrityScore}%</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-slate-800">
                          <span className="text-slate-500">Verified On</span>
                          <span className="text-xs">{new Date(verificationResult.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'auditor' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 h-[600px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Clock className="text-indigo-400" /> Forensic Audit Explorer
                </h3>
              </div>

              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockAuditData}>
                    <defs>
                      <linearGradient id="colorIntegrity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="integrity" stroke="#818cf8" fillOpacity={1} fill="url(#colorIntegrity)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Historical Timeline Scrubbing</span>
                    <span className="text-sm text-indigo-400">14:02 March 8, 2026</span>
                  </div>
                  <input 
                    type="range" 
                    value={timeSliderValue}
                    onChange={(e) => setTimeSliderValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-sm">
                  <p className="text-slate-400 italic">No anomalies detected in the selected temporal range. Forensic signatures remain immutable.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="col-span-4 space-y-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" /> System Metrics
            </h4>
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Active Hash Chains</p>
                <p className="text-xl font-bold">142,892</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Total Verified Hops</p>
                <p className="text-xl font-bold">2.4M</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">ZKP Proof Generation</p>
                <p className="text-xl font-bold text-green-400">Optimal</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-blue-500/20 rounded-3xl p-6">
            <h4 className="font-bold mb-2">PathGuard Consensus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every transaction hash is validated across 12 independent geopolitical nodes, ensuring no single authority can alter a transfer record.
            </p>
            <button className="mt-4 text-xs font-bold text-blue-400 flex items-center gap-1 hover:underline">
              View Node Status <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyCorePortal;
