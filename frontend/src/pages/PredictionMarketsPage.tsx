import React, { useState } from 'react';
import { Target, TrendingUp, TrendingDown, Clock, Users, ArrowRight, BrainCircuit, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const predictionData = [
  { topic: 'CBDC Adoption > 50%', probability: 85, volume: 1.2 },
  { topic: 'US Fed Rate Cut Q3', probability: 62, volume: 4.5 },
  { topic: 'EU MiCA V2 Approval', probability: 91, volume: 0.8 },
  { topic: 'BTC > 100k by EOY', probability: 45, volume: 12.4 },
  { topic: 'Global Stablecoin Regs', probability: 78, volume: 2.1 },
];

export default function PredictionMarketsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-fuchsia-700">
            Prediction Markets & Forecasting
          </h1>
          <p className="text-slate-500 mt-2">Decentralized Oracles, Probability Modeling, & Wisdom of the Crowds</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-md shadow-violet-500/20">
            <Target className="w-4 h-4" />
            Create New Market
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-violet-300 transition-all cursor-pointer">
           <div className="absolute -right-4 -bottom-4 bg-violet-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-violet-700 font-semibold">
                  <Activity className="w-5 h-5" />
                  Active Markets
                </div>
                <span className="text-2xl font-bold text-slate-900">1,492</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Span across macro, crypto, policy, and geopolitical events.</p>
              <div className="text-xs font-semibold text-violet-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore Markets <ArrowRight className="w-3 h-3" />
              </div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-fuchsia-300 transition-all cursor-pointer">
           <div className="absolute -right-4 -bottom-4 bg-fuchsia-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-fuchsia-700 font-semibold">
                  <BrainCircuit className="w-5 h-5" />
                  AI Forecast Consensus
                </div>
                <span className="text-2xl font-bold text-slate-900">84%</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Accuracy rating for the on-chain hybrid synthetic models.</p>
              <div className="text-xs font-semibold text-fuchsia-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                View AI Analytics <ArrowRight className="w-3 h-3" />
              </div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all cursor-pointer">
           <div className="absolute -right-4 -bottom-4 bg-blue-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Users className="w-5 h-5" />
                  Total Value Locked
                </div>
                <span className="text-2xl font-bold text-slate-900">$84M</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Liquidity providing automated market making (AMM) depth.</p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Liquidity Pools <ArrowRight className="w-3 h-3" />
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-600" />
          Top Trending Predictions
        </h3>
        
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={predictionData} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis dataKey="topic" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 500, fontSize: 13}} width={140} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="probability" name="Probability (%)" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border text-center border-slate-200 shadow-sm rounded-2xl p-8 py-16">
           <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <h3 className="font-bold text-slate-800 text-lg">My Active Portfolios</h3>
           <p className="text-slate-500 mt-2">You currently have no active prediction stakes.</p>
           <button className="mt-6 px-4 py-2 text-violet-600 font-semibold bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
              Explore Markets
           </button>
        </div>
        <div className="bg-white border text-center border-slate-200 shadow-sm rounded-2xl p-8 py-16">
           <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <h3 className="font-bold text-slate-800 text-lg">Oracle Performance</h3>
           <p className="text-slate-500 mt-2">Monitor decentralized data feeds and resolution speeds.</p>
           <button className="mt-6 px-4 py-2 text-slate-600 font-semibold bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              View Oracle Nodes
           </button>
        </div>
      </div>

    </div>
  );
}
