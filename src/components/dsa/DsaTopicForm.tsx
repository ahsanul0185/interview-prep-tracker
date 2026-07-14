"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DSA_STATUSES } from "@/lib/constants";
import type { DsaTopicInput } from "@/hooks/useDsaTopics";
import type { DsaStatus, DsaTopic } from "@/types";

type DsaTopicFormProps = {
  initial?: DsaTopic;
  onSubmit: (input: DsaTopicInput) => Promise<{ error: string | null }>;
  onCancel: () => void;
};

// Create/edit form for a DSA topic (PRD 7.5).
export function DsaTopicForm({ initial, onSubmit, onCancel }: DsaTopicFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [status, setStatus] = useState<DsaStatus>(initial?.status ?? "Not Started");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Topic name is required.");
      return;
    }

    setSubmitting(true);
    const { error } = await onSubmit({ name: name.trim(), status });
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

      <Input
        label="Topic name"
        name="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Select
        label="Status"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as DsaStatus)}
      >
        {DSA_STATUSES.map((s) => (
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
          {submitting ? "Saving…" : initial ? "Save changes" : "Add topic"}
        </Button>
      </div>
    </form>
  );
}
