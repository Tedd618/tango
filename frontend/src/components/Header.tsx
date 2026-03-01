"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useRef, useEffect } from "react";
import { fetchCurrentUser, UserProfile } from "@/lib/api";

export default function Header() {
  const { user, isLoading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dbUser, setDbUser] = useState<UserProfile | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadDbUser() {
      if (user?.email) {
        try {
          const profile = await fetchCurrentUser(user.email);
          setDbUser(profile);
        } catch (e) {
          console.error("Failed to load user role", e);
        }
      }
    }
    loadDbUser();
  }, [user?.email]);

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
      <div className="px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl filled">interests</span>
          </div>
          <h1 className="text-2xl font-tiempos text-text-primary-light">
            Tango
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <>
              {/* Role Badge */}
              {dbUser && (
                <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {dbUser.role}
                  </span>
                </div>
              )}

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
                    <span className="material-symbols-outlined text-gray-500">person</span>
                  )}
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-bold text-text-primary-light truncate">{user.name}</p>
                      <p className="text-xs text-text-secondary-light truncate">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 cursor-default">
                      <span className="material-symbols-outlined text-[1.2rem]">settings</span>
                      Settings
                    </div>
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
              className="h-9 px-4 flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  );
}