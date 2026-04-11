import { useState, useEffect } from 'react';
import {
  Shield,
  ArrowLeft,
  CheckCircle,
  Lock,
  MapPin,
  Clock,
  FileCheck,
  Download,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import PathSankeyChart from '../components/PathSankeyChart';

interface PathHop {
  id: string;
  name: string;
  type: 'sender' | 'bank' | 'gateway' | 'receiver';
  timestamp: string;
  status: 'verified' | 'processing' | 'encrypted';
  location: string;
  verificationProof: string;
  details: string;
}

const mockPathData: PathHop[] = [
  {
    id: '1',
    name: 'You (Sender)',
    type: 'sender',
    timestamp: '2024-02-20T10:30:00Z',
    status: 'verified',
    location: 'San Francisco, CA',
    verificationProof: 'SHA256:a3f5c9e2b1d4...',
    details: 'Payment initiated from verified account',
  },
  {
    id: '2',
    name: 'First National Bank',
    type: 'bank',
    timestamp: '2024-02-20T10:30:15Z',
    status: 'verified',
    location: 'New York, NY',
    verificationProof: 'SHA256:b7e2d1c8a6f3...',
    details: 'Funds debited and encrypted for transfer',
  },
  {
    id: '3',
    name: 'Federal Payment Gateway',
    type: 'gateway',
    timestamp: '2024-02-20T10:30:45Z',
    status: 'verified',
    location: 'Washington, DC',
    verificationProof: 'SHA256:c1a9f4e7b2d8...',
    details: 'Compliance check passed, routing verified',
  },
  {
    id: '4',
    name: 'Regional Trust Bank',
    type: 'bank',
    timestamp: '2024-02-20T10:31:20Z',
    status: 'verified',
    location: 'Chicago, IL',
    verificationProof: 'SHA256:d5e8a2c9f1b6...',
    details: "Recipient's bank received transfer request",
  },
  {
    id: '5',
    name: 'Sarah Johnson (Recipient)',
    type: 'receiver',
    timestamp: '2024-02-20T10:31:35Z',
    status: 'verified',
    location: 'Chicago, IL',
    verificationProof: 'SHA256:e9f3b7d1a5c2...',
    details: 'Funds successfully deposited to account',
  },
];

interface PathVisualizerProps {
  transactionId: string;
  onBack: () => void;
}

export function PathVisualizer({ transactionId, onBack }: PathVisualizerProps) {
  const [activeHop, setActiveHop] = useState<number>(0);
  const [showProof, setShowProof] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 100) {
          setActiveHop((current) => {
            if (current < mockPathData.length - 1) {
              return current + 1;
            }
            return current;
          });
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activeHop]);

  const getStatusColor = (status: PathHop['status']) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'encrypted':
        return 'text-purple-600 bg-purple-100';
    }
  };

  const getTypeIcon = (type: PathHop['type']) => {
    switch (type) {
      case 'sender':
      case 'receiver':
        return '👤';
      case 'bank':
        return '🏦';
      case 'gateway':
        return '🔐';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const selectedHop = mockPathData[activeHop];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={onBack} variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Path Tracker</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Transaction: <span className="font-mono font-medium">{transactionId}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Money Path Visualization</h1>
          <p className="text-gray-600">
            Watch your money's journey in real-time with cryptographic verification at each step
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-0 overflow-hidden">
                <PathSankeyChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Path Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {mockPathData.map((hop, index) => (
                    <div key={hop.id} className="relative">
                      <div
                        className={`flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all ${
                          index === activeHop
                            ? 'bg-blue-50 border-2 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveHop(index)}
                      >
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                              index === activeHop
                                ? 'bg-blue-500 text-white scale-110'
                                : 'bg-gray-200'
                            } transition-all`}
                          >
                            {getTypeIcon(hop.type)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-gray-900">{hop.name}</h3>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                                hop.status
                              )}`}
                            >
                              {hop.status === 'verified' && <CheckCircle className="w-3 h-3" />}
                              {hop.status === 'encrypted' && <Lock className="w-3 h-3" />}
                              <span className="capitalize">{hop.status}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTimestamp(hop.timestamp)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{hop.location}</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mt-2">{hop.details}</p>
                        </div>
                      </div>

                      {index < mockPathData.length - 1 && (
                        <div className="relative h-12 flex items-center justify-center">
                          <div className="absolute left-9 w-1 h-full bg-gray-200">
                            {index < activeHop && (
                              <div className="w-full bg-green-500 h-full transition-all"></div>
                            )}
                            {index === activeHop && (
                              <div
                                className="w-full bg-blue-500 transition-all"
                                style={{ height: `${animationProgress}%` }}
                              ></div>
                            )}
                          </div>
                          {index < activeHop && (
                            <div className="absolute left-9 top-1/2 -translate-x-1/2 -translate-y-1/2">
                              <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                            </div>
                          )}
                          {index === activeHop && animationProgress > 50 && (
                            <div className="absolute left-9 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hop Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Node</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedHop.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(
                      selectedHop.status
                    )}`}
                  >
                    {selectedHop.status === 'verified' && <CheckCircle className="w-4 h-4" />}
                    {selectedHop.status === 'encrypted' && <Lock className="w-4 h-4" />}
                    <span className="capitalize">{selectedHop.status}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Timestamp</p>
                  <p className="font-medium text-gray-900">{formatTimestamp(selectedHop.timestamp)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <p className="font-medium text-gray-900">{selectedHop.location}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Verification Hash</p>
                  <div className="bg-gray-100 p-2 rounded font-mono text-xs break-all">
                    {selectedHop.verificationProof}
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setShowProof(true)}
                >
                  <FileCheck className="w-4 h-4 mr-2" />
                  Verify Publicly
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold text-gray-900">$250.00 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hops</span>
                  <span className="font-medium text-gray-900">{mockPathData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">65 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security</span>
                  <span className="flex items-center space-x-1 text-green-600 font-medium">
                    <Lock className="w-4 h-4" />
                    <span>End-to-End</span>
                  </span>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {showProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Cryptographic Proof Viewer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Verification Successful</p>
                  <p className="text-sm text-green-800">
                    This transaction has been cryptographically verified and is publicly auditable
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Transaction Hash</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
                  0x7d8a9c3b2e1f5a4d6c8e9b7a2f3d1c5e8a9b7c6d4e2f1a3b5c7d9e8f6a4b2c1d
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Verification Chain</h4>
                <div className="space-y-2">
                  {mockPathData.map((hop) => (
                    <div key={hop.id} className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{hop.name}</span>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-xs font-mono text-gray-600">{hop.verificationProof}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Public Verification</h4>
                <p className="text-sm text-gray-600 mb-3">
                  This proof can be independently verified on the blockchain explorer or through
                  our public API
                </p>
                <Button variant="secondary" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Block Explorer
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button onClick={() => setShowProof(false)} className="w-full">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
