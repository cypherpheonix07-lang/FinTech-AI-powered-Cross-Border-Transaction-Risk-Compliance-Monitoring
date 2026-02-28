import { useTenant } from '@/hooks/useTenant';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function TenantSwitcher() {
  const { tenants, activeTenant, switchTenant } = useTenant();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm w-full">
        <div className="w-2 h-2 rounded-full bg-success" />
        <span className="truncate flex-1 text-left font-medium">{activeTenant?.name || 'Select Tenant'}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 overflow-hidden">
          {tenants.map(t => (
            <button key={t.id} onClick={() => { switchTenant(t.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-sm hover:bg-accent transition-colors flex items-center gap-2 ${t.id === activeTenant?.id ? 'bg-accent text-accent-foreground' : 'text-popover-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${t.status === 'active' ? 'bg-success' : 'bg-warning'}`} />
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.region}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
