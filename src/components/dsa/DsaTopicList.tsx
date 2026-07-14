"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { DSA_STATUSES } from "@/lib/constants";
import type { DsaStatus, DsaTopic } from "@/types";

type DsaTopicListProps = {
  topics: DsaTopic[];
  onEdit: (topic: DsaTopic) => void;
  onDelete: (topic: DsaTopic) => void;
  onStatusChange: (id: string, status: DsaStatus) => void;
};

// List of DSA topics with inline status changes (PRD 7.5).
export function DsaTopicList({
  topics,
  onEdit,
  onDelete,
  onStatusChange,
}: DsaTopicListProps) {
  if (topics.length === 0) {
    return (
      <EmptyState
        title="No topics yet"
        description="Add DSA topics you want to track and update your confidence over time."
      />
    );
  }

  return (
    <Card className="p-1">
      <ul className="flex flex-col">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="flex flex-col gap-2 rounded-md border-b border-gray-50 p-4 last:border-b-0 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-medium text-foreground">{topic.name}</span>

            <div className="flex items-center gap-2">
              <select
                aria-label="Topic status"
                value={topic.status}
                onChange={(e) => onStatusChange(topic.id, e.target.value as DsaStatus)}
                className="rounded-md border border-gray-200 bg-white px-2 py-1.5 pr-7 text-sm outline-none transition-colors hover:border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10"
              >
                {DSA_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Button variant="ghost" size="sm" onClick={() => onEdit(topic)}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(topic)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
