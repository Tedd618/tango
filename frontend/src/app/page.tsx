import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Minimal header */}
      <header className="px-8 py-5 flex items-center gap-2">
        <div className="size-8 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl filled">interests</span>
        </div>
        <span className="text-2xl font-tiempos tracking-tight text-white">Tango</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-none">
            the employment hub
            <br />
            <span className="text-primary font-tiempos">designed to be deleted</span>
          </h1>
          <p className="max-w-md text-lg text-white/80">
            Tango connects recruiters with talent through impact and personality, not buzzwords.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/discover"
            className="flex items-center gap-2 rounded-full bg-primary hover:bg-primary-dark px-8 py-3 text-base font-bold text-white transition-all shadow-sm hover:shadow-md"
          >
            <span className="material-symbols-outlined filled">explore</span>
            let&apos;s Tango
          </Link>
        </div>
      </main>

      <footer className="px-8 py-5 text-center text-xs text-white/50">
        © 2025 Tango. All rights reserved.
      </footer>
    </div>
  );
}
