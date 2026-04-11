import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Orbit, 
  Layers, 
  Maximize2, 
  Volume2, 
  Cpu, 
  Zap,
  Activity,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { apiFetch } from '../lib/api';

interface SpatialSession {
  id: string;
  deviceType: string;
  status: string;
  lastHandshake: string;
}

export default function HolographicFinancialAdvisorPage() {
  const [sessions, setSessions] = useState<SpatialSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'3D_MAP' | 'ADVISOR_STREAM'>('ADVISOR_STREAM');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const data = await apiFetch<SpatialSession[]>('/vanguard/spatial/sessions');
      setSessions(data);
    } catch (error) {
      console.error('Error fetching spatial sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 font-sans">
      {/* 3D Glass Header */}
      <div className="relative group p-8 bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all hover:border-cyan-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] -z-10 group-hover:bg-cyan-500/20 transition-all duration-1000"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/20 rounded-xl">
                <Orbit className="w-6 h-6 text-cyan-400 animate-spin-slow" />
              </div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
                Spatial Engine Active
              </span>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent tracking-tighter">
              Holographic <span className="text-cyan-400">Advisor</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl leading-relaxed">
              Experience financial management in true 3D space. Our volumetric AI assistant provides real-time portfolio orchestration and spatial risk sonification.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all text-sm flex items-center gap-2">
               <Volume2 className="w-4 h-4 text-cyan-400" />
               Audio Sonification
            </button>
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-bold transition-all text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]">
               Enter AR Workspace
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Volumetric Control & Active Sessions */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem]"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-cyan-400" /> Volumetric Hub
            </h2>
            
            <div className="space-y-4">
               {sessions.map(sess => (
                 <div key={sess.id} className="p-5 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-center justify-between group hover:bg-cyan-500/10 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                          <Cpu className="w-5 h-5 text-cyan-400" />
                       </div>
                       <div>
                          <div className="text-sm font-bold">{sess.deviceType}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{sess.id}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                       <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Live</span>
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="text-sm font-bold mb-3 flex items-center justify-between">
                   <span>Spatial Resolution</span>
                   <span className="text-cyan-400">8K Volumetric</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="w-4/5 h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                </div>
            </div>
          </motion.div>

          <div className="bg-gradient-to-br from-indigo-900/20 to-cyan-900/10 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">3D Risk Projection</h3>
                <p className="text-sm text-slate-400 mb-6">Real-time spatial mapping of global liquidity flows and systemic anomalies.</p>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/5 flex items-center justify-center gap-2">
                   Open Spatial Map <ChevronRight className="w-4 h-4" />
                </button>
             </div>
             <Activity className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-cyan-500/5 -rotate-12" />
          </div>
        </div>

        {/* Right Panel: Holographic Advisor Interface */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="flex-1 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 flex flex-col relative overflow-hidden min-h-[500px]">
              {/* Pseudo-3d Grid Background */}
              <div 
                className="absolute inset-0 opacity-10 -z-10"
                style={{
                   backgroundImage: `radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)`,
                   backgroundSize: '40px 40px',
                   transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
                   height: '200%'
                }}
              ></div>

              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border-2 border-white/20">
                       <Zap className="w-7 h-7 text-white fill-white/20" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black italic tracking-tighter">VOLUMETRIC AI STREAM</h2>
                       <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                          <Activity className="w-3 h-3 animate-pulse" /> SIMULATION ACTIVE
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button 
                       onClick={() => setActiveView('ADVISOR_STREAM')}
                       className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeView === 'ADVISOR_STREAM' ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-400'}`}
                    >
                       Telemetry
                    </button>
                    <button 
                       onClick={() => setActiveView('3D_MAP')}
                       className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeView === '3D_MAP' ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-400'}`}
                    >
                       Spatial View
                    </button>
                 </div>
              </div>

              <div className="flex-1 flex flex-col">
                 <AnimatePresence mode="wait">
                    {activeView === 'ADVISOR_STREAM' ? (
                       <motion.div 
                          key="telemetry"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="flex-1 flex flex-col items-center justify-center bg-black/40 rounded-3xl border border-white/5 p-8 relative"
                       >
                          <div className="w-full max-w-sm aspect-video mb-8 relative">
                             {/* Mock Volumetric Sprite */}
                             <motion.div 
                               animate={{ 
                                  y: [0, -10, 0],
                                  filter: ['hue-rotate(0deg)', 'hue-rotate(45deg)', 'hue-rotate(0deg)']
                               }}
                               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                               className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"
                             ></motion.div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Users className="w-32 h-32 text-cyan-400 opacity-50" />
                             </div>
                             {/* Data Rings */}
                             <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full"
                             ></motion.div>
                          </div>
                          
                          <div className="text-center">
                             <h3 className="text-lg font-bold text-cyan-400 mb-2 underline decoration-cyan-500/30 underline-offset-8">Insight Stream Matrix</h3>
                             <p className="text-slate-500 text-sm italic font-mono">"Structural liquidity in the Eurozone is showing 3D compression. Recommend orbital hedging."</p>
                          </div>
                       </motion.div>
                    ) : (
                       <motion.div 
                          key="map"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex-1 w-full bg-black/20 rounded-3xl"
                       >
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={[
                                { t: 0, v: 40, r: 10 },
                                { t: 1, v: 65, r: 15 },
                                { t: 2, v: 45, r: 8 },
                                { t: 3, v: 90, r: 25 },
                                { t: 4, v: 75, r: 20 },
                                { t: 5, v: 55, r: 12 },
                             ]}>
                                <defs>
                                  <linearGradient id="spatialGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis hide />
                                <YAxis hide />
                                <Tooltip 
                                   contentStyle={{ backgroundColor: '#083344', border: 'none', borderRadius: '16px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                                   itemStyle={{ color: '#22d3ee' }}
                                />
                                <Area type="monotone" dataKey="v" stroke="#06b6d4" strokeWidth={5} fillOpacity={1} fill="url(#spatialGrad)" />
                                <Area type="step" dataKey="r" stroke="#f43f5e" strokeWidth={2} fill="transparent" />
                             </AreaChart>
                          </ResponsiveContainer>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* Status Bar */}
              <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] border-t border-white/5 pt-6">
                 <div className="flex gap-6">
                    <span>Latency: 4ms</span>
                    <span>Buffer: 12GB/s</span>
                    <span>Nodes: 45 active</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div>
                    Sync Status: OPTIMAL
                 </div>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                 { label: 'Volumetric Depth', value: '45.2m', trend: '+2.1%', icon: Maximize2, color: 'text-indigo-400' },
                 { label: 'Spatial Coverage', value: '98.4%', trend: 'Steady', icon: Orbit, color: 'text-cyan-400' },
                 { label: 'AI Sync Index', value: '0.992', trend: '+0.005', icon: Zap, color: 'text-yellow-400' },
              ].map((m, i) => (
                 <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all">
                    <div>
                       <div className="text-xs text-slate-500 mb-1 font-bold">{m.label}</div>
                       <div className="text-2xl font-black">{m.value}</div>
                       <div className={`text-[10px] font-bold mt-1 ${m.trend.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'}`}>{m.trend}</div>
                    </div>
                    <m.icon className={`w-10 h-10 ${m.color} opacity-20 group-hover:opacity-100 transition-all duration-500`} />
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
