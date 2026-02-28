import React from 'react';
import { 
  Shield, User, Clock, AlertTriangle, 
  ArrowRight, MessageCircle, FileText 
} from 'lucide-react';

/**
 * CaseCard.jsx (Enterprise Edition)
 * Detailed overview for forensic investigations.
 */
const CaseCard = ({ isLarge = false }) => {
  return (
    <div className={`bg-dark-800 border border-dark-600 rounded-3xl p-8 hover:border-primary/50 transition-all shadow-xl group cursor-pointer ${isLarge ? 'flex' : 'block'}`}>
      <div className={`${isLarge ? 'flex-1' : ''} space-y-6`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3 text-risk-high">
            <Shield size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">Case: CA-88902</span>
          </div>
          <span className="bg-risk-high/20 text-risk-high text-[9px] font-black px-2 py-1 rounded">CRITICAL</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Multi-Node Layering in MENA Corridor</h3>
          <p className="text-xs text-slate-500 line-clamp-2">Autonomous detection identified 14 accounts in Dubai and Riyadh behaving as high-velocity conduits for structured transfers.</p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center text-[10px] font-bold text-slate-400">
            <User size={12} className="mr-1.5" /> Analyst_Gamma
          </div>
          <div className="flex items-center text-[10px] font-bold text-slate-400">
            <Clock size={12} className="mr-1.5" /> 4h ago
          </div>
        </div>
      </div>

      {isLarge && (
        <div className="w-48 ml-8 pl-8 border-l border-dark-700 flex flex-col justify-center space-y-4">
           <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span>Evidence Nodes</span>
              <span className="text-slate-200">14</span>
           </div>
           <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span>Risk Score</span>
              <span className="text-risk-high">0.92</span>
           </div>
           <button className="w-full bg-dark-900 group-hover:bg-primary py-3 rounded-xl transition-all text-slate-300 group-hover:text-white flex items-center justify-center font-bold text-[10px] uppercase">
              Enter Case <ArrowRight size={12} className="ml-2" />
           </button>
        </div>
      )}
    </div>
  );
};

export default CaseCard;
