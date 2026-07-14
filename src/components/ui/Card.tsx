import type { HTMLAttributes } from "react";

// Generic content container used by application/reminder cards and panels.
export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-surface shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
