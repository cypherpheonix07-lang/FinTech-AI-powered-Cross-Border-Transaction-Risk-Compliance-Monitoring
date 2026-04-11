import React, { useState } from 'react';
import { 
  Shield, 
  UserCheck, 
  AlertTriangle, 
  Fingerprint, 
  Lock, 
  ShieldCheck, 
  Activity, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const reputationData = [
  { month: 'Jan', score: 820 },
  { month: 'Feb', score: 840 },
  { month: 'Mar', score: 835 },
  { month: 'Apr', score: 860 },
  { month: 'May', score: 890 },
  { month: 'Jun', score: 910 },
  { month: 'Jul', score: 945 },
];

export default function IdentityReputationPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'credentials' | 'audit'>('overview');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
            Identity & Reputation Systems
          </h1>
          <p className="text-slate-500 mt-2">Decentralized Identity (DID), Privacy-Preserving KYC, & Dynamic Reputation Scoring</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Fingerprint className="w-4 h-4" />
            Manage Biometrics
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
            <UserCheck className="w-4 h-4" />
            Verify New Credential
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Reputation Overview
        </button>
        <button 
          onClick={() => setActiveTab('credentials')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'credentials' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Verifiable Credentials (VCs)
        </button>
        <button 
          onClick={() => setActiveTab('audit')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'audit' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Zero-Knowledge Proofs Audit
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldCheck className="w-16 h-16 text-emerald-600" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-700">Global Rep Score (GRS)</h3>
                </div>
                <div className="text-4xl font-bold text-slate-900">945<span className="text-lg text-emerald-500 ml-2">↑ 35</span></div>
                <p className="text-xs text-slate-500 mt-2">Top 1% of institutional actors</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-700">Compliance Factor</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900">99.8%</div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-slate-700">Verified Credentials</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900">14</div>
                <p className="text-xs text-slate-500 mt-2">Across 6 jurisdictions</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-slate-700">Risk Flags (30d)</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900">0</div>
                <p className="text-xs text-emerald-600 font-medium mt-2">Clean record</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Reputation Score Trajectory
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reputationData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-600" />
                Identity Anchors
              </h3>
              
              {['W3C Decentralized ID (DID)', 'Legal Entity Identifier (LEI)', 'EU eIDAS Verified', 'US FinCEN Cleared'].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item}</p>
                      <p className="text-xs text-slate-500">Anchored to Ethereum Mainnet</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
              ))}
              <button className="w-full mt-4 py-3 border border-dashed border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-600 transition-colors">
                + Add New Anchor
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'credentials' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center py-20">
            <UserCheck className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Verifiable Credentials (VCs) Vault</h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-6">Manage your cryptographically signed claims and attestations. Share proofs selectively without revealing underlying data.</p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Issue or Request VC
            </button>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center py-20">
            <Lock className="w-16 h-16 text-emerald-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Zero-Knowledge (ZK) Proofs Configuration</h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-6">Submit compliance audits and risk metrics using zk-SNARKs/zk-STARKs. Prove compliance status without sacrificing institutional privacy.</p>
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Generate Current ZK-Proof
            </button>
        </div>
      )}
    </div>
  );
}
