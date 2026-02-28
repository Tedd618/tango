"use client";

import { useState } from "react";
import { UserProfile, swipeUser } from "@/lib/api";

interface SwipeStackProps {
    cards: UserProfile[];
    currentUserId: number;
    mode: "discover" | "inbox"; // applicant=discover, recruiter=inbox
}

export default function SwipeStack({ cards, currentUserId, mode }: SwipeStackProps) {
    const [index, setIndex] = useState(0);
    const [swiping, setSwiping] = useState(false);
    const [matchedWith, setMatchedWith] = useState<UserProfile | null>(null);

    const current = cards[index];

    const handleSwipe = async (action: "like" | "pass") => {
        if (!current || swiping) return;
        setSwiping(true);
        try {
            const result = await swipeUser(currentUserId, current.id, action);
            if (result.is_match) {
                setMatchedWith(current);
            } else {
                setIndex((i) => i + 1);
            }
        } catch (e) {
            console.error("Swipe failed", e);
            setIndex((i) => i + 1);
        } finally {
            setSwiping(false);
        }
    };

    // Match celebration modal
    if (matchedWith) {
        return (
            <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary/90 to-secondary/90 flex flex-col items-center justify-center gap-8 p-8 text-white">
                <div className="text-center animate-in fade-in zoom-in duration-500">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">It&apos;s a Match!</h1>
                    <p className="text-lg font-semibold opacity-90">
                        You and <span className="font-black">{matchedWith.name}</span> liked each other.
                    </p>
                    <p className="text-sm opacity-70 mt-2">Chat will be available soon.</p>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => {
                            setMatchedWith(null);
                            setIndex((i) => i + 1);
                        }}
                        className="px-8 py-3 rounded-full bg-white text-primary font-black text-sm hover:scale-105 transition-transform shadow-xl"
                    >
                        Keep Swiping
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (!current) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-8">
                <div className="size-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-gray-300">
                        {mode === "discover" ? "explore" : "inbox"}
                    </span>
                </div>
                <div>
                    <h2 className="text-xl font-black text-[#111]">
                        {mode === "discover" ? "You're all caught up!" : "No new applicants"}
                    </h2>
                    <p className="text-sm text-gray-400 font-bold mt-1">
                        {mode === "discover"
                            ? "Check back later for new profiles."
                            : "When applicants like your profile, they'll appear here."}
                    </p>
                </div>
            </div>
        );
    }

    const photo = current.photos?.find((p) => p.order === 0);

    return (
        <div className="flex flex-col w-full max-w-[450px] mx-auto pb-32">
            {/* Card */}
            <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white animate-in fade-in slide-in-from-bottom-2 duration-300">

                {/* Hero Photo */}
                <div className="w-full h-[420px] relative bg-gray-200">
                    {photo ? (
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url("${photo.url}")` }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <span className="material-symbols-outlined text-7xl">account_circle</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-3xl font-black">{current.name}</h2>
                        {current.role === "recruiter" && current.job_title && (
                            <p className="text-sm font-bold opacity-90">{current.job_title} · {current.company_name}</p>
                        )}
                        {current.role === "applicant" && current.previous_occupation && (
                            <p className="text-sm font-bold opacity-90">{current.previous_occupation}</p>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-4">
                    {/* Quick vitals */}
                    <div className="flex flex-wrap gap-2">
                        {current.industry && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-600">
                                <span className="material-symbols-outlined text-sm text-gray-400">work</span>
                                {current.industry}
                            </span>
                        )}
                        {current.location && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-600">
                                <span className="material-symbols-outlined text-sm text-gray-400">location_on</span>
                                {current.location}
                            </span>
                        )}
                        {current.education && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-600">
                                <span className="material-symbols-outlined text-sm text-gray-400">school</span>
                                {current.education}
                            </span>
                        )}
                        {current.salary_min && current.salary_max && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-600">
                                <span className="material-symbols-outlined text-sm text-gray-400">payments</span>
                                ${current.salary_min}k–${current.salary_max}k
                            </span>
                        )}
                    </div>

                    {/* Job description (recruiters) */}
                    {current.role === "recruiter" && current.job_description && (
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase text-gray-400">Role Description</span>
                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{current.job_description}</p>
                        </div>
                    )}

                    {/* Prompts */}
                    {current.prompts && current.prompts.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {current.prompts.slice(0, 2).map((p) => (
                                <div key={p.id} className="relative bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl opacity-60" />
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{p.template.text}</p>
                                    <p className="text-sm font-bold italic text-[#111]">&ldquo;{p.answer}&rdquo;</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Resume link (applicants) */}
                    {current.role === "applicant" && current.resume_url && (
                        <a
                            href={current.resume_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/20 bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">description</span>
                            View Resume
                        </a>
                    )}
                </div>
            </div>

            {/* Card counter */}
            <p className="text-center text-xs font-bold text-gray-400 mt-3">
                {index + 1} of {cards.length}
            </p>

            {/* Fixed action bar */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 z-40 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-xl border border-gray-100">
                <button
                    onClick={() => handleSwipe("pass")}
                    disabled={swiping}
                    className="group flex flex-col items-center gap-1 disabled:opacity-50"
                    aria-label="Pass"
                >
                    <div className="size-16 rounded-full flex items-center justify-center bg-white text-red-400 shadow-md border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:scale-110 transition-all">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </div>
                    <span className="text-xs font-black text-gray-400 group-hover:text-red-400 transition-colors">Pass</span>
                </button>

                <button
                    onClick={() => handleSwipe("like")}
                    disabled={swiping}
                    className="group flex flex-col items-center gap-1 disabled:opacity-50"
                    aria-label="Like"
                >
                    <div className="size-16 rounded-full flex items-center justify-center bg-primary text-white shadow-lg hover:bg-primary-dark hover:scale-110 transition-all">
                        <span className="material-symbols-outlined text-3xl filled">favorite</span>
                    </div>
                    <span className="text-xs font-black text-gray-400 group-hover:text-primary transition-colors">Like</span>
                </button>
            </div>
        </div>
    );
}
