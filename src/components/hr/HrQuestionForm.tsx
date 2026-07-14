"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { HR_STATES } from "@/lib/constants";
import type { HrQuestionInput } from "@/hooks/useHrQuestions";
import type { HrQuestion, HrState } from "@/types";

type HrQuestionFormProps = {
  initial?: HrQuestion;
  onSubmit: (input: HrQuestionInput) => Promise<{ error: string | null }>;
  onCancel: () => void;
};

// Create/edit form for an HR question (PRD 7.6).
export function HrQuestionForm({ initial, onSubmit, onCancel }: HrQuestionFormProps) {
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [answerNotes, setAnswerNotes] = useState(initial?.answer_notes ?? "");
  const [state, setState] = useState<HrState>(initial?.state ?? "Needs Work");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!question.trim()) {
      setError("Question is required.");
      return;
    }

    setSubmitting(true);
    const { error } = await onSubmit({
      question: question.trim(),
      answer_notes: answerNotes.trim() || null,
      state,
    });
    setSubmitting(false);

    if (error) setError(error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <Textarea
        label="Question"
        name="question"
        rows={2}
        required
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Textarea
        label="Answer notes"
        name="answer_notes"
        rows={4}
        value={answerNotes}
        onChange={(e) => setAnswerNotes(e.target.value)}
      />

      <Select
        label="State"
        name="state"
        value={state}
        onChange={(e) => setState(e.target.value as HrState)}
      >
        {HR_STATES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Save changes" : "Add question"}
        </Button>
      </div>
    </form>
  );
}
