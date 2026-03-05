import React, { useState } from 'react';
import { 
  Fingerprint, 
  Scan, 
  ShieldCheck, 
  Eye, 
  Activity, 
  History, 
  Lock, 
  Smartphone, 
  ChevronRight, 
  Zap, 
  AlertCircle,
  CheckCircle2,
  Settings2,
  ArrowRight,
  Shield,
  MousePointer2,
  Keyboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function BiometricSecurityPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Biometric Security</h1>
          <p className="text-slate-500 font-medium italic">Advanced identity verification beyond passwords.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Zap className="w-4 h-4 mr-2" /> One-Touch Auth
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Biometrics */}
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl -mr-8 -mt-8" />
                 <div className="flex justify-between items-start">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl group-hover:scale-110 transition-transform">
                       <Scan className="w-8 h-8" />
                    </div>
                    <Switch checked={true} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900">Face ID & Liveness</h3>
                    <p className="text-sm font-medium text-slate-400 mt-2">Active depth-sensing facial recognition for logins and high-value transfers.</p>
                 </div>
                 <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1.5">
                       <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence
                    </span>
                    <Button variant="ghost" className="text-blue-600 font-black uppercase text-[10px] tracking-widest px-0">Recalibrate</Button>
                 </div>
              </div>

              <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl -mr-8 -mt-8" />
                 <div className="flex justify-between items-start">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl group-hover:scale-110 transition-transform">
                       <Fingerprint className="w-8 h-8" />
                    </div>
                    <Switch checked={true} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900">Fingerprint Sync</h3>
                    <p className="text-sm font-medium text-slate-400 mt-2">Hardware-backed biometric vault sync across all trusted devices.</p>
                 </div>
                 <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-500 uppercase flex items-center gap-1.5">
                       <Smartphone className="w-3.5 h-3.5" /> 3 Devices Active
                    </span>
                    <Button variant="ghost" className="text-blue-600 font-black uppercase text-[10px] tracking-widest px-0">Manage Devices</Button>
                 </div>
              </div>
           </div>

           {/* Behavioral Biometrics */}
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Behavioral Identity Shield</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Continuous verification based on how you interact with PathGuard.</p>
                    </div>
                    <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                       <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: MousePointer2, label: 'Mouse Flow', score: '98%', desc: 'Movement patterns' },
                      { icon: Keyboard, label: 'Keystroke', score: '94%', desc: 'Typing rhythm' },
                      { icon: Smartphone, label: 'Gait / Tilt', score: '99%', desc: 'Gyro analytics' },
                    ].map((m) => (
                      <div key={m.label} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-3">
                         <m.icon className="w-6 h-6 text-blue-400" />
                         <div>
                            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">{m.label}</p>
                            <p className="text-lg font-black">{m.score}</p>
                         </div>
                         <p className="text-[10px] text-white/20 font-bold">{m.desc}</p>
                      </div>
                    ))}
                 </div>
                 
                 <div className="p-6 rounded-[2rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <AlertCircle className="w-6 h-6 text-blue-400" />
                       <p className="text-xs font-medium text-blue-100">Zero-trust active. Any anomaly will trigger 2FA.</p>
                    </div>
                    <Button variant="ghost" className="text-white font-black uppercase text-[10px] tracking-widest px-0">Configure Thresholds</Button>
                 </div>
              </div>
           </div>
        </div>

        {/* Security Summary Side */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <div className="text-center space-y-4">
                 <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                    <ShieldCheck className="w-12 h-12 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 leading-tight">Identity Multi-Factor</h4>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-1">Excellent Strength</p>
                 </div>
              </div>

              <div className="space-y-4">
                 {[
                   { label: 'Face ID', status: 'Active', color: 'text-emerald-500' },
                   { label: 'Behaviors', status: 'Learning', color: 'text-blue-500' },
                   { label: 'Legacy Pass', status: 'Disabled', color: 'text-slate-300' },
                 ].map((s) => (
                   <div key={s.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-xs font-bold text-slate-600">{s.label}</span>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", s.color)}>{s.status}</span>
                   </div>
                 ))}
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20">
                 Complete Identity Audit
              </Button>
           </div>

           <div className="p-8 rounded-[3.5rem] bg-gradient-to-br from-slate-800 to-slate-950 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Lock className="w-8 h-8 text-indigo-400" />
                 <div>
                    <h4 className="text-lg font-black">Encrypted Seed Storage</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">Your biometric data is never stored on our servers. It is strictly localized to your device's Secure Enclave.</p>
                 </div>
                 <Button variant="ghost" className="text-white hover:text-indigo-400 font-black uppercase text-[10px] tracking-widest px-0 flex items-center gap-2 group">
                    Privacy Manifesto <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <Shield className="w-6 h-6 text-slate-300" />
                 <span className="text-xs font-black text-slate-600">Privacy Mode</span>
              </div>
              <Switch />
           </div>
        </div>
      </div>
    </div>
  );
}
