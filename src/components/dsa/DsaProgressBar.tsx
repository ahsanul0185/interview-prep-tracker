import { DSA_STATUSES } from "@/lib/constants";
import type { DsaTopic } from "@/types";

// Progress summary: Confident / total (PRD 7.5).
export function DsaProgressBar({ topics }: { topics: DsaTopic[] }) {
  const confident = topics.filter((t) => t.status === "Confident").length;
  const total = topics.length;
  const percentage = total === 0 ? 0 : Math.round((confident / total) * 100);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Confidence
          </p>
          <p className="text-2xl font-semibold text-foreground">
            {confident}{" "}
            <span className="text-base font-normal text-gray-400">/ {total}</span>
          </p>
        </div>
        <span className="text-sm font-medium text-primary-700">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-primary-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">
        {DSA_STATUSES.join(" → ")}
      </p>
    </div>
  );
}
