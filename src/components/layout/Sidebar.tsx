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
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ArrowRightLeft, label: 'Transactions', href: '/transactions' },
  { icon: Users, label: 'Recipients', href: '/recipients' },
  { icon: CreditCard, label: 'My Cards', href: '/cards' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
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
