import { APPLICATION_STAGES, STAGE_VARIANTS } from "@/lib/constants";
import type { Application } from "@/types";

// Per-stage counts (PRD 7.3) — shown on the dashboard and applications page.
export function StageCounts({ applications }: { applications: Application[] }) {
  const counts = APPLICATION_STAGES.map((stage) => ({
    stage,
    count: applications.filter((a) => a.stage === stage).length,
  }));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {counts.map(({ stage, count }) => (
        <div
          key={stage}
          className="rounded-xl border border-gray-200 bg-surface p-3 text-center shadow-sm"
        >
          <p className="text-2xl font-semibold text-foreground">{count}</p>
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
              VARIANT_TEXT[STAGE_VARIANTS[stage]]
            }`}
          >
            {stage}
          </span>
        </div>
      ))}
    </div>
  );
}

// Map a Badge variant to a readable text color for the label under each count.
const VARIANT_TEXT: Record<string, string> = {
  primary: "text-primary-700",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-gray-500",
};
