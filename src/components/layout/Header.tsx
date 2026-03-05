import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  Menu, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Search Bar - Desktop */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div 
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-3 bg-slate-100 px-4 py-2.5 rounded-2xl flex-1 border border-transparent hover:border-blue-200 hover:bg-white cursor-text transition-all group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
          <div className="text-sm text-slate-400 font-medium">Search transactions, coaching, extras...</div>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100 ml-auto">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Language/Region - Glossy look */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-500 hover:bg-white transition-all">
          <Globe className="w-3 h-3" />
          UK / GBP
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={cn(
              "p-2.5 rounded-xl transition-all relative group shadow-sm",
              isNotificationsOpen ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            )}
          >
            <Bell className="w-5 h-5 group-hover:animate-swing" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          
          <NotificationCenter 
            isOpen={isNotificationsOpen} 
            onClose={() => setIsNotificationsOpen(false)} 
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pl-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-none">Alex Rivera</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Premium Plan</p>
            </div>
            <div className="w-9 h-9 bg-blue-100 rounded-[14px] flex items-center justify-center border-2 border-white shadow-inner">
               <span className="text-xs font-black text-blue-600">AR</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform group-hover:text-slate-600", isProfileOpen && "rotate-180")} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-2 z-[60] animate-in slide-in-from-top-4 duration-300 origin-top-right">
              <div className="px-4 py-3 border-b border-slate-50">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                 <p className="text-xs font-bold text-slate-900 truncate">alex.rivera@pathguard.io</p>
              </div>
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                >
                  <Settings className="w-4 h-4" /> Account Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <ShieldCheck className="w-4 h-4" /> Security Audit
                </button>
                <div className="h-px bg-slate-100 my-1 mx-2" />
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
