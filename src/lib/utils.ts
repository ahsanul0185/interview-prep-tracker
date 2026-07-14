// Small shared helpers.

// cn — merge class names, dropping falsy values. Lightweight stand-in for
// clsx/tailwind-merge (not installed) for conditional Tailwind classes.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Parse a "YYYY-MM-DD" date string (Supabase `date` columns) into a local
// Date at midnight. Parsing parts avoids the UTC-offset shift that
// `new Date("YYYY-MM-DD")` would introduce.
function parseDateOnly(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function todayDateOnly(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// isDueToday — the reminder's due date is today (PRD 7.7).
export function isDueToday(dueDate: string): boolean {
  return parseDateOnly(dueDate).getTime() === todayDateOnly().getTime();
}

// isOverdue — the due date is strictly before today (PRD 7.7).
export function isOverdue(dueDate: string): boolean {
  return parseDateOnly(dueDate).getTime() < todayDateOnly().getTime();
}

// formatDate — human-readable "Jul 14, 2026" for display.
export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  return parseDateOnly(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
