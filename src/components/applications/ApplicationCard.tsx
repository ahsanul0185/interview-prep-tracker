"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StageBadge } from "@/components/applications/StageBadge";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

type ApplicationCardProps = {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
};

// Single application in the list/grid (PRD 7.3).
export function ApplicationCard({ application, onEdit, onDelete }: ApplicationCardProps) {
  const { id, company, role, stage, date_applied, link, notes } = application;

  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link
            href={`/applications/${id}`}
            className="block truncate text-base font-semibold text-foreground hover:text-primary-700"
          >
            {company}
          </Link>
          <p className="truncate text-sm text-gray-500">{role}</p>
        </div>
        <StageBadge stage={stage} />
      </div>

      {date_applied && (
        <p className="text-xs text-gray-500">Applied {formatDate(date_applied)}</p>
      )}

      {notes && <p className="line-clamp-2 text-sm text-gray-600">{notes}</p>}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm text-primary-700 underline"
        >
          {link}
        </a>
      )}

      <div className="mt-auto flex justify-end gap-2 pt-1">
        <Button variant="ghost" size="sm" onClick={() => onEdit(application)}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(application)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
