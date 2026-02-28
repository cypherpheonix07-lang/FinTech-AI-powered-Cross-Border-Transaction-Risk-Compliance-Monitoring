import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrafficLight } from "@/components/TrafficLight";
import { runLocalPrivacyCheck, type CheckResult } from "@/lib/safeStepData";
import { toast } from "sonner";

const CheckPayment = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (recipient.trim().length < 2) {
      toast.error("Please enter who you're paying");
      return;
    }
    const check = runLocalPrivacyCheck(num, recipient);
    setResult(check);

    if (check.level === "safe") toast.success("This payment looks safe! ✅");
    if (check.level === "warning") toast.warning("Please review this payment ⚠️");
    if (check.level === "danger") toast.error("Risk detected! Be careful 🛑");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-8 space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors touch-target"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back Home</span>
        </button>

        <div>
          <h1 className="text-3xl font-extrabold">Check a Payment</h1>
          <p className="text-base text-muted-foreground mt-1">
            Enter the details below and we'll check if it's safe.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-base font-bold block mb-2">How much?</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">$</span>
              <Input
                type="number"
                placeholder="0.00"
                className="pl-10 h-16 text-2xl font-bold rounded-2xl border-2"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setResult(null);
                }}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-bold block mb-2">Who are you paying?</label>
            <Input
              type="text"
              placeholder="Enter name or description"
              className="h-16 text-lg rounded-2xl border-2"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setResult(null);
              }}
              maxLength={100}
            />
          </div>

          <Button
            onClick={handleCheck}
            className="w-full h-16 text-xl font-bold rounded-2xl touch-target glow-primary"
            size="lg"
          >
            <Search className="h-6 w-6 mr-2" />
            Check for Safety
          </Button>
        </div>

        {/* Result */}
        {result && <TrafficLight result={result} />}
      </div>
    </div>
  );
};

export default CheckPayment;
