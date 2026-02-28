import React from 'react';
import { Bell, User, Search as SearchIcon, Sun, Moon, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../app/store';

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);
  const user = useStore(state => state.user);
  
  const pathName = location.pathname.substring(1).replace('-', ' ');
  const title = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="h-16 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-8 z-10 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-lg font-bold text-slate-100 uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
          {title || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search account or TX..."
            className="bg-dark-900 border border-dark-700 rounded-full pl-10 pr-4 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-primary w-64 transition-all focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="flex items-center space-x-2 border-r border-dark-700 pr-6">
           <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors">
            <Sun size={18} />
          </button>
        </div>

        <button className="text-slate-400 hover:text-slate-200 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-risk-high rounded-full border-2 border-dark-800 animate-pulse"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-dark-700 pl-6 group relative">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-200 leading-tight">{user?.role === 'admin' ? 'Risk Architect' : 'Analyst'}</p>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">ID: {user?.apiKey?.substring(0, 8)}...</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center border border-white/10 overflow-hidden">
            <User className="text-white" size={20} />
          </div>
          
          {/* Simple Dropdown Logic */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-dark-700 border border-dark-600 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform translate-y-2 group-hover:translate-y-0 p-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-slate-300 hover:bg-dark-600 rounded-xl transition-colors"
            >
              <LogOut size={16} className="text-risk-high" />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
