import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent } from './Sidebar';
import Header from './Header';
import CommandCenter from './CommandCenter';
import { ErrorBoundary } from '../ErrorBoundary';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-transparent flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Content */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-80 bg-black z-[70] lg:hidden transition-transform duration-300 ease-in-out transform flex flex-col border-r border-white/5 glass-omega",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex justify-end p-4">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen relative">
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
          onSearchClick={() => setIsCommandOpen(true)}
        />
        
        <CommandCenter 
          isOpen={isCommandOpen} 
          onClose={() => setIsCommandOpen(false)} 
        />
        
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <ErrorBoundary>
            <div className="animate-fade-up">
              <Outlet />
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
