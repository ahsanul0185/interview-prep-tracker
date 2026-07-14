"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isNavActive } from "./navItems";

// Mobile bottom tab bar with active top-border indicator.
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-gray-100 bg-white md:hidden">
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-1 items-center justify-center px-1 py-2.5 text-center text-[11px] leading-tight transition-colors ${
              active
                ? "font-medium text-primary-700"
                : "text-gray-500"
            }`}
          >
            {active && (
              <span className="absolute inset-x-2 top-0 h-0.5 rounded-b bg-primary-600" />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
