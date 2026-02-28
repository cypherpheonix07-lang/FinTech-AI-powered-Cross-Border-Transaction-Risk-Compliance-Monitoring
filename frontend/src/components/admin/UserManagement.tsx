import { useState } from 'react';
import { User, UserRole } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Users, MoreVertical, Shield } from 'lucide-react';

const mockUsers: User[] = [
  { id: '1', name: 'Sarah Admin', email: 'admin@riskmonitor.io', role: 'admin', tenantId: 'tenant-1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '2', name: 'James Analyst', email: 'analyst@riskmonitor.io', role: 'analyst', tenantId: 'tenant-1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: '3', name: 'Michael Auditor', email: 'michael@compliance.org', role: 'viewer', tenantId: 'tenant-2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">User Management</h3>
        </div>
        <button className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-md hover:bg-primary/20 transition-colors">
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Tenant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full bg-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-muted-foreground" />
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className="bg-transparent text-xs font-mono border-none focus:ring-0 cursor-pointer text-primary hover:underline"
                    >
                      <option value="admin">admin</option>
                      <option value="analyst">analyst</option>
                      <option value="viewer">viewer</option>
                    </select>
                  </div>
                </td>
                <td className="text-xs font-mono text-muted-foreground">{u.tenantId}</td>
                <td>
                  <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
