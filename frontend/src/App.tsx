import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, Activity, ArrowRight, Search, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Login from './components/Login';
import Visualizer from './pages/Visualizer';
import DashboardLayout from './components/layout/DashboardLayout';
import { AppRoutes } from './AppRoutes';
import { Toaster } from './components/ui/toaster';

export default function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <Login 
            onLoginSuccess={() => navigate('/dashboard')} 
            onCancel={() => navigate('/')} 
          />
        } />
        
        {/* Default Landing Page */}
        <Route path="/" element={
          <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-hidden relative">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            
            <nav className="relative z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  TransactTrace-Nexus
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <a href="#" className="hover:text-white transition-colors">Protocol</a>
                  <a href="#" className="hover:text-white transition-colors">Nodes</a>
                  <a href="#" className="hover:text-white transition-colors">Security</a>
                </div>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/10"
                >
                  Enter Nexus
                </button>
              </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Activity className="w-3 h-3" />
                    v4.0 Omega Protocol Active
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                    Absolute <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                      Transparency.
                    </span>
                  </h1>
                  
                  <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                    Replace systemic opacity with cryptographic certainty. Monitor global liquidity flows with the world's most advanced AI-powered transaction tracking nexus.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const input = form.elements.namedItem('trackingId') as HTMLInputElement;
                      const val = input.value;
                      if (val) navigate(`/visualizer/${val}`);
                    }} className="flex-1 group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
                      <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-white/20 transition-all">
                        <Search className="ml-4 w-5 h-5 text-slate-500" />
                        <input
                          name="trackingId"
                          type="text"
                          placeholder="Trace Transaction ID..."
                          className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-bold text-white px-4 placeholder:text-slate-600"
                        />
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                        >
                          Trace
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="flex items-center gap-8 pt-8">
                    {[
                      { val: '24ms', label: 'Latency' },
                      { val: '99.9%', label: 'Uptime' },
                      { val: 'ZKP', label: 'Security' },
                    ].map(stat => (
                      <div key={stat.label}>
                         <p className="text-xl font-black text-white">{stat.val}</p>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative hidden lg:block">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-[4rem] blur-3xl" />
                   <div className="relative bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-2xl shadow-2xl">
                      <div className="flex items-center justify-between mb-10">
                         <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live Global Flow</span>
                         </div>
                         <div className="text-[10px] font-mono text-slate-500">REF: NODE_772_HK</div>
                      </div>
                      
                      <div className="space-y-6">
                         {[
                           { from: 'London, UK', to: 'Singapore', amt: '$1.2M', status: 'Verifying' },
                           { from: 'New York, US', to: 'Frankfurt', amt: '$840k', status: 'Completed' },
                           { from: 'Dubai, UAE', to: 'Tokyo', amt: '$2.5M', status: 'Verifying' },
                         ].map((item, i) => (
                           <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-colors group cursor-default">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-blue-400 border border-white/10">
                                    <Activity className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-black text-white">{item.from} → {item.to}</p>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">{item.amt}</p>
                                 </div>
                              </div>
                              <div className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                item.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                              )}>
                                 {item.status}
                              </div>
                           </div>
                         ))}
                      </div>

                      <div className="mt-10 p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                            <ShieldCheck className="w-24 h-24" />
                         </div>
                         <h4 className="text-sm font-black mb-1">Quantum-Safe Guard</h4>
                         <p className="text-[10px] font-medium text-white/60 leading-relaxed">Multi-layer encryption secured by PQC algorithms.</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                {[
                  { title: 'Verified Paths', desc: 'Every hop is cryptographically verified before it reaches your screen.', icon: CheckCircle, color: 'text-emerald-400' },
                  { title: 'Bank-Grade Privacy', desc: 'Your personal data is never exposed. We only track the funds, not the people.', icon: Lock, color: 'text-blue-400' },
                  { title: 'Global Coverage', desc: 'Seamlessly monitor cross-border flow across multi-currency jurisdictions.', icon: ShieldCheck, color: 'text-indigo-400' },
                ].map((feature, i) => (
                  <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/[0.08] transition-all group hover:-translate-y-1">
                    <div className={cn("w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-xl group-hover:scale-110 transition-transform", feature.color)}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 italic">{feature.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </main>

            <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-xl py-12">
               <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="w-5 h-5 text-blue-500" />
                     <span className="text-sm font-black uppercase tracking-tighter text-slate-500">TransactTrace-Nexus</span>
                  </div>
                  <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-600">
                     <a href="#" className="hover:text-white transition-colors">Privacy</a>
                     <a href="#" className="hover:text-white transition-colors">Terms</a>
                     <a href="#" className="hover:text-white transition-colors">API Documentation</a>
                  </div>
                  <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">© 2026 OMEGA PROTOCOL INC.</p>
               </div>
            </footer>
          </div>
        } />

        {/* Dashboard & App System (Absolute Path Handling) */}
        <Route path="/*" element={<DashboardLayout />}>
           <Route path="*" element={<AppRoutes onTrackTransaction={(id) => navigate(`/visualizer/${id}`)} />} />
        </Route>

        <Route path="/visualizer/:code" element={<Visualizer />} />
        <Route path="/visualizer" element={<Visualizer />} />
      </Routes>
      <Toaster />
    </>
  );
}
