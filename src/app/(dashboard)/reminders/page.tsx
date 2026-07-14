"use client";

import { useState } from "react";
import { ReminderForm } from "@/components/reminders/ReminderForm";
import { ReminderList } from "@/components/reminders/ReminderList";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { useApplications } from "@/hooks/useApplications";
import { useReminders } from "@/hooks/useReminders";
import type { Reminder } from "@/types";

// Reminders tracker with overdue / due-today flags (PRD 7.7).
export default function RemindersPage() {
  const {
    reminders,
    loading,
    error,
    createReminder,
    updateReminder,
    deleteReminder,
  } = useReminders();
  const { applications } = useApplications();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Reminder | null>(null);
  const [toDelete, setToDelete] = useState<Reminder | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(reminder: Reminder) {
    setEditing(reminder);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function handleToggleDone(reminder: Reminder) {
    await updateReminder(reminder.id, { is_done: !reminder.is_done });
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    const { error } = await deleteReminder(toDelete.id);
    setDeleting(false);
    if (!error) setToDelete(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reminders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay on top of follow-ups and interview deadlines.
          </p>
        </div>
        <Button onClick={openAdd}>Add reminder</Button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : reminders.length === 0 ? (
        <EmptyState
          title="No reminders yet"
          description="Add your first reminder so nothing slips through the cracks."
          action={<Button onClick={openAdd}>Add reminder</Button>}
        />
      ) : (
        <ReminderList
          reminders={reminders}
          applications={applications}
          onToggleDone={handleToggleDone}
          onEdit={openEdit}
          onDelete={setToDelete}
        />
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editing ? "Edit reminder" : "Add reminder"}
      >
        <ReminderForm
          initial={editing ?? undefined}
          onCancel={closeForm}
          onSubmit={async (input) => {
            const result = editing
              ? await updateReminder(editing.id, input)
              : await createReminder(input);
            if (!result.error) closeForm();
            return result;
          }}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete reminder"
        message={`Delete "${toDelete?.title}"?`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
