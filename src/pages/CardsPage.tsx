import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Snowflake, 
  ChevronRight,
  Settings2,
  PieChart as PieChartIcon,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_CARDS = [
  { id: '1', type: 'Physical', brand: 'Visa', last4: '8829', exp: '10/28', status: 'Active', color: 'bg-slate-900', limit: 5000, spent: 1200 },
  { id: '2', type: 'Virtual', brand: 'Mastercard', last4: '4410', exp: '02/26', status: 'Frozen', color: 'bg-blue-600', limit: 1000, spent: 450 },
];

export default function CardsPage() {
  const [activeCard, setActiveCard] = useState(MOCK_CARDS[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(activeCard.status === 'Frozen');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Card Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Control your physical and virtual payment methods.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          <Plus className="w-5 h-5" /> Issue New Card
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Card Visualizer & Controls */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Card Display */}
          <div className="perspective-1000">
            <div className={cn(
              "relative aspect-[1.586/1] w-full max-w-md mx-auto rounded-[2rem] p-8 text-white shadow-2xl transition-all duration-700 transform-gpu preserve-3d",
              activeCard.color,
              isFrozen && "grayscale contrast-75 brightness-75"
            )}>
              {/* Chip & Logo */}
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-10 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg shadow-inner overflow-hidden flex flex-col justify-center px-1">
                   <div className="h-0.5 bg-black/10 w-full mb-1" />
                   <div className="h-0.5 bg-black/10 w-full mb-1" />
                   <div className="h-0.5 bg-black/10 w-full" />
                </div>
                <div className="text-right italic font-black text-2xl tracking-tighter opacity-80">PathGuard</div>
              </div>

              {/* Card Number */}
              <div className="space-y-1 mb-8">
                <p className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Card Number</p>
                <div className="flex gap-4 text-xl md:text-2xl font-mono font-bold tracking-widest">
                   <span>{showDetails ? '4532' : '••••'}</span>
                   <span>{showDetails ? '9901' : '••••'}</span>
                   <span>{showDetails ? '2345' : '••••'}</span>
                   <span>{activeCard.last4}</span>
                </div>
              </div>

              {/* Expiry & CVV */}
              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase mb-1">Expires</p>
                  <p className="text-sm font-bold">{activeCard.exp}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase mb-1">CVV</p>
                  <p className="text-sm font-bold">{showDetails ? '123' : '•••'}</p>
                </div>
              </div>

              {/* Frozen Overlay Component */}
              {isFrozen && (
                <div className="absolute inset-0 bg-slate-100/10 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center text-center p-6 space-y-2 border-2 border-white/20">
                   <Snowflake className="w-12 h-12 text-blue-200 animate-pulse" />
                   <p className="font-black text-xl uppercase tracking-tighter text-blue-100 drop-shadow-md">This Card is Frozen</p>
                </div>
              )}
              
              <div className="absolute bottom-8 right-8 text-sm font-bold tracking-widest opacity-30">{activeCard.brand}</div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button 
              onClick={() => setIsFrozen(!isFrozen)}
              className={cn(
                "p-6 rounded-[2rem] flex flex-col items-center gap-3 transition-all border shadow-sm group",
                isFrozen ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              <Snowflake className={cn("w-6 h-6", isFrozen && "animate-spin-slow")} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{isFrozen ? "Unfreeze" : "Freeze"}</span>
            </button>
            
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="p-6 rounded-[2rem] bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex flex-col items-center gap-3 transition-all shadow-sm"
            >
              {showDetails ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              <span className="text-[10px] font-bold uppercase tracking-widest">Details</span>
            </button>

            <button className="p-6 rounded-[2rem] bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex flex-col items-center gap-3 transition-all shadow-sm">
              <Lock className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Show PIN</span>
            </button>

            <button className="p-6 rounded-[2rem] bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex flex-col items-center gap-3 transition-all shadow-sm">
              <Settings2 className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Limits</span>
            </button>
          </div>

          {/* Limits Visualization */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="font-bold text-slate-900">Spending Limits</h3>
               <span className="text-xs font-bold text-blue-600">Monthly</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Spent so far</span>
                <span className="font-black text-slate-900">£{activeCard.spent.toLocaleString()} / £{activeCard.limit.toLocaleString()}</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-1000" 
                  style={{ width: `${(activeCard.spent / activeCard.limit) * 100}%` }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Current Usage: {Math.round((activeCard.spent / activeCard.limit) * 100)}%</span>
                <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Adjust Limits</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Card Selector & Recent Activity */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Your Cards</h3>
            <div className="space-y-4">
              {MOCK_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    setActiveCard(card);
                    setIsFrozen(card.status === 'Frozen');
                    setShowDetails(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-[2rem] border transition-all text-left",
                    activeCard.id === card.id 
                      ? "border-blue-600 bg-blue-50/50 shadow-md" 
                      : "border-slate-100 bg-slate-50 hover:border-slate-300"
                  )}
                >
                  <div className={cn("w-12 h-9 rounded-lg flex items-center justify-center text-white font-black text-xs", card.color)}>
                    {card.brand}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{card.type} Card</p>
                    <p className="text-xs font-medium text-slate-400 font-mono">•••• {card.last4}</p>
                  </div>
                  {card.id === activeCard.id && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
             <div className="p-8 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Card Activity</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Last 5 Transactions</p>
             </div>
             <div className="divide-y divide-slate-50 px-4">
                {[1,2,3].map((_, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/50 rounded-2xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Subscription Service</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">OCT 24, 2025</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-slate-900">- £24.99</span>
                  </div>
                ))}
             </div>
             <button className="p-6 text-center text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline bg-slate-50/30">
               View All Activity
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
