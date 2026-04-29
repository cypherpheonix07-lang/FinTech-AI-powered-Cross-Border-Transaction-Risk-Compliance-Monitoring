import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Monitor, Layers, Cpu, Activity, 
  Zap, Globe, Search, RefreshCcw, Command,
  Maximize, Box, Compass, Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

const HoloNode = ({ label, value, status }: any) => (
  <div className="p-6 glass-omega rounded-3xl border border-white/10 group hover:border-blue-500/30 transition-all">
    <div className="flex items-center justify-between mb-4">
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       <div className={cn("w-1.5 h-1.5 rounded-full", status === 'Active' ? 'bg-blue-500' : 'bg-slate-700')} />
    </div>
    <div className="text-2xl font-black text-white tracking-tighter mb-1">{value}</div>
    <div className="text-[8px] font-bold text-blue-400 uppercase tracking-[0.2em]">{status}</div>
  </div>
);

const VisualizationPage = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Immersive <span className="text-blue-400">Experiences</span>
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             Holographic Financial Visualization & Immersive Reality v2.0
          </p>
        </div>
        <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-3">
           <Maximize className="w-5 h-5 text-blue-400" />
           <span className="text-[10px] font-black uppercase tracking-widest text-white">4K Holographic Stream: ACTIVE</span>
        </div>
      </header>

      {/* Hero: Immersive Grid Visualization */}
      <div className="relative h-[32rem] glass-omega rounded-[2.5rem] border border-white/10 overflow-hidden group">
         <div className="absolute inset-0 bg-slate-950" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
               {/* 3D Box Simulation */}
               <motion.div 
                 animate={{ rotateX: 45, rotateY: 45, rotateZ: [0, 360] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-48 h-48 border-2 border-blue-500/30 rounded-2xl relative preserve-3d"
               >
                  <div className="absolute inset-0 border border-blue-500/20 rounded-xl transform translate-z-24" />
                  <div className="absolute inset-0 border border-blue-500/20 rounded-xl transform -translate-z-24" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
                  </div>
               </motion.div>
            </div>
         </div>

         <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between">
            <div className="flex gap-8">
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Perspective</p>
                  <p className="text-xl font-black text-white italic tracking-tighter">Planetary_View_01</p>
               </div>
               <div className="w-px h-10 bg-white/10" />
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Render Engine</p>
                  <p className="text-xl font-black text-white italic tracking-tighter">Quantum_Raytrace</p>
               </div>
            </div>
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                  Switch View
               </button>
               <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                  Enter VR
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <HoloNode label="Hologram Resolution" value="8K Meta" status="Active" />
         <HoloNode label="Frame Latency" value="0.2ms" status="Active" />
         <HoloNode label="Spatial Audio" value="360°" status="Active" />
         <HoloNode label="Haptic Feedback" value="High" status="Standby" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Layers className="w-6 h-6 text-blue-500" />
               Visualization Layers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { title: 'Liquidity Heatmap', desc: 'Real-time thermal visualization of global flows.', active: true },
                 { title: 'Neural Path Tracing', desc: 'Visualize brainwave signatures in 3D space.', active: true },
                 { title: 'Quantum Entropy Lattice', desc: 'Immersive view of sub-atomic cryptographic states.', active: false },
                 { title: 'Interstellar Relay Map', desc: 'Dynamic orbital visualization of transaction nodes.', active: true }
               ].map((layer, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                       <h3 className="text-xs font-black text-white uppercase tracking-widest">{layer.title}</h3>
                       <div className={cn("w-2 h-2 rounded-full", layer.active ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-700')} />
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{layer.desc}</p>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-omega p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3 tracking-tighter">
               <Compass className="w-6 h-6 text-indigo-400" />
               Spatial Controls
            </h2>
            <div className="space-y-6">
               <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 text-center">Zoom Level</p>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black text-white">0x</span>
                     <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '64%' }}
                          className="h-full bg-blue-500"
                        />
                     </div>
                     <span className="text-[10px] font-black text-white">100x</span>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <button className="py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">Orbit</button>
                  <button className="py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">Pan</button>
                  <button className="py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">Tilt</button>
                  <button className="py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">Reset</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default VisualizationPage;
