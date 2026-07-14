import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
};

const VARIANTS: Record<string, string> = {
  primary: "border-primary-200 bg-primary-50 text-primary-700",
  success: "border-success-bg bg-success-bg text-success",
  warning: "border-warning-bg bg-warning-bg text-warning",
  danger: "border-danger-bg bg-danger-bg text-danger",
  info: "border-info-bg bg-info-bg text-info",
  neutral: "border-gray-200 bg-gray-100 text-gray-700",
};

// Soft status badge with background, border, and small rounded corners.
export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
