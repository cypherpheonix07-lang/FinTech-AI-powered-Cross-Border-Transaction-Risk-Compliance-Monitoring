import React, { useState } from 'react';
import { Globe, Search, Database, HardDrive, ShieldCheck, Activity, ArrowRight, Server, Link2, Key } from 'lucide-react';

const didLogs = [
  { id: 'LOG-882', did: 'did:ethr:0x123...456', method: 'ethr', resolver: 'PathGuard-Node-1', result: 'Success', latency: '124ms' },
  { id: 'LOG-883', did: 'did:ion:EiA...XY2', method: 'ion', resolver: 'Microsoft-Universal', result: 'Success', latency: '450ms' },
  { id: 'LOG-884', did: 'did:sov:WRf...991', method: 'sov', resolver: 'Indicio-Mainnet', result: 'Success', latency: '310ms' },
  { id: 'LOG-885', did: 'did:key:z6M...q7a', method: 'key', resolver: 'Local-LibDID', result: 'Cached', latency: '2ms' },
  { id: 'LOG-886', did: 'did:polygon:0x...bb1', method: 'polygon', resolver: 'Polygon-ID-Gateway', result: 'Failed', latency: '500ms' },
];

export default function DIDResolutionPage() {
  const [activeTab, setActiveTab] = useState<'resolution' | 'governance' | 'caching'>('resolution');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700">
            Decentralized Identifier (DID) Resolution
          </h1>
          <p className="text-slate-500 mt-2">DIF Universal Resolver integration, multi-method discovery, and DID Document (DIDDoc) management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Globe className="w-4 h-4" />
            Universal Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-slate-700">Supported Methods</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">18</div>
          <p className="text-xs text-slate-500 mt-2">ethr, ion, sov, key, pkh...</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700">Avg Resolution</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">210ms</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">-15% vs global average</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-700">Cached Docs</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">4,205</div>
          <p className="text-xs text-slate-500 mt-2">TTL: 24 Hours</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700">Resolver Health</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">99.8%</div>
          <p className="text-xs text-emerald-600 font-medium mt-2">All drivers operational</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="did:method:specific-id..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none font-mono text-sm"
              />
           </div>
           <button className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition">
              Resolve
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-cyan-600" />
                 Resolution History
              </h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-slate-100 text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                          <th className="pb-3 px-2">DID identifier</th>
                          <th className="pb-3 px-2">Method</th>
                          <th className="pb-3 px-2">Result</th>
                          <th className="pb-3 px-2">Latency</th>
                          <th className="pb-3 px-2 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {didLogs.map((log) => (
                          <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                             <td className="py-4 px-2 font-mono text-xs text-slate-600">{log.did}</td>
                             <td className="py-4 px-2">
                                <span className="inline-flex px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600 uppercase">
                                   {log.method}
                                </span>
                             </td>
                             <td className="py-4 px-2">
                                <span className={`text-xs font-bold ${log.result === 'Success' ? 'text-emerald-600' : log.result === 'Cached' ? 'text-blue-600' : 'text-rose-600'}`}>
                                   {log.result}
                                </span>
                             </td>
                             <td className="py-4 px-2 text-xs font-medium text-slate-500">{log.latency}</td>
                             <td className="py-4 px-2 text-right">
                                <button className="p-1 hover:bg-white rounded border border-transparent hover:border-slate-200 text-slate-400 hover:text-cyan-600 transition-all">
                                   <ArrowRight className="w-4 h-4" />
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                 <HardDrive className="w-5 h-5 text-indigo-600" />
                 DID Document (Sample)
              </h3>
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[10px] leading-relaxed text-cyan-400 shadow-xl overflow-hidden relative group">
                 <div className="absolute top-4 right-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Link2 className="w-4 h-4 cursor-pointer hover:text-white" />
                    <Key className="w-4 h-4 cursor-pointer hover:text-white" />
                 </div>
                 <pre className="whitespace-pre-wrap">
{`{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/jws-2020/v1"
  ],
  "id": "did:ethr:0x123...456",
  "verificationMethod": [{
    "id": "did:ethr:0x123...456#controller",
    "type": "JsonWebKey2020",
    "controller": "did:ethr:0x123...456",
    "publicKeyJwk": {
      "kty": "EC",
      "crv": "secp256k1",
      "x": "...",
      "y": "..."
    }
  }],
  "authentication": [
    "#controller"
  ],
  "service": [{
    "id": "#identity-hub",
    "type": "IdentityHub",
    "serviceEndpoint": "https://hub.pathguard.ai"
  }]
}`}
                 </pre>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                 <p className="text-xs text-blue-700 font-medium">
                    Integrated with DIF (Decentralized Identity Foundation) Universal Resolver for 100% interoperability.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
