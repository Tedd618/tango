"use client";

import { UserProfile } from "@/lib/api";
import ProfileCard from "@/components/ProfileCard";

interface ProfileViewProps {
    user: UserProfile;
}

/**
 * Profile → View tab.
 * Shows the exact ProfileCard that others see in the Discover feed,
 * plus a "Reset swipe history" button.
 */
export default function ProfileView({ user }: ProfileViewProps) {
    return (
        <div className="flex flex-col gap-6 p-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-xs font-black uppercase text-gray-400 tracking-widest text-center">
                This is how you appear to others
            </p>
            <ProfileCard user={user} />
        </div>
    );
}
