import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key, ArrowRight, Loader2 } from 'lucide-react';
import useStore from '../app/store';
import { toast } from 'react-hot-toast';

const Auth = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!apiKey) {
      toast.error('API Key is required');
      return;
    }
    
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      login(apiKey);
      toast.success('Access Granted');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="h-screen w-screen bg-dark-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-2xl shadow-primary/10">
            <ShieldAlert className="text-primary" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">KUBERA <span className="text-primary">TRACE</span></h1>
          <p className="text-slate-500 text-sm">Cross-Border Path Risk Intelligence Engine</p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Secure Entrance</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  placeholder="Enter Intelligence API Key..."
                  className="w-full bg-dark-900 border border-dark-700 rounded-2xl pl-12 pr-4 py-4 text-slate-100 focus:outline-none focus:border-primary transition-all shadow-inner"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <p className="text-[10px] text-slate-600 mt-2 px-1">
                Tip: Use <code className="text-primary">ADMIN_DEMO</code> for full architect access.
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg shadow-primary/20 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Authenticate <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            Authorized Personnel Only. All access is logged and audited.<br/>
            © 2026 Kubera Intelligence Systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
