"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/matches", label: "Matches" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
];

const RECRUITER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvC9fxdWIgyHp1xT9LxwIuXVNDppaswjMqEkpM13ypa2w5GQne40inHAn_ZHhc0RNeKpk18Xkqyz2D5qP1bsYMRamzo_q9ApK--GCbtKM6pcunCXnoiyuFuejHxDHYGJBqM6jMVng3xiKrZttvVoVzPY-RHGyTXeAld0vkDryec_w-mUuqPpsaR1fdtyKO9hzuUvZ8ZFXe2-BPOebECjIcwVyf64c0zu2VuRX8VE4Ni5KUsw9T1RgWaOSeesKQCQJH1ureecJakFR";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-light/90 backdrop-blur-md border-b border-gray-200">
      <div className="px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl filled">interests</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary-light">
            Tango
          </h1>
        </Link>

        {/* Nav Links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-text-primary-light"
                    : "font-medium text-text-secondary-light hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-sm hover:shadow-md">
            Post Job
          </button>
          <div
            className="size-10 rounded-full bg-gray-200 bg-center bg-cover border-2 border-white shadow-sm cursor-pointer"
            style={{ backgroundImage: `url("${RECRUITER_AVATAR}")` }}
            role="img"
            aria-label="Recruiter profile"
          />
          <button className="md:hidden p-2 text-text-primary-light">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
