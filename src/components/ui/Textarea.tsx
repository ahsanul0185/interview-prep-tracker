import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

// Soft textarea with small rounded corners and a subtle border.
export function Textarea({
  label,
  error,
  id,
  rows = 3,
  className = "",
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={textareaId}
        className="text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`resize-y rounded-md border bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-gray-200 hover:border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
