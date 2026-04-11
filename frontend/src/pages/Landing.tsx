import { useState } from 'react';
import { Shield, Lock, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface LandingProps {
  onTrackTransaction: (transactionId: string) => void;
  onGetStarted: () => void;
}

export function Landing({ onTrackTransaction, onGetStarted }: LandingProps) {
  const [transactionId, setTransactionId] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionId.trim()) {
      onTrackTransaction(transactionId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">PathGuard</span>
            </div>
            <Button onClick={onGetStarted} variant="primary">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            See Exactly Where <span className="text-blue-600">Your Money Goes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Replace blind trust with cryptographic proof. Track every hop, verify every step,
            and ensure your money reaches its destination safely.
          </p>

          <div className="flex items-center justify-center space-x-2 mb-12">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Secure Connection</span>
          </div>

          <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter Transaction ID (e.g., TXN-2024-001)"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="lg" className="whitespace-nowrap">
                Track Transaction <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full Transparency</h3>
              <p className="text-gray-600">
                Watch your money move in real-time. Every hop, every gateway, fully visible.
              </p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Security</h3>
              <p className="text-gray-600">
                Cryptographic proofs verify each step. No hidden intermediaries.
              </p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Grade Protection</h3>
              <p className="text-gray-600">
                Military-grade encryption. Compliance-ready. Your data stays private.
              </p>
            </div>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Trust, Designed for Safety
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            PathGuard makes digital money paths visible, verifiable, and secure.
            Join thousands who demand transparency in their transactions.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>State Certified</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 PathGuard. Making money transfers transparent and secure.
          </p>
        </div>
      </footer>
    </div>
  );
}
