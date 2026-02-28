import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Network, 
  Upload, 
  Search, 
  ShieldAlert, 
  LayoutDashboard,
  FolderOpen,
  FileSearch,
  Scale,
  Building2,
  CreditCard,
  Briefcase,
  Globe,
  Store,
  FlaskConical,
  Shield,
  Users,
  FileCheck,
  Lock
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
      ${isActive 
        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
        : 'text-slate-400 hover:bg-dark-700 hover:text-slate-200'}
    `}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </NavLink>
);

const NavSection = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-xs text-slate-500 uppercase font-bold tracking-wider px-4 mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-700 flex flex-col h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShieldAlert className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">
            KUBERA <span className="text-primary tracking-widest uppercase text-xs block">Trace</span>
          </h1>
        </div>
        
        <nav className="space-y-1">
          {/* Core Analytics */}
          <NavSection title="Core Analytics">
            <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem to="/executive" icon={Briefcase} label="Executive View" />
          </NavSection>

          {/* Data & Investigation */}
          <NavSection title="Data & Investigation">
            <SidebarItem to="/upload" icon={Upload} label="Data Ingestion" />
            <SidebarItem to="/explorer" icon={Network} label="Graph Explorer" />
            <SidebarItem to="/trace" icon={Search} label="Trace Analysis" />
            <SidebarItem to="/risk" icon={BarChart3} label="Risk Analytics" />
          </NavSection>

          {/* Cases & Scenarios */}
          <NavSection title="Cases & Scenarios">
            <SidebarItem to="/cases" icon={FolderOpen} label="Cases" />
            <SidebarItem to="/scenario" icon={FlaskConical} label="Scenario Builder" />
            <SidebarItem to="/scenarios" icon={FileSearch} label="Scenario Catalog" />
            <SidebarItem to="/workspace" icon={Search} label="Investigator Workspace" />
          </NavSection>

          {/* Explainability */}
          <NavSection title="Explainability">
            <SidebarItem to="/explain/:txId" icon={Scale} label="Explain Detail" />
          </NavSection>

          {/* Enterprise */}
          <NavSection title="Enterprise">
            <SidebarItem to="/catalog" icon={Globe} label="Data Catalog" />
            <SidebarItem to="/marketplace" icon={Store} label="Marketplace" />
            <SidebarItem to="/policy-simulator" icon={Shield} label="Policy Simulator" />
            <SidebarItem to="/forensics" icon={FileCheck} label="Forensics Portal" />
          </NavSection>

          {/* Administration */}
          <NavSection title="Administration">
            <SidebarItem to="/admin/tenants" icon={Building2} label="Tenant Admin" />
            <SidebarItem to="/admin/billing" icon={CreditCard} label="Billing" />
          </NavSection>

          {/* Privacy & Compliance */}
          <NavSection title="Privacy & Compliance">
            <SidebarItem to="/privacy/consent" icon={Users} label="Consent Admin" />
            <SidebarItem to="/privacy/sar" icon={Lock} label="SAR Form" />
          </NavSection>
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-dark-700">
        <div className="bg-dark-700 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Engine Status</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-slate-300 font-medium">Path Risk Engine OK</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
