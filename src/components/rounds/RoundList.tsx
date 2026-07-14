"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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

// List of interview rounds for an application (PRD 7.4).
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
    <ul className="flex flex-col gap-3">
      {rounds.map((round) => (
        <li key={round.id}>
          <Card className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-foreground">{round.round_type}</h3>
                  <RoundStatusBadge status={round.status} />
                </div>
                {round.date && <p className="text-sm text-gray-500">{formatDate(round.date)}</p>}
                {round.notes && (
                  <p className="mt-1 whitespace-pre-wrap text-sm text-gray-600">{round.notes}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  aria-label="Round status"
                  value={round.status}
                  onChange={(e) => onStatusChange(round.id, e.target.value as RoundStatus)}
                  className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
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
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
