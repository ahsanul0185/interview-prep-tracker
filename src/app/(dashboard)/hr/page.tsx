"use client";

import { useState } from "react";
import { HrQuestionForm } from "@/components/hr/HrQuestionForm";
import { HrQuestionList } from "@/components/hr/HrQuestionList";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { useHrQuestions } from "@/hooks/useHrQuestions";
import type { HrQuestion } from "@/types";

// HR question tracker (PRD 7.6).
export default function HrPage() {
  const { questions, loading, error, createQuestion, updateQuestion, deleteQuestion } =
    useHrQuestions();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<HrQuestion | null>(null);
  const [toDelete, setToDelete] = useState<HrQuestion | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(question: HrQuestion) {
    setEditing(question);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    const { error } = await deleteQuestion(toDelete.id);
    setDeleting(false);
    if (!error) setToDelete(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">HR questions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Prepare answers for common behavioral and HR questions.
          </p>
        </div>
        <Button onClick={openAdd}>Add question</Button>
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
      ) : questions.length === 0 ? (
        <EmptyState
          title="No questions yet"
          description="Add your first HR question and answer notes."
          action={<Button onClick={openAdd}>Add question</Button>}
        />
      ) : (
        <HrQuestionList
          questions={questions}
          onEdit={openEdit}
          onDelete={setToDelete}
          onStateChange={(id, state) => updateQuestion(id, { state })}
        />
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editing ? "Edit question" : "Add question"}
      >
        <HrQuestionForm
          initial={editing ?? undefined}
          onCancel={closeForm}
          onSubmit={async (input) => {
            const result = editing
              ? await updateQuestion(editing.id, input)
              : await createQuestion(input);
            if (!result.error) closeForm();
            return result;
          }}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete question"
        message={`Delete this HR question?`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
