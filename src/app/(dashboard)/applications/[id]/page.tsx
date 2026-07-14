"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { StageBadge } from "@/components/applications/StageBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { RoundForm } from "@/components/rounds/RoundForm";
import { RoundList } from "@/components/rounds/RoundList";
import { useApplication } from "@/hooks/useApplication";
import { useInterviewRounds } from "@/hooks/useInterviewRounds";
import { formatDate } from "@/lib/utils";
import type { InterviewRound } from "@/types";

// Application detail view with interview rounds (PRD 7.3 + 7.4).
export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { application, loading: appLoading, error: appError } = useApplication(id);
  const {
    rounds,
    loading: roundsLoading,
    error: roundsError,
    createRound,
    updateRound,
    deleteRound,
  } = useInterviewRounds(id);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRound, setEditingRound] = useState<InterviewRound | null>(null);
  const [toDelete, setToDelete] = useState<InterviewRound | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openAddRound() {
    setEditingRound(null);
    setFormOpen(true);
  }

  function openEditRound(round: InterviewRound) {
    setEditingRound(round);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingRound(null);
  }

  async function handleDeleteRound() {
    if (!toDelete) return;
    setDeleting(true);
    const { error } = await deleteRound(toDelete.id);
    setDeleting(false);
    if (!error) setToDelete(null);
  }

  if (appLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (appError || !application) {
    return (
      <div className="flex flex-col gap-4">
        <Button variant="ghost" asChild className="w-fit">
          <Link href="/applications">&larr; Back to applications</Link>
        </Button>
        <p role="alert" className="text-sm text-danger">
          {appError ?? "Application not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant="ghost" asChild className="w-fit">
        <Link href="/applications">&larr; Back to applications</Link>
      </Button>

      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {application.company}
            </h1>
            <p className="text-gray-500">{application.role}</p>
          </div>
          <StageBadge stage={application.stage} />
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Date applied
            </dt>
            <dd className="text-sm text-foreground">
              {application.date_applied ? formatDate(application.date_applied) : "—"}
            </dd>
          </div>
          {application.link && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Job link
              </dt>
              <dd className="text-sm">
                <a
                  href={application.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary-700 underline underline-offset-2"
                >
                  {application.link}
                </a>
              </dd>
            </div>
          )}
          {application.notes && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">Notes</dt>
              <dd className="max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {application.notes}
              </dd>
            </div>
          )}
        </dl>
      </Card>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interview rounds</h2>
          <Button onClick={openAddRound}>Add round</Button>
        </div>

        {roundsError && (
          <p role="alert" className="text-sm text-danger">
            {roundsError}
          </p>
        )}

        {roundsLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <RoundList
            rounds={rounds}
            onEdit={openEditRound}
            onDelete={setToDelete}
            onStatusChange={(roundId, status) => updateRound(roundId, { status })}
          />
        )}
      </section>

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editingRound ? "Edit round" : "Add round"}
      >
        <RoundForm
          initial={editingRound ?? undefined}
          onCancel={closeForm}
          onSubmit={async (input) => {
            const result = editingRound
              ? await updateRound(editingRound.id, input)
              : await createRound(input);
            if (!result.error) closeForm();
            return result;
          }}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete round"
        message={`Delete the "${toDelete?.round_type}" round? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDeleteRound}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
