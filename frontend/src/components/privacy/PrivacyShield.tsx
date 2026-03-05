import React, { useState, useEffect } from 'react';
import { Shield, EyeOff, Fingerprint, Lock, Loader2 } from 'lucide-react';

const PrivacyShield = () => {
  const [zkpReady, setZkpReady] = useState(false);
  const [zkpData, setZkpData] = useState<any>(null);
  const [ringSig, setRingSig] = useState<any>(null);

  useEffect(() => {
    // Simulate generation time for cryptographic proofs based on backend modeling
    const timer = setTimeout(() => {
      setZkpData({
        status: "PROOF_GENERATED",
        protocol: "ZK-SNARK (Groth16)",
        circuit_id: "KYC_COMPLIANCE_v2",
        proof: {
          pi_a: "a8f1d2b4e5c6a7d890f1e2d3c4b5a697",
          pi_b: "f3e4d5c6b7a8901234567890abcdef12",
          pi_c: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d"
        },
        public_inputs: ["is_over_18=TRUE", "is_not_sanctioned=TRUE"],
        generation_time_ms: 215.4,
        verification_status: "VERIFIED_ON_CHAIN"
      });
      setZkpReady(true);
    }, 2500);

    setRingSig({
      protocol: "Ring_Signature_AOS",
      anonymity_set_size: 11,
      key_image: "0x78a5f3...91c2",
      signature_hash: "0x4b2c1d9...3f8a0"
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#121212] border border-fuchsia-900/30 rounded-xl p-6 text-slate-200 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Abstract dark mode background */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-fuchsia-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-fuchsia-900/30">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-fuchsia-500" />
            Privacy-Enhancing Technologies (PETs)
          </h2>
          <p className="text-slate-400 mt-1">Zero-Knowledge Proofs & Transaction Obfuscation</p>
        </div>
        <div>
           <span className="flex items-center gap-2 px-3 py-1 bg-fuchsia-900/20 border border-fuchsia-500/30 text-fuchsia-400 rounded-full text-xs font-mono">
             <Lock className="w-3 h-3" /> MAXIMUM PRIVACY ENABLED
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* ZK-SNARK KYC Section */}
        <div className="bg-black/40 rounded-xl p-6 border border-slate-800 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold text-fuchsia-400 uppercase tracking-wider flex items-center gap-2">
              <Fingerprint className="w-5 h-5" /> ZK- KYC Compliance
            </h3>
            <span className="text-xs text-slate-500 font-mono">Circuit: KYC_v2</span>
          </div>

          {!zkpReady ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <Loader2 className="w-10 h-10 text-fuchsia-500 animate-spin" />
              <p className="text-sm text-slate-400 font-mono">Generating ZK-SNARK Proof...</p>
              <div className="w-48 bg-slate-800 rounded-full h-1 overflow-hidden">
                <div className="bg-fuchsia-500 h-full w-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-500">
               <div className="bg-emerald-900/20 border border-emerald-500/30 rounded p-4 text-center">
                 <p className="font-bold text-emerald-400 text-lg tracking-wide mb-1">Identity Verified Secretly</p>
                 <p className="text-xs text-emerald-500/80">Regulator constraints met without exposing actual PII.</p>
               </div>
               
               <div className="bg-slate-900 rounded border border-slate-800 p-3">
                 <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 border-b border-slate-800 pb-2">Revealed Public Inputs (Statement)</p>
                 {zkpData.public_inputs.map((inp: string, i: number) => (
                   <p key={i} className="text-sm text-fuchsia-300 font-mono flex items-center gap-2 mt-1">
                     <Shield className="w-3 h-3 text-slate-600" /> {inp}
                   </p>
                 ))}
               </div>

               <div className="bg-slate-900 rounded border border-slate-800 p-3">
                 <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 border-b border-slate-800 pb-2">Mathematical Proof (<span className="text-fuchsia-500">{zkpData.generation_time_ms}ms</span>)</p>
                 <div className="space-y-1 font-mono text-[10px] text-slate-400 overflow-hidden break-all">
                   <p><span className="text-slate-600">π_a:</span> {zkpData.proof.pi_a}...</p>
                   <p><span className="text-slate-600">π_b:</span> {zkpData.proof.pi_b}...</p>
                   <p><span className="text-slate-600">π_c:</span> {zkpData.proof.pi_c}...</p>
                 </div>
               </div>
            </div>
          )}
        </div>

        {/* Ring Signatures Section */}
        <div className="bg-black/40 rounded-xl p-6 border border-slate-800 backdrop-blur-sm flex flex-col justify-center text-center">
            
            <div className="mb-6 flex justify-center">
               <div className="p-4 bg-slate-900 rounded-full border border-slate-700 relative">
                 <EyeOff className="w-12 h-12 text-slate-400" />
                 {/* Decorative rings */}
                 <div className="absolute inset-0 rounded-full border shadow-[0_0_15px_rgba(255,255,255,0.1)] border-slate-600/50 scale-[1.3] -rotate-45"></div>
                 <div className="absolute inset-0 rounded-full border shadow-[0_0_15px_rgba(217,70,239,0.1)] border-fuchsia-900/50 scale-[1.6] rotate-45 animate-[spin_10s_linear_infinite]"></div>
               </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Sender Obfuscation Active</h3>
            <p className="text-sm text-slate-400 mb-8 max-w-xs mx-auto">
              Transaction masked using Ring Signatures. The true sender is hidden among decoy signers on the ledger.
            </p>

            {ringSig && (
               <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-slate-900 p-4 border border-slate-800 rounded">
                     <p className="text-xs text-slate-500 mb-1">Protocol</p>
                     <p className="font-mono text-sm text-white">{ringSig.protocol}</p>
                  </div>
                  <div className="bg-fuchsia-900/10 p-4 border border-fuchsia-900/30 rounded">
                     <p className="text-xs text-slate-500 mb-1">Anonymity Set Size</p>
                     <p className="font-mono text-2xl font-bold text-fuchsia-400">{ringSig.anonymity_set_size}</p>
                  </div>
                  <div className="col-span-2 bg-slate-900 p-4 border border-slate-800 rounded">
                     <p className="text-xs text-slate-500 mb-1">Key Image (Double-Spend Protection)</p>
                     <p className="font-mono text-xs text-slate-300">{ringSig.key_image}</p>
                  </div>
               </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default PrivacyShield;
