"use client";

import { useMemo, useState } from "react";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { ApplicationForm } from "@/components/applications/ApplicationForm";
import { StageCounts } from "@/components/applications/StageCounts";
import { StageFilter } from "@/components/applications/StageFilter";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { useApplications } from "@/hooks/useApplications";
import type { Application, ApplicationStage } from "@/types";

// Applications list/grid with full CRUD (PRD 7.3) + stage filter (P1).
export default function ApplicationsPage() {
  const {
    applications,
    loading,
    error,
    createApplication,
    updateApplication,
    deleteApplication,
  } = useApplications();

  const [filter, setFilter] = useState<ApplicationStage | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);
  const [toDelete, setToDelete] = useState<Application | null>(null);
  const [deleting, setDeleting] = useState(false);

  const visible = useMemo(
    () => (filter === "all" ? applications : applications.filter((a) => a.stage === filter)),
    [applications, filter]
  );

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(application: Application) {
    setEditing(application);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    const { error } = await deleteApplication(toDelete.id);
    setDeleting(false);
    if (!error) setToDelete(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track every role from wishlist to offer.
          </p>
        </div>
        <Button onClick={openAdd}>Add application</Button>
      </div>

      {!loading && applications.length > 0 && <StageCounts applications={applications} />}

      {error && (
        <p role="alert" className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Add your first application to start tracking your job search."
          action={<Button onClick={openAdd}>Add application</Button>}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <StageFilter value={filter} onChange={setFilter} />
          </div>
          {visible.length === 0 ? (
            <EmptyState title="Nothing in this stage" description="Try a different filter." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onEdit={openEdit}
                  onDelete={setToDelete}
                />
              ))}
            </div>
          )}
        </>
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editing ? "Edit application" : "Add application"}
      >
        <ApplicationForm
          initial={editing ?? undefined}
          onCancel={closeForm}
          onSubmit={async (input) => {
            const result = editing
              ? await updateApplication(editing.id, input)
              : await createApplication(input);
            if (!result.error) closeForm();
            return result;
          }}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete application"
        message={`Delete "${toDelete?.company}" and all its interview rounds? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
