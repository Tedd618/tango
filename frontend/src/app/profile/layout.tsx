import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { fetchCurrentUser } from "@/lib/api";
import ProfileTabs from "@/components/ProfileTabs";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth0.getSession();
    if (!session?.user) {
        redirect("/auth/login?returnTo=/profile");
    }

    const user = await fetchCurrentUser(session.user.email!);
    if (!user) {
        redirect("/onboarding");
    }

    return (
        <div className="bg-white min-h-screen text-[#111] pb-24 font-tiempos flex flex-col items-center">
            <Header />

            <div className="max-w-[450px] w-full flex flex-col">
                {/* Hinge Style Top Bar */}
                <div className="flex justify-between items-center px-6 py-4">
                    <button className="text-gray-400 text-sm font-bold hover:text-[#111]">Cancel</button>
                    <h1 className="text-lg font-black">{user.name}</h1>
                    <button className="text-gray-400 text-sm font-bold hover:text-[#111]">Done</button>
                </div>

                <ProfileTabs />

                <main className="w-full">
                    {children}
                </main>
            </div>

            <BottomNav />
        </div>
    );
}
