"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { NAV_ITEMS, isNavActive } from "./navItems";

// Desktop sidebar — brand, primary nav with active state, user menu at the
// bottom. Sticky so it stays put while the main content scrolls.
export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white md:sticky md:top-0 md:flex md:h-screen">
      <Link
        href="/dashboard"
        className="px-5 py-4 text-lg font-bold text-primary-700"
      >
        Prep Tracker
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-primary-50 font-medium text-primary-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <UserMenu email={email} />
      </div>
    </aside>
  );
}
