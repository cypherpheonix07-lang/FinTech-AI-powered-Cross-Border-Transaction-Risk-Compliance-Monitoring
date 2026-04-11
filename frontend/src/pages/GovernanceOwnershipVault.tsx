import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ChevronRight, 
  ChevronDown, 
  ShieldAlert, 
  Globe, 
  Percent, 
  ArrowUpRight,
  User,
  Building2,
  FileText
} from 'lucide-react';

interface UBONode {
  id: string;
  name: string;
  type: 'Individual' | 'Entity';
  ownershipPercentage: number;
  country: string;
  riskScore: number;
  children?: UBONode[];
}

const mockUBOTree: UBONode = {
  id: 'root',
  name: "Global Corp Holdings",
  type: "Entity",
  ownershipPercentage: 100,
  country: "Cayman Islands",
  riskScore: 65,
  children: [
    {
      id: "node-1",
      name: "Shell Alpha Ltd",
      type: "Entity",
      ownershipPercentage: 40,
      country: "Panama",
      riskScore: 85,
      children: [
        {
          id: "ind-1",
          name: "John Doe",
          type: "Individual",
          ownershipPercentage: 100,
          country: "Unknown",
          riskScore: 95
        }
      ]
    },
    {
      id: "node-2",
      name: "Investment Group Beta",
      type: "Entity",
      ownershipPercentage: 60,
      country: "Switzerland",
      riskScore: 25,
      children: [
        {
          id: "ind-2",
          name: "Jane Smith",
          type: "Individual",
          ownershipPercentage: 50,
          country: "UK",
          riskScore: 15
        },
        {
          id: "node-3",
          name: "Trust Gamma",
          type: "Entity",
          ownershipPercentage: 50,
          country: "Jersey",
          riskScore: 45
        }
      ]
    }
  ]
};

const UBOElement: React.FC<{ node: UBONode, level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(level < 2);
  
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400 border-green-500/30 bg-green-500/10';
    if (score < 70) return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    return 'text-red-400 border-red-500/30 bg-red-500/10';
  };

  return (
    <div className="ml-6 mt-4">
      <div className={`p-4 rounded-2xl border bg-slate-900/80 backdrop-blur-md flex items-center justify-between transition hover:border-blue-500/50 ${node.riskScore > 80 ? 'border-red-500/30' : 'border-slate-800'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-slate-800 rounded">
            {node.children && node.children.length > 0 ? (
              isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />
            ) : <div className="w-[18px]" />}
          </button>
          
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
            {node.type === 'Individual' ? <User className="text-blue-400" /> : <Building2 className="text-indigo-400" />}
          </div>
          
          <div>
            <h4 className="font-bold text-sm flex items-center gap-2">
              {node.name}
              {node.riskScore > 80 && <ShieldAlert size={14} className="text-red-500" />}
            </h4>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Globe size={12} /> {node.country}</span>
              <span className="flex items-center gap-1"><Percent size={12} /> {node.ownershipPercentage}%</span>
            </div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(node.riskScore)}`}>
          Risk: {node.riskScore}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && node.children && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-l-2 border-slate-800 ml-5"
          >
            {node.children.map(child => <UBOElement key={child.id} node={child} level={level + 1} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GovernanceOwnershipVault: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-['Outfit']">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Governance & UBO Vault
          </h1>
          <p className="text-slate-400 mt-2">Deep-layer beneficial ownership and source-of-funds verification.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-6">
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Entities Analyzed</p>
            <p className="text-xl font-bold">12,402</p>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">High Risk Hits</p>
            <p className="text-xl font-bold text-red-400">84</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* UBO Tree Area */}
        <div className="col-span-8 bg-slate-900/30 border border-slate-800 rounded-3xl p-8 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="text-indigo-400" /> Ownership Tree Immersion
            </h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs">Hierarchy View</span>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-xs cursor-pointer">Export Report</span>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-6 h-[600px] overflow-y-auto custom-scrollbar border border-slate-900">
            <UBOElement node={mockUBOTree} level={0} />
          </div>
        </div>

        {/* AI Analysis Sidebar */}
        <div className="col-span-4 space-y-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-indigo-400">
              <ArrowUpRight className="w-5 h-5" /> AI Source-of-Funds Analysis
            </h4>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="flex justify-between mb-4">
                <span className="text-xs text-slate-500">Confidence</span>
                <span className="text-xs text-green-400 font-bold">94%</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                "Subject's wealth accumulation path matches declared inheritance and subsequent real estate appreciation in verified high-growth corridors."
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500" /> Tax Compliance: Verified
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500" /> PEP Exposure: Zero
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-purple-400">
              <FileText className="w-5 h-5" /> Regulatory Rule Engine
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-xs font-bold text-red-400 mb-1">ALERT: FATF Rule 14.1</p>
                <p className="text-[11px] text-red-300">Nested entity in non-cooperative jurisdiction detected (Panama).</p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-xs font-bold text-yellow-400 mb-1">WARNING: PEP L3</p>
                <p className="text-[11px] text-yellow-300">Indirect link to secondary political figure in beneficiary node group.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceOwnershipVault;
