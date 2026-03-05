import React, { useState, useEffect } from 'react';
import { Network, Vote, Clock, CheckCircle2, XCircle } from 'lucide-react';

const GovernancePortal = () => {
  const [daoData, setDaoData] = useState<any>(null);

  useEffect(() => {
    // Mocking Python DAOGovernance response
    setDaoData({
      active_proposals: [
        {
          id: "PROP_2026_04",
          title: "Allocate $5M to DeFi Lending Liquidity Pool",
          proposer: "0x4A...2B",
          status: "ACTIVE_VOTING",
          yes_votes: 4500000.0,
          no_votes: 1200000.0,
          abstain_votes: 50000.0,
          quorum_required: 10000000.0,
          deadline: new Date(Date.now() + 172800000).toISOString(), // +2 days
          execution_payload: { type: "TREASURY_TRANSFER", amount: 5000000.0, destination: "Lending_Smart_Contract" }
        },
        {
          id: "PROP_2026_05",
          title: "Upgrade Core Consensus Protocol (v4.1)",
          proposer: "Core_Dev_Team",
          status: "QUEUED_FOR_EXECUTION",
          yes_votes: 18500000.0,
          no_votes: 400000.0,
          abstain_votes: 1000000.0,
          quorum_required: 15000000.0,
          deadline: new Date(Date.now() - 86400000).toISOString(), // -1 day
          execution_payload: { type: "CONTRACT_UPGRADE", version: "v4.1" }
        }
      ]
    });
  }, []);

  if (!daoData) return null;

  return (
    <div className="bg-[#1e1a24] border border-fuchsia-900/30 rounded-xl p-6 text-slate-200 shadow-2xl font-sans relative overflow-hidden">
      
      {/* Network Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#d946ef 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-fuchsia-900/50">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Network className="w-8 h-8 text-fuchsia-500" />
            PathGuard DAO Governance
          </h2>
          <p className="text-slate-400 mt-1">Decentralized Voting & Protocol Management</p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded font-medium shadow-lg transition-colors">
             <Vote className="w-4 h-4" /> Delegate Voting Power
          </button>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {daoData.active_proposals.map((prop: any) => {
          
          const totalVotes = prop.yes_votes + prop.no_votes + prop.abstain_votes;
          const yesPct = totalVotes > 0 ? (prop.yes_votes / totalVotes) * 100 : 0;
          const noPct = totalVotes > 0 ? (prop.no_votes / totalVotes) * 100 : 0;
          const quorumPct = Math.min(100, (totalVotes / prop.quorum_required) * 100);
          
          return (
            <div key={prop.id} className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 flex flex-col hover:border-fuchsia-500/30 transition-colors">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-slate-500">{prop.id}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                      prop.status === 'ACTIVE_VOTING' ? 'bg-fuchsia-900/20 text-fuchsia-400 border-fuchsia-500/30' :
                      'bg-emerald-900/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {prop.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-1">{prop.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">Proposed by: {prop.proposer}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-xs text-slate-400 mb-1">
                    <Clock className="w-3 h-3" /> 
                    {prop.status === 'ACTIVE_VOTING' ? 'Ends in 2 days' : 'Voting Closed'}
                  </div>
                  <div className="flex flex-col items-end gap-1 mt-2">
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest">Quorum</p>
                     <p className={`text-sm font-bold font-mono ${quorumPct >= 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                       {quorumPct.toFixed(1)}% <span className="font-normal text-xs text-slate-600">({(totalVotes / 1000000).toFixed(1)}M / {(prop.quorum_required / 1000000).toFixed(1)}M)</span>
                     </p>
                  </div>
                </div>
              </div>

              {/* Voting Bars */}
              <div className="my-6 space-y-3">
                 <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-emerald-400 font-bold">FOR ({(prop.yes_votes / 1000000).toFixed(1)}M)</span>
                     <span className="text-emerald-500">{yesPct.toFixed(1)}%</span>
                   </div>
                   <div className="w-full bg-slate-800 rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${yesPct}%` }}></div>
                   </div>
                 </div>
                 
                 <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-rose-400 font-bold">AGAINST ({(prop.no_votes / 1000000).toFixed(1)}M)</span>
                     <span className="text-rose-500">{noPct.toFixed(1)}%</span>
                   </div>
                   <div className="w-full bg-slate-800 rounded-full h-2">
                     <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${noPct}%` }}></div>
                   </div>
                 </div>
              </div>

              {/* Action Area */}
              <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1.5 rounded border border-slate-800 flex items-center gap-2">
                  Payload: {prop.execution_payload.type} 
                  {prop.execution_payload.amount && <span className="text-fuchsia-400">${(prop.execution_payload.amount / 1000000).toFixed(1)}M</span>}
                </div>
                
                {prop.status === 'ACTIVE_VOTING' ? (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/50 rounded transition-colors text-sm font-bold">
                       <CheckCircle2 className="w-4 h-4" /> Vote FOR
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 border border-rose-500/50 rounded transition-colors text-sm font-bold">
                       <XCircle className="w-4 h-4" /> Vote AGAINST
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-slate-800 text-slate-400 text-sm font-bold rounded cursor-not-allowed border border-slate-700">
                    Awaiting Execution Time-lock
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default GovernancePortal;
