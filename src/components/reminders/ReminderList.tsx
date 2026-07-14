"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { DueBadge } from "@/components/reminders/DueBadge";
import { formatDate } from "@/lib/utils";
import type { Application, Reminder } from "@/types";

type ReminderListProps = {
  reminders: Reminder[];
  applications: Application[];
  onToggleDone: (reminder: Reminder) => void;
  onEdit: (reminder: Reminder) => void;
  onDelete: (reminder: Reminder) => void;
};

// List of reminders with due-date flags and done toggles (PRD 7.7).
export function ReminderList({
  reminders,
  applications,
  onToggleDone,
  onEdit,
  onDelete,
}: ReminderListProps) {
  const appMap = new Map(applications.map((a) => [a.id, a]));

  if (reminders.length === 0) {
    return (
      <EmptyState
        title="No reminders yet"
        description="Add reminders so you never miss a follow-up or interview deadline."
      />
    );
  }

  return (
    <Card className="p-1">
      <ul className="flex flex-col">
        {reminders.map((reminder) => {
          const linkedApp = reminder.application_id
            ? appMap.get(reminder.application_id)
            : null;

          return (
            <li
              key={reminder.id}
              className={`flex flex-col gap-2 rounded-md border-b border-gray-50 p-4 last:border-b-0 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-center sm:justify-between ${
                reminder.is_done ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={reminder.is_done}
                  onChange={() => onToggleDone(reminder)}
                  aria-label={reminder.is_done ? "Mark as not done" : "Mark as done"}
                  className="mt-1 size-4 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-600/20"
                />
                <div className="min-w-0">
                  <p
                    className={`font-medium text-foreground ${
                      reminder.is_done ? "line-through" : ""
                    }`}
                  >
                    {reminder.title}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                    <DueBadge dueDate={reminder.due_date} isDone={reminder.is_done} />
                    <span>{formatDate(reminder.due_date)}</span>
                    {linkedApp && (
                      <Link
                        href={`/applications/${linkedApp.id}`}
                        className="truncate text-primary-700 underline underline-offset-2"
                      >
                        {linkedApp.company}
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-7 sm:pl-0">
                <Button variant="ghost" size="sm" onClick={() => onEdit(reminder)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(reminder)}>
                  Delete
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
