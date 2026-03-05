import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Zap, 
  Activity, 
  History, 
  RefreshCw, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle,
  Fingerprint,
  Eye,
  Key,
  Shield,
  Binary,
  Radio,
  Orbit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function QuantumCorePage() {
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quantum Core</h1>
             <span className="bg-blue-600 text-[8px] font-black px-2 py-0.5 rounded-full text-white uppercase tracking-widest">EXPERIMENTAL</span>
          </div>
          <p className="text-slate-500 font-medium italic">Next-gen LWE-based post-quantum encryption for every transaction.</p>
        </div>
        <Button 
          onClick={() => { setIsSyncing(true); setTimeout(() => setIsSyncing(false), 2000); }}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-blue-600/20"
        >
          <RefreshCw className={cn("w-4 h-4 mr-2", isSyncing && "animate-spin")} />
          {isSyncing ? 'Resyncing Entropy' : 'Resync Quantum Keys'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Encryption Status */}
        <div className="lg:col-span-8 bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/50">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px]" />
           
           <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">System Status</p>
                    <h3 className="text-3xl font-black">ACTIVE & SHIELDED</h3>
                 </div>
                 <div className="p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                    <Orbit className="w-8 h-8 text-blue-400" />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">
                       <span>Lattice Entropy Source</span>
                       <span className="text-emerald-400">OPTIMAL</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] w-[92%]" />
                    </div>
                    <p className="text-[11px] text-white/30 italic">Using Kyber-1024 (NIST Round 3) parameters for key encapsulation.</p>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">
                       <span>Threat Detection Mesh</span>
                       <span className="text-blue-400">99.9% UPTIME</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] w-full" />
                    </div>
                    <p className="text-[11px] text-white/30 italic">Real-time analysis across 14 global secure nodes.</p>
                 </div>
              </div>

              <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-8 group">
                 <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-600/20 shrink-0 group-hover:scale-110 transition-transform">
                    <Binary className="w-10 h-10 text-white" />
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <h4 className="text-lg font-black italic">Active Ciphertext: 0x4F...7E9</h4>
                    <p className="text-sm font-medium text-white/40 mt-1">Rotating session keys every 15 minutes via quantum-resistant handshake.</p>
                 </div>
                 <Button variant="ghost" className="text-white hover:text-blue-400 font-black uppercase text-xs tracking-widest px-0">
                    Audit Log <ArrowRight className="ml-2 w-4 h-4" />
                 </Button>
              </div>
           </div>
        </div>

        {/* Threat Intelligence Side */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <AlertCircle className="w-4 h-4 text-orange-500" /> Active Threat Intel
              </h4>
              <div className="space-y-4">
                 {[
                   { type: 'Brute Force Attack', origin: 'EEU Node', risk: 'Low', status: 'Blocked' },
                   { type: 'Key Leakage Probe', origin: 'NAW Node', risk: 'Med', status: 'Neutralized' },
                   { type: 'MITM Simulation', origin: 'Internal', risk: 'Info', status: 'Passed' },
                 ].map((t) => (
                   <div key={t.type} className="p-4 rounded-2.5xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-start mb-1 text-[10px] font-black uppercase">
                         <span className="text-slate-400">{t.origin}</span>
                         <span className={cn(
                           t.status === 'Blocked' ? "text-emerald-500" : t.status === 'Neutralized' ? "text-blue-500" : "text-slate-400"
                         )}>{t.status}</span>
                      </div>
                      <h5 className="text-sm font-black text-slate-900">{t.type}</h5>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-blue-600 p-8 rounded-[3.5rem] text-white shadow-xl shadow-blue-600/20 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <Radio className="w-8 h-8 text-blue-200 animate-pulse" />
                    <span className="text-[8px] font-black bg-white/20 px-2 py-1 rounded-lg uppercase tracking-widest">SCANNING</span>
                 </div>
                 <h4 className="text-xl font-black">Encryption Node: London-A1</h4>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span>Link Integrity</span>
                       <span>99.9%</span>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full">
                       <div className="h-full bg-white w-full" />
                    </div>
                 </div>
                 <Button className="w-full bg-white text-blue-600 font-black rounded-2xl py-6 uppercase text-xs tracking-widest group-hover:bg-blue-50 transition-colors">
                    Switch Node
                 </Button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
            <div className="w-14 h-14 bg-slate-50 rounded-2.5xl flex items-center justify-center">
               <Fingerprint className="w-7 h-7 text-blue-600" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Biometric Seed</h4>
            <p className="text-slate-500 font-medium text-sm">Use your unique biometric signature as a basis for quantum entropy generation.</p>
            <Button variant="outline" className="w-full rounded-2l py-6 font-black uppercase text-[10px] tracking-widest border-slate-200">Configure Biometric</Button>
         </div>

         <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
            <div className="w-14 h-14 bg-slate-50 rounded-2.5xl flex items-center justify-center">
               <Key className="w-7 h-7 text-indigo-600" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Hardware Bridge</h4>
            <p className="text-slate-500 font-medium text-sm">Sync with YubiKey or Ledger for hardware-backed post-quantum key storage.</p>
            <Button variant="outline" className="w-full rounded-2l py-6 font-black uppercase text-[10px] tracking-widest border-slate-200">Pair Device</Button>
         </div>

         <div className="p-8 rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden group shadow-xl shadow-indigo-600/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
            <div className="relative z-10 space-y-6">
               <div className="w-14 h-14 bg-white/10 rounded-2.5xl flex items-center justify-center border border-white/10">
                  <Shield className="w-7 h-7 text-white" />
               </div>
               <h4 className="text-xl font-black">Cipher Guard Pro</h4>
               <p className="text-white/60 font-medium text-sm leading-relaxed">Automatic failover to classic AES-256 if quantum syncing fails. Zero downtime security.</p>
               <Button className="w-full bg-white text-indigo-600 font-black rounded-2xl py-6 uppercase text-[10px] tracking-widest">
                  Enable Pro Guard
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}
