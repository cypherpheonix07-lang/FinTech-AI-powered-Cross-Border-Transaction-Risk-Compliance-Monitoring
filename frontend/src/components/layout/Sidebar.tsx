import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { TenantSwitcher } from '@/components/tenant/TenantSwitcher';
import { useAppSelector, useAppDispatch } from '@/store';
import { selectUi, toggleSidebar } from '@/store/slices/uiSlice';
import { LayoutDashboard, Activity, Shield, Users, FileText, Play, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin', label: 'Admin', icon: Settings, adminOnly: true },
  { to: '/tenants', label: 'Tenants', icon: Users },
  { to: '/audit', label: 'Audit Logs', icon: FileText },
  { to: '/simulation', label: 'Simulation', icon: Play },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector(selectUi);

  return (
    <aside className={cn(
      'flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 shrink-0',
      sidebarCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-semibold text-sm text-foreground tracking-tight">RiskMonitor</span>
          </div>
        )}
        {sidebarCollapsed && <Shield className="w-6 h-6 text-primary mx-auto" />}
        {!sidebarCollapsed && <TenantSwitcher />}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(item => {
          if (item.adminOnly && user?.role !== 'admin') return null;
          return (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                sidebarCollapsed && 'justify-center px-2'
              )}>
              <item.icon className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {!sidebarCollapsed && user && (
          <div className="px-2 py-1">
            <div className="text-xs font-medium text-foreground truncate">{user.name}</div>
            <div className="text-xs text-muted-foreground truncate">{user.role}</div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button onClick={() => dispatch(toggleSidebar())}
            className="flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors">
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button onClick={logout}
            className="flex items-center justify-center px-2 py-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
