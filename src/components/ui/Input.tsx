import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

// Soft input with small rounded corners and a subtle border.
export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`rounded-md border bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-gray-200 hover:border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
