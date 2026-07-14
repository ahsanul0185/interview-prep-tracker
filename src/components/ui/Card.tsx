import type { HTMLAttributes } from "react";

// Soft container with small rounded corners and a subtle border.
export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-surface ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
