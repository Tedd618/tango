import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { fetchCurrentUser, fetchPromptTemplates } from "@/lib/api";
import ProfileEditForm from "@/components/ProfileEditForm";

export default async function ProfileEditPage() {
    const session = await auth0.getSession();
    if (!session?.user?.email) {
        redirect("/auth/login?returnTo=/profile/edit");
    }

    const user = await fetchCurrentUser(session.user.email);
    if (!user) return redirect("/profile");

    const templates = await fetchPromptTemplates(user.role);

    if (!user) return redirect("/profile");

    return <ProfileEditForm user={user} templates={templates} />;
}
