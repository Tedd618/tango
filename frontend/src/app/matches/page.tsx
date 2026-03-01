import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { fetchCurrentUser, fetchMatches, fetchUserById, UserProfile, Match } from "@/lib/api";
import MatchesClient from "@/components/MatchesClient";

interface MatchedConversation {
  match: Match;
  otherUser: UserProfile;
}

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: { match?: string };
}) {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login?returnTo=/matches");
  }

  const user = await fetchCurrentUser(session.user.email!);
  if (!user) {
    redirect("/onboarding");
  }

  // Fetch matches for the current user
  const matches = await fetchMatches(user.id);

  // For each match, fetch the information of the other user
  const matchedConversations: MatchedConversation[] = await Promise.all(
    matches.map(async (match) => {
      const otherUserId = user.role === "applicant" ? match.recruiter_id : match.applicant_id;
      const otherUser = await fetchUserById(otherUserId);
      return {
        match,
        otherUser: otherUser!, // Assuming the user exists if there's a match
      };
    })
  );

  const selectedMatchId = searchParams.match ? parseInt(searchParams.match) : undefined;

  return (
    <div className="fixed inset-0 w-full flex flex-col bg-background-light text-text-primary-light">
      <Header />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden pb-[74px]">
        <MatchesClient
          currentUser={user}
          initialMatchedConversations={matchedConversations}
          initialSelectedMatchId={selectedMatchId}
        />
      </div>

      <BottomNav />
    </div>
  );
}
