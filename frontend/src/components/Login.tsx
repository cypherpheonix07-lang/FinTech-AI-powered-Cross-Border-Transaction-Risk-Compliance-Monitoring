import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export default function Login({ onLoginSuccess, onCancel }: LoginProps) {
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network request for authentication
    setTimeout(() => {
      setIsLoading(false);
      // Move to MFA step (simulating secure 2FA requirement)
      setStep('mfa');
    }, 1200);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network request for MFA verification
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Secure Header */}
        <div className="bg-blue-950 p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Secure Sign In</h2>
          <p className="text-blue-200 text-sm mt-2 flex items-center justify-center gap-1">
            <Lock className="w-4 h-4" /> End-to-End Encrypted
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Authenticating...' : 'Continue'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMfaSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Please enter the 6-digit code sent to your registered device.
                </p>
              </div>
              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  pattern="\d{6}"
                  className="w-full px-4 py-4 text-center tracking-[0.5em] text-2xl rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none"
                  placeholder="000000"
                  aria-label="6-digit authentication code"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button 
              onClick={onCancel}
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              Return to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
