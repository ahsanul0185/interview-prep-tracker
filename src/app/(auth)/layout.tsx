// Centered shell for /login and /signup (PRD 7.1).
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center p-4">{children}</div>
  );
}
