import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import TelemetryPanel from '../dev/TelemetryPanel';
import Joyride from 'react-joyride';

const Layout = () => {
  useKeyboardShortcuts();
  
  const tourSteps = [
    { target: '.nav-dashboard', content: 'Central hub for high-level risk metrics.' },
    { target: '.nav-upload', content: 'Ingest raw transaction data here.' },
    { target: '.nav-explorer', content: 'Explore the neural graph and trace paths.' }
  ];

  return (
    <div className="flex h-screen w-screen bg-dark-800 text-slate-200 overflow-hidden font-sans">
      <Joyride 
        steps={tourSteps} 
        continuous 
        showProgress 
        showSkipButton
        styles={{
          options: {
            primaryColor: '#2563eb',
            backgroundColor: '#1e293b',
            textColor: '#f1f5f9',
            arrowColor: '#1e293b',
          }
        }}
      />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>
      </div>
      <TelemetryPanel />
    </div>
  );
};

export default Layout;
