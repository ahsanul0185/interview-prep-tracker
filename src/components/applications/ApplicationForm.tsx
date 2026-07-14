"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { APPLICATION_STAGES } from "@/lib/constants";
import type { ApplicationInput } from "@/hooks/useApplications";
import type { Application, ApplicationStage } from "@/types";

type ApplicationFormProps = {
  initial?: Application;
  onSubmit: (input: ApplicationInput) => Promise<{ error: string | null }>;
  onCancel: () => void;
};

// Create/edit form for an application (PRD 7.3).
export function ApplicationForm({ initial, onSubmit, onCancel }: ApplicationFormProps) {
  const [company, setCompany] = useState(initial?.company ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [stage, setStage] = useState<ApplicationStage>(initial?.stage ?? "Wishlist");
  const [dateApplied, setDateApplied] = useState(initial?.date_applied ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!company.trim() || !role.trim()) {
      setError("Company and role are required.");
      return;
    }

    setSubmitting(true);
    const { error } = await onSubmit({
      company: company.trim(),
      role: role.trim(),
      stage,
      date_applied: dateApplied || null,
      link: link.trim() || null,
      notes: notes.trim() || null,
    });
    setSubmitting(false);

    if (error) setError(error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p role="alert" className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <Input
        label="Company"
        name="company"
        required
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Input
        label="Role / Title"
        name="role"
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Select
        label="Stage"
        name="stage"
        value={stage}
        onChange={(e) => setStage(e.target.value as ApplicationStage)}
      >
        {APPLICATION_STAGES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
      <Input
        label="Date applied"
        name="date_applied"
        type="date"
        value={dateApplied}
        onChange={(e) => setDateApplied(e.target.value)}
      />
      <Input
        label="Job link"
        name="link"
        type="url"
        placeholder="https://…"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Textarea
        label="Notes"
        name="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Save changes" : "Add application"}
        </Button>
      </div>
    </form>
  );
}
