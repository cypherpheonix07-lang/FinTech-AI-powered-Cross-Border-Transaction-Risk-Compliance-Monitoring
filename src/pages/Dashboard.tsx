import { useState } from 'react';
import {
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  LogOut,
  Send,
  Eye,
  Download,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

interface Transaction {
  id: string;
  transactionId: string;
  recipient: string;
  amount: number;
  currency: string;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  timestamp: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionId: 'TXN-2024-001',
    recipient: 'Sarah Johnson',
    amount: 250.0,
    currency: 'USD',
    status: 'completed',
    timestamp: '2024-02-20T10:30:00Z',
  },
  {
    id: '2',
    transactionId: 'TXN-2024-002',
    recipient: 'Mike Chen',
    amount: 1500.0,
    currency: 'USD',
    status: 'processing',
    timestamp: '2024-02-21T14:15:00Z',
  },
  {
    id: '3',
    transactionId: 'TXN-2024-003',
    recipient: 'Emma Davis',
    amount: 89.99,
    currency: 'USD',
    status: 'completed',
    timestamp: '2024-02-22T09:45:00Z',
  },
];

interface DashboardProps {
  onViewPath: (transactionId: string) => void;
}

export function Dashboard({ onViewPath }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [showSendModal, setShowSendModal] = useState(false);

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Transaction['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{user?.email}</span>
              </div>
              <Button onClick={signOut} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Track your transactions and verify payment paths with complete transparency
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">$1,839.99</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
          <Button onClick={() => setShowSendModal(true)}>
            <Send className="w-4 h-4 mr-2" />
            Send Money
          </Button>
        </div>

        <Card>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(transaction.status)}
                    <div>
                      <p className="font-medium text-gray-900">{transaction.recipient}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.transactionId} • {formatDate(transaction.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {transaction.currency} {transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">{getStatusText(transaction.status)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewPath(transaction.transactionId)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Path
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Security & Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">MFA Enabled</p>
                  <p className="text-xs text-gray-600 mt-1">Your account is protected with 2FA</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Encrypted Transfers</p>
                  <p className="text-xs text-gray-600 mt-1">All data encrypted end-to-end</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="mt-4 w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Audit Log
            </Button>
          </CardContent>
        </Card>
      </main>

      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Send Money (Demo)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This is a demo interface. In production, this would integrate with your bank's API
                to initiate secure transfers with full path tracking.
              </p>
              <div className="flex space-x-3">
                <Button variant="secondary" onClick={() => setShowSendModal(false)} className="flex-1">
                  Close
                </Button>
                <Button
                  onClick={() => {
                    alert('Demo: Transfer initiated! You would see this in your transactions list.');
                    setShowSendModal(false);
                  }}
                  className="flex-1"
                >
                  Got It
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
