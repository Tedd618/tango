export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-rose-50 dark:from-zinc-900 dark:to-zinc-800">
      <main className="flex flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight text-orange-600">
          Tango
        </h1>
        <p className="max-w-md text-xl text-zinc-600 dark:text-zinc-300">
          Swipe your way to your next opportunity. Where talent meets recruiters.
        </p>
        <div className="flex gap-4">
          <a
            href="/swipe"
            className="rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Start Swiping
          </a>
          <a
            href="/signup"
            className="rounded-full border-2 border-orange-500 px-8 py-3 text-lg font-semibold text-orange-500 transition-colors hover:bg-orange-50 dark:hover:bg-zinc-700"
          >
            Sign Up
          </a>
        </div>
      </main>
    </div>
  );
}
