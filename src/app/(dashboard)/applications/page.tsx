"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ApplicationForm } from "@/components/applications/ApplicationForm";
import { StageBadge } from "@/components/applications/StageBadge";
import { StageCounts } from "@/components/applications/StageCounts";
import { StageFilter } from "@/components/applications/StageFilter";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { useApplications } from "@/hooks/useApplications";
import { formatDate } from "@/lib/utils";
import type { Application, ApplicationStage } from "@/types";

// Applications list as a reusable data table with pagination and filter (PRD 7.3 + P1).
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

  const stageFiltered = useMemo(
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
          <h1 className="text-2xl font-light tracking-tight text-foreground">Applications</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track every role from wishlist to offer.
          </p>
        </div>
        <Button onClick={openAdd}>Add application</Button>
      </div>

      {!loading && applications.length > 0 && <StageCounts applications={applications} />}

      {error && (
        <p role="alert" className="text-sm text-danger">
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
        <DataTable
          data={stageFiltered}
          columns={[
            {
              header: "Company",
              accessor: "company",
              cell: (row) => (
                <Link
                  href={`/applications/${row.id}`}
                  className="font-medium text-foreground hover:text-primary-700 hover:underline"
                >
                  {row.company}
                </Link>
              ),
            },
            { header: "Role", accessor: "role" },
            {
              header: "Stage",
              accessor: "stage",
              cell: (row) => <StageBadge stage={row.stage} />,
            },
            {
              header: "Date applied",
              accessor: "date_applied",
              cell: (row) => (row.date_applied ? formatDate(row.date_applied) : "—"),
            },
            {
              header: "Notes",
              accessor: "notes",
              cell: (row) => (
                <span className="block max-w-xs truncate text-gray-500">
                  {row.notes || "—"}
                </span>
              ),
            },
            {
              header: "Actions",
              cell: (row) => (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(row)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setToDelete(row)}>
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
          filterPlaceholder="Search company, role, notes…"
          filterKeys={["company", "role", "notes"]}
          emptyTitle="No applications match"
          emptyDescription="Try a different search or stage filter."
        >
          <StageFilter value={filter} onChange={setFilter} />
        </DataTable>
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
