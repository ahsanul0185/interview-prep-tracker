const SIZES = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

// Loading indicator for async Supabase operations.
export function Spinner({
  size = "md",
  className = "",
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${SIZES[size]} ${className}`}
    />
  );
}
