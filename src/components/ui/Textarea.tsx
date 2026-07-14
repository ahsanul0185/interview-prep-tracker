import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

// Labeled multiline input (application/round/HR notes).
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
    <div className="flex flex-col gap-1">
      <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`resize-y rounded-lg border bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/20"
            : "border-gray-300 focus:border-primary-600 focus:ring-primary-600/20"
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
