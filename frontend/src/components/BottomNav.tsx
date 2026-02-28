"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { fetchCurrentUser, fetchUnreadTotal } from "@/lib/api";

const navItems = [
  { href: "/discover", label: "Discover", icon: "travel_explore" },
  { href: "/matches", label: "Matches", icon: "favorite" },
  { href: "/profile", label: "Profile", icon: "person" },
];

const NAV_ROUTES = navItems.map((i) => i.href);

export default function BottomNav() {
  const pathname = usePathname();
  const { user: authUser } = useUser();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!authUser?.email) return;

    const checkUnread = async () => {
      try {
        const currentUser = await fetchCurrentUser(authUser.email!);
        if (currentUser) {
          const { count } = await fetchUnreadTotal(currentUser.id);
          setUnreadCount(count);
        }
      } catch (e) {
        console.error("Failed to fetch unread count", e);
      }
    };

    checkUnread();
    const interval = setInterval(checkUnread, 5000); // Check every 5s

    return () => clearInterval(interval);
  }, [authUser]);

  if (!NAV_ROUTES.includes(pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light/95 backdrop-blur-md border-t border-gray-100 flex justify-center">
      <div className="flex items-center justify-around w-full max-w-lg px-6 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isMatches = item.href === "/matches";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ${isActive
                ? "text-primary scale-110"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <span
                className={`material-symbols-outlined text-[1.6rem] transition-transform ${isActive ? "filled" : ""}`}
              >
                {item.icon}
              </span>

              {isMatches && unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black text-white border-2 border-white shadow-sm animate-in fade-in zoom-in duration-300">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}

              <span className="text-[10px] font-black uppercase tracking-tighter mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}