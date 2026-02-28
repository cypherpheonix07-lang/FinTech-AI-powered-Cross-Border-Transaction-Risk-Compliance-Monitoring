import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle, Search, ArrowRight, Activity } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Define the possible views in our application
type ViewState = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  
  // Landing Page State
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const sanitizedInput = trackingId.trim();
    if (!sanitizedInput) {
      setError('Please enter a valid Transaction ID.');
      return;
    }
    if (sanitizedInput.length < 8) {
      setError('Transaction IDs are typically 8 or more characters.');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      alert(`Securely tracking: ${sanitizedInput}\n\n(Path Visualizer coming in Step 3!)`);
    }, 1500);
  };

  // Render Logic based on current view
  if (currentView === 'login') {
    return (
      <Login 
        onLoginSuccess={() => setCurrentView('dashboard')} 
        onCancel={() => setCurrentView('landing')} 
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <Dashboard 
        onLogout={() => setCurrentView('landing')}
        onTrackTransaction={(id) => {
          alert(`Opening Path Visualizer for ${id} (Coming in Step 3)`);
        }}
      />
    );
  }

  // Default: Landing Page
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 text-blue-950">
          <ShieldCheck className="w-8 h-8 text-blue-700" />
          <span className="text-xl font-bold tracking-tight">PathGuard</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1 text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
            <Lock className="w-4 h-4" />
            <span>Secure Connection</span>
          </div>
          <button 
            onClick={() => setCurrentView('login')}
            className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-8">
          <Activity className="w-4 h-4" />
          State Pilot MVP Active
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-950 tracking-tight mb-6">
          See exactly where <br className="hidden md:block" />
          <span className="text-blue-700">your money goes.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12">
          Replace blind trust with cryptographic proof. Track your digital transfers hop-by-hop with bank-grade security and complete transparency.
        </p>

        <div className="w-full max-w-2xl bg-white p-2 md:p-3 rounded-2xl shadow-lg border border-slate-200 mb-16">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Transaction ID (e.g., TXN-982374)"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none text-lg"
                aria-label="Transaction ID"
                disabled={isSearching}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <span className="animate-pulse">Verifying...</span>
              ) : (
                <>
                  Track Securely <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          {error && (
            <p className="text-red-600 text-sm mt-3 text-left px-4 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block"></span>
              {error}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Verified Paths</h3>
            <p className="text-slate-600 text-sm">Every hop is cryptographically verified before it reaches your screen.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Bank-Grade Privacy</h3>
            <p className="text-slate-600 text-sm">Your personal data is never exposed. We only track the funds, not the people.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">State Compliant</h3>
            <p className="text-slate-600 text-sm">Built to exceed state pilot regulatory standards for financial transparency.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
