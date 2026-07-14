"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { NAV_ITEMS, isNavActive } from "./navItems";

// Minimal desktop sidebar — no border, flat nav.
export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col bg-white md:sticky md:top-0 md:flex md:h-screen">
      <Link
        href="/dashboard"
        className="px-5 py-5 text-sm font-semibold tracking-tight text-foreground"
      >
        Prep Tracker
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm transition-colors ${
                active
                  ? "font-medium text-primary-700"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-3">
        <UserMenu email={email} />
      </div>
    </aside>
  );
}
