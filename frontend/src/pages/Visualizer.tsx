import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Shield, ArrowLeft, CheckCircle, Lock, Building2, Globe, User, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Hop {
  id: number;
  label: string;
  sublabel: string;
  institution: string;
  location: string;
  timestamp: string;
  latency: string;
  status: "verified" | "pending";
  icon: typeof User;
  proofHash: string;
}

const mockHops: Hop[] = [
  {
    id: 1, label: "Sender", sublabel: "Originating Account", institution: "Your Bank Account",
    location: "New York, NY", timestamp: "2024-12-15 09:32:14 UTC", latency: "—",
    status: "verified", icon: User, proofHash: "0x7f3a9b2c...4e8d1a6f",
  },
  {
    id: 2, label: "First National Bank", sublabel: "Originating Bank", institution: "First National Bank of NY",
    location: "New York, NY", timestamp: "2024-12-15 09:32:15 UTC", latency: "1.2s",
    status: "verified", icon: Building2, proofHash: "0xa1c4d7e3...9f2b5c08",
  },
  {
    id: 3, label: "ACH Gateway", sublabel: "Payment Network", institution: "Federal Reserve ACH",
    location: "Richmond, VA", timestamp: "2024-12-15 09:32:18 UTC", latency: "3.1s",
    status: "verified", icon: Globe, proofHash: "0x5e8f1a3d...c7b42e91",
  },
  {
    id: 4, label: "Receiver's Bank", sublabel: "Receiving Institution", institution: "Pacific Coast Credit Union",
    location: "San Francisco, CA", timestamp: "2024-12-15 09:32:20 UTC", latency: "1.8s",
    status: "verified", icon: Building2, proofHash: "0xd2f6c8a5...1b3e7904",
  },
  {
    id: 5, label: "Receiver", sublabel: "Destination Account", institution: "Recipient Account ****7842",
    location: "San Francisco, CA", timestamp: "2024-12-15 09:32:21 UTC", latency: "0.9s",
    status: "verified", icon: CheckCircle, proofHash: "0x3b9a7e1f...8c5d2a06",
  },
];

const Visualizer = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedHop, setSelectedHop] = useState<number | null>(null);
  const [showProof, setShowProof] = useState(false);

  const txCode = code || "PG-2024-7X9K";
  const allVerified = mockHops.every((h) => h.status === "verified");

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({ title: "Copied", description: "Proof hash copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">PathGuard</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1 text-xs font-semibold text-verified">
            <CheckCircle className="h-3.5 w-3.5" />
            {allVerified ? "All Hops Verified" : "Verification In Progress"}
          </span>
        </div>
      </nav>

      <main className="container py-8">
        {/* Transaction header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Transaction Path</p>
          <h1 className="text-2xl font-bold text-foreground font-mono">{txCode}</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Path visualization - main column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-trust" />
                  Verified Transaction Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {mockHops.map((hop, i) => {
                    const HopIcon = hop.icon;
                    const isSelected = selectedHop === hop.id;
                    return (
                      <motion.div
                        key={hop.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3, duration: 0.5, ease: "easeOut" }}
                      >
                        <button
                          onClick={() => setSelectedHop(isSelected ? null : hop.id)}
                          className="flex w-full items-start gap-4 text-left"
                          aria-label={`View details for ${hop.label}`}
                        >
                          {/* Timeline */}
                          <div className="flex flex-col items-center">
                            <motion.div
                              className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                                isSelected
                                  ? "border-trust bg-trust/20 shadow-glow"
                                  : "border-verified bg-verified/10"
                              }`}
                              animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
                            >
                              <HopIcon className={`h-6 w-6 ${isSelected ? "text-trust" : "text-verified"}`} />
                              {/* Pulse ring on animate-in */}
                              <motion.div
                                className="absolute inset-0 rounded-full border-2 border-verified"
                                initial={{ scale: 1, opacity: 0.6 }}
                                animate={{ scale: 1.6, opacity: 0 }}
                                transition={{ delay: i * 0.3 + 0.5, duration: 0.8 }}
                              />
                            </motion.div>
                            {i < mockHops.length - 1 && (
                              <motion.div
                                className="w-0.5 bg-border"
                                initial={{ height: 0 }}
                                animate={{ height: 48 }}
                                transition={{ delay: i * 0.3 + 0.4, duration: 0.3 }}
                              />
                            )}
                          </div>

                          {/* Hop info */}
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-foreground">{hop.label}</p>
                                <p className="text-sm text-muted-foreground">{hop.sublabel}</p>
                              </div>
                              <div className="hidden items-center gap-2 sm:flex">
                                {hop.latency !== "—" && (
                                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                    {hop.latency}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1 rounded-md bg-verified/10 px-2 py-0.5 text-xs font-medium text-verified">
                                  <Lock className="h-3 w-3" /> Verified
                                </span>
                              </div>
                            </div>

                            {/* Expanded detail */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-3 rounded-lg border border-border bg-muted/50 p-4 text-sm">
                                    <div className="grid gap-2 sm:grid-cols-2">
                                      <div>
                                        <p className="text-muted-foreground">Institution</p>
                                        <p className="font-medium text-foreground">{hop.institution}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Location</p>
                                        <p className="font-medium text-foreground">{hop.location}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Timestamp</p>
                                        <p className="font-mono text-xs text-foreground">{hop.timestamp}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Proof Hash</p>
                                        <div className="flex items-center gap-1">
                                          <p className="font-mono text-xs text-foreground">{hop.proofHash}</p>
                                          <button
                                            onClick={(e) => { e.stopPropagation(); copyHash(hop.proofHash); }}
                                            className="text-muted-foreground hover:text-foreground"
                                            aria-label="Copy hash"
                                          >
                                            <Copy className="h-3 w-3" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="flex items-center gap-1.5 font-semibold text-verified">
                      <CheckCircle className="h-4 w-4" /> All Verified
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Hops</p>
                    <p className="text-2xl font-bold text-foreground">{mockHops.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End-to-End Latency</p>
                    <p className="font-mono text-foreground">7.0s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Encryption</p>
                    <p className="text-foreground">AES-256 + SHA-256</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verify Publicly */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  className="w-full gap-2"
                  variant="outline"
                  onClick={() => setShowProof(!showProof)}
                >
                  <ExternalLink className="h-4 w-4" />
                  Verify Publicly
                </Button>

                <AnimatePresence>
                  {showProof && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3 rounded-lg border border-border bg-muted/50 p-4">
                        <p className="text-sm font-semibold text-foreground">Cryptographic Proof</p>
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Merkle Root</p>
                            <p className="font-mono text-foreground break-all">
                              0x8a4f2b7c1d9e3f6a5b0c8d7e2f1a4b3c6d9e0f1a2b3c4d5e6f7a8b9c0d1e2f
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Block Number</p>
                            <p className="font-mono text-foreground">#19,847,293</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Verification Signature</p>
                            <p className="font-mono text-foreground break-all">
                              ECDSA-P256: 3045022100...a8f7e2d1
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-trust"
                          onClick={() =>
                            copyHash("0x8a4f2b7c1d9e3f6a5b0c8d7e2f1a4b3c6d9e0f1a2b3c4d5e6f7a8b9c0d1e2f")
                          }
                        >
                          <Copy className="mr-1 h-3 w-3" /> Copy Full Proof
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visualizer;
