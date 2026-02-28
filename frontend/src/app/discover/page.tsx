import Header from "@/components/Header";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { fetchCurrentUser } from "@/lib/api";

const SARAH_PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDX6O6_0yNg4g8NbfEwiqVvVzS03VQ7QgM8vP5dNkF-ZSwbFs3AvATHUCZWMm5IkPjBDMvgTo1fDi7AQDmll8M6SyAC8_k6RqCf5n6Pumlq0FQdSemWMuBrZceYiSa1gmD4UEpmkfD_2msf1fdZoQ8qpuc2gMlMxtHc4A2a15hxigtPObCSWO9NWzyt2R9Th6Je47mv37BwuiHpS3tzzn2u1pUYf2dDoM3fI-Tll37dMO4B5QGMNNR6a0xyznzuJz60oEeED5Ry9Wgg";

const TEAM_PHOTO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAj1Ag-h3UChiUHLYK0flg9mr9HE_81sCc86laU6UyHP5rZzXL8NECMTImyRST1hkDskPajgJo9MPi9Raju--kjjlCVaN_NbFh_ZcnwZS3eJNbPNlzDCAffwI0ki8-2Hrsez8eBiswrD_Li5wK4ggG97WnVovfpEUHKBNCZOvSUtxE7sdUNVvjXMqScDNAynv3UBGqKCXnqXoGlLOnAhsk7GjfqQ8f-Nh5CQqsNkIE0GxEweqqNMjJW8cCPwcV1XyXr_fgwbHv15ag7";

export default async function DiscoverPage() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login?returnTo=/discover");
  }

  const user = await fetchCurrentUser(session.user.email!);
  if (!user) {
    redirect("/onboarding");
  }

  return (
    <div className="bg-background-light min-h-screen flex flex-col text-text-primary-light">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 pb-32">
        {/* Mobile floating action bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-surface-light p-2 rounded-full shadow-lg border border-gray-100 md:hidden">
          <button className="size-14 rounded-full flex items-center justify-center bg-white text-red-500 shadow-soft border border-gray-100 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <button className="size-10 rounded-full flex items-center justify-center bg-white text-yellow-500 shadow-soft border border-gray-100 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">star</span>
          </button>
          <button className="size-14 rounded-full flex items-center justify-center bg-white text-primary shadow-soft border border-gray-100 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-3xl filled">favorite</span>
          </button>
        </div>

        {/* Profile card stack */}
        <div className="relative w-full flex flex-col gap-6">
          {/* Primary photo card */}
          <div className="group relative w-full aspect-[4/5] md:aspect-[16/10] rounded-xl overflow-hidden bg-gray-200 shadow-soft hover:shadow-lg transition-shadow">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${SARAH_PORTRAIT}")` }}
              aria-label="Sarah Jenkins portrait"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-3xl md:text-4xl font-bold">Sarah Jenkins</h2>
                  <span className="text-xl md:text-2xl font-medium opacity-90">28</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base font-medium opacity-90">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[1.2em]">work</span>
                    UX Designer
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[1.2em]">location_on</span>
                    San Francisco, CA
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[1.2em]">school</span>
                    Stanford University
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop like overlay button */}
            <button className="hidden md:flex absolute bottom-8 right-8 size-14 rounded-full bg-surface-light hover:bg-primary text-primary hover:text-white items-center justify-center shadow-lg transition-all transform hover:scale-110">
              <span className="material-symbols-outlined text-3xl filled">favorite</span>
            </button>
          </div>

          {/* Prompt card — "I'm best at..." */}
          <div className="bg-surface-light rounded-xl p-8 shadow-soft border border-gray-100 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <p className="text-sm font-bold uppercase tracking-wider text-text-secondary-light">
                  I&apos;m best at...
                </p>
                <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-text-primary-light">
                  &ldquo;Rapid prototyping and user research synthesis. I love turning chaotic data
                  into clear design decisions.&rdquo;
                </p>
              </div>
              <button className="mt-4 md:mt-0 md:ml-6 shrink-0 size-12 rounded-full border border-gray-200 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl">favorite</span>
              </button>
            </div>
          </div>

          {/* Poll card */}
          <div className="bg-surface-light rounded-xl p-8 shadow-soft border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <p className="text-sm font-bold uppercase tracking-wider text-text-secondary-light">
                  Poll: What&apos;s most important in a team?
                </p>
                <div className="space-y-3">
                  {/* Selected option */}
                  <div className="relative overflow-hidden rounded-lg bg-background-light p-4 border-2 border-primary">
                    <div className="flex justify-between items-center relative z-10">
                      <span className="font-bold text-lg">Psychological Safety</span>
                      <span className="material-symbols-outlined text-primary filled">
                        check_circle
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-primary/10 z-0" />
                  </div>
                  {/* Other options */}
                  {["Clear Direction", "Autonomy"].map((option) => (
                    <div
                      key={option}
                      className="relative overflow-hidden rounded-lg bg-background-light p-4 border border-transparent opacity-60"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <button className="size-12 rounded-full border border-gray-200 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-2xl">favorite</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2-col: team photo + dream project prompt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="h-64 md:h-auto rounded-xl overflow-hidden relative shadow-soft bg-gray-200"
              style={{ backgroundImage: `url("${TEAM_PHOTO}")` }}
              role="img"
              aria-label="Team working together on a whiteboard"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${TEAM_PHOTO}")` }} />
            </div>
            <div className="bg-surface-light rounded-xl p-8 shadow-soft border border-gray-100 flex flex-col justify-center gap-4 relative">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-text-secondary-light">
                  My dream project is...
                </p>
                <p className="text-xl md:text-2xl font-serif italic mt-2 leading-relaxed text-text-primary-light">
                  &ldquo;Designing accessible interfaces for elderly users to help them connect with
                  family.&rdquo;
                </p>
              </div>
              <button className="absolute top-6 right-6 md:static md:self-end size-12 rounded-full border border-gray-200 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl">favorite</span>
              </button>
            </div>
          </div>

          {/* Resume peek */}
          <div className="mt-4 bg-white rounded-t-xl shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] border-t border-l border-r border-gray-100 overflow-hidden">
            <div className="w-full p-4 bg-surface-light flex items-center justify-between cursor-pointer group hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <p className="font-bold text-text-primary-light">View Resume</p>
                  <p className="text-xs text-text-secondary-light">
                    Sarah_Jenkins_CV_2023.pdf
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary-light group-hover:rotate-180 transition-transform duration-300">
                keyboard_arrow_down
              </span>
            </div>
          </div>
        </div>

        {/* Desktop fixed action bar */}
        <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 items-center gap-6 z-40 bg-white/80 backdrop-blur-md p-3 px-6 rounded-full shadow-lg border border-gray-200">
          <button className="group flex flex-col items-center gap-1">
            <div className="size-14 rounded-full flex items-center justify-center bg-surface-light text-red-500 shadow-soft border border-gray-200 hover:bg-red-50 hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-3xl">close</span>
            </div>
            <span className="text-xs font-bold text-text-secondary-light group-hover:text-red-500 transition-colors">
              Pass
            </span>
          </button>
          <button className="group flex flex-col items-center gap-1 mx-2">
            <div className="size-10 rounded-full flex items-center justify-center bg-surface-light text-yellow-500 shadow-soft border border-gray-200 hover:bg-yellow-50 hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-xl">star</span>
            </div>
            <span className="text-xs font-bold text-text-secondary-light group-hover:text-yellow-500 transition-colors">
              Shortlist
            </span>
          </button>
          <button className="group flex flex-col items-center gap-1">
            <div className="size-14 rounded-full flex items-center justify-center bg-surface-light text-primary shadow-soft border border-gray-200 hover:bg-primary hover:text-white hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-3xl filled">favorite</span>
            </div>
            <span className="text-xs font-bold text-text-secondary-light group-hover:text-primary transition-colors">
              Like
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
