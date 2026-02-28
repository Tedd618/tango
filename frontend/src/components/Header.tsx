"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/matches", label: "Matches" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                className={`text-sm transition-colors ${isActive
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
          {isLoading ? (
            <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <>
              <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-sm hover:shadow-md">
                Post Job
              </button>
              {/* User avatar with dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="size-10 rounded-full bg-gray-200 bg-center bg-cover border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-primary transition-all focus:outline-none flex items-center justify-center p-0"
                  style={user.picture ? { backgroundImage: `url("${user.picture}")` } : {}}
                  aria-label={user.name ?? "User profile"}
                  title={`Signed in as ${user.name ?? user.email}`}
                >
                  {!user.picture && (
                    <span className="material-symbols-outlined text-gray-500">
                      person
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-bold text-text-primary-light truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-text-secondary-light truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-text-primary-light hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[1.2rem]">settings</span>
                      Settings
                    </Link>
                    <a
                      href="/auth/logout"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[1.2rem]">logout</span>
                      Log out
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <a
              href="/auth/login"
              className="h-10 px-5 flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-sm hover:shadow-md"
            >
              Sign In
            </a>
          )}
          <button className="md:hidden p-2 text-text-primary-light">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
