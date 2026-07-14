import Link from "next/link";

// Centered shell for /login and /signup (PRD 7.1) with brand mark.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-5">
      <Link
        href="/"
        className="text-sm font-semibold uppercase tracking-widest text-foreground"
      >
        Interview Prep Tracker
      </Link>
      {children}
    </div>
  );
}
