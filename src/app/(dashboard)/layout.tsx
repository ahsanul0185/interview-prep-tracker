import Link from "next/link";
import { redirect } from "next/navigation";
import { UserMenu } from "@/components/layout/UserMenu";
import { createClient } from "@/lib/supabase/server";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/dsa", label: "DSA" },
  { href: "/hr", label: "HR" },
  { href: "/reminders", label: "Reminders" },
];

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
    <div className="flex flex-1 flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link href="/dashboard" className="font-semibold">
            Prep Tracker
          </Link>
          <UserMenu email={user.email ?? ""} />
          <nav className="order-last flex w-full items-center gap-1 overflow-x-auto text-sm sm:order-none sm:w-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 whitespace-nowrap text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 p-4">{children}</main>
    </div>
  );
}
