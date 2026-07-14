import Link from "next/link";
import { redirect } from "next/navigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserMenu } from "@/components/layout/UserMenu";
import { createClient } from "@/lib/supabase/server";

// App shell for all protected routes (PRD 7.1). src/proxy.ts already
// redirects unauthenticated users — this getUser() check is defense in depth.
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
        {/* Mobile top bar */}
        <header className="flex items-center justify-between bg-white px-4 py-3 md:hidden">
          <Link
            href="/dashboard"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            Prep Tracker
          </Link>
          <UserMenu email={user.email ?? ""} showEmail={false} />
        </header>

        {/* pb-24 keeps content clear of the mobile bottom tab bar */}
        <main className="mx-auto w-full max-w-5xl flex-1 p-5 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
