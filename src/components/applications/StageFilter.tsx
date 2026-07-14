"use client";

import { Select } from "@/components/ui/Select";
import { APPLICATION_STAGES } from "@/lib/constants";
import type { ApplicationStage } from "@/types";

type StageFilterProps = {
  value: ApplicationStage | "all";
  onChange: (value: ApplicationStage | "all") => void;
};

// Stage filter using the soft Select primitive.
export function StageFilter({ value, onChange }: StageFilterProps) {
  return (
    <Select
      label="Stage"
      name="stage-filter"
      value={value}
      onChange={(e) => onChange(e.target.value as ApplicationStage | "all")}
    >
      <option value="all">All stages</option>
      {APPLICATION_STAGES.map((stage) => (
        <option key={stage} value={stage}>
          {stage}
        </option>
      ))}
    </Select>
  );
}
