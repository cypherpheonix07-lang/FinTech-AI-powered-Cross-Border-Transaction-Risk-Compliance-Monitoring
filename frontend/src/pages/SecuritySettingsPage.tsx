import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Monitor, 
  LogOut, 
  KeyRound, 
  History, 
  Fingerprint,
  ChevronRight,
  ShieldAlert,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function SecuritySettingsPage() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Settings</h1>
        <p className="text-slate-500 mt-1 font-medium">Protect your account with modern cryptographic standards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Security Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Authentication Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Authentication</h3>
            </div>

            <div className="space-y-4">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 font-medium">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative flex items-center",
                    mfaEnabled ? "bg-emerald-500" : "bg-slate-300"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all",
                    mfaEnabled ? "left-7" : "left-1"
                  )} />
                </button>
              </div>

              {/* Biometrics Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Biometric Login</p>
                    <p className="text-xs text-slate-500 font-medium">Use Face ID or Touch ID for faster access.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative flex items-center",
                    biometricsEnabled ? "bg-emerald-500" : "bg-slate-300"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all",
                    biometricsEnabled ? "left-7" : "left-1"
                  )} />
                </button>
              </div>

              <div className="h-px bg-slate-100 mx-2" />

              <button className="w-full p-4 flex items-center justify-between group transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none">Change Password</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Last updated 3 months ago</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Active Sessions</h3>
              </div>
              <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">Log out all devices</button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 border border-blue-200 shadow-sm">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <p className="text-sm font-bold text-slate-900">Desktop Browser</p>
                       <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">Current</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">London, UK • Chrome on Windows</p>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">iPhone 15 Pro</p>
                    <p className="text-xs text-slate-500 font-medium">New York, USA • Safari on iOS</p>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Security Overview */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
            
            <div className="relative space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                 <ShieldAlert className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-black tracking-tight mb-2">Security Score</h4>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-blue-400">92%</p>
                  <p className="text-xs text-blue-200/50 font-bold uppercase tracking-widest">High Reliability</p>
                </div>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-blue-200/70">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">2FA Enabled</span>
                 </div>
                 <div className="flex items-center gap-2 text-blue-200/70">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Strong Password</span>
                 </div>
                 <div className="flex items-center gap-2 text-blue-200/30">
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Biometrics Pending</span>
                 </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-2xl text-xs gap-2 shadow-lg shadow-blue-600/20">
                Run Advanced Audit
              </Button>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 space-y-4">
             <div className="flex items-center gap-2 mb-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                <h4 className="text-xs font-black text-red-900 uppercase tracking-tight">Danger Zone</h4>
             </div>
             <p className="text-[10px] text-red-600/70 font-medium leading-relaxed">Closing your account will immediately freeze all active funds and delete your cryptographic history.</p>
             <button className="text-[10px] font-bold text-red-600 underline hover:no-underline uppercase tracking-widest">Delete Account Forever</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
