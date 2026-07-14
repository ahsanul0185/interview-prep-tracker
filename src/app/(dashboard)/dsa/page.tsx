"use client";

import { useState } from "react";
import { DsaProgressBar } from "@/components/dsa/DsaProgressBar";
import { DsaTopicForm } from "@/components/dsa/DsaTopicForm";
import { DsaTopicList } from "@/components/dsa/DsaTopicList";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { useDsaTopics } from "@/hooks/useDsaTopics";
import type { DsaTopic } from "@/types";

// DSA topic tracker with confidence progress (PRD 7.5).
export default function DsaPage() {
  const { topics, loading, error, createTopic, updateTopic, deleteTopic } = useDsaTopics();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<DsaTopic | null>(null);
  const [toDelete, setToDelete] = useState<DsaTopic | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(topic: DsaTopic) {
    setEditing(topic);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    const { error } = await deleteTopic(toDelete.id);
    setDeleting(false);
    if (!error) setToDelete(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">DSA topics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track topics and build confidence step by step.
          </p>
        </div>
        <Button onClick={openAdd}>Add topic</Button>
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
      ) : topics.length === 0 ? (
        <EmptyState
          title="No topics yet"
          description="Add your first DSA topic to start tracking your prep."
          action={<Button onClick={openAdd}>Add topic</Button>}
        />
      ) : (
        <>
          <DsaProgressBar topics={topics} />
          <DsaTopicList
            topics={topics}
            onEdit={openEdit}
            onDelete={setToDelete}
            onStatusChange={(id, status) => updateTopic(id, { status })}
          />
        </>
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editing ? "Edit topic" : "Add topic"}
      >
        <DsaTopicForm
          initial={editing ?? undefined}
          onCancel={closeForm}
          onSubmit={async (input) => {
            const result = editing
              ? await updateTopic(editing.id, input)
              : await createTopic(input);
            if (!result.error) closeForm();
            return result;
          }}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete topic"
        message={`Delete "${toDelete?.name}"?`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
