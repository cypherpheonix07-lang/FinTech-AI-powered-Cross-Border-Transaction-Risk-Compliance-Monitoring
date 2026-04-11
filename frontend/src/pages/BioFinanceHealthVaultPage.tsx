import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  ShieldCheck, 
  HeartPulse, 
  TrendingUp, 
  Activity, 
  Lock, 
  Fingerprint,
  Thermometer,
  Zap,
  Globe,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { apiFetch } from '../lib/api';

interface LongevityAsset {
  id: string;
  name: string;
  type: string;
  performance: number;
  healthBaseline: number;
  riskScore: number;
}

interface GeoengineeringBond {
  id: string;
  project: string;
  carbonCapture: number;
  coolingEffect: number;
  yield: number;
  status: string;
}

interface BioAuthStatus {
  authenticated: boolean;
  sequencingConfidence: number;
  dnaSignatureId: string;
  biometricValidity: boolean;
}

export default function BioFinanceHealthVaultPage() {
  const [assets, setAssets] = useState<LongevityAsset[]>([]);
  const [bonds, setBonds] = useState<GeoengineeringBond[]>([]);
  const [authStatus, setAuthStatus] = useState<BioAuthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [sequencing, setSequencing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const assetsData = await apiFetch<LongevityAsset[]>('/vanguard/bio/portfolio');
      const bondsData = await apiFetch<GeoengineeringBond[]>('/vanguard/bio/geo-bonds');
      setAssets(assetsData);
      setBonds(bondsData);
    } catch (error) {
      console.error('Error fetching bio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDNAAuth = async () => {
    setSequencing(true);
    try {
      const data = await apiFetch<BioAuthStatus>('/vanguard/bio/verify-dna', { method: 'POST' });
      setTimeout(() => {
        setAuthStatus(data);
        setSequencing(false);
      }, 2000);
    } catch (error) {
      console.error('DNA Sequencing failed:', error);
      setSequencing(false);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-emerald-500/30 font-sans">
      {/* Bio-Header */}
      <div className="relative p-10 bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
               <div className="p-3 bg-emerald-500/20 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Dna className="w-8 h-8 text-emerald-400" />
               </div>
               <span className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em]">Genetic Asset Vault</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-4">
              Bio-Finance <span className="text-emerald-400">& Longevity</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              PathGuard's most secure tier. Manage biological-linked assets, genetic future bonds, and geoengineering portfolios with DNA-sequenced authentication.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
             <button
               onClick={handleDNAAuth}
               disabled={sequencing || !!authStatus}
               className={`group relative px-10 py-5 rounded-[2rem] font-black text-lg transition-all overflow-hidden shadow-2xl ${
                 authStatus 
                   ? 'bg-emerald-500 text-slate-950' 
                   : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105 active:scale-95'
               }`}
             >
               <span className="relative z-10 flex items-center gap-3">
                 {sequencing ? <Zap className="w-6 h-6 animate-spin" /> : authStatus ? <ShieldCheck className="w-6 h-6" /> : <Fingerprint className="w-6 h-6" />}
                 {sequencing ? 'Sequencing DNA...' : authStatus ? 'DNA Identity Verified' : 'Authenticate DNA'}
               </span>
               {sequencing && (
                 <motion.div 
                   className="absolute inset-0 bg-white/20"
                   initial={{ x: '-100%' }}
                   animate={{ x: '100%' }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 />
               )}
             </button>
             {authStatus && (
               <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-4 py-1 rounded-full border border-emerald-500/30">
                 Signature: {authStatus.dnaSignatureId}
               </div>
             )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {authStatus ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Longevity Portfolio */}
            <div className="lg:col-span-12 xl:col-span-8 space-y-8">
               <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                     <HeartPulse className="w-24 h-24 text-emerald-500/10 -rotate-12" />
                  </div>
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                     <Activity className="text-emerald-400" /> Longevity Asset Stream
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {assets.map(asset => (
                       <div key={asset.id} className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all group scale-100 hover:scale-[1.02]">
                          <div className="flex justify-between items-start mb-6">
                             <div>
                                <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest">{asset.type}</div>
                                <div className="text-xl font-black">{asset.name}</div>
                             </div>
                             <div className={`p-2 rounded-xl ${asset.performance > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                <TrendingUp className="w-5 h-5" />
                             </div>
                          </div>
                          <div className="flex items-end justify-between">
                             <div>
                                <div className="text-3xl font-black tracking-tighter mb-1">
                                   {asset.performance > 0 ? '+' : ''}{asset.performance}%
                                </div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase">Biometric performance</div>
                             </div>
                             <div className="text-right">
                                <div className="text-sm font-bold text-emerald-400">{asset.healthBaseline}%</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase">Health Baseline</div>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="mt-10 h-[200px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={assets}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                           <XAxis dataKey="name" hide />
                           <YAxis hide />
                           <Tooltip 
                              cursor={{ fill: 'transparent' }}
                              contentStyle={{ backgroundColor: '#064e3b', border: 'none', borderRadius: '12px' }}
                              itemStyle={{ color: '#10b981' }}
                           />
                           <Bar dataKey="performance" radius={[10, 10, 10, 10]} barSize={60}>
                              {assets.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.performance > 0 ? '#10b981' : '#f43f5e'} />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               {/* Geoengineering Bonds Panel */}
               <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                     <Globe className="text-emerald-400" /> Planetary Geoengineering Bonds (PGB)
                  </h2>
                  <div className="space-y-4">
                     {bonds.map(bond => (
                        <div key={bond.id} className="p-6 bg-slate-900 border border-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                           <div className="flex items-center gap-5">
                              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400">
                                 <Leaf className="w-6 h-6" />
                              </div>
                              <div>
                                 <div className="text-lg font-black">{bond.project}</div>
                                 <div className="text-xs text-slate-500 font-bold flex gap-3">
                                    <span>ID: {bond.id}</span>
                                    <span>Status: <span className="text-emerald-400">{bond.status}</span></span>
                                 </div>
                              </div>
                           </div>
                           <div className="grid grid-cols-3 gap-8 text-center md:text-right">
                              <div>
                                 <div className="text-sm font-black text-emerald-400">{bond.yield}%</div>
                                 <div className="text-[10px] text-slate-500 uppercase font-bold">Annual Yield</div>
                              </div>
                              <div>
                                 <div className="text-sm font-black text-cyan-400">{bond.coolingEffect} °C</div>
                                 <div className="text-[10px] text-slate-500 uppercase font-bold">Cooling Delta</div>
                              </div>
                              <div>
                                 <div className="text-sm font-black">{(bond.carbonCapture / 1000).toFixed(0)}k t</div>
                                 <div className="text-[10px] text-slate-500 uppercase font-bold">Carbon Captured</div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Panel: Biometric Stats & Alerts */}
            <div className="lg:col-span-12 xl:col-span-4 space-y-8">
               <div className="bg-gradient-to-br from-indigo-900/10 to-emerald-900/20 border border-white/10 p-8 rounded-[2rem]">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                     <Thermometer className="text-emerald-400" /> Biokinetic Vitals
                  </h3>
                  <div className="space-y-6">
                     {[
                        { label: 'Genetic Stability', val: '99.98%' },
                        { label: 'Oxidative Stress', val: 'Minimal' },
                        { label: 'Metabolic Velocity', val: 'Optimal' }
                     ].map((stat, i) => (
                        <div key={i}>
                           <div className="flex justify-between text-xs mb-2">
                              <span className="text-slate-500 font-bold uppercase">{stat.label}</span>
                              <span className="text-emerald-400 font-black">{stat.val}</span>
                           </div>
                           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="w-full h-full bg-emerald-500/40"></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2rem] h-fit">
                  <h3 className="text-xl font-bold mb-6">Security Protocols</h3>
                  <div className="space-y-4">
                     <div className="flex gap-4 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div className="text-xs text-slate-300">
                           <span className="font-black text-emerald-400">PGB Guard Active:</span> Automated selling enabled if project cooling delta drops below 85% efficiency.
                        </div>
                     </div>
                     <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <Activity className="w-5 h-5 text-slate-400 shrink-0" />
                        <div className="text-xs text-slate-500">
                           <span className="font-black text-slate-300">Health-Lock:</span> Withdrawal limits dynamically adjusted based on cortisol-level simulation.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 space-y-8"
          >
            <div className="relative">
               <motion.div 
                  className="w-48 h-48 rounded-full border-4 border-dashed border-slate-800"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               ></motion.div>
               <Lock className="absolute inset-0 m-auto w-16 h-16 text-slate-800" />
            </div>
            <div className="text-center">
               <h2 className="text-2xl font-black text-slate-500 tracking-tight">VAULT ENCRYPTED</h2>
               <p className="text-slate-600 mt-2">Personal biological sequence identification required for access.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
