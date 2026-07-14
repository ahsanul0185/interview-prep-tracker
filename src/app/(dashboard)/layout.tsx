// App shell for all protected routes (PRD 7.1 — route protection happens in src/proxy.ts).
// TODO: <Sidebar/> + <MobileNav/> navigation and <UserMenu/> — see src/components/layout/.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-full max-w-5xl flex-1 p-4">{children}</div>;
}
