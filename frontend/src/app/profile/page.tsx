import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import ProfileView from "@/components/ProfileView";
import { fetchCurrentUser } from "@/lib/api";

export default async function ProfileViewPage() {
  const session = await auth0.getSession();
  if (!session?.user?.email) {
    redirect("/auth/login?returnTo=/profile");
  }

  const user = await fetchCurrentUser(session.user.email);
  if (!user) return redirect("/profile"); // Should be handled by layout but safety first

  return <ProfileView user={user} />;
}
