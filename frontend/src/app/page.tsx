import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Minimal header */}
      <header className="px-8 py-5 flex items-center gap-2">
        <div className="size-8 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl filled">interests</span>
        </div>
        <span className="text-2xl font-bold tracking-tight text-text-primary-light">Tango</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
            <span className="material-symbols-outlined text-base">bolt</span>
            Now in beta
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary-light leading-none">
            Hire like you&apos;re
            <br />
            <span className="text-primary">swiping right</span>
          </h1>
          <p className="max-w-md text-lg text-text-secondary-light">
            Tango connects recruiters with top talent through a swipe-first discovery experience.
            Find your next hire, not just a résumé.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/discover"
            className="flex items-center gap-2 rounded-full bg-primary hover:bg-primary-dark px-8 py-3 text-base font-bold text-white transition-all shadow-sm hover:shadow-md"
          >
            <span className="material-symbols-outlined filled">explore</span>
            Start Discovering
          </Link>
          <Link
            href="/matches"
            className="flex items-center gap-2 rounded-full border-2 border-gray-200 hover:border-primary px-8 py-3 text-base font-semibold text-text-primary-light hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined">forum</span>
            View Matches
          </Link>
        </div>

        {/* Quick nav pills */}
        <div className="flex gap-3 flex-wrap justify-center mt-4">
          {[
            { href: "/discover", label: "Discover", icon: "person_search" },
            { href: "/matches", label: "Matches", icon: "favorite" },
            { href: "/profile", label: "Profile", icon: "manage_accounts" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 bg-surface-light border border-gray-200 hover:border-primary hover:text-primary text-text-secondary-light px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-soft"
            >
              <span className="material-symbols-outlined text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </main>

      <footer className="px-8 py-5 text-center text-xs text-text-secondary-light">
        © 2025 Tango. All rights reserved.
      </footer>
    </div>
  );
}
