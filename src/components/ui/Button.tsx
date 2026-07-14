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
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const BASE =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-50";

// Renders either a native button or clones its single child (asChild mode) so
// it can be used with Next.js <Link> while keeping the same button styling.
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
    const childClassName = child.props.className ? `${child.props.className} ${classes}` : classes;
    return cloneElement(child, { className: childClassName, ...props });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
