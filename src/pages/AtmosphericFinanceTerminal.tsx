import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudRain, 
  Wind, 
  Waves, 
  Thermometer, 
  TrendingDown, 
  AlertTriangle,
  Zap,
  Globe,
  Anchor
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const mockWeatherDerivatives = [
  { id: 'WD-HUR-26', type: 'Hurricane', region: 'Atlantic-S1', strike: 150, current: 45, risk: 'High' },
  { id: 'WD-DRO-12', type: 'Drought', region: 'Sahara-Core', strike: 90, current: 110, risk: 'Triggered' },
  { id: 'WD-HEAT-05', type: 'Heat Wave', region: 'DE-Mid', strike: 38, current: 32, risk: 'Medium' },
];

const mockMarineAssets = [
  { name: 'CCZ Nodule Mining', value: 450, impact: 6.5 },
  { name: 'Blue Carbon Credits', value: 120, impact: 0.2 },
  { name: 'Subsea Data Center', value: 85, impact: 1.1 },
];

const AtmosphericFinanceTerminal: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('Global');

  return (
    <div className="min-h-screen bg-[#020617] text-[#94a3b8] p-8 font-['Outfit']">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-tighter mb-2">
            <Zap size={14} /> PathGuard Atmospheric Layer
          </div>
          <h1 className="text-4xl font-black text-white">Atmospheric & Marine Terminal</h1>
          <p className="mt-2 text-slate-500">Trading weather derivatives and deep-ocean resource credits.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900/50 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-4">
            <Thermometer className="text-orange-400" />
            <div>
              <p className="text-[10px] font-black uppercase">Global Temp. Delta</p>
              <p className="text-xl font-bold text-white">+1.24°C</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Weather Derivatives Grid */}
        <div className="col-span-8 space-y-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 backdrop-blur-md">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CloudRain className="text-blue-400" /> Active Weather Derivatives
              </h3>
              <div className="text-xs font-bold text-slate-500 hover:text-white cursor-pointer transition">View All Markets →</div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockWeatherDerivatives.map((wd) => (
                <motion.div 
                  key={wd.id}
                  whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                  className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${wd.risk === 'Triggered' ? 'border-red-500/30 bg-red-500/10' : 'border-blue-500/20 bg-blue-500/10'}`}>
                      {wd.type === 'Hurricane' ? <Wind className="text-blue-400" /> : <Thermometer className="text-orange-400" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{wd.id} <span className="text-xs text-slate-500 font-normal ml-2">{wd.region}</span></h4>
                      <p className="text-xs text-slate-400">Strike Index: {wd.strike} / Current: {wd.current}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-500">Risk Profile</p>
                      <p className={`text-sm font-bold ${wd.risk === 'Triggered' ? 'text-red-400' : 'text-blue-400'}`}>{wd.risk.toUpperCase()}</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-white hover:text-black rounded-lg text-xs font-bold transition-all">
                      Hedge
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Environmental Impact Chart */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 backdrop-blur-md h-[300px]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Waves className="text-cyan-400" /> Marine Resource Valuation
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMarineAssets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="value" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global CAT Risk Sidebar */}
        <div className="col-span-4 space-y-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="text-indigo-400" /> CAT Risk Heatmap
            </h3>
            <div className="space-y-4">
              {[
                { r: 'Asia-Pacific', v: 0.78, c: 'bg-red-500' },
                { r: 'North America', v: 0.45, c: 'bg-yellow-500' },
                { r: 'Europe', v: 0.22, c: 'bg-green-500' },
                { r: 'Antarctica', v: 0.95, c: 'bg-red-600' },
              ].map(d => (
                <div key={d.r} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>{d.r}</span>
                    <span>{(d.v * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${d.v * 100}%` }}
                      className={`h-full ${d.c}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <div className="flex gap-3">
                <AlertTriangle className="text-red-500 w-5 h-5 shrink-0" />
                <p className="text-[11px] text-red-300 leading-relaxed font-medium">Critical melting risk detected in Antarctica Sector-7. Climate engineering bonds (SRM) recommended for portfolio stabilization.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-cyan-500/20 rounded-[32px] p-8">
            <h4 className="font-black text-white mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <Anchor className="text-cyan-400" /> Subsea Mining Rights
            </h4>
            <p className="text-xs leading-relaxed text-slate-400 mb-6 font-medium">
              PathGuard validates deep-sea mining concessions using satellite undersea mapping and multi-sig ecological verification.
            </p>
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-cyan-400">Total Concessions: 142</div>
              <div className="text-[10px] font-bold text-cyan-400">Eco-Score Threshold: 8.5/10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtmosphericFinanceTerminal;
