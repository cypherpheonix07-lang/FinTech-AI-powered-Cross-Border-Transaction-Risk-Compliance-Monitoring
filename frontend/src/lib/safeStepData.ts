export interface Activity {
  id: string;
  date: string;
  amount: number;
  recipient: string;
  status: "safe" | "warning" | "blocked";
  note?: string;
}

export const recentActivity: Activity[] = [
  { id: "1", date: "2026-02-13T14:32:00", amount: 25, recipient: "Maria (Dog Walker)", status: "safe" },
  { id: "2", date: "2026-02-13T13:15:00", amount: 150, recipient: "Tom's Garden Care", status: "safe" },
  { id: "3", date: "2026-02-13T12:00:00", amount: 2500, recipient: "Unknown Account", status: "blocked", note: "Unusual amount for this contact" },
  { id: "4", date: "2026-02-12T18:00:00", amount: 80, recipient: "Bright Cleaners", status: "safe" },
  { id: "5", date: "2026-02-12T15:00:00", amount: 450, recipient: "New Sender #882", status: "warning", note: "First time paying this person" },
  { id: "6", date: "2026-02-12T10:00:00", amount: 35, recipient: "Jake (Tutor)", status: "safe" },
  { id: "7", date: "2026-02-11T20:00:00", amount: 1200, recipient: "Overseas Transfer", status: "blocked", note: "Sent from a new location" },
  { id: "8", date: "2026-02-11T14:00:00", amount: 60, recipient: "Sunny Meals Delivery", status: "safe" },
];

// Simulated on-device privacy check
export interface CheckResult {
  level: "safe" | "warning" | "danger";
  title: string;
  message: string;
}

export function runLocalPrivacyCheck(amount: number, recipient: string): CheckResult {
  const trimmed = recipient.trim().toLowerCase();

  // Impossible travel / velocity check simulation
  if (amount > 2000) {
    return {
      level: "danger",
      title: "Stop. Possible Risk Detected.",
      message: `Paying $${amount.toLocaleString()} is much higher than your usual payments. Please double-check who you're paying before continuing.`,
    };
  }

  if (trimmed.includes("unknown") || trimmed.includes("new") || trimmed.length < 3) {
    return {
      level: "warning",
      title: "Wait! This looks unusual.",
      message: `We don't recognize "${recipient}". This could be fine, but please make sure you know this person before paying.`,
    };
  }

  if (amount > 500) {
    return {
      level: "warning",
      title: "Wait! This looks unusual.",
      message: `$${amount.toLocaleString()} is a larger payment than usual. Take a moment to check the details are correct.`,
    };
  }

  return {
    level: "safe",
    title: "Safe to Pay",
    message: `This payment of $${amount.toLocaleString()} to ${recipient} looks normal. You're good to go!`,
  };
}
