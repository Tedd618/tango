import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SwipeStack from "@/components/SwipeStack";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { fetchCurrentUser, fetchCandidates, fetchInbox } from "@/lib/api";

import CandidateFilter from "@/components/CandidateFilter";
import { CandidateFilters } from "@/lib/api";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

export default async function DiscoverPage(props: Props) {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login?returnTo=/discover");
  }

  const user = await fetchCurrentUser(session.user.email!);
  if (!user) {
    redirect("/onboarding");
  }

  const resolvedParams = await Promise.resolve(props.searchParams || {});

  const filters: CandidateFilters = {
    industry: typeof resolvedParams.industry === "string" ? resolvedParams.industry : undefined,
    location: typeof resolvedParams.location === "string" ? resolvedParams.location : undefined,
    gender: typeof resolvedParams.gender === "string" ? resolvedParams.gender : undefined,
    nationality: typeof resolvedParams.nationality === "string" ? resolvedParams.nationality : undefined,
    salary_min: typeof resolvedParams.salary_min === "string" ? parseInt(resolvedParams.salary_min) : undefined,
    salary_max: typeof resolvedParams.salary_max === "string" ? parseInt(resolvedParams.salary_max) : undefined,
  };

  // Applicants see recruiter cards; recruiters see applicants who liked them
  const cards = user.role === "recruiter"
    ? await fetchInbox(user.id)
    : await fetchCandidates(user.id, filters);

  const pageTitle = user.role === "recruiter" ? "Your Applicants" : "Discover";
  const pageSubtitle = user.role === "recruiter"
    ? "Applicants who liked your profile"
    : "Find your next opportunity";

  return (
    <div className="bg-[#fbfbfb] min-h-screen flex flex-col text-[#111]">
      <Header />

      <main className="flex-1 w-full max-w-[450px] mx-auto px-4 py-6 pb-32">
        {/* Page header */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-[#111]">{pageTitle}</h1>
            <p className="text-sm font-bold text-gray-400 mt-0.5">{pageSubtitle}</p>
          </div>
          {user.role !== "recruiter" && <CandidateFilter />}
        </div>

        <SwipeStack
          cards={cards}
          currentUserId={user.id}
          mode={user.role === "recruiter" ? "inbox" : "discover"}
        />
      </main>

      <BottomNav />
    </div>
  );
}
