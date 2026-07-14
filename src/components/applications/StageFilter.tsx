"use client";

import { APPLICATION_STAGES } from "@/lib/constants";
import type { ApplicationStage } from "@/types";

type StageFilterProps = {
  value: ApplicationStage | "all";
  onChange: (value: ApplicationStage | "all") => void;
};

// Filter applications by stage (PRD P1 — search/filter).
export function StageFilter({ value, onChange }: StageFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="stage-filter" className="text-sm font-medium text-gray-600">
        Stage
      </label>
      <select
        id="stage-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as ApplicationStage | "all")}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
      >
        <option value="all">All stages</option>
        {APPLICATION_STAGES.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
    </div>
  );
}
