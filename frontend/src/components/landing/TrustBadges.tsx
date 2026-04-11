import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "256-bit AES encryption protects every transaction path.",
  },
  {
    icon: Lock,
    title: "End-to-End Encrypted",
    description: "Only you and verified parties can see transfer details.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Every intermediary is visible — no hidden hops or dark routes.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliant",
    description: "Built for FinCEN, state MSB, and SOC 2 Type II standards.",
  },
];

const TrustBadges = () => {
  return (
    <section id="security" className="border-y border-border bg-muted/50 py-20">
      <div className="container px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-verified">
            Security & Trust
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built on Zero-Trust Principles
          </h2>
          <p className="text-muted-foreground">
            Every component is designed assuming breach — so your money stays safe even in worst-case scenarios.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-verified/10">
                <badge.icon className="h-6 w-6 text-verified" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">{badge.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
