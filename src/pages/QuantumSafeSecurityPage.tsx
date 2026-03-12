import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  RefreshCcw, 
  Activity, 
  Lock, 
  Cpu, 
  AlertTriangle, 
  CheckCircle,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { apiFetch } from '../lib/api';

interface PQCStatus {
  algorithm: string;
  keyStrength: string;
  status: 'Ready' | 'Active' | 'Vulnerable';
  lastRotation: string;
  quantumResilienceScore: number;
}

interface QuantumThreat {
  id: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Mitigated' | 'Monitoring' | 'Active';
  timestamp: string;
  description: string;
}

export default function QuantumSafeSecurityPage() {
  const [status, setStatus] = useState<PQCStatus | null>(null);
  const [threats, setThreats] = useState<QuantumThreat[]>([]);
  const [loading, setLoading] = useState(true);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statusData = await apiFetch<PQCStatus>('/vanguard/quantum/status');
      const threatsData = await apiFetch<QuantumThreat[]>('/vanguard/quantum/threats');
      setStatus(statusData);
      setThreats(threatsData);
    } catch (error) {
      console.error('Error fetching quantum data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRotateKeys = async () => {
    setRotating(true);
    try {
      await apiFetch('/vanguard/quantum/rotate-keys', { method: 'POST' });
      await fetchData();
    } catch (error) {
      console.error('Error rotating keys:', error);
    } finally {
      setRotating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const scoreData = [
    { name: 'Resilience', value: status?.quantumResilienceScore || 0 },
    { name: 'Target', value: 100 },
  ];

  return (
    <div className="p-8 space-y-8 bg-slate-950 min-h-screen text-slate-100">
      {/* Header section with Glassmorphism */}
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Quantum-Safe Security
          </h1>
          <p className="text-slate-400 mt-2">Advanced Post-Quantum Cryptography & Monitoring</p>
        </div>
        <button
          onClick={handleRotateKeys}
          disabled={rotating}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg ${
            rotating 
              ? 'bg-slate-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 hover:shadow-cyan-500/20 active:scale-95'
          }`}
        >
          <RefreshCcw className={`w-5 h-5 ${rotating ? 'animate-spin' : ''}`} />
          {rotating ? 'Rotating Lattice...' : 'Rotate Quantum Keys'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Overview Card */}
        <div className="col-span-1 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Resilience Status</h2>
              <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
                {status?.status}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-slate-400">PQC Algorithm</span>
              <span className="font-mono text-cyan-300">{status?.algorithm}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-slate-400">Key Strength</span>
              <span className="font-mono text-cyan-300">{status?.keyStrength}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-slate-400">Last Rotation</span>
              <span className="text-xs text-slate-300">
                {status ? new Date(status.lastRotation).toLocaleString() : 'N/A'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Resilience Score</span>
              <span className="text-lg font-bold text-cyan-400">{status?.quantumResilienceScore}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-1000"
                style={{ width: `${status?.quantumResilienceScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Security Metrics Charts */}
        <div className="col-span-1 lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Activity className="text-cyan-400" /> 
              Cryptographic Load Factor
            </h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div> Lattice Traffic
              </div>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { time: '08:00', load: 45 },
                { time: '10:00', load: 82 },
                { time: '12:00', load: 56 },
                { time: '14:00', load: 91 },
                { time: '16:00', load: 68 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Bar dataKey="load" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Threat Monitoring Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Zap className="text-yellow-400 fill-yellow-400/20" /> 
          Live Quantum Threat Log
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-sm">
                <th className="pb-4 font-medium">Threat ID</th>
                <th className="pb-4 font-medium">Type</th>
                <th className="pb-4 font-medium">Severity</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {threats.map((threat) => (
                <tr key={threat.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-6 font-mono text-cyan-400">{threat.id}</td>
                  <td className="py-6">{threat.type}</td>
                  <td className="py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      threat.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                      threat.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                       {threat.status}
                    </div>
                  </td>
                  <td className="py-6 text-slate-400 text-sm max-w-md">{threat.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
