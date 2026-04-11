import React, { useState } from 'react';
import { 
  Palette, 
  Layout, 
  Moon, 
  Sun, 
  Monitor, 
  Grid3X3, 
  Columns, 
  Square,
  Check,
  Zap,
  Sparkles,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Eye,
  Settings2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Widget {
  id: string;
  name: string;
  category: string;
  description: string;
  isInstalled: boolean;
  size: 'sm' | 'md' | 'lg';
}

export default function PersonalizationHubPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [layout, setLayout] = useState<'comprehensive' | 'focused' | 'minimal'>('comprehensive');
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: '1', name: 'AI Forecast', category: 'Intelligence', description: 'Real-time cash flow prediction graph.', isInstalled: true, size: 'lg' },
    { id: '2', name: 'Quick Actions', category: 'General', description: 'One-tap access to transfers and requests.', isInstalled: true, size: 'md' },
    { id: '3', name: 'Currency Watcher', category: 'Markets', description: 'Live rates for your favorite pairs.', isInstalled: false, size: 'sm' },
    { id: '4', name: 'Risk Scanner', category: 'Security', description: 'Instant fraud risk score for every txn.', isInstalled: true, size: 'sm' },
    { id: '5', name: 'Split Tracker', category: 'Social', description: 'Pending social debts and IOUs.', isInstalled: false, size: 'md' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personalization Hub</h1>
        <p className="text-slate-500 font-medium">Tailor your PathGuard Experience to your workflow.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appearance & Layout */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
              <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Palette className="w-5 h-5 text-blue-600" /> Mastery Theme
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'light', name: 'Frost White', icon: Sun, color: 'bg-white border-slate-100' },
                      { id: 'dark', name: 'Deep Space', icon: Moon, color: 'bg-slate-950 border-slate-900' },
                      { id: 'system', name: 'Dynamic OS', icon: Monitor, color: 'bg-gradient-to-br from-white to-slate-950 border-slate-200' },
                    ].map((t) => (
                      <button 
                        key={t.id}
                        onClick={() => setTheme(t.id as any)}
                        className={cn(
                          "relative p-6 rounded-[2rem] border-2 transition-all group overflow-hidden",
                          theme === t.id ? "border-blue-600 bg-blue-50/30" : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                        )}
                      >
                         <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", t.color)}>
                            <t.icon className={cn("w-5 h-5", theme === t.id ? "text-blue-600" : "text-slate-400")} />
                         </div>
                         <p className="text-sm font-black text-slate-900">{t.name}</p>
                         {theme === t.id && (
                           <div className="absolute top-4 right-4 text-blue-600 animate-in zoom-in duration-300">
                             <Check className="w-5 h-5" />
                           </div>
                         )}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-50">
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Layout className="w-5 h-5 text-blue-600" /> Presets
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'comprehensive', name: 'Visionary', icon: Grid3X3, desc: 'Every metric visible.' },
                      { id: 'focused', name: 'Commander', icon: Columns, desc: 'Critical actions first.' },
                      { id: 'minimal', name: 'Zen', icon: Square, desc: 'Pure flow, no clutter.' },
                    ].map((l) => (
                      <button 
                        key={l.id}
                        onClick={() => setLayout(l.id as any)}
                        className={cn(
                          "p-6 rounded-[2rem] border-2 transition-all text-left",
                          layout === l.id ? "border-emerald-500 bg-emerald-50/30" : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                        )}
                      >
                         <l.icon className={cn("w-6 h-6 mb-4", layout === l.id ? "text-emerald-600" : "text-slate-400")} />
                         <p className="text-sm font-black text-slate-900">{l.name}</p>
                         <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{l.desc}</p>
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Widget Marketplace */}
           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600" /> Widget Marketplace
                 </h3>
                 <div className="relative w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Find widgets..." 
                      className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-[10px] font-bold outline-none focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 {widgets.map((w) => (
                   <div key={w.id} className="p-4 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                         <Settings2 className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900">{w.name}</h4>
                            <span className="text-[8px] font-black text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full uppercase tracking-widest">{w.category}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase">{w.size}</span>
                         </div>
                         <p className="text-[11px] text-slate-500 font-medium">{w.description}</p>
                      </div>
                      <Button 
                        onClick={() => setWidgets(widgets.map(item => item.id === w.id ? { ...item, isInstalled: !item.isInstalled } : item))}
                        variant={w.isInstalled ? "secondary" : "default"}
                        className={cn(
                          "rounded-xl px-4 py-5 font-black text-[10px] uppercase tracking-widest",
                          w.isInstalled ? "bg-slate-200 text-slate-600" : "bg-blue-600 hover:bg-blue-500 text-white"
                        )}
                      >
                         {w.isInstalled ? 'Remove' : 'Install'}
                      </Button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Live Preview / Sidebar Settings */}
        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative border-4 border-slate-800 h-[300px]">
              <div className="absolute inset-0 bg-blue-600/10 blur-[60px]" />
              <div className="relative z-10 space-y-4 h-full flex flex-col">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">LIVE PREVIEW</p>
                    <div className="flex gap-1">
                       <div className="w-3 h-3 bg-red-400 rounded-full" />
                       <div className="w-3 h-3 bg-amber-400 rounded-full" />
                       <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                    </div>
                 </div>
                 
                 <div className="flex-1 flex flex-col justify-center items-center gap-6 border-2 border-dashed border-white/10 rounded-3xl p-6">
                    <div className="w-full h-8 bg-white/5 rounded-xl animate-pulse" />
                    <div className="grid grid-cols-2 gap-4 w-full">
                       <div className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                       <div className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                    </div>
                    <p className="text-[10px] font-medium text-white/30 italic">Preview reflects "{layout}" layout in "{theme}" mode.</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest">Global Options</h4>
              <div className="space-y-6">
                 {[
                   { label: 'High Contrast Mode', color: 'text-orange-500' },
                   { label: 'Reduced Motion', color: 'text-blue-500' },
                   { label: 'Dyslexic Friendly Font', color: 'text-emerald-500' },
                   { label: 'Keyboard Shortcuts', color: 'text-slate-900' },
                 ].map((opt) => (
                   <div key={opt.label} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">{opt.label}</span>
                      <Switch />
                   </div>
                 ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50">
                 <Button className="w-full bg-slate-900 hover:bg-black text-white rounded-2xl py-6 font-black uppercase text-xs tracking-widest">
                    Save Config
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
