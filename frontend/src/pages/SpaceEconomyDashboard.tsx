import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Globe, 
  Zap, 
  Satellite, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const mockSlots = [
  { id: 'SLOT-LEO-102', orbit: 'LEO', owner: 'PathGuard', status: 'Active', value: '$1.25M' },
  { id: 'SLOT-GEO-55', orbit: 'GEO', owner: 'Available', status: 'Available', value: '$8.9M' },
  { id: 'SLOT-MEO-88', orbit: 'MEO', owner: 'SpaceX', status: 'Reserved', value: '$3.4M' },
];

const mockBonds = [
  { name: 'Lunar Colony Alpha', value: 4500, color: '#3b82f6' },
  { name: 'Mars Terraforming', value: 3200, color: '#ef4444' },
  { name: 'Asteroid Mining', value: 2100, color: '#f59e0b' },
];

const SpaceEconomyDashboard: React.FC = () => {
  const [destination, setDestination] = useState('Moon');
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-[#e0e0f0] p-8 font-['Outfit'] relative overflow-hidden">
      {/* Space Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a3a_0%,#050510_100%)] opacity-50" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <Rocket className="text-blue-500" /> Space Economy Dashboard
            </h1>
            <p className="text-slate-500 font-medium">Managing off-world assets and interplanetary wealth transfers.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#101025] border border-blue-500/20 px-4 py-2 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-widest">Orbital Revenue</span>
              <span className="text-lg font-bold text-blue-400">$14.2M</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Orbital Visualization */}
          <div className="col-span-8 bg-[#101025]/50 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Satellite className="text-blue-400" /> Orbital Slot Marketplace
              </h3>
              <div className="flex gap-2">
                {['LEO', 'MEO', 'GEO'].map(o => (
                  <span key={o} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs hover:bg-white/10 transition cursor-pointer">{o}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockSlots.map((slot) => (
                <motion.div 
                  key={slot.id}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Globe className="text-blue-400 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{slot.id} <span className="text-xs text-slate-500 font-normal ml-2">[{slot.orbit}]</span></h4>
                      <p className="text-xs text-slate-400">Owner: {slot.owner}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase font-bold">Value</p>
                      <p className="text-lg font-black text-white">{slot.value}</p>
                    </div>
                    <button className="bg-white text-black px-6 py-2 rounded-xl font-bold text-xs hover:bg-blue-400 hover:text-white transition-all">
                      Trade
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interplanetary Simulator */}
          <div className="col-span-4 space-y-6">
            <div className="bg-[#101025]/50 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400" /> IITP Simulator
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">Simulate transaction latency across the solar system (IITP Protocol).</p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Destination Node</label>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent border-none text-white font-bold focus:ring-0"
                  >
                    <option value="Moon" className="bg-[#101025]">Lunar Colony (1.3s)</option>
                    <option value="Mars" className="bg-[#101025]">Mars Base One (12.5m)</option>
                    <option value="Europa" className="bg-[#101025]">Europa Outpost (45m)</option>
                  </select>
                </div>
                
                <button 
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className={`w-full py-4 rounded-2xl font-black tracking-widest uppercase text-xs transition-all ${isSimulating ? 'bg-slate-800' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] shadow-[0_0_20px_rgba(37,99,235,0.3)] text-white'}`}
                >
                  {isSimulating ? 'Simulating Distance...' : 'Execute Transaction'}
                </button>
              </div>

              {isSimulating && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                    <span>EARTH</span>
                    <TrendingUp className="text-blue-500 rotate-90" />
                    <span>{destination.toUpperCase()}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3 }}
                      className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* AstroBonds */}
            <div className="bg-[#101025]/50 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <ShieldCheck className="text-green-400" /> Astro-Bonds
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockBonds}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockBonds.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#101025', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {mockBonds.map(b => (
                  <div key={b.name} className="flex justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} /> {b.name}
                    </span>
                    <span className="font-bold text-white">{b.value} Cr.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceEconomyDashboard;
