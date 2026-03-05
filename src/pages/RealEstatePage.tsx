import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  ShieldCheck, 
  Plus, 
  ChevronRight, 
  Globe2, 
  Search, 
  Home, 
  Layout, 
  Percent,
  Compass,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Property {
  id: string;
  name: string;
  location: string;
  roi: string;
  valuation: string;
  shareOwned: number;
  image: string;
  color: string;
}

export default function RealEstatePage() {
  const properties: Property[] = [
    { id: '1', name: 'Skyline Terrace', location: 'Dubai, UAE', roi: '8.4%', valuation: '£1.2M', shareOwned: 2.5, image: '🏙️', color: 'bg-indigo-600' },
    { id: '2', name: 'Azure Waterfront', location: 'Nice, France', roi: '6.2%', valuation: '£4.5M', shareOwned: 0.8, image: '🌊', color: 'bg-blue-500' },
    { id: '3', name: 'Silicon Hub Apts', location: 'Austin, TX', roi: '12.4%', valuation: '£850k', shareOwned: 15, image: '🏢', color: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Real Estate Portal</h1>
          <p className="text-slate-500 font-medium italic">Fractional ownership in high-yield properties worldwide.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-slate-900/10">
              <Plus className="w-4 h-4 mr-2" /> Explore Properties
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <Compass className="w-4 h-4 mr-2" /> Virtual Tours
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Portfolio Stats */}
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl -mr-8 -mt-8" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Portfolio Value</p>
                 <h3 className="text-3xl font-black text-slate-900">£142,500</h3>
                 <div className="flex items-center gap-2 mt-4 text-emerald-500 text-[10px] font-black">
                    <TrendingUp className="w-3.5 h-3.5" /> +8.2% (YTD)
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 blur-3xl -mr-8 -mt-8" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Rental</p>
                 <h3 className="text-3xl font-black text-slate-900">£1,240</h3>
                 <div className="flex items-center gap-2 mt-4 text-blue-600 text-[10px] font-black">
                    <Percent className="w-3.5 h-3.5" /> 6.4% Net Yield
                 </div>
              </div>
              <div className="bg-slate-950 p-8 rounded-[3rem] text-white shadow-xl shadow-slate-900/40 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-blue-600/10 blur-[60px]" />
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Diversification</p>
                 <h3 className="text-3xl font-black italic">High</h3>
                 <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-1 flex-1 bg-blue-500 rounded-full" />)}
                 </div>
              </div>
           </div>

           {/* Property Listing */}
           <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                 <Building className="w-6 h-6 text-blue-600" /> Your Holdings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {properties.map((prop) => (
                   <div key={prop.id} className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group overflow-hidden flex flex-col cursor-pointer">
                      <div className={cn("h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-700", prop.color)}>
                         {prop.image}
                      </div>
                      <div className="p-8 space-y-4">
                         <div className="flex justify-between items-start">
                            <div>
                               <h4 className="text-lg font-black text-slate-900">{prop.name}</h4>
                               <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mt-1">
                                  <MapPin className="w-3.5 h-3.5" /> {prop.location}
                               </div>
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{prop.roi} ROI</span>
                         </div>
                         <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Stake</p>
                               <p className="text-sm font-black text-slate-900 mt-1">{prop.shareOwned}%</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 px-0 font-black uppercase text-[10px] tracking-widest">
                               Dashboard <ArrowUpRight className="ml-2 w-3.5 h-3.5" />
                            </Button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Intelligence & Global Markets */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-10 rounded-[4rem] bg-indigo-950 text-white relative overflow-hidden group shadow-2xl shadow-indigo-900/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10">
                    <Globe2 className="w-8 h-8 text-indigo-300" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black">Global Hotspots</h3>
                    <p className="text-indigo-200/60 text-sm font-medium mt-2">AI-identified regions with highest predicted capital appreciation for 2026.</p>
                 </div>
                 <div className="space-y-4">
                    {[
                      { city: 'Lisbon, PT', trend: '+12.4%', color: 'text-emerald-400' },
                      { city: 'Tokyo, JP', trend: '+9.2%', color: 'text-emerald-400' },
                      { city: 'Berlin, DE', trend: '+7.8%', color: 'text-emerald-400' },
                    ].map((hot) => (
                      <div key={hot.city} className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                         <span className="text-xs font-black">{hot.city}</span>
                         <span className={cn("text-xs font-black", hot.color)}>{hot.trend}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-blue-600" /> Compliance & Legal
              </h4>
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">KYC/AML Status</span>
                    <span className="text-[10px] font-black text-emerald-500 px-2.5 py-1 rounded-lg bg-emerald-50">Verified</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">
                    All global real estate transactions follow the PathGuard "Quantum-Safe" smart contract protocol for instant title transfer.
                 </p>
                 <Button variant="outline" className="w-full rounded-2xl py-6 font-black uppercase text-xs tracking-widest border-slate-200 group">
                    Shared Equity Deed <History className="ml-2 w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                 </Button>
              </div>
           </div>

           <div className="p-8 rounded-[3rem] bg-slate-900 text-white flex flex-col items-center text-center space-y-4 border-4 border-slate-800">
              <Layout className="w-12 h-12 text-blue-400 opacity-40 mb-2" />
              <h4 className="text-lg font-black leading-tight">Secondary Market <br /> Liquidity</h4>
              <p className="text-xs text-slate-400 font-medium">Instantly sell your fractional shares to other PathGuard users.</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-6 font-black uppercase text-xs tracking-widest mt-2 active:scale-95 transition-all">
                 List for Sale
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
