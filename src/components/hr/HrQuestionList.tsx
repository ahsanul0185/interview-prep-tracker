"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { HR_STATES } from "@/lib/constants";
import type { HrQuestion, HrState } from "@/types";

type HrQuestionListProps = {
  questions: HrQuestion[];
  onEdit: (question: HrQuestion) => void;
  onDelete: (question: HrQuestion) => void;
  onStateChange: (id: string, state: HrState) => void;
};

// List of HR questions with answer notes and state toggles (PRD 7.6).
export function HrQuestionList({
  questions,
  onEdit,
  onDelete,
  onStateChange,
}: HrQuestionListProps) {
  if (questions.length === 0) {
    return (
      <EmptyState
        title="No questions yet"
        description="Add common HR questions and notes for your answers."
      />
    );
  }

  return (
    <Card className="p-1">
      <ul className="flex flex-col">
        {questions.map((question) => (
          <li
            key={question.id}
            className="flex flex-col gap-3 rounded-md border-b border-gray-50 p-4 last:border-b-0 transition-colors hover:bg-gray-50/50"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <p className="max-w-2xl whitespace-pre-wrap font-medium text-foreground">
                {question.question}
              </p>

              <div className="flex shrink-0 items-center gap-2">
                <select
                  aria-label="Question state"
                  value={question.state}
                  onChange={(e) => onStateChange(question.id, e.target.value as HrState)}
                  className="rounded-md border border-gray-200 bg-white px-2 py-1.5 pr-7 text-sm outline-none transition-colors hover:border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10"
                >
                  {HR_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <Button variant="ghost" size="sm" onClick={() => onEdit(question)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(question)}>
                  Delete
                </Button>
              </div>
            </div>

            {question.answer_notes && (
              <div className="rounded-md bg-gray-50/50 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Answer notes
                </p>
                <p className="mt-1 max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                  {question.answer_notes}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
