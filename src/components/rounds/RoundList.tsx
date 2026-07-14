"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { RoundStatusBadge } from "@/components/rounds/RoundStatusBadge";
import { formatDate } from "@/lib/utils";
import { ROUND_STATUSES } from "@/lib/constants";
import type { InterviewRound, RoundStatus } from "@/types";

type RoundListProps = {
  rounds: InterviewRound[];
  onEdit: (round: InterviewRound) => void;
  onDelete: (round: InterviewRound) => void;
  onStatusChange: (id: string, status: RoundStatus) => void;
};

// Soft list of interview rounds inside a card (PRD 7.4).
export function RoundList({ rounds, onEdit, onDelete, onStatusChange }: RoundListProps) {
  if (rounds.length === 0) {
    return (
      <EmptyState
        title="No rounds logged"
        description="Add interview rounds as you progress through the process."
      />
    );
  }

  return (
    <Card className="p-1">
      <ul className="flex flex-col">
        {rounds.map((round) => (
          <li
            key={round.id}
            className="flex flex-col gap-2 rounded-md border-b border-gray-50 p-4 last:border-b-0 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-foreground">{round.round_type}</h3>
                <RoundStatusBadge status={round.status} />
              </div>
              {round.date && <p className="text-sm text-gray-400">{formatDate(round.date)}</p>}
              {round.notes && (
                <p className="mt-1 max-w-xl whitespace-pre-wrap text-sm text-gray-500">
                  {round.notes}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Round status"
                value={round.status}
                onChange={(e) => onStatusChange(round.id, e.target.value as RoundStatus)}
                className="rounded-md border border-gray-200 bg-white px-2 py-1.5 pr-7 text-sm outline-none transition-colors hover:border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10"
              >
                {ROUND_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Button variant="ghost" size="sm" onClick={() => onEdit(round)}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(round)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
