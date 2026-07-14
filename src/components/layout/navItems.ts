export type NavItem = { href: string; label: string };

// Shared by Sidebar (desktop) and MobileNav (mobile bottom bar).
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/dsa", label: "DSA" },
  { href: "/hr", label: "HR" },
  { href: "/reminders", label: "Reminders" },
];

export function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
