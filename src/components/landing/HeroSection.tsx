import { useState } from "react";
import { Search, ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [txId, setTxId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId.trim()) return;
    setIsTracking(true);
    // Mock: simulate tracking delay
    setTimeout(() => setIsTracking(false), 2000);
  };

  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-trust/30 bg-trust/10 px-4 py-1.5 text-sm font-medium text-trust">
            <ShieldCheck className="h-4 w-4" />
            Bank-Grade Security · End-to-End Encryption
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            See Exactly Where{" "}
            <span className="text-gradient">Your Money</span>{" "}
            Goes
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
            PathGuard replaces blind trust with cryptographic proof. Track every
            hop of your transfer in real time — from sender to receiver.
          </p>

          {/* Transaction Tracker */}
          <form
            onSubmit={handleTrack}
            id="track"
            className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter Transaction ID (e.g. PG-2024-XXXX)"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                className="h-12 border-primary-foreground/20 bg-primary-foreground/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-trust"
                maxLength={30}
                aria-label="Transaction ID"
              />
            </div>
            <Button
              type="submit"
              disabled={isTracking}
              className="h-12 gap-2 bg-trust px-6 font-semibold text-success-foreground hover:bg-trust/90"
            >
              {isTracking ? (
                "Tracking..."
              ) : (
                <>
                  Track Path <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-primary-foreground/50">
            <Lock className="h-3 w-3" />
            Your search is encrypted and never stored
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-8 w-5 rounded-full border-2 border-primary-foreground/30 p-1">
            <div className="h-2 w-1.5 rounded-full bg-primary-foreground/50 mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
