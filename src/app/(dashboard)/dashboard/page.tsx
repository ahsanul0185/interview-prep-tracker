"use client";

import Link from "next/link";
import { StageCounts } from "@/components/applications/StageCounts";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { DueBadge } from "@/components/reminders/DueBadge";
import { DsaProgressBar } from "@/components/dsa/DsaProgressBar";
import { useApplications } from "@/hooks/useApplications";
import { useDsaTopics } from "@/hooks/useDsaTopics";
import { useReminders } from "@/hooks/useReminders";
import { formatDate } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/applications", label: "Applications", description: "Manage job applications" },
  { href: "/dsa", label: "DSA topics", description: "Track prep progress" },
  { href: "/hr", label: "HR questions", description: "Prepare answers" },
  { href: "/reminders", label: "Reminders", description: "Upcoming deadlines" },
];

// Dashboard overview: stage counts, DSA progress, urgent reminders, quick links (PRD §12).
export default function DashboardPage() {
  const { applications, loading: appsLoading, error: appsError } = useApplications();
  const { topics: dsaTopics, loading: dsaLoading } = useDsaTopics();
  const { reminders, loading: remindersLoading } = useReminders();

  const urgentReminders = reminders.filter(
    (r) => !r.is_done && (r.due_date <= new Date().toISOString().slice(0, 10))
  );

  const isLoading = appsLoading || dsaLoading || remindersLoading;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your job search at a glance.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {appsError && (
            <p role="alert" className="text-sm text-danger">
              {appsError}
            </p>
          )}

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Application stages
            </h2>
            {applications.length === 0 ? (
              <Card className="p-6 text-center text-sm text-gray-500">
                No applications yet.{" "}
                <Link href="/applications" className="text-primary-700 underline underline-offset-2">
                  Add your first application
                </Link>
                .
              </Card>
            ) : (
              <StageCounts applications={applications} />
            )}
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                DSA confidence
              </h2>
              <DsaProgressBar topics={dsaTopics} />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Urgent reminders
              </h2>
              <Card className="p-1">
                {urgentReminders.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">
                    No overdue or due-today reminders.{" "}
                    <Link
                      href="/reminders"
                      className="text-primary-700 underline underline-offset-2"
                    >
                      View all reminders
                    </Link>
                  </p>
                ) : (
                  <ul className="flex flex-col">
                    {urgentReminders.slice(0, 5).map((reminder) => (
                      <li
                        key={reminder.id}
                        className="flex items-center justify-between border-b border-gray-50 p-3 last:border-b-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">{reminder.title}</p>
                          <p className="text-xs text-gray-400">{formatDate(reminder.due_date)}</p>
                        </div>
                        <DueBadge dueDate={reminder.due_date} />
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Quick links
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-600 hover:bg-primary-50/30"
                >
                  <p className="font-medium text-foreground">{link.label}</p>
                  <p className="text-sm text-gray-400">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
