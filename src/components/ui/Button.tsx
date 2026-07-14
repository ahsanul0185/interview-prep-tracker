import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

const VARIANTS = {
  primary:
    "border border-primary-600 bg-primary-600 text-white hover:bg-primary-700 hover:border-primary-700",
  secondary:
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
  ghost: "border border-transparent text-gray-600 hover:bg-gray-100",
  danger:
    "border border-danger bg-danger text-white hover:bg-danger/90",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const BASE =
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600/40 disabled:cursor-not-allowed disabled:opacity-50";

// Soft modern button with background, border, and small rounded corners.
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  asChild,
  children,
  ...props
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (asChild && isValidElement(children)) {
    const child = Children.only(children) as ReactElement<{ className?: string }>;
    const childClassName = child.props.className
      ? `${child.props.className} ${classes}`
      : classes;
    return cloneElement(child, { className: childClassName, ...props });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
