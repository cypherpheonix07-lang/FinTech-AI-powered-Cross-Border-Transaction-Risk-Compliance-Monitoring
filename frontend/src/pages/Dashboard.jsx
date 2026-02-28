import React from 'react';
import { 
  ArrowUpRight, 
  Users, 
  MapPin, 
  AlertTriangle 
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-dark-700 p-6 rounded-2xl border border-dark-600 shadow-xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-opacity-10 ${color.bg}`}>
        <Icon className={color.text} size={24} />
      </div>
      {change && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-100">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Transactions" 
          value="1,284" 
          change={12.5} 
          icon={ArrowUpRight} 
          color={{ bg: 'bg-blue-500', text: 'text-blue-500' }} 
        />
        <StatCard 
          title="Total Accounts" 
          value="842" 
          change={4.2} 
          icon={Users} 
          color={{ bg: 'bg-primary', text: 'text-primary' }} 
        />
        <StatCard 
          title="Suspicious Paths" 
          value="24" 
          change={-2.1} 
          icon={AlertTriangle} 
          color={{ bg: 'bg-risk-high', text: 'text-risk-high' }} 
        />
        <StatCard 
          title="Active Countries" 
          value="156" 
          icon={MapPin} 
          color={{ bg: 'bg-green-500', text: 'text-green-500' }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-700 p-6 rounded-2xl border border-dark-600 h-80">
          <h3 className="text-slate-200 font-semibold mb-4">Volume Trends</h3>
          <div className="h-full w-full flex items-center justify-center text-slate-500 italic">
            Chart integration pending Recharts install...
          </div>
        </div>
        
        <div className="bg-dark-700 p-6 rounded-2xl border border-dark-600 h-80 overflow-hidden flex flex-col">
          <h3 className="text-slate-200 font-semibold mb-4">High-Risk Countries</h3>
          <div className="space-y-4 overflow-y-auto pr-2">
            {[
              { country: 'North Korea', risk: 0.98, code: 'KP' },
              { country: 'Iran', risk: 0.92, code: 'IR' },
              { country: 'Myanmar', risk: 0.85, code: 'MM' },
              { country: 'Russia', risk: 0.78, code: 'RU' },
            ].map((c) => (
              <div key={c.code} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-xl border border-dark-700">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🚩</span>
                  <span className="font-medium text-slate-300">{c.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-risk-high" 
                      style={{ width: `${c.risk * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-risk-high">{(c.risk * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
