import React, { useState } from 'react';
import { 
  Key, 
  Usb, 
  Smartphone, 
  ShieldCheck, 
  Activity, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  Zap, 
  AlertCircle,
  Bluetooth,
  Link,
  Cpu,
  Fingerprint,
  RefreshCw,
  HardDrive,
  ExternalLink,
  Shield,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Device {
  id: string;
  name: string;
  type: 'YubiKey' | 'Ledger' | 'Titan' | 'Mobile';
  status: 'Active' | 'Locked' | 'Standby';
  lastSeen: string;
  secureEnclave: boolean;
}

export default function HardwareSecurityPage() {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'YubiKey 5C NFC', type: 'YubiKey', status: 'Active', lastSeen: '2 mins ago', secureEnclave: true },
    { id: '2', name: 'Ledger Nano X', type: 'Ledger', status: 'Standby', lastSeen: 'Yesterday', secureEnclave: true },
    { id: '3', name: 'iPhone 15 Pro (Enclave)', type: 'Mobile', status: 'Active', lastSeen: 'Now', secureEnclave: true },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hardware Security Manager</h1>
          <p className="text-slate-500 font-medium italic">Physical keys and hardware-backed identity for ultimate protection.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Pair New Key
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Bluetooth className="w-4 h-4 mr-2" /> Scan NFC
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Devices List */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">Registered Hardware</h3>
                 <Button variant="ghost" className="text-blue-600 font-black uppercase text-xs tracking-widest gap-2">
                    Global Deactivate <Lock className="w-4 h-4" />
                 </Button>
              </div>
              <div className="divide-y divide-slate-50">
                 {devices.map((device) => (
                   <div key={device.id} className="p-8 flex items-center gap-8 hover:bg-slate-50 transition-colors group">
                      <div className={cn(
                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-2 transition-all group-hover:scale-110",
                        device.status === 'Active' ? "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-emerald-500/10" : "bg-slate-50 border-slate-100 text-slate-400 shadow-none"
                      )}>
                         {device.type === 'YubiKey' ? <Usb className="w-8 h-8" /> : device.type === 'Ledger' ? <HardDrive className="w-8 h-8" /> : <Smartphone className="w-8 h-8" />}
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900 text-lg flex items-center gap-2">
                            {device.name}
                            {device.secureEnclave && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                         </h4>
                         <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none outline-none">{device.type} • Seen {device.lastSeen}</p>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <span className={cn(
                              "text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest",
                              device.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                            )}>
                               {device.status}
                            </span>
                         </div>
                         <Button variant="ghost" className="p-2 h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                            <RefreshCw className="w-5 h-5" />
                         </Button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Hardware Policy Engine */}
           <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px]" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-2xl font-black italic">Hardware Policy Engine</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Determine which transactions require physical confirmation.</p>
                    </div>
                    <Cpu className="w-10 h-10 text-indigo-400" />
                 </div>

                 <div className="space-y-4">
                    {[
                      { label: 'Outbound Transfers > £5k', desc: 'Require physical hardware touch/PIN.' },
                      { label: 'Login from New Node', desc: 'NFC tap or Hardware key required.' },
                      { label: 'PII Access Requests', desc: 'Secure Enclave Biometric required.' },
                    ].map((policy) => (
                      <div key={policy.label} className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                         <div className="flex items-center gap-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <div>
                               <h5 className="text-sm font-black">{policy.label}</h5>
                               <p className="text-[10px] text-white/40 font-bold mt-1 uppercase tracking-tighter">{policy.desc}</p>
                            </div>
                         </div>
                         <Switch checked={true} />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Device Intelligence Side */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <div className="text-center p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                 <Lock className="w-12 h-12 text-slate-900 mx-auto mb-4" />
                 <h4 className="text-xl font-black italic">Hardware-Only Mode</h4>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Maximum Air-Gap Protocol</p>
                 <div className="mt-6">
                    <Switch />
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Device Health</h4>
                 {[
                   { label: 'NFC Signal', status: 'Stable', color: 'text-emerald-500' },
                   { label: 'Battery (NFC)', status: '84%', color: 'text-blue-500' },
                   { label: 'Firmware', status: 'v2.4.1 (Latest)', color: 'text-slate-400' },
                 ].map((h) => (
                   <div key={h.label} className="flex justify-between items-center py-2 px-2">
                      <span className="text-xs font-bold text-slate-600">{h.label}</span>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", h.color)}>{h.status}</span>
                   </div>
                 ))}
              </div>

              <Button variant="outline" className="w-full rounded-2xl py-6 border-slate-200 font-black text-xs uppercase tracking-widest">
                 Run Diagnostics
              </Button>
           </div>

           <div className="p-10 rounded-[4rem] bg-indigo-600 text-white relative overflow-hidden shadow-xl shadow-indigo-600/20 group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Fingerprint className="w-10 h-10 text-white" />
                 <div>
                    <h4 className="text-xl font-black">PathGuard Sentinel</h4>
                    <p className="text-indigo-100/60 text-xs font-semibold leading-relaxed mt-2 italic">A dedicated hardware module for enterprise users. Zero-latency cryptographic signing for high-frequency trades.</p>
                 </div>
                 <Button className="w-full bg-white text-indigo-600 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
                    Order Module
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Lockouts</h4>
                 <span className="bg-red-50 text-red-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">0 ACTIVE</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">If all hardware is lost, the emergency recovery protocol requires a 48h cooldown and biometric affidavit.</p>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 font-black text-[10px] tracking-widest uppercase group px-0">
                 Recovery Settings <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
