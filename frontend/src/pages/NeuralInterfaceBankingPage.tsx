import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Fingerprint, 
  Lock,
  Workflow,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { apiFetch } from '../lib/api';

interface NeuroAuthStatus {
  authenticated: boolean;
  eegMatchConfidence: number;
  cognitiveLoad: number;
  stressLevel: 'Low' | 'Elevated' | 'Critical';
  intentVerified: boolean;
}

interface CognitiveAlert {
  id: string;
  type: string;
  riskScore: number;
  timestamp: string;
  recommendation: string;
}

export default function NeuralInterfaceBankingPage() {
  const [authStatus, setAuthStatus] = useState<NeuroAuthStatus | null>(null);
  const [alerts, setAlerts] = useState<CognitiveAlert[]>([]);
  const [verifying, setVerifying] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await apiFetch<CognitiveAlert[]>('/vanguard/neuro/alerts/current');
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching cognitive alerts:', error);
    }
  };

  const handleNeuralSync = async () => {
    setVerifying(true);
    setScanProgress(0);
    
    // Smooth progress simulation
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    try {
      const data = await apiFetch<NeuroAuthStatus>('/vanguard/neuro/verify', { method: 'POST' });
      setTimeout(() => {
        setAuthStatus(data);
        setVerifying(false);
        fetchAlerts();
      }, 1500);
    } catch (error) {
      console.error('Neural sync failed:', error);
      setVerifying(false);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30">
      {/* Dynamic Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">Neural Layer 01</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">
              Neural Interface <span className="text-indigo-400">Banking</span>
            </h1>
            <p className="text-slate-400 mt-3 text-lg max-w-xl">
              Next-generation BCI-driven financial control. Authenticate via brainwave patterns and monitor real-time cognitive sentiment.
            </p>
          </div>
          
          <button
            onClick={handleNeuralSync}
            disabled={verifying}
            className="group relative px-8 py-4 bg-indigo-600 rounded-2xl font-bold transition-all hover:bg-indigo-500 overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.3)]"
          >
            <div className="flex items-center gap-3 relative z-10">
              <Zap className={`w-5 h-5 ${verifying ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
              {verifying ? 'Syncing Synapses...' : 'Establish Neural Link'}
            </div>
            {verifying && (
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-white/50"
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
              />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Connection Status & Biometrics */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Fingerprint className="text-indigo-400" /> Link Integrity
            </h2>
            
            <AnimatePresence mode="wait">
              {!authStatus ? (
                <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
                  <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" />
                  <p className="text-slate-500 font-medium">Link Idle — Establish connection to begin sync</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <span className="text-slate-400">Auth Signature</span>
                    <div className="flex items-center gap-2 text-indigo-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> SECURE
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">EEG Match Confidence</span>
                      <span className="text-indigo-400 font-mono">{(authStatus.eegMatchConfidence * 100).toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${authStatus.eegMatchConfidence * 100}%` }}
                        className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                      <div className="text-xs text-slate-500 mb-1 uppercase tracking-tighter">Stress Level</div>
                      <div className={`text-lg font-bold ${authStatus.stressLevel === 'Low' ? 'text-green-400' : 'text-red-400'}`}>
                        {authStatus.stressLevel}
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                      <div className="text-xs text-slate-500 mb-1 uppercase tracking-tighter">Cognitive Load</div>
                      <div className="text-lg font-bold text-indigo-400">{authStatus.cognitiveLoad.toFixed(1)}%</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Verification Log */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Workflow className="text-indigo-400" /> Intent Verification
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Neural Handshake', status: 'Completed' },
                { label: 'Sentiment Anchoring', status: 'Completed' },
                { label: 'Blockchain Attribution', status: 'Pending' },
              ].map((step, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-sm">
                  <span className="text-slate-400">{step.label}</span>
                  <span className={step.status === 'Completed' ? 'text-indigo-400' : 'text-slate-600'}>{step.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Neural Analytics Dashboard */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Brainwave Telemetry (Mu/Beta Rhythms)</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-xs text-indigo-400">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div> REAL-TIME FEED
                </div>
              </div>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { time: '0s', wave: 45, load: 30 },
                  { time: '2s', wave: 52, load: 35 },
                  { time: '4s', wave: 48, load: 40 },
                  { time: '6s', wave: 65, load: 42 },
                  { time: '8s', wave: 58, load: 38 },
                  { time: '10s', wave: 51, load: 35 },
                  { time: '12s', wave: 70, load: 45 },
                ]}>
                  <defs>
                    <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="wave" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#waveGradient)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Cognitive Alerts */}
            <div className="mt-8 border-t border-white/5 pt-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-indigo-400" /> Active Cognitive Safeguards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alerts.length > 0 ? alerts.map(alert => (
                  <div key={alert.id} className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex gap-4">
                    <div className="p-2 bg-indigo-500/20 rounded-xl h-fit">
                      <Eye className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-indigo-300">{alert.type}</div>
                      <div className="text-xs text-slate-500 mt-1">{alert.recommendation}</div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 text-center py-6 bg-white/5 rounded-2xl text-slate-500 text-sm">
                    No active cognitive risks detected in current session.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
