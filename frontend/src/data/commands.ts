import {
  Banknote,
  ArrowRight,
  Clock,
  TrendingUp,
  Code,
  Globe,
  FileChartColumn,
  Shield,
  Cpu,
  UserCheck,
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Database,
  Brain,
  Bell,
  Lightbulb,
  Hand,
  LineChart,
  Accessibility,
  Zap,
  Box,
  LayoutDashboard,
  History,
  Target,
  Video,
  BookOpen,
  Presentation,
  Search
} from 'lucide-react';

export interface CommandItem {
  id: string;
  name: string;
  category: string;
  icon: any;
  path: string;
  description: string;
  premium?: boolean;
}

// CBDC Integration Commands
export const CBDC_COMMANDS: CommandItem[] = [
  { id: 'cbdc-wallet', name: 'CBDC Wallet', category: 'Finance', icon: Banknote, path: '/cbdc-integration', description: 'Manage CBDC wallet and transactions' },
  { id: 'cbdc-conversion', name: 'CBDC Conversion', category: 'Finance', icon: ArrowRight, path: '/cbdc-conversion', description: 'Convert between CBDC and fiat' },
  { id: 'cbdc-history', name: 'CBDC History', category: 'Finance', icon: Clock, path: '/cbdc-history', description: 'View CBDC transaction history' },
  { id: 'cbdc-interest', name: 'CBDC Interest', category: 'Finance', icon: TrendingUp, path: '/cbdc-interest', description: 'Earn interest on CBDC holdings' },
  { id: 'cbdc-smart', name: 'CBDC Smart Contracts', category: 'Finance', icon: Code, path: '/cbdc-smart', description: 'Deploy and manage CBDC smart contracts' },
  { id: 'cbdc-crossborder', name: 'Cross‑border CBDC', category: 'Finance', icon: Globe, path: '/cbdc-crossborder', description: 'International CBDC transfers' },
  { id: 'cbdc-tax', name: 'CBDC Tax Reporting', category: 'Finance', icon: FileChartColumn, path: '/cbdc-tax', description: 'Generate tax reports for CBDC activity' },
  { id: 'cbdc-privacy', name: 'CBDC Privacy Controls', category: 'Finance', icon: Shield, path: '/cbdc-privacy', description: 'Manage privacy settings for CBDC' }
];

// Quantum‑Safe Security Commands
export const QUANTUM_COMMANDS: CommandItem[] = [
  { id: 'quantum-encryption', name: 'Post‑Quantum Encryption', category: 'Security', icon: Shield, path: '/quantum-encryption', description: 'Enable post‑quantum crypto' },
  { id: 'quantum-keydist', name: 'Quantum Key Distribution', category: 'Security', icon: Cpu, path: '/quantum-keydist', description: 'Secure key exchange using quantum tech' },
  { id: 'quantum-rng', name: 'Quantum RNG', category: 'Security', icon: UserCheck, path: '/quantum-rng', description: 'True random numbers from quantum sources' },
  { id: 'quantum-auth', name: 'Quantum‑Safe Auth', category: 'Security', icon: AlertTriangle, path: '/quantum-auth', description: 'Authentication resistant to quantum attacks' },
  { id: 'quantum-monitor', name: 'Quantum Threat Monitoring', category: 'Security', icon: ArrowUpRight, path: '/quantum-monitor', description: 'Monitor quantum‑based threats' },
  { id: 'quantum-upgrade', name: 'Security Upgrade Path', category: 'Security', icon: BadgeCheck, path: '/quantum-upgrade', description: 'Roadmap for quantum security upgrades' },
  { id: 'quantum-cert', name: 'Quantum Security Certification', category: 'Security', icon: Database, path: '/quantum-cert', description: 'Obtain quantum‑security certification' },
  { id: 'quantum-backup', name: 'Quantum‑Safe Backup', category: 'Security', icon: Shield, path: '/quantum-backup', description: 'Backup data with quantum‑resistant algorithms' }
];

// Neural Interface Banking Commands
export const NEURAL_COMMANDS: CommandItem[] = [
  { id: 'neural-bci', name: 'Brain‑Computer Interface', category: 'Future', icon: Brain, path: '/neural-bci', description: 'Control finances with brain signals' },
  { id: 'neural-auth', name: 'Neural Authentication', category: 'Future', icon: Shield, path: '/neural-auth', description: 'Authenticate via neural patterns' },
  { id: 'neural-alerts', name: 'Spending Alerts', category: 'Future', icon: Bell, path: '/neural-alerts', description: 'Real‑time alerts based on mental state' },
  { id: 'neural-coach', name: 'Neural Financial Coach', category: 'Future', icon: Lightbulb, path: '/neural-coach', description: 'AI coach using neural data' },
  { id: 'neural-control', name: 'Hands‑free Control', category: 'Future', icon: Hand, path: '/neural-control', description: 'Operate app hands‑free' },
  { id: 'neural-patterns', name: 'Spending Patterns', category: 'Future', icon: LineChart, path: '/neural-patterns', description: 'Analyze neural spending patterns' },
  { id: 'neural-security', name: 'Neural Security Layer', category: 'Future', icon: Shield, path: '/neural-security', description: 'Secure neural data' },
  { id: 'neural-accessibility', name: 'Neural Accessibility', category: 'Future', icon: Accessibility, path: '/neural-accessibility', description: 'Inclusive neural interfaces' }
];

// Holographic Financial Visualization Commands
export const HOLOGRAPHIC_COMMANDS: CommandItem[] = [
  { id: 'holo-portfolio', name: '3D Portfolio', category: 'Visualization', icon: Zap, path: '/holo-portfolio', description: 'Explore portfolio in 3D hologram' },
  { id: 'holo-budget', name: 'Holo Budget', category: 'Visualization', icon: Box, path: '/holo-budget', description: 'Budget display in hologram' },
  { id: 'holo-timeline', name: 'Transaction Timeline', category: 'Visualization', icon: History, path: '/holo-timeline', description: 'Holographic transaction timeline' },
  { id: 'holo-goals', name: 'Goal Tracking', category: 'Visualization', icon: Target, path: '/holo-goals', description: 'Track goals in hologram' },
  { id: 'holo-meetings', name: 'Financial Meetings', category: 'Visualization', icon: Video, path: '/holo-meetings', description: 'Virtual meetings with holographic data' },
  { id: 'holo-education', name: 'Holo Education', category: 'Visualization', icon: BookOpen, path: '/holo-education', description: 'Learn finance with holograms' },
  { id: 'holo-explore', name: 'Data Exploration', category: 'Visualization', icon: Search, path: '/holo-explore', description: 'Explore data holographically' },
  { id: 'holo-present', name: 'Presentations', category: 'Visualization', icon: Presentation, path: '/holo-present', description: 'Holographic presentations' }
];

// ... Additional command groups for sections 55‑70 would follow a similar pattern ...

export const COMMANDS: CommandItem[] = [
  ...CBDC_COMMANDS,
  ...QUANTUM_COMMANDS,
  ...NEURAL_COMMANDS,
  ...HOLOGRAPHIC_COMMANDS
  // ... spread other groups here ...
];
