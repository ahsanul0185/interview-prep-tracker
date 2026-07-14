"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isNavActive } from "./navItems";

// Mobile bottom tab bar — primary nav on small screens (usable at 320px, PRD §8).
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-gray-200 bg-white md:hidden">
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 items-center justify-center px-1 py-2.5 text-center text-[11px] leading-tight ${
              active ? "font-medium text-primary-700" : "text-gray-500"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
