import React, { useState } from 'react';
import { 
  Box, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  Lock, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  Globe2, 
  Cpu, 
  Gamepad2, 
  Gem, 
  Link, 
  Maximize2,
  Scan,
  Compass,
  Layout,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface VirtualAsset {
  id: string;
  name: string;
  world: 'Decentraland' | 'The Sandbox' | 'Somnium Space' | 'Others';
  type: 'Land' | 'Wearable' | 'Estate';
  valuation: string;
  roi: string;
  status: 'Collateralized' | 'Staked' | 'Liquid';
  image: string;
}

export default function MetaverseBankingPage() {
  const [activeWorld, setActiveWorld] = useState('All');

  const assets: VirtualAsset[] = [
    { id: '1', name: 'Plaza Distrito #42', world: 'Decentraland', type: 'Land', valuation: '£12,400', roi: '+42%', status: 'Liquid', image: '🏙️' },
    { id: '2', name: 'Cyber Neon HQ', world: 'The Sandbox', type: 'Estate', valuation: '£45,800', roi: '+124%', status: 'Collateralized', image: '🏢' },
    { id: '3', name: 'Alpha Genesis Wearable', world: 'Others', type: 'Wearable', valuation: '£2,400', roi: '-12%', status: 'Staked', image: '👕' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Metaverse Banking</h1>
          <p className="text-slate-500 font-medium italic">Liquidity and capital management for the virtual frontier.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Purchase Virtual Land
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Scan className="w-4 h-4 mr-2" /> Asset Scanner
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Virtual Portfolio */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Globe2 className="w-6 h-6 text-purple-600" /> Cross-World Holdings
                 </h3>
                 <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full">
                    {['All', 'Decentraland', 'Sandbox', 'Somnium'].map((w) => (
                      <button 
                        key={w}
                        onClick={() => setActiveWorld(w)}
                        className={cn(
                          "px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all whitespace-nowrap",
                          activeWorld === w ? "bg-white shadow-md text-slate-900" : "text-slate-400 hover:text-slate-600"
                        )}
                      >
                        {w}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {assets.map((asset) => (
                   <div key={asset.id} className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm hover:border-purple-200 transition-all group overflow-hidden flex flex-col cursor-pointer">
                      <div className="h-48 bg-slate-950 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-40" />
                         <span className="relative z-10">{asset.image}</span>
                         <div className="absolute bottom-4 left-4 h-8 px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center text-[10px] font-black text-white uppercase tracking-widest leading-none">
                            {asset.world}
                         </div>
                      </div>
                      <div className="p-8 space-y-6">
                         <div className="flex justify-between items-start">
                            <div>
                               <h4 className="text-lg font-black text-slate-900">{asset.name}</h4>
                               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{asset.type}</p>
                            </div>
                            <span className={cn(
                              "text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest",
                              asset.roi.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            )}>{asset.roi} ROI</span>
                         </div>
                         <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Real Valuation</p>
                               <p className="text-xl font-black text-slate-900 mt-1 tracking-tight">{asset.valuation}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                               <p className="text-xs font-black text-purple-600 mt-1 uppercase tracking-tighter">{asset.status}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Meta-Commerce & Bridge Intelligence */}
           <div className="bg-slate-950 p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-2xl shadow-purple-900/40 border border-purple-500/20">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-purple-600/10 blur-[150px] -mr-64 -mt-64 animate-pulse" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-3xl font-black italic tracking-tighter">Interoperable Mesh</h3>
                       <p className="text-white/40 text-sm font-medium mt-1">Unified asset bridging and cross-world liquidity pools.</p>
                    </div>
                    <Cpu className="w-12 h-12 text-purple-400 animate-pulse" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                       {[
                         { label: 'Asset Liquidity', val: 92, color: 'bg-purple-500' },
                         { label: 'Bridge Stability', val: 98, color: 'bg-blue-500' },
                         { label: 'Virtual GDP Sync', val: 74, color: 'bg-emerald-500' },
                       ].map(track => (
                         <div key={track.label} className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                               <span>{track.label}</span>
                               <span>{track.val}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className={cn("h-full transition-all duration-1000", track.color)} style={{ width: `${track.val}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="bg-white/5 rounded-[3rem] p-8 border border-white/10 space-y-6">
                       <h4 className="text-sm font-black italic">Active Opportunity</h4>
                       <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs leading-relaxed text-purple-100/60 font-medium">
                          "Land prices in Otherdeed expanding 14% this week. Bridging your Sandbox liquid capital could yield £4.2k profit."
                       </div>
                       <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl py-6 uppercase text-xs tracking-widest transition-all shadow-xl shadow-purple-600/20">
                          Execute Meta-Bridge
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Column: Avatar & Specs */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Gem className="w-4 h-4 text-purple-600" /> Digital Twin Status
              </h4>
              <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100 relative group overflow-hidden">
                 <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center text-5xl mb-6 shadow-2xl relative z-10">
                    👨‍🚀
                 </div>
                 <h5 className="text-lg font-black text-slate-900 italic">User #0421-Alpha</h5>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cross-Metaverse Identity Verified</p>
                 <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="p-3 bg-white rounded-2xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase">Reputation</p>
                       <p className="text-sm font-black text-slate-900">4.9/5.0</p>
                    </div>
                    <div className="p-3 bg-white rounded-2xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase">Power Lvl</p>
                       <p className="text-sm font-black text-purple-600">84/100</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-10 rounded-[4rem] bg-gradient-to-br from-purple-800 to-slate-900 text-white relative overflow-hidden group shadow-2xl shadow-purple-900/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px]" />
              <div className="relative z-10 space-y-6">
                 <Link className="w-10 h-10 text-purple-300" />
                 <div>
                    <h4 className="text-xl font-black italic">Avatar Collateral</h4>
                    <p className="text-purple-100/60 text-xs font-semibold leading-relaxed mt-2 italic shadow-inner">
                       Unlock up to £150k in instant liquidity using your high-value avatar wearables as collateral.
                    </p>
                 </div>
                 <Button className="w-full bg-white text-slate-950 font-black rounded-2xl py-6 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors shadow-lg">
                    Check Borrowing Power
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-200 shadow-inner space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Layers className="w-4 h-4" /> Market Depth
              </h4>
              <div className="space-y-4">
                 {[
                   { event: 'Land Auction', world: 'Decentraland', time: 'Active' },
                   { event: 'Drop: CyberBot', world: 'Others', time: '2h ago' },
                 ].map((e) => (
                   <div key={e.event} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      <div className="flex-1 flex justify-between">
                         <span className="text-xs font-bold text-slate-600 border-b border-transparent hover:border-slate-300 transition-all cursor-pointer">{e.event} ({e.world})</span>
                         <span className="text-[9px] font-medium text-slate-400">{e.time}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-purple-600 font-bold uppercase text-[10px] tracking-widest group px-0">
                 Explore Secondary Markets <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
