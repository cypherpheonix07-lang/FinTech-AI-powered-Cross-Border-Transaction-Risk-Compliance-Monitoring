import React, { useState } from 'react';
import { 
  Diamond, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Lock, 
  PackageCheck,
  Globe2,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Coins,
  MapPin,
  Truck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const goldData = [
  { time: 'Mon', price: 2150 },
  { time: 'Tue', price: 2180 },
  { time: 'Wed', price: 2165 },
  { time: 'Thu', price: 2210 },
  { time: 'Fri', price: 2245 },
  { time: 'Sat', price: 2230 },
  { time: 'Sun', price: 2260 },
];

export default function PreciousMetalsPage() {
  const [activeMetal, setActiveMetal] = useState<'Gold' | 'Silver' | 'Platinum'>('Gold');

  const metals = [
    { name: 'Gold', symbol: 'AU', price: '£2,260.42', change: '+2.4%', color: 'from-amber-400 to-amber-600', text: 'text-amber-500' },
    { name: 'Silver', symbol: 'AG', price: '£24.50', change: '-0.8%', color: 'from-slate-300 to-slate-500', text: 'text-slate-400' },
    { name: 'Platinum', symbol: 'PT', price: '£942.10', change: '+1.2%', color: 'from-blue-200 to-blue-400', text: 'text-blue-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Precious Metals & Commodities</h1>
          <p className="text-slate-500 font-medium italic">Secure your wealth with physical-backed digital holdings.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-amber-500 hover:bg-amber-400 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-amber-500/20">
              <Coins className="w-4 h-4 mr-2" /> Buy Bullion
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6 group">
              <Truck className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" /> Request Delivery
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Metal Selector & Chart */}
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metals.map((metal) => (
                <button
                  key={metal.name}
                  onClick={() => setActiveMetal(metal.name as any)}
                  className={cn(
                    "p-6 rounded-[2.5rem] border-2 transition-all text-left relative overflow-hidden group",
                    activeMetal === metal.name ? "border-amber-500 bg-amber-50/10 shadow-lg" : "border-slate-50 bg-white hover:border-slate-200"
                  )}
                >
                   <div className={cn("absolute bottom-0 right-0 w-24 h-24 blur-3xl opacity-5 -mr-8 -mb-8 bg-gradient-to-br", metal.color)} />
                   <div className="flex justify-between items-start mb-4">
                      <div className={cn("text-xs font-black uppercase tracking-widest", metal.text)}>{metal.symbol}</div>
                      <div className={cn(
                        "text-[10px] font-black",
                        metal.change.startsWith('+') ? "text-emerald-500" : "text-red-400"
                      )}>{metal.change}</div>
                   </div>
                   <h3 className="text-xl font-black text-slate-900 leading-none">{metal.name}</h3>
                   <p className="text-sm font-bold text-slate-400 mt-1">{metal.price} / oz</p>
                </button>
              ))}
           </div>

           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-amber-500" /> Market Analytics: {activeMetal}
                 </h3>
                 <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button className="px-3 py-1.5 bg-white text-amber-600 text-[10px] font-black rounded-lg shadow-sm">Real-time</button>
                    <button className="px-3 py-1.5 text-slate-400 text-[10px] font-bold">Historical</button>
                 </div>
              </div>

              <div className="h-80 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={goldData}>
                     <defs>
                       <linearGradient id="colorMetal" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                         <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                     <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 800 }}
                     />
                     <Area type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={4} fillOpacity={1} fill="url(#colorMetal)" />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="p-6 rounded-[2rem] bg-amber-50 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-500">
                       <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none">Vault Status</p>
                       <p className="text-sm font-black text-slate-900 mt-1">100% Insured & Audited (London Bullion)</p>
                    </div>
                 </div>
                 <Button variant="ghost" className="text-amber-600 font-bold text-xs gap-2">
                    View Audit Log <History className="w-4 h-4" />
                 </Button>
              </div>
           </div>
        </div>

        {/* Side Controls */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-950 p-8 rounded-[3rem] text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px]" />
              <div className="relative z-10 space-y-6">
                 <div className="flex bg-white/5 border border-white/10 p-4 rounded-2.5xl items-center gap-4">
                    <PackageCheck className="w-8 h-8 text-amber-400 shrink-0" />
                    <div>
                       <h4 className="text-sm font-black italic">Physical Allocation</h4>
                       <p className="text-[10px] text-white/40 font-medium">Your assets are stored at Brinks London Vault #42.</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Ownership Ratio</span>
                       <span className="text-sm font-black text-white">Full Possession</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-full" />
                    </div>
                 </div>
                 <Button className="w-full bg-white text-slate-950 hover:bg-slate-100 font-black rounded-2xl py-6 uppercase text-xs tracking-widest active:scale-95 transition-all">
                    Sell to Market
                 </Button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Globe2 className="w-4 h-4 text-blue-600" /> Vault Locations
              </h4>
              <div className="space-y-4">
                 {[
                   { city: 'London (Primary)', code: 'BRINKS-LDN', latency: 'Direct', status: 'Online' },
                   { city: 'Zurich', code: 'PRO-SE-ZRH', latency: '40ms', status: 'Online' },
                   { city: 'Singapore', code: 'MTC-SG-VLT', latency: '350ms', status: 'In Sync' },
                 ].map((v) => (
                   <div key={v.city} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-amber-200 transition-all cursor-pointer">
                      <div>
                         <p className="text-xs font-black text-slate-900 break-words">{v.city}</p>
                         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{v.code}</p>
                      </div>
                      <div className="text-right">
                         <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white text-emerald-500 border border-slate-100">{v.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-950 text-white relative overflow-hidden text-center space-y-6">
              <Diamond className="w-12 h-12 text-blue-300 mx-auto opacity-40" />
              <div>
                 <h4 className="text-lg font-black">Elite Custody</h4>
                 <p className="text-sm font-medium text-slate-400 mt-2">Zero-knowledge proof ownership and biometric withdrawal guard.</p>
              </div>
              <Button variant="ghost" className="text-white font-black text-xs uppercase tracking-widest hover:text-amber-400 transition-colors">
                 Upgrade Security <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
