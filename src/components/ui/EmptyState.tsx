import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

// Soft empty state with background and border.
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      {description && <p className="max-w-sm text-sm text-gray-400">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
