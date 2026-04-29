import React, { useState, useEffect } from 'react';
import { Fingerprint, Shield, UserCheck, Key, ArrowRight, Share2, Globe, Lock, Save } from 'lucide-react';
import { apiFetch } from '../lib/api';

export interface VerifiableCredential {
  id: string;
  type: string;
  issuer: string;
  issuedAt: string;
  status: 'Verified' | 'Pending' | 'Expired' | 'Revoked';
  zkProofActive: boolean;
}

export default function SSIManagementPage() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'connections' | 'governance'>('wallet');
  const [credentials, setCredentials] = useState<VerifiableCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingProof, setGeneratingProof] = useState(false);
  const [proof, setProof] = useState<string | null>(null);

  const primaryDID = 'did:ethr:0x71C...4e8f';

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const data = await apiFetch<VerifiableCredential[]>(`/web3-bridge/identity/credentials/${encodeURIComponent(primaryDID)}`);
        setCredentials(data);
      } catch (error) {
        console.error('Failed to fetch credentials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, []);

  const handleGenerateProof = async (credId: string) => {
    setGeneratingProof(true);
    try {
      const { proof: newProof } = await apiFetch<{ proof: string }>('/web3-bridge/identity/proof', {
        method: 'POST',
        body: JSON.stringify({ credentialId: credId, attribute: 'age_over_18' })
      });
      setProof(newProof);
    } catch (error) {
      console.error('Failed to generate ZK-proof:', error);
    } finally {
      setGeneratingProof(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Self-Sovereign Identity (SSI)
          </h1>
          <p className="text-slate-500 mt-2">Manage your Decentralized Identifiers (DIDs), verifiable credentials, and digital sovereignty</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
            <Save className="w-4 h-4" />
            Backup Identity Hub
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
        {[
          { id: 'wallet', label: 'Identity Wallet', icon: UserCheck },
          { id: 'connections', label: 'Connections', icon: Share2 },
          { id: 'governance', label: 'DID Governance', icon: Shield },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
              activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'wallet' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-1">
            <div className="flex flex-col items-center text-center p-4">
               <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/30">
                  <Fingerprint className="w-12 h-12 text-white" />
               </div>
               <h2 className="text-xl font-bold text-slate-900">Primary DID</h2>
               <p className="text-xs font-mono text-slate-400 mt-1">{primaryDID}</p>
               
               <div className="grid grid-cols-2 gap-4 w-full mt-8">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                     <div className="text-xs text-slate-500 font-medium">Trust Score</div>
                     <div className="text-lg font-bold text-indigo-600">94/100</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                     <div className="text-xs text-slate-500 font-medium">Credentials</div>
                     <div className="text-lg font-bold text-slate-900">{credentials.length}</div>
                  </div>
               </div>

               <button className="w-full mt-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> Share Public Profile
               </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  Active Verified Credentials
                </h3>
                 <div className="space-y-4">
                    {credentials.map((cred) => (
                       <div key={cred.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                          <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-xl ${cred.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                <Shield className="w-5 h-5" />
                             </div>
                             <div>
                                <div className="font-bold text-slate-900">{cred.type}</div>
                                <div className="text-xs text-slate-500 font-medium">Issuer: {cred.issuer}</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="text-right hidden sm:block">
                                <div className={`text-xs font-bold uppercase ${cred.status === 'Verified' ? 'text-emerald-600' : cred.status === 'Expired' ? 'text-rose-600' : 'text-amber-600'}`}>
                                   {cred.status}
                                </div>
                                <div className="text-[10px] text-slate-400 font-medium">Issued {cred.issuedAt}</div>
                             </div>
                             <button 
                               onClick={() => handleGenerateProof(cred.id)}
                               className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-200"
                             >
                                <ArrowRight className="w-4 h-4" />
                             </button>
                          </div>
                       </div>
                    ))}
                    {loading && <p className="text-center p-4 text-slate-400">Loading identity hub...</p>}
                    {!loading && credentials.length === 0 && (
                      <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
                        <p className="text-sm text-slate-400 font-medium">No credentials found in your local hub.</p>
                      </div>
                    )}
                 </div>
                <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm">
                   + Add New Credential
                </button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-500">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                <Share2 className="w-5 h-5 text-blue-600" />
                Trusted Connections
              </h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">+ Connect New Entity</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'PathGuard Protocol', status: 'Authorized', type: 'System' },
                { name: 'Parallel Markets', status: 'KYB Provider', type: 'Service' },
                { name: 'DeFi Lending Hub', status: 'Active Session', type: 'dApp' },
              ].map((conn) => (
                <div key={conn.name} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                   <div>
                      <div className="font-bold text-slate-900 text-sm">{conn.name}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase">{conn.type}</div>
                   </div>
                   <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{conn.status}</div>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'governance' && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-500 text-center space-y-8">
           <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto border border-indigo-100">
              <Shield className="w-12 h-12" />
           </div>
           <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="font-bold text-2xl text-slate-900 tracking-tight">Decentralized Governance</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                 Manage your DID document resolution policies, key rotation schedules, and delegate recovery agents. Your digital sovereignty is cryptographically secured via your primary identity keys.
              </p>
           </div>
           <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 text-xs uppercase tracking-widest">
                 Modify DID Doc
              </button>
              <button className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition text-xs uppercase tracking-widest">
                 Assign Delegates
              </button>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900">Identity Hub Privacy</h3>
             </div>
             <p className="text-sm text-slate-500 mb-6 font-medium">
                Your identity data is stored in an encrypted off-chain hub (Ceramic / IPFS). You control which external dApps can request selective disclosure of your data.
             </p>
             <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                   <span className="text-sm font-semibold text-slate-700">Encrypted Cloud Backup</span>
                   <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                   </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                   <span className="text-sm font-semibold text-slate-700">Biometric Recovery</span>
                   <div className="w-10 h-5 bg-slate-300 rounded-full relative">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                   </div>
                </div>
             </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">Selective Disclosure</h3>
             </div>
             <p className="text-sm text-slate-500 mt-2 font-medium mb-6">
                When a protocol asks "Are you over 18?", PathGuard presents a ZK-proof without revealing your actual date of birth or name.
             </p>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                 <div className="flex items-center gap-3 text-indigo-700 mb-3">
                    <Key className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {generatingProof ? 'Proof Generation in Progress...' : 'ZK-SNARK Generator Active'}
                    </span>
                 </div>
                 <div className="text-xs font-mono text-indigo-400 truncate">
                    {proof || '0x8823...f2a1...99c ... 0x0012'}
                 </div>
              </div>
         </div>
      </div>
    </div>
  );
}
