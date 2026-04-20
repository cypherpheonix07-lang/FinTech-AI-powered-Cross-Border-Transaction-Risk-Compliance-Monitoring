import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, Activity, ArrowRight, Search, CheckCircle } from 'lucide-react';
import Login from './components/Login';
import Visualizer from './pages/Visualizer';
import DashboardLayout from './components/layout/DashboardLayout';
import { AppRoutes } from './AppRoutes';
import { Toaster } from './components/ui/toaster';

export default function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <Login 
            onLoginSuccess={() => navigate('/dashboard')} 
            onCancel={() => navigate('/')} 
          />
        } />
        
        {/* Landing Page */}
        <Route path="/welcome" element={
          <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
              <div className="flex items-center gap-2 text-blue-950">
                <ShieldCheck className="w-8 h-8 text-blue-700" />
                <span className="text-xl font-bold tracking-tight">TransactTrace-Nexus</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1 text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                  <Lock className="w-4 h-4" />
                  <span>Secure Connection</span>
                </div>
                <button 
                  onClick={() => navigate('/login')}
                  className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-8">
                <Activity className="w-4 h-4" />
                TransactTrace Beta
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-blue-950 tracking-tight mb-6">
                See exactly where <br className="hidden md:block" />
                <span className="text-blue-700">your money goes.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12">
                Replace blind trust with cryptographic proof. Track your digital transfers hop-by-hop with bank-grade security and complete transparency.
              </p>

              <div className="w-full max-w-2xl bg-white p-2 md:p-3 rounded-2xl shadow-lg border border-slate-200 mb-16">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const input = form.elements.namedItem('trackingId') as HTMLInputElement;
                  const val = input.value;
                  if (val) navigate(`/visualizer/${val}`);
                }} className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="trackingId"
                      type="text"
                      placeholder="Enter Transaction ID (e.g., TXN-982374)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none text-lg"
                      aria-label="Transaction ID"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    Track Securely <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
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
                  <h3 className="font-bold text-slate-900 mb-2">Global Coverage</h3>
                  <p className="text-slate-600 text-sm">Seamlessly monitor cross-border flow across multi-currency jurisdictions.</p>
                </div>
              </div>
            </main>
          </div>
        } />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
           <Route path="/*" element={<AppRoutes onTrackTransaction={(id) => navigate(`/visualizer/${id}`)} />} />
        </Route>

        <Route path="/visualizer/:code" element={<Visualizer />} />
        <Route path="/visualizer" element={<Visualizer />} />
      </Routes>
      <Toaster />
    </>
  );
}
