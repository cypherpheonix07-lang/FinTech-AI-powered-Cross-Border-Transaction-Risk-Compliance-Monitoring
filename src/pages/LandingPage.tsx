import React from 'react';
import { Shield, Search, Lock, CheckCircle, ArrowRight, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [trackId, setTrackId] = React.useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/dashboard?track=${trackId}`);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">PathGuard</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How it Works</a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Compliance</a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Security</a>
              <Link to="/login" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all">
                Login Securely
              </Link>
            </div>
            
            <div className="md:hidden">
              <Menu className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary text-xs font-bold tracking-widest uppercase border border-primary/10"
              >
                <Lock className="w-3 h-3" />
                State-Pilot Verified Interface
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900"
              >
                See exactly where your <span className="text-primary">money goes.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                PathGuard replaces blind trust with cryptographic proof. Track your digital money paths through every hop, bank, and gateway with absolute transparency.
              </motion.p>

              {/* Tracker Molecule */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleTrack}
                className="relative max-w-xl mx-auto"
              >
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-muted-foreground">
                    <Search className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Enter Transaction ID (e.g. PG-882-X92)"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value.toUpperCase())}
                    maxLength={16}
                    className="w-full pl-12 pr-40 py-5 rounded-2xl border-2 border-slate-100 bg-white shadow-xl focus:border-primary focus:ring-0 transition-all text-lg font-medium outline-none"
                    required
                  />
                  <div className="absolute right-2">
                    <button 
                      type="submit"
                      className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg"
                    >
                      Verify Path
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-accent" />
                  End-to-End Encrypted Verification Channel
                </p>
              </motion.form>
            </div>
          </div>
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Features / Trust Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Cryptographic Proof</h3>
                <p className="text-muted-foreground">Every hop in your transaction's path is verified using state-of-the-art digital signatures.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Bank-Grade Isolation</h3>
                <p className="text-muted-foreground">Your data is never shared with third parties. Verification happens in isolated secure enclaves.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <Lock className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold">Regulatory Compliant</h3>
                <p className="text-muted-foreground">Built to exceed State and Federal standards for financial transparency and data protection.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-bold text-slate-900">PathGuard</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Help Center</a>
            </div>
            <div className="text-xs text-muted-foreground">
              © 2026 PathGuard Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
