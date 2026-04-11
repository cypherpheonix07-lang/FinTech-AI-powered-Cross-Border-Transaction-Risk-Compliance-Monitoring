import React, { useState } from 'react';
import { Globe, Shield, Zap, Activity, ArrowRight, ShieldCheck, Map, Wifi, Radio, Lock } from 'lucide-react';

const qkdLinks = [
  { id: 'LINK-SAT-1', source: 'PathGuard-Satellite-A1', dest: 'London Ground Station', type: 'Satellite BB84', distance: '35,000 km', status: 'Secured' },
  { id: 'LINK-FIB-2', source: 'Frankfurt Hub', dest: 'Paris Data Center', type: 'Fiber (Quantum Repeater)', distance: '450 km', status: 'Secured' },
  { id: 'LINK-SAT-2', source: 'PathGuard-Satellite-B2', dest: 'Tokyo Ground Station', type: 'Entanglement-Based', distance: '36,200 km', status: 'Syncing' },
  { id: 'LINK-FIB-3', source: 'Singapore IX', dest: 'Hong Kong Hub', type: 'Fiber (Direct)', distance: '2,500 km', status: 'Optimal' },
];

export default function QKDNetworksPage() {
  const [activeTab, setActiveTab] = useState<'topology' | 'security' | 'photonics'>('topology');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-indigo-700">
            Quantum Key Distribution (QKD) Networks
          </h1>
          <p className="text-slate-500 mt-2">Real-time mapping of satellite and fiber QKD links for information-theoretic security</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Map className="w-4 h-4" />
            Global Link Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Total Distance</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">142K km</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Quantum-secured fiber/sat</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">SKR (Secret Key Rate)</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">4.2 Mbps</div>
          <p className="text-xs text-slate-500 mt-2">Aggregate across 12 links</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">QBER (Error Rate)</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">2.1%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Below 11% threshold</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Quantum Satellites</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">4</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">PathGuard-A1/2, B1/2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden relative min-h-[400px]">
           <div className="mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Map className="w-5 h-5 text-indigo-600" />
                Global Quantum Link Topology
              </h3>
              <p className="text-xs text-slate-500 mt-1">Satellite and terrestrial quantum backbone</p>
           </div>
           
           <div className="absolute inset-0 bg-slate-50 opacity-50 flex items-center justify-center p-8 mt-16 pointer-events-none">
              <Globe className="w-64 h-64 text-slate-200 animate-pulse-slow" />
           </div>

           <div className="relative space-y-4">
              {qkdLinks.map((link) => (
                 <div key={link.id} className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-200 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className={`p-3 rounded-xl ${link.type.includes('Satellite') ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {link.type.includes('Satellite') ? <Wifi className="w-5 h-5" /> : <Radio className="w-5 h-5" />}
                       </div>
                       <div>
                          <div className="text-sm font-bold text-slate-900">{link.source} <ArrowRight className="inline w-3 h-3 mx-1 text-slate-400" /> {link.dest}</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{link.type} • {link.distance}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${link.status === 'Secured' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {link.status}
                       </span>
                       <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-indigo-600">
                          <Activity className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 text-emerald-500/20 group-hover:text-emerald-400/30 transition-colors">
                 <Shield className="w-80 h-80 rotate-12" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative">Quantum Advantage</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed relative">
                 QKD uses individual photons to exchange cryptographic keys. Any attempt at eavesdropping inevitably disturbs the quantum state, alerting PathGuard nodes and ensuring information-theoretic security that is resistant to even future quantum computers.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative">
                 <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Photon Stream Health</div>
                 <div className="flex items-end gap-1 h-8">
                    {[...Array(30)].map((_, i) => (
                       <div key={i} className="flex-1 bg-emerald-500/40 rounded-t" style={{ height: `${Math.random() * 100}%` }}></div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <Lock className="w-5 h-5 text-indigo-600" />
                 <h3 className="font-bold text-slate-900">Quantum One-Time Pad</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-700">Entropy Source</span>
                    <span className="text-xs font-bold text-emerald-600 tracking-tight">QRNG-V3</span>
                 </div>
                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-700">AES-256 Rotation</span>
                    <span className="text-xs font-bold text-slate-400">EVERY 1s</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
