import React, { useState } from 'react';
import { PenTool, Shield, Lock, Activity, ArrowRight, ShieldCheck, Key, FileText, CheckCircle, Database } from 'lucide-react';

const sigPolicies = [
  { id: 'POL-TSS-1', name: 'High-Value Transfer', threshold: '5-of-7', cooldown: '24h', status: 'Active' },
  { id: 'POL-TSS-2', name: 'Governance Proposal', threshold: '51%', cooldown: 'None', status: 'Active' },
  { id: 'POL-TSS-3', name: 'Emergency Pause', threshold: '1-of-3 (Trusted Nodes)', cooldown: 'None', status: 'Optimal' },
  { id: 'POL-TSS-4', name: 'Asset Listing', threshold: '2-of-3', cooldown: '12h', status: 'Active' },
];

const sigQueue = [
  { id: 'SIG-812', task: 'Approve $5M Withdrawal', progress: '3/5', expiry: '2h 45m', priority: 'High' },
  { id: 'SIG-221', task: 'Rotate Cold Shares', progress: '1/3', expiry: '12h 10m', priority: 'Medium' },
  { id: 'SIG-990', task: 'Change Admin Fee', progress: '0/5', expiry: '48h 00m', priority: 'Low' },
];

export default function ThresholdSignaturesPage() {
  const [activeTab, setActiveTab] = useState<'policies' | 'queue' | 'ceremonies'>('policies');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-700">
            Threshold Signature Schemes (TSS)
          </h1>
          <p className="text-slate-500 mt-2">M-of-N signature policies, cryptographic quorum management, and partial signature orchestration</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-md shadow-violet-500/20">
            <PenTool className="w-4 h-4" />
            Create Shared Policy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-violet-600" />
            <h3 className="font-semibold text-slate-700">Active Policies</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">42</div>
          <p className="text-xs text-slate-500 mt-2">Custom quorum logic</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Secured Assets</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">$4.1B</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Under TSS protection</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Signing Rounds</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">1.2ms</div>
          <p className="text-xs text-slate-500 mt-2">Per partial signature</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Pending Quorum</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">3</div>
          <p className="text-xs text-rose-600 font-medium mt-2">Awaiting approval</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
        {[
          { id: 'policies', label: 'Security Policies', icon: Shield },
          { id: 'queue', label: 'Signing Queue', icon: Activity },
          { id: 'ceremonies', label: 'Key Ceremonies', icon: Key },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
              activeTab === tab.id ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'queue' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg uppercase tracking-tight">
              <Activity className="w-5 h-5 text-violet-600" />
              Live Signing Queue
            </h3>
            <span className="text-xs font-bold text-slate-400">{sigQueue.length} ACTIVE TASKS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sigQueue.map((item) => (
              <div key={item.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-violet-200 hover:bg-white transition-all shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{item.task}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">TXID: {item.id}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500">Quorum Progress</span>
                    <span className="text-violet-600">{item.progress}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                    <div className="bg-violet-600 h-full" style={{ width: item.progress.includes('3/5') ? '60%' : item.progress.includes('1/3') ? '33%' : '5%' }}></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-[10px] text-slate-400 font-medium">Expires in {item.expiry}</div>
                    <button className="px-4 py-1.5 bg-violet-600 text-white rounded-lg text-[10px] font-bold hover:bg-violet-700 transition">SIGN</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-2 duration-500">
           <div className="lg:col-span-2 space-y-6">

           </div>

           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden h-fit">
              <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-2 text-lg uppercase tracking-tight">
                 <Shield className="w-5 h-5 text-indigo-600" />
                 TSS Overview
              </h3>
              <div className="space-y-4">
                 {sigPolicies.slice(0, 3).map((pol) => (
                    <div key={pol.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-indigo-50/30 transition-colors cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-500 shadow-sm">
                             <Key className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="text-sm font-bold text-slate-900">{pol.name}</div>
                             <div className="text-[10px] text-slate-500 font-bold uppercase">{pol.threshold} QUORUM</div>
                          </div>
                       </div>
                       <ArrowRight className="w-4 h-4 text-slate-300" />
                    </div>
                 ))}
              </div>
              <div className="mt-8 p-6 bg-slate-900 rounded-3xl relative overflow-hidden">
                 <h4 className="text-white font-bold text-base mb-2 relative flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Security Enforced
                 </h4>
                 <p className="text-slate-400 text-[11px] leading-relaxed relative">
                    All policies are cryptographically enforced at the protocol layer. PathGuard's validator network rejects any transaction that fails to meet the threshold.
                 </p>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'ceremonies' && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-500 text-center space-y-8">
           <div className="w-24 h-24 bg-violet-50 rounded-3xl flex items-center justify-center text-violet-600 mx-auto border border-violet-100">
              <Key className="w-12 h-12" />
           </div>
           <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="font-bold text-2xl text-slate-900 tracking-tight">Zero-Knowledge Fractional Key Ceremony</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                 Threshold Signature Schemes allow for the creation of a single signature by a group of participants, each holding a secret share. This significantly reduces on-chain footprint while increasing privacy—observers cannot see which members signed.
              </p>
           </div>
           <button className="px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition shadow-xl shadow-violet-600/20 uppercase tracking-widest text-xs">
              Initialize New Ceremony
           </button>
        </div>
      )}
    </div>
  );
}
