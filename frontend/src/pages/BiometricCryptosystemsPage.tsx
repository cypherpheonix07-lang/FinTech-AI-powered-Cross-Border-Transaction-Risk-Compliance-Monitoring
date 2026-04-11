import React, { useState } from 'react';
import { Fingerprint, Shield, Lock, Zap, ArrowRight, Eye, ShieldCheck, Key, RefreshCcw, Database } from 'lucide-react';

const biometricEnrollments = [
  { id: 'BIO-772', type: 'FaceID / 3D Depth', platform: 'iOS Secure Enclave', status: 'Enrolled', encrypted: 'ECC-256' },
  { id: 'BIO-211', type: 'TouchID / Fingerprint', platform: 'Android Keystore', status: 'Enrolled', encrypted: 'AES-256-GCM' },
  { id: 'BIO-995', type: 'Palm Vein Scan', platform: 'PathGuard Hardware', status: 'Pending', encrypted: 'QKD-Hybrid' },
  { id: 'BIO-112', type: 'Iris Recognition', platform: 'PathGuard Vault', status: 'Revoked', encrypted: 'N/A' },
];

export default function BiometricCryptosystemsPage() {
  const [activeTab, setActiveTab] = useState<'vault' | 'fuzzy' | 'hardware'>('vault');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700">
            Biometric Cryptosystems
          </h1>
          <p className="text-slate-500 mt-2">Fuzzy extractors, cancellable biometrics, and secure enclave key-binding</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
            <Fingerprint className="w-4 h-4" />
            New Enrollment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Active Vaults</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">4,102</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Multi-modal enabled</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Key Binding</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">Binding V2</div>
          <p className="text-xs text-slate-500 mt-2">Hardware-backed attestation</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Fuzzy Extraction</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">Stable</div>
          <p className="text-xs text-slate-500 mt-2">Error Correction: Rank-Metric</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCcw className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Cancellability</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">Ready</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Salt rotation enabled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                <Database className="w-5 h-5 text-emerald-600" />
                Hardware Entitlements & Enrollments
              </h3>
              <div className="flex gap-2">
                 <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded">SECURE ENCLAVE ACTIVE</span>
              </div>
           </div>
           
           <div className="space-y-4">
              {biometricEnrollments.map((item) => (
                <div key={item.id} className="group p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-white transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                   <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-600 shadow-inner' : 'bg-slate-200 text-slate-400'}`}>
                         <Fingerprint className="w-6 h-6" />
                      </div>
                      <div>
                         <div className="font-bold text-slate-900 text-base">{item.type}</div>
                         <div className="text-xs text-slate-500 font-medium">Device: {item.platform}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                      <div className="text-right">
                         <div className={`text-xs font-bold uppercase tracking-wider ${item.status === 'Enrolled' ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {item.status}
                         </div>
                         <div className="text-[10px] font-mono text-slate-400">Enc: {item.encrypted}</div>
                      </div>
                      <button className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all">
                         <Settings className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-emerald-500/20 transition-colors">
                 <Shield className="w-32 h-32 rotate-12" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative">Crypto-Biometric Vault</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed relative">
                 Bio-Vault never stores your actual biometric data. Instead, it stores "Helper Data" used with a fuzzy extractor to reconstruct your private key only when you provide a live biometric sample.
              </p>
              <div className="space-y-4 relative">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-slate-300">Biometric Template</span>
                    <Eye className="w-4 h-4 text-emerald-400" />
                 </div>
                 <div className="flex items-center justify-center p-4 bg-emerald-600/10 rounded-xl border border-emerald-500/20 text-emerald-400 font-bold text-sm">
                    Protected by PathGuard L1 Secure
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                 <Key className="w-5 h-5 text-amber-600" />
                 <h3 className="font-bold text-slate-900">Key-Release Policy</h3>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-700">Timeout Re-Auth</span>
                    <span className="text-xs font-bold text-amber-600">15m</span>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-700">Entropy Threshold</span>
                    <span className="text-xs font-bold text-slate-400">92%</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-3 mb-6">
            <RefreshCcw className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-xl">Cancellable Biometrics Lab</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
               <p className="text-slate-500 text-sm leading-relaxed">
                  Unlike passwords, you cannot change your face or fingerprint. Cancellable biometrics apply a reversible transformation (Bloom Filters / Random Projections) to the biometric template before storage. If your "digital face" is leaked, you can simply change the transformation key.
               </p>
               <div className="flex gap-4 mt-8">
                  <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20">
                     Rotate Transformation Key
                  </button>
                  <button className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition">
                     View Salt History
                  </button>
               </div>
            </div>
            <div className="p-6 bg-slate-900 rounded-2xl relative overflow-hidden group shadow-xl">
               <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Fingerprint className="w-64 h-64 text-indigo-500 -rotate-12" />
               </div>
               <div className="relative font-mono text-[10px] text-indigo-400 space-y-2">
                  <div className="flex justify-between border-b border-indigo-500/20 pb-2 mb-2">
                     <span className="text-white font-bold opacity-100 uppercase tracking-tighter">Live Transformation Stream</span>
                     <span className="animate-pulse">● SECURE</span>
                  </div>
                  <div>TRANSFORMATION_SEED: 0x992FA011...</div>
                  <div>ALGORITHM: RND_PROJECT_V4</div>
                  <div>MAPPED_SPACE: 1024-Dimension</div>
                  <div className="pt-4 text-emerald-400">TEMPLATE_COLLISION_PROB: 4.2e-12</div>
                  <div className="text-emerald-400">SYSTEM_ENTROPY: 12.54 bits/cell</div>
                  <div className="h-12 w-full bg-indigo-500/10 rounded mt-4 border border-indigo-500/20 overflow-hidden flex items-end gap-0.5 p-1">
                     {[...Array(24)].map((_, i) => (
                        <div key={i} className="flex-1 bg-indigo-500/40 rounded-t" style={{ height: `${Math.random() * 100}%` }}></div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
