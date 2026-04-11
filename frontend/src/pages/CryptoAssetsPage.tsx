import React, { useState } from 'react';
import { 
  Bitcoin, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Layers, 
  History, 
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  Lock,
  Eye,
  EyeOff
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
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const btcData = [
  { time: '00:00', price: 62000 },
  { time: '04:00', price: 63500 },
  { time: '08:00', price: 61000 },
  { time: '12:00', price: 65400 },
  { time: '16:00', price: 64200 },
  { time: '20:00', price: 67800 },
  { time: '23:59', price: 66500 },
];

export default function CryptoAssetsPage() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Crypto & Digital Assets</h1>
          <p className="text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-xl italic">Institutional-grade security for your digital portfolio.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs px-6 py-6 shadow-xl shadow-blue-600/20">
              <Plus className="w-4 h-4 mr-2" /> Buy Crypto
           </Button>
           <Button variant="outline" className="rounded-2xl border-slate-200 font-bold text-xs px-6 py-6">
              <ArrowUpRight className="w-4 h-4 mr-2" /> Swap
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart & Portfolio */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                 <div>
                    <div className="flex items-center gap-4 mb-1">
                       <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Valuation</h3>
                       <button onClick={() => setShowBalance(!showBalance)} className="text-slate-300 hover:text-blue-600 transition-colors">
                          {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                       </button>
                    </div>
                    <p className="text-4xl font-black text-slate-900">{showBalance ? '£142,504.22' : '••••••••'}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-emerald-500 font-black text-sm flex items-center justify-end gap-1">
                       <TrendingUp className="w-4 h-4" /> +14.2%
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">24h Change</p>
                 </div>
              </div>

              <div className="h-80 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={btcData}>
                     <defs>
                       <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                         <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                     <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 800 }}
                     />
                     <Area type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { label: 'Market Cap', val: '$2.4T' },
                   { label: 'Volume 24h', val: '$84B' },
                   { label: 'Dominance', val: '52.4%' },
                   { label: 'Fear/Greed', val: '72 (Greed)', color: 'text-emerald-500' },
                 ].map((metric) => (
                   <div key={metric.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{metric.label}</p>
                      <p className={cn("text-xs font-black mt-1", metric.color || 'text-slate-900')}>{metric.val}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Asset List */}
           <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">Your Assets</h3>
                 <Button variant="ghost" className="text-blue-600 font-black uppercase text-xs tracking-widest gap-2">
                    Advanced Filters <Search className="w-4 h-4" />
                 </Button>
              </div>
              <div className="divide-y divide-slate-50">
                 {[
                   { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: '1.424', val: '£92,450', change: '+4.2%' },
                   { id: '2', name: 'Ethereum', symbol: 'ETH', balance: '12.50', val: '£28,120', change: '-1.5%' },
                   { id: '3', name: 'Solana', symbol: 'SOL', balance: '145.2', val: '£15,400', change: '+12.4%' },
                   { id: '4', name: 'USDT', symbol: 'USDT', balance: '6,534', val: '£6,534', change: '0.0%' },
                 ].map((asset) => (
                   <div key={asset.id} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                         {asset.symbol[0]}
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-900">{asset.name}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{asset.symbol}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-black text-slate-900">{asset.balance} {asset.symbol}</p>
                         <p className="text-[10px] font-bold text-slate-400 mt-0.5">{asset.val}</p>
                      </div>
                      <div className={cn(
                        "text-right min-w-[60px] font-black text-[11px] px-2 py-1 rounded-lg",
                        asset.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : asset.change === '0.0%' ? "bg-slate-100 text-slate-400" : "bg-red-50 text-red-600"
                      )}>
                         {asset.change}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Intelligence Side Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px]" />
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <Zap className="w-8 h-8 text-blue-400" />
                    <span className="text-[8px] font-black bg-blue-600 px-2 py-1 rounded-lg uppercase tracking-widest">AI ALERT</span>
                 </div>
                 <div>
                    <h4 className="text-xl font-black mb-2">Alpha Signal: SOL</h4>
                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">Network activity on Solana increased by 42% in the last 4 hours. Market sentiment is trending bullish.</p>
                 </div>
                 <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-black rounded-2xl py-6 uppercase text-xs tracking-widest">
                    Trade Signal
                 </Button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> Web3 Security
              </h4>
              <div className="space-y-4">
                 {[
                   { label: 'Private Key Backup', status: 'Secure', color: 'text-emerald-500' },
                   { label: 'Wallet Whitelisting', status: 'Enabled', color: 'text-emerald-500' },
                   { label: 'Biometric Sign-off', status: 'Required', color: 'text-blue-500' },
                 ].map((s) => (
                   <div key={s.label} className="flex justify-between items-center py-1">
                      <span className="text-xs font-bold text-slate-600">{s.label}</span>
                      <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-50", s.color)}>{s.status}</span>
                   </div>
                 ))}
              </div>
              <div className="pt-4 border-t border-slate-50">
                 <Button variant="ghost" className="w-full text-blue-600 font-black uppercase text-[10px] tracking-widest group">
                    View Security Audit <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </Button>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">NFT Gallery</h4>
              <div className="grid grid-cols-2 gap-3">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="aspect-square bg-white rounded-2xl border border-slate-100 flex items-center justify-center group cursor-pointer hover:border-blue-200 transition-all overflow-hidden relative">
                      <Layers className="w-6 h-6 text-slate-200 group-hover:scale-125 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-slate-400 font-bold uppercase text-[9px] tracking-widest">Manage Collectibles</Button>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Eye, EyeOff } from 'lucide-react';
