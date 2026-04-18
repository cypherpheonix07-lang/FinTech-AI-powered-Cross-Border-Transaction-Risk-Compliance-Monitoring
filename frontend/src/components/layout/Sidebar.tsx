import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ShieldCheck,
  Fingerprint,
  TrendingUp,
  Layers,
  Briefcase,
  Activity,
  ShieldAlert,
  Building,
  Factory,
  Box,
  Globe,
  Database,
  Banknote,
  Percent,
  Cpu,
  Share2,
  Zap,
  Shield,
  UserCheck,
  Search,
  Dna,
  Network,
  GitBranch,
  Rocket,
  CloudRain,
  BrainCircuit,
  Orbit,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ArrowRightLeft, label: 'Transactions', href: '/transactions' },
  { icon: Users, label: 'Recipients', href: '/recipients' },
  { icon: CreditCard, label: 'My Cards', href: '/cards' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Network, label: 'Transparency Core', href: '/transparency-portal' },
  { icon: ShieldCheck, label: 'Governance Vault', href: '/governance-vault' },
  { icon: Rocket, label: 'Space Frontier', href: '/space-frontier' },
  { icon: CloudRain, label: 'Atmospheric Hub', href: '/atmospheric-frontier' },
  { icon: GitBranch, label: 'Multiverse Finance', href: '/multiverse-arbitrage' },
  { icon: Cpu, label: 'AGI Alignment', href: '/agi-terminal' },
  { icon: ShieldCheck, label: 'Quantum Security', href: '/quantum-safe-security' },
  { icon: BrainCircuit, label: 'Neural Interface', href: '/neural-interface-banking' },
  { icon: Orbit, label: 'Holographic Advisor', href: '/holographic-advisor' },
  { icon: Dna, label: 'Bio-Finance Vault', href: '/bio-finance-vault' },
  { icon: Fingerprint, label: 'Identity & Reputation', href: '/identity-reputation' },
  { icon: TrendingUp, label: 'Prediction Markets', href: '/prediction-markets' },
  { icon: Layers, label: 'Synthetic Assets', href: '/synthetic-assets' },
  { icon: Briefcase, label: 'Structured Products', href: '/structured-products' },
  { icon: Activity, label: 'Risk Parity', href: '/risk-parity' },
  { icon: ShieldAlert, label: 'Insurance-Linked Sec', href: '/insurance-linked-securities' },
  { icon: Building, label: 'Private Markets', href: '/private-markets' },
  { icon: Factory, label: 'Real Assets & Infra', href: '/real-assets-infrastructure' },
  { icon: Box, label: 'Commodities', href: '/commodities-resources' },
  { icon: Globe, label: 'FX & Currencies', href: '/fx-currencies' },
  { icon: Database, label: 'RWA Tokenization', href: '/tokenization-rwa' },
  { icon: Banknote, label: 'CBDC Settlement', href: '/cbdc-integration' },
  { icon: Percent, label: 'Stablecoin Yield', href: '/stablecoin-yield' },
  { icon: Cpu, label: 'Algo Stablecoins', href: '/algorithmic-stablecoin' },
  { icon: Share2, label: 'Cross-Chain', href: '/cross-chain-interoperability' },
  { icon: Layers, label: 'L2 Scaling', href: '/layer2-scaling' },
  { icon: Zap, label: 'Lightning Network', href: '/lightning-network' },
  { icon: Shield, label: 'Privacy Coins', href: '/privacy-coins' },
  { icon: Fingerprint, label: 'SSI Identity', href: '/ssi-management' },
  { icon: UserCheck, label: 'Credentials & KYC', href: '/verifiable-credentials' },
  { icon: Search, label: 'DID Resolution', href: '/did-resolution' },
  { icon: Dna, label: 'Biometrics', href: '/biometric-cryptosystems' },
  { icon: ShieldAlert, label: 'MPC Wallets', href: '/mpc-wallets' },
  { icon: History, label: 'Threshold Sig', href: '/threshold-signatures' },
  { icon: Activity, label: 'QKD Networks', href: '/qkd-networks' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Support', href: '/support' },
];

export function SidebarContent() {
  return (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-blue-700 rounded-xl">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">PathGuard</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
              isActive 
                ? "bg-blue-700 text-white shadow-lg shadow-blue-900/20" 
                : "text-blue-200/70 hover:text-white hover:bg-blue-900/50"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform group-hover:scale-110",
              "group-[.active]:text-white"
            )} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-blue-900/50">
        <div className="p-4 bg-blue-900/30 rounded-2xl border border-blue-800/50">
          <p className="text-xs text-blue-300/80 mb-2 uppercase tracking-wider font-semibold">Security Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium">System Protected</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-blue-950 text-white border-r border-blue-900 hidden lg:flex flex-col z-50">
      <SidebarContent />
    </aside>
  );
}
