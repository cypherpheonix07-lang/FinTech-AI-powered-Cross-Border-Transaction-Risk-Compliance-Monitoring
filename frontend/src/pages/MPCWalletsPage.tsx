import React, { useState } from 'react';
import { Shield, Users, Key, Lock, Activity, ArrowRight, ShieldCheck, Share2, Database, AlertCircle } from 'lucide-react';

const mpcNodes = [
  { id: 'MPC-NODE-01', location: 'Frankfurt, GER', type: 'PathGuard HSM', share: '33.3%', health: 'Optimal' },
  { id: 'MPC-NODE-02', location: 'Singapore, SG', type: 'AWS Nitro Enclave', share: '33.3%', health: 'Optimal' },
  { id: 'MPC-NODE-03', location: 'New York, US', type: 'Azure Confidential', share: '33.3%', health: 'Syncing' },
];

const sharedWallets = [
  { id: 'W-INST-88', name: 'Treasury Cold Reserve', threshold: '2/3', tvl: '$1.2B', status: 'Secured' },
  { id: 'W-OPS-21', name: 'Operational Hot Wallet', threshold: '3/5', tvl: '$45M', status: 'Secured' },
  { id: 'W-CUST-99', name: 'Institutional Custody', threshold: '2/3', tvl: '$850M', status: 'Pending Rotation' },
];

export default function MPCWalletsPage() {
  const [activeTab, setActiveTab] = useState<'topology' | 'shares' | 'rotation'>('topology');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
            MPC Wallets & Distributed Key Management (DKM)
          </h1>
          <p className="text-slate-500 mt-2">Multi-party computation, threshold key generation (TKG), and distributed share orchestration</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors shadow-md shadow-indigo-500/20">
            <Share2 className="w-4 h-4" />
            Initiate Share Rotation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Active Participants</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">12</div>
          <p className="text-xs text-slate-500 mt-2">Geographically diverse</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Keys Recoverable</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">100%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Threshold maintained</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-700">Signing Latency</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">1.4s</div>
          <p className="text-xs text-slate-500 mt-2">Parallelized round-trips</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Protocol</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">FROST</div>
          <p className="text-xs text-slate-500 mt-2">Schnorr-based Threshold</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
             <Database className="w-5 h-5 text-blue-600" />
             Managed Enterprise Wallets
          </h3>
          <div className="space-y-4">
             {sharedWallets.map((wallet) => (
                <div key={wallet.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <div className="font-bold text-slate-900 text-lg">{wallet.name}</div>
                         <div className="text-xs text-slate-500 font-medium">Threshold Policy: {wallet.threshold}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${wallet.status === 'Secured' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                         {wallet.status}
                      </span>
                   </div>
                   <div className="flex justify-between items-end">
                      <div>
                         <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Assets</div>
                         <div className="text-2xl font-bold text-slate-900 tracking-tight">{wallet.tvl}</div>
                      </div>
                      <button className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                         Manage Policy
                      </button>
                   </div>
                </div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 text-blue-500/20 group-hover:text-blue-400/30 transition-colors">
                 <Shield className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative">MPC Nodes Topology</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed relative">
                 Active orchestration of key shares across cloud-agnostic trusted execution environments (TEE).
              </p>
              <div className="space-y-4 relative">
                 {mpcNodes.map((node) => (
                    <div key={node.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${node.health === 'Optimal' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></div>
                          <div className="text-xs">
                             <div className="font-bold text-white">{node.location}</div>
                             <div className="text-[10px] text-slate-500">{node.type}</div>
                          </div>
                       </div>
                       <div className="text-xs font-mono text-blue-400">{node.share}</div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                 <AlertCircle className="w-5 h-5 text-amber-600" />
                 <h3 className="font-bold text-slate-900">Security Compliance</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Key Refresh Interval</span>
                    <span className="font-bold text-slate-700">30 Days</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: '85%' }}></div>
                 </div>
                 <div className="text-[10px] text-slate-400 text-center">Next rotation in 4 days</div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
               <Key className="w-10 h-10" />
            </div>
            <div>
               <h3 className="font-bold text-xl mb-2">Distributed Key Generation (DKG)</h3>
               <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                  PathGuard leverages zero-knowledge DKG protocols. Participants generate a joint public key and their own private shares without the private key ever existing in its entirety on any single machine. This "no single point of failure" architecture is the gold standard for institutional asset protection.
               </p>
            </div>
            <button className="ml-auto px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg shrink-0">
               View Protocol Specs
            </button>
         </div>
      </div>
    </div>
  );
}
