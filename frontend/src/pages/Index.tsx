import { DashboardCard } from "@/components/DashboardCard";
import { PrivacyShield } from "@/components/PrivacyShield";
import { Search, Briefcase, ShieldCheck, HelpCircle, ArrowLeft } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-8 space-y-6">
        {/* Greeting */}
        <div>
          <p className="text-base text-muted-foreground">Good afternoon 👋</p>
          <h1 className="text-3xl font-extrabold mt-1">
            What do you need help with today?
          </h1>
        </div>

        {/* Privacy Shield */}
        <PrivacyShield />

        {/* 4 Big Cards */}
        <div className="grid grid-cols-1 gap-4">
          <DashboardCard
            title="Check a Payment"
            description="Make sure your money is safe"
            icon={ShieldCheck}
            to="/check"
            color="text-primary"
            bgColor="bg-primary/10"
          />
          <DashboardCard
            title="Recent Activity"
            description="See your latest payments"
            icon={Briefcase}
            to="/activity"
            color="text-safe"
            bgColor="bg-safe/10"
          />
          <DashboardCard
            title="Find a Helper"
            description="Connect with trusted people nearby"
            icon={Search}
            to="/"
            color="text-amber"
            bgColor="bg-amber/10"
          />
          <DashboardCard
            title="Get Support"
            description="We're here to help you"
            icon={HelpCircle}
            to="/"
            color="text-danger"
            bgColor="bg-danger/10"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
