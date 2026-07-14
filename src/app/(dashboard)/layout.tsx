import Link from "next/link";
import { redirect } from "next/navigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserMenu } from "@/components/layout/UserMenu";
import { createClient } from "@/lib/supabase/server";

// App shell for all protected routes (PRD 7.1). src/proxy.ts already
// redirects unauthenticated users — this getUser() check is defense in depth.
//
// Layout: sticky sidebar on desktop (md+), top bar + bottom tab bar on mobile.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1">
      <Sidebar email={user.email ?? ""} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar — hidden on desktop where the sidebar shows brand */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <Link
            href="/dashboard"
            className="text-lg font-bold text-primary-700"
          >
            Prep Tracker
          </Link>
          <UserMenu email={user.email ?? ""} showEmail={false} />
        </header>

        {/* pb-24 keeps content clear of the mobile bottom tab bar */}
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
