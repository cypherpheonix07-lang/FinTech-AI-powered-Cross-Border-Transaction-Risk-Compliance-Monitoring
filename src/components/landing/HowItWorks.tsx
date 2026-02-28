import { Send, Route, ShieldCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Send,
    title: "Initiate Transfer",
    description: "Send money through any supported platform. PathGuard activates automatically.",
    badge: "Step 1",
  },
  {
    icon: Route,
    title: "Path is Mapped",
    description: "Every financial institution your money touches is logged and verified in real time.",
    badge: "Step 2",
  },
  {
    icon: ShieldCheck,
    title: "Each Hop Verified",
    description: "Cryptographic proofs confirm each intermediary is licensed, compliant, and secure.",
    badge: "Step 3",
  },
  {
    icon: CheckCircle,
    title: "Delivery Confirmed",
    description: "Receiver gets the funds. You get an immutable proof-of-path receipt.",
    badge: "Step 4",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-trust">
            How It Works
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Like Tracking a Package — But for Money
          </h2>
          <p className="text-muted-foreground">
            Four simple steps from send to receive. Full visibility, zero guesswork.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.title}
              variants={item}
              className="group relative rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
            >
              <span className="mb-4 inline-block rounded-full bg-trust/10 px-3 py-1 text-xs font-semibold text-trust">
                {step.badge}
              </span>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
