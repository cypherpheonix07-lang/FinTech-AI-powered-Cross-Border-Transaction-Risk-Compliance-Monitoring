import React from 'react';
import GalacticSidebar from '@/components/layout/Sidebar';
import AegisTerminal from '@/components/dashboard/Terminal';
import { 
  Shield, Activity, Globe, Lock, Cpu, Atom, 
  TrendingUp, AlertTriangle, Fingerprint 
} from 'lucide-react';

export default function UltraNuclearDashboard() {
  return (
    <div className="flex h-screen bg-[#020202] text-zinc-300 selection:bg-blue-500/30 overflow-hidden">
      {/* 🌌 GALACTIC SIDEBAR */}
      <GalacticSidebar />

      {/* 🚀 MAIN COMMAND CENTER */}
      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative">
        {/* COSMIC BACKGROUND GRADIENT */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

        {/* HEADER: SYSTEM INTEGRITY */}
        <header className="p-8 pb-4 flex items-center justify-between z-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">COMMAND_CENTER</h1>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
              Sovereign Node: AEGIS-ALPHA-01 // Network: OMEGA-PROTOCOL-V2
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] text-zinc-500 font-mono uppercase">Audit Peak (MMR)</p>
              <p className="text-[11px] font-mono text-emerald-400">0xAF23...B901</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl">
              <Fingerprint className="w-6 h-6 text-white/50" />
            </div>
          </div>
        </header>

        {/* DASHBOARD GRID */}
        <div className="p-8 pt-4 grid grid-cols-12 gap-6 z-10">
          
          {/* SEC 1: REAL-TIME RISK ORACLE */}
          <div className="col-span-8 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Global Risk Index', value: '2.4', color: 'emerald', icon: <Globe className="w-4 h-4" /> },
                { label: 'Neural Stress', value: 'LOW', color: 'blue', icon: <Activity className="w-4 h-4" /> },
                { label: 'Active Threats', value: '0', color: 'zinc', icon: <AlertTriangle className="w-4 h-4" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{stat.label}</span>
                    <div className={`p-1.5 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* INTEGRITY VISUALIZER (TERMINAL) */}
            <AegisTerminal />

            {/* SECTOR VISUALIZER (GALACTIC) */}
            <div className="h-[200px] bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center border-dashed border-zinc-800">
               <div className="text-center group cursor-pointer">
                  <Atom className="w-8 h-8 text-zinc-600 mx-auto mb-3 group-hover:text-blue-500 group-hover:animate-spin transition-all" />
                  <p className="text-[10px] font-mono text-zinc-500">Quantum Sector Visualization Pending...</p>
               </div>
            </div>
          </div>

          {/* SEC 2: STATUS & COMPLIANCE PANE */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 h-full backdrop-blur-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-blue-500" />
                <h3 className="text-xs font-bold tracking-widest uppercase">Compliance_Oracle</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'GDPR/Data Sovereignty', status: 'COMPLIANT', progress: 100 },
                  { name: 'PQC/Entropy Handshake', status: 'ACTIVE', progress: 95 },
                  { name: 'Neural Privacy Enclave', status: 'SECURE', progress: 100 },
                  { name: 'Real-time Sanctions', status: 'STREAMING', progress: 100 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-500">{item.name}</span>
                      <span className={item.progress === 100 ? "text-emerald-400" : "text-blue-400"}>{item.status}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${item.progress === 100 ? 'emerald' : 'blue'}-500/50`} 
                        style={{ width: `${item.progress}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  <span className="text-[9px] font-mono text-emerald-500/70">AEGIS_ENCRYPTION_ACTIVE</span>
                </div>
                <p className="text-[9px] leading-relaxed text-zinc-600 italic">
                  "PathGuard V2.0 assumes whole-system compromise. 
                  Sovereignty is established via mathematical proof, 
                  not trust."
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
