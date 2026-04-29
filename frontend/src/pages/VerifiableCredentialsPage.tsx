import React, { useState } from 'react';
import { ShieldCheck, UserCheck, FileText, CheckCircle, RefreshCcw, ArrowRight, ShieldAlert, Key, Lock, Search } from 'lucide-react';

const verificationRequests = [
  { id: 'REQ-441-A', user: 'Institutional Entity #82', type: 'KYB (Know Your Business)', provider: 'Parallel Markets', status: 'Pending', date: '2024-06-25' },
  { id: 'REQ-992-B', user: 'Individual Wallet 0x...8a2', type: 'KYC (Identity)', provider: 'Fractal ID', status: 'Approved', date: '2024-06-24' },
  { id: 'REQ-112-C', user: 'Accredited Investor Proof', type: 'Investor Status', provider: 'Quadrata', status: 'Expired', date: '2024-06-20' },
  { id: 'REQ-556-D', user: 'Regional Compliance-US', type: 'Geo-Sanctions Proof', provider: 'Chainalysis', status: 'Approved', date: '2024-06-22' },
];

export default function VerifiableCredentialsPage() {
  const [activeTab, setActiveTab] = useState<'issuance' | 'verification' | 'revocation'>('issuance');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700">
            Verifiable Credentials for KYC
          </h1>
          <p className="text-slate-500 mt-2">Zero-knowledge proof-based identity verification and compliance attestations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
            <CheckCircle className="w-4 h-4" />
            Issue Attestation
          </button>
        </div>
      </div>

      </div>

      {/* Tab Navigation */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
        {[
          { id: 'issuance', label: 'Issuance Lab', icon: FileText },
          { id: 'verification', label: 'Verification Queue', icon: UserCheck },
          { id: 'revocation', label: 'Revocation Registry', icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
              activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Verified Wallets</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">12,504</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Compliance verified</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">ZK-Proofs Generated</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">84.2K</div>
          <p className="text-xs text-slate-500 mt-2">Privacy-preserving checks</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Watchlist Hits</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">3</div>
          <p className="text-xs text-rose-600 font-medium mt-2">Blocked (Sanctioned DID)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCcw className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Auto-Renewals</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">92%</div>
          <p className="text-xs text-slate-500 mt-2">Success rate (24h)</p>
        </div>
      </div>

      {activeTab === 'verification' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Recent Compliance Requests
                </h3>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                     <th className="pb-3">Credential ID</th>
                     <th className="pb-3">Subject / Type</th>
                     <th className="pb-3">KYC Provider</th>
                     <th className="pb-3">Status</th>
                     <th className="pb-3">Date</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {verificationRequests.map((req) => (
                     <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="py-4 font-mono text-[10px] text-slate-400">{req.id}</td>
                       <td className="py-4">
                          <div className="text-sm font-bold text-slate-900">{req.user}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{req.type}</div>
                       </td>
                       <td className="py-4 text-xs font-semibold text-slate-700 tracking-tight">{req.provider}</td>
                       <td className="py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : req.status === 'Expired' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                             {req.status}
                          </span>
                       </td>
                       <td className="py-4 text-[11px] text-slate-500 font-medium">{req.date}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden flex flex-col relative h-fit">
             <div className="mb-6">
                <h3 className="font-bold text-slate-900">Verification Intel</h3>
                <p className="text-xs text-slate-500 mt-1">Real-time attestation monitoring.</p>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                   <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Network Health</p>
                   <p className="text-lg font-black text-emerald-900">Optimal</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Latency</p>
                   <p className="text-lg font-black text-slate-900">142ms</p>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'issuance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-2 duration-500">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 overflow-hidden flex flex-col relative">
              <div className="mb-8">
                 <h3 className="font-bold text-2xl text-slate-900 tracking-tight">Selective Disclosure Lab</h3>
                 <p className="text-sm text-slate-500 mt-1">Simulate ZK-Proof generation for identity requests.</p>
              </div>
              
              <div className="space-y-6 flex-1">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Request Type</div>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <ShieldCheck className="w-5 h-5" />
                       </div>
                       <span className="text-base font-bold text-slate-800">Age Verification (18+)</span>
                    </div>
                 </div>

                 <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 border-dashed">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3">Proof Payload</div>
                    <div className="font-mono text-xs text-emerald-800 break-all bg-white p-4 rounded-xl border border-emerald-100 shadow-inner">
                       { '{ "type": "zk-snark", "schema": "age-greater-than", "value": true, "revealed": "none", "hash": "0x992fa...881c" }' }
                    </div>
                 </div>
              </div>

              <button className="w-full mt-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition shadow-xl shadow-emerald-600/20 active:scale-95 duration-100 uppercase tracking-widest text-xs">
                 Generate & Submit Proof
              </button>
           </div>

           <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full translate-x-12 -translate-y-12"></div>
               <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-indigo-400" />
                  <h3 className="font-bold text-white text-lg">Self-Claimed Attestations</h3>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Create user-signed attestations for non-legal claims (social profiles, contributions, community labels). Distributed via EAS (Ethereum Attestation Service).
               </p>
               <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all text-sm group-hover:gap-3">
                  Create EAS Claim <ArrowRight className="w-4 h-4" />
               </button>
           </div>
        </div>
      )}

      {activeTab === 'revocation' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-500">
           <div className="flex items-center gap-3 mb-6 text-slate-800">
              <Key className="w-6 h-6 text-rose-500" />
              <h3 className="font-bold text-xl tracking-tight">Revocation Registry</h3>
           </div>
           <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-3xl">
              Maintain an on-chain registry of revoked credentials. PathGuard nodes automatically check this registry before allowing transaction signing.
           </p>
           <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm font-bold text-rose-700">Accumulator Size: 1,402 Revocations</div>
              <button className="px-6 py-2 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition shadow-lg shadow-rose-600/10 uppercase text-[10px] tracking-widest">Update Merkle Root</button>
           </div>
        </div>
      )}

    </div>
  );
}
