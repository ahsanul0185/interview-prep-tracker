"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useApplications } from "@/hooks/useApplications";
import type { ReminderInput } from "@/hooks/useReminders";
import type { Reminder } from "@/types";

type ReminderFormProps = {
  initial?: Reminder;
  onSubmit: (input: ReminderInput) => Promise<{ error: string | null }>;
  onCancel: () => void;
};

// Create/edit form for a reminder (PRD 7.7).
export function ReminderForm({ initial, onSubmit, onCancel }: ReminderFormProps) {
  const { applications, loading: appsLoading } = useApplications();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [dueDate, setDueDate] = useState(initial?.due_date ?? "");
  const [applicationId, setApplicationId] = useState(initial?.application_id ?? "none");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!dueDate) {
      setError("Due date is required.");
      return;
    }

    setSubmitting(true);
    const { error } = await onSubmit({
      title: title.trim(),
      due_date: dueDate,
      application_id: applicationId === "none" ? null : applicationId,
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

      <Input
        label="Title"
        name="title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        label="Due date"
        name="due_date"
        type="date"
        required
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <Select
        label="Linked application (optional)"
        name="application_id"
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value)}
        disabled={appsLoading}
      >
        <option value="none">None</option>
        {applications.map((app) => (
          <option key={app.id} value={app.id}>
            {app.company} — {app.role}
          </option>
        ))}
      </Select>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Save changes" : "Add reminder"}
        </Button>
      </div>
    </form>
  );
}
