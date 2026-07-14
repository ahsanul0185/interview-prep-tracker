"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T extends { id: string }> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  filterPlaceholder?: string;
  filterKeys?: Array<keyof T>;
  emptyTitle: string;
  emptyDescription?: string;
  children?: ReactNode;
};

// Generic sortable-style table with client-side text filter and pagination.
// Designed to be reusable across applications, DSA topics, HR questions, and reminders.
export function DataTable<T extends { id: string }>({
  data,
  columns,
  pageSize = 10,
  filterPlaceholder = "Search…",
  filterKeys,
  emptyTitle,
  emptyDescription,
  children,
}: DataTableProps<T>) {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);

  const keys = useMemo(
    () =>
      filterKeys ??
      (columns
        .map((c) => c.accessor)
        .filter((k): k is keyof T => k !== undefined) as Array<keyof T>),
    [columns, filterKeys]
  );

  const filtered = useMemo(() => {
    const text = filterText.trim().toLowerCase();
    if (!text) return data;
    return data.filter((row) =>
      keys.some((key) => {
        const value = row[key];
        if (typeof value === "string") return value.toLowerCase().includes(text);
        return false;
      })
    );
  }, [data, filterText, keys]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );

  // Reset to page 1 when filter changes to avoid empty pages.
  function handleFilterChange(value: string) {
    setFilterText(value);
    setPage(1);
  }

  function renderCell(row: T, column: Column<T>) {
    if (column.cell) return column.cell(row);
    if (column.accessor) return String(row[column.accessor] ?? "—");
    return "—";
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full max-w-xs">
          <Input
            label="Search"
            name="search"
            type="search"
            placeholder={filterPlaceholder}
            value={filterText}
            onChange={(e) => handleFilterChange(e.target.value)}
          />
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <Card className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  {columns.map((column, idx) => (
                    <th
                      key={idx}
                      className={`px-4 py-3 font-medium text-gray-700 ${column.className ?? ""}`}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60"
                  >
                    {columns.map((column, idx) => (
                      <td
                        key={idx}
                        className={`whitespace-nowrap px-4 py-3 text-foreground ${column.className ?? ""}`}
                      >
                        {renderCell(row, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-gray-500">
              Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, filtered.length)} of {filtered.length}
              {filterText ? " filtered" : ""}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </Button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setPage(p)}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page >= pageCount}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
