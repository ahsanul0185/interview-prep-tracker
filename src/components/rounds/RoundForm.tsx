"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ROUND_STATUSES, ROUND_TYPES } from "@/lib/constants";
import type { RoundInput } from "@/hooks/useInterviewRounds";
import type { InterviewRound, RoundStatus } from "@/types";

type RoundFormProps = {
  initial?: InterviewRound;
  onSubmit: (input: RoundInput) => Promise<{ error: string | null }>;
  onCancel: () => void;
};

// Create/edit form for an interview round (PRD 7.4).
export function RoundForm({ initial, onSubmit, onCancel }: RoundFormProps) {
  const [roundType, setRoundType] = useState(initial?.round_type ?? ROUND_TYPES[0]);
  const [customType, setCustomType] = useState(
    ROUND_TYPES.includes(initial?.round_type as (typeof ROUND_TYPES)[number])
      ? ""
      : initial?.round_type ?? ""
  );
  const [date, setDate] = useState(initial?.date ?? "");
  const [status, setStatus] = useState<RoundStatus>(initial?.status ?? "Scheduled");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isCustom = roundType === "__custom__";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const finalType = isCustom ? customType.trim() : roundType;
    if (!finalType) {
      setError("Round type is required.");
      return;
    }

    setSubmitting(true);
    const { error } = await onSubmit({
      round_type: finalType,
      date: date || null,
      status,
      notes: notes.trim() || null,
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

      <Select
        label="Round type"
        name="round_type"
        value={roundType}
        onChange={(e) => setRoundType(e.target.value)}
      >
        {ROUND_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
        <option value="__custom__">Other…</option>
      </Select>

      {isCustom && (
        <Input
          label="Custom round type"
          name="custom_round_type"
          required
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
        />
      )}

      <Input
        label="Date"
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Select
        label="Status"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as RoundStatus)}
      >
        {ROUND_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>

      <Textarea label="Notes" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Save changes" : "Add round"}
        </Button>
      </div>
    </form>
  );
}
