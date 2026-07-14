import { Card } from "@/components/ui/Card";
import { APPLICATION_STAGES, STAGE_VARIANTS } from "@/lib/constants";
import type { Application } from "@/types";

// Per-stage counts shown as soft cards (PRD 7.3).
export function StageCounts({ applications }: { applications: Application[] }) {
  const counts = APPLICATION_STAGES.map((stage) => ({
    stage,
    count: applications.filter((a) => a.stage === stage).length,
  }));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {counts.map(({ stage, count }) => (
        <Card key={stage} className="p-3 text-center">
          <p className="text-2xl font-semibold text-foreground">{count}</p>
          <span
            className={`mt-1 inline-block rounded-md px-1.5 py-0.5 text-xs font-medium ${VARIANT_TEXT[STAGE_VARIANTS[stage]]}`}
          >
            {stage}
          </span>
        </Card>
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
