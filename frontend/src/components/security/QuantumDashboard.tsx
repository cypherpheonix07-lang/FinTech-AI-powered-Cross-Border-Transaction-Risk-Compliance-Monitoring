import React, { useState, useEffect } from 'react';
import { Shield, Lock, Activity, RefreshCw } from 'lucide-react';

const QuantumDashboard = () => {
  const [quantumStatus, setQuantumStatus] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would fetch from /api/security/quantum_status
    // Mocking the Python backend response
    setQuantumStatus({
      threat_level: "ELEVATED",
      migration_status: "45% Complete",
      algorithms: {
        key_encapsulation: "CRYSTALS-Kyber-768",
        digital_signature: "CRYSTALS-Dilithium-3",
        classical_fallback: "AES-256-GCM / RSA-4096"
      },
      qkd_nodes_active: 42
    });
  }, []);

  if (!quantumStatus) return <div className="p-8 text-center animate-pulse text-blue-400">Initializing Quantum State...</div>;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200 font-sans shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-700/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700/50">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            Quantum-Resistant Infrastructure
          </h2>
          <p className="text-slate-400 mt-1">Post-Quantum Cryptography (PQC) Agility Framework</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-medium">
            <Activity className="w-4 h-4 animate-pulse" />
            Threat Level: {quantumStatus.threat_level}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <MetricCard 
          icon={<Lock className="text-emerald-400" />}
          label="Key Encapsulation"
          value={quantumStatus.algorithms.key_encapsulation}
        />
        <MetricCard 
          icon={<Shield className="text-indigo-400" />}
          label="Digital Signature"
          value={quantumStatus.algorithms.digital_signature}
        />
        <MetricCard 
          icon={<RefreshCw className="text-slate-400" />}
          label="Classical Fallback"
          value={quantumStatus.algorithms.classical_fallback}
        />
        <MetricCard 
          icon={<Activity className="text-fuchsia-400" />}
          label="Active QKD Nodes"
          value={quantumStatus.qkd_nodes_active.toString()}
        />
      </div>

      <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700/50">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-lg font-semibold text-white">Migration to Quantum-Safe Standards</h3>
          <span className="text-cyan-400 font-mono">{quantumStatus.migration_status}</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-700">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full relative" style={{ width: '45%' }}>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-right">Target Completion: Q4 2026 (NIST PQC Standards)</p>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 hover:bg-slate-800/60 transition-colors">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-slate-900 rounded-md shadow-inner">{icon}</div>
      <h3 className="text-sm font-medium text-slate-400">{label}</h3>
    </div>
    <div className="text-lg font-semibold text-slate-100 font-mono tracking-tight">{value}</div>
  </div>
);

export default QuantumDashboard;
