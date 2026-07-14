"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { StageBadge } from "@/components/applications/StageBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useApplication } from "@/hooks/useApplication";
import { formatDate } from "@/lib/utils";

// Application detail view (PRD 7.3) with a placeholder for interview rounds (Module 3).
export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { application, loading, error } = useApplication(id);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col gap-4">
        <Button variant="ghost" asChild className="w-fit">
          <Link href="/applications">&larr; Back to applications</Link>
        </Button>
        <p role="alert" className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">
          {error ?? "Application not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Button variant="ghost" asChild className="w-fit">
          <Link href="/applications">&larr; Back to applications</Link>
        </Button>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{application.company}</h1>
            <p className="text-gray-600">{application.role}</p>
          </div>
          <StageBadge stage={application.stage} />
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Date applied
            </dt>
            <dd className="text-sm text-foreground">
              {application.date_applied ? formatDate(application.date_applied) : "—"}
            </dd>
          </div>
          {application.link && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Job link
              </dt>
              <dd className="text-sm">
                <a
                  href={application.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary-700 underline"
                >
                  {application.link}
                </a>
              </dd>
            </div>
          )}
          {application.notes && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Notes</dt>
              <dd className="whitespace-pre-wrap text-sm text-foreground">{application.notes}</dd>
            </div>
          )}
        </dl>
      </Card>

      <section className="rounded-xl border border-dashed border-gray-300 bg-white/50 p-6 text-center">
        <h2 className="text-sm font-semibold text-gray-700">Interview rounds</h2>
        <p className="mt-1 text-sm text-gray-500">
          Round tracking will be added in the next module.
        </p>
      </section>
    </div>
  );
}
