import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ActivityList } from "@/components/ActivityList";
import { recentActivity } from "@/lib/safeStepData";

const ActivityPage = () => {
  const navigate = useNavigate();

  const safeCount = recentActivity.filter((a) => a.status === "safe").length;
  const warnCount = recentActivity.filter((a) => a.status === "warning").length;
  const blockCount = recentActivity.filter((a) => a.status === "blocked").length;

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
          <h1 className="text-3xl font-extrabold">Recent Activity</h1>
          <p className="text-base text-muted-foreground mt-1">
            Your latest payments at a glance.
          </p>
        </div>

        {/* Quick summary */}
        <div className="flex gap-3">
          <div className="flex-1 rounded-2xl bg-safe/10 p-4 text-center">
            <p className="text-2xl font-extrabold text-safe">{safeCount}</p>
            <p className="text-sm font-semibold text-safe">Safe</p>
          </div>
          <div className="flex-1 rounded-2xl bg-amber/10 p-4 text-center">
            <p className="text-2xl font-extrabold text-amber">{warnCount}</p>
            <p className="text-sm font-semibold text-amber">Review</p>
          </div>
          <div className="flex-1 rounded-2xl bg-danger/10 p-4 text-center">
            <p className="text-2xl font-extrabold text-danger">{blockCount}</p>
            <p className="text-sm font-semibold text-danger">Blocked</p>
          </div>
        </div>

        {/* Activity List */}
        <ActivityList items={recentActivity} />
      </div>
    </div>
  );
};

export default ActivityPage;
