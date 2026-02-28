import { Shield, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export function PrivacyShield() {
  const [active, setActive] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Card
      className="p-5 cursor-pointer select-none transition-all active:scale-[0.98]"
      onClick={() => {
        setActive(!active);
        setShowInfo(true);
        setTimeout(() => setShowInfo(false), 4000);
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`rounded-2xl p-3 transition-colors ${
            active ? "bg-safe/15 text-safe" : "bg-muted text-muted-foreground"
          }`}
        >
          {active ? <ShieldCheck className="h-8 w-8" /> : <Shield className="h-8 w-8" />}
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg">
            Privacy {active ? "Active" : "Paused"}
          </p>
          <p className="text-sm text-muted-foreground">
            Tap to {active ? "pause" : "activate"} protection
          </p>
        </div>
        <div
          className={`w-14 h-8 rounded-full p-1 transition-colors ${
            active ? "bg-safe" : "bg-muted"
          }`}
        >
          <div
            className={`h-6 w-6 rounded-full bg-card shadow transition-transform ${
              active ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {showInfo && (
        <div className="mt-4 p-4 rounded-2xl bg-muted/50 animate-bounce-in">
          <p className="text-sm leading-relaxed">
            {active
              ? "✅ Your personal details stay on your phone. We only check for safety patterns locally — nothing is sent to the internet."
              : "⚠️ Privacy protection is paused. Your safety checks are still available but running in basic mode."}
          </p>
        </div>
      )}
    </Card>
  );
}
