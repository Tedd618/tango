"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/discover", label: "Discover", icon: "travel_explore" },
  { href: "/matches", label: "Matches", icon: "favorite" },
  { href: "/profile", label: "Profile", icon: "person" },
];

const NAV_ROUTES = navItems.map((i) => i.href);

export default function BottomNav() {
  const pathname = usePathname();

  if (!NAV_ROUTES.includes(pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light/90 backdrop-blur-md border-t border-gray-100">
      <div className="flex items-center justify-center gap-10 max-w-lg mx-auto px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center px-4 py-1 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-text-secondary-light hover:text-text-primary-light"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[1.4rem] ${isActive ? "filled" : ""}`}
              >
                {item.icon}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}