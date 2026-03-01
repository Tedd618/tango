"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isLoading) return null;
    if (!user) {
        router.push("/auth/login?returnTo=/onboarding");
        return null;
    }

    const handleRoleSelection = async (role: "applicant" | "recruiter") => {
        setIsSubmitting(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    name: user.name || user.nickname || "Unknown",
                    role: role,
                }),
            });

            if (!response.ok && response.status !== 400) {
                throw new Error("Failed to create profile");
            }

            router.push("/discover");
            router.refresh(); // Ensure server components re-fetch the user
        } catch (error) {
            console.error(error);
            alert("Something went wrong creating your profile. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fbfbfb] flex flex-col items-center justify-center p-6 pb-20 fade-in animate-in duration-500 relative z-50">
            <div className="max-w-md w-full flex flex-col items-center text-center gap-8 bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                <div>
                    <h1 className="text-3xl font-black text-[#111] mb-2 font-display">Welcome to <span className="font-tiempos">Tango!</span></h1>
                    <p className="text-sm font-bold text-gray-400">How do you want to use the app today?</p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <button
                        onClick={() => handleRoleSelection("applicant")}
                        disabled={isSubmitting}
                        className="group relative w-full flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all text-left bg-white"
                    >
                        <div className="size-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-2xl">work</span>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-black text-[#111] group-hover:text-primary transition-colors">I am looking for a job</h3>
                            <p className="text-xs font-bold text-gray-400 mt-1">Create an applicant profile to swipe through top companies.</p>
                        </div>
                    </button>

                    <button
                        onClick={() => handleRoleSelection("recruiter")}
                        disabled={isSubmitting}
                        className="group relative w-full flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all text-left bg-white"
                    >
                        <div className="size-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-2xl">business</span>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-black text-[#111] group-hover:text-primary transition-colors">I am hiring</h3>
                            <p className="text-xs font-bold text-gray-400 mt-1">Create a recruiter profile to find your next great hire.</p>
                        </div>
                    </button>
                </div>

                {isSubmitting && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
                        <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
