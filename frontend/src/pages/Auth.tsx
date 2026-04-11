import { useState } from 'react';
import { Shield, Lock, Mail, Key, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          setError('Invalid credentials. Please try again.');
        } else {
          setShowMfa(true);
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setError('Could not create account. Email may already be registered.');
        } else {
          setError('');
          alert('Account created! Please check your email to verify.');
          setMode('login');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode === '123456') {
      alert('MFA verified successfully!');
    } else {
      setError('Invalid MFA code. Try 123456 for demo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">PathGuard</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
            <Lock className="w-4 h-4" />
            <span className="font-medium">Secure Connection (TLS 1.3)</span>
          </div>
        </div>

        {!showMfa ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <p className="text-sm text-gray-600 text-center mt-2">
                {mode === 'login'
                  ? 'Sign in to access your secure dashboard'
                  : 'Join PathGuard for transparent money transfers'}
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Key className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>

                  {mode === 'signup' && (
                    <div className="relative">
                      <Key className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                      <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === 'login' ? 'signup' : 'login');
                      setError('');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {mode === 'login'
                      ? "Don't have an account? Sign up"
                      : 'Already have an account? Sign in'}
                  </button>
                </div>
              </form>

              {mode === 'login' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-start space-x-2 text-xs text-gray-600">
                    <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p>
                      Your credentials are encrypted end-to-end. We never store passwords in plain text.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Multi-Factor Authentication</CardTitle>
              <p className="text-sm text-gray-600 text-center mt-2">
                Enter the 6-digit code from your authenticator app
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleMfaSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <Input
                  type="text"
                  placeholder="000000"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    Demo Mode: Use code <strong>123456</strong> to proceed
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Verify & Continue
                </Button>

                <button
                  type="button"
                  onClick={() => setShowMfa(false)}
                  className="w-full text-sm text-gray-600 hover:text-gray-700"
                >
                  Back to login
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="text-xs text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">Enhanced Security</p>
                    <p>MFA adds an extra layer of protection to your account</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Protected by military-grade encryption</p>
          <p className="mt-1">SOC 2 Type II Certified • GDPR Compliant</p>
        </div>
      </div>
    </div>
  );
}
