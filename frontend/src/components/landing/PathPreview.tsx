import { CheckCircle, Lock, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const hops = [
  { label: "Sender", sublabel: "Your Account", status: "verified", icon: CheckCircle },
  { label: "First National Bank", sublabel: "Originating Bank", status: "verified", icon: Building2 },
  { label: "ACH Gateway", sublabel: "Payment Network", status: "verified", icon: Lock },
  { label: "Receiver", sublabel: "Destination Account", status: "verified", icon: CheckCircle },
];

const PathPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-trust">
            Path Visualizer
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Money's Journey, Visualized
          </h2>
          <p className="text-muted-foreground">
            See a sample verified path below. Every hop is cryptographically checked.
          </p>
        </div>

        {/* Path visualization */}
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Transaction</p>
                <p className="font-mono text-sm font-medium text-foreground">PG-2024-7X9K</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1 text-xs font-semibold text-verified">
                <CheckCircle className="h-3.5 w-3.5" />
                All Hops Verified
              </span>
            </div>

            <div className="space-y-0">
              {hops.map((hop, i) => (
                <motion.div
                  key={hop.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-verified bg-verified/10">
                        <hop.icon className="h-5 w-5 text-verified" />
                      </div>
                      {i < hops.length - 1 && (
                        <div className="h-10 w-0.5 bg-border" />
                      )}
                    </div>
                    {/* Hop info */}
                    <div className="flex-1 pb-2">
                      <p className="font-semibold text-foreground">{hop.label}</p>
                      <p className="text-sm text-muted-foreground">{hop.sublabel}</p>
                    </div>
                    <span className="hidden items-center gap-1 rounded-md bg-verified/10 px-2 py-0.5 text-xs font-medium text-verified sm:inline-flex">
                      <Lock className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Proof hash: <code className="font-mono text-xs text-foreground">0x7f3a...e91b</code>
              <button className="ml-2 text-xs font-medium text-trust hover:underline">
                Verify Publicly
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathPreview;
