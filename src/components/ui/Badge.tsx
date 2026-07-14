import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
};

const VARIANTS = {
  primary: "bg-primary-50 text-primary-700",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  info: "bg-info-bg text-info",
  neutral: "bg-gray-100 text-gray-700",
};

// Small status pill — base for StageBadge, RoundStatusBadge, DueBadge.
export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
