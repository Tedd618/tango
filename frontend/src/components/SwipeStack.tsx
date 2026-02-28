"use client";

import { useState } from "react";
import { UserProfile, swipeUser } from "@/lib/api";
import ProfileCard from "@/components/ProfileCard";
import Link from "next/link";

interface SwipeStackProps {
    cards: UserProfile[];
    currentUserId: number;
    mode: "discover" | "inbox";
}

export default function SwipeStack({ cards, currentUserId, mode }: SwipeStackProps) {
    const [index, setIndex] = useState(0);
    const [swiping, setSwiping] = useState(false);
    const [matchedWith, setMatchedWith] = useState<UserProfile | null>(null);
    const [lastMatchId, setLastMatchId] = useState<number | null>(null);

    const current = cards[index];

    const handleSwipe = async (action: "like" | "pass") => {
        if (!current || swiping) return;
        setSwiping(true);
        try {
            const result = await swipeUser(currentUserId, current.id, action);
            if (action === "like" && result.is_match) {
                setLastMatchId(result.match_id || null);
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

    /* ── Match celebration ── */
    if (matchedWith) {
        return (
            <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary via-secondary to-primary flex flex-col items-center justify-center gap-8 p-8 text-white">
                <div className="text-center animate-in fade-in zoom-in duration-500">
                    <div className="text-7xl mb-6">🎉</div>
                    <h1 className="text-5xl font-black tracking-tight mb-3">It&apos;s a Match!</h1>
                    <p className="text-lg font-bold opacity-90">
                        You and <span className="text-white underline underline-offset-4">{matchedWith.name}</span> liked each other.
                    </p>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-[280px]">
                    <Link
                        href={`/matches?match=${lastMatchId}`}
                        className="flex items-center justify-center px-10 py-4 rounded-full bg-white text-primary font-black text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-2xl"
                    >
                        Go to Chat
                    </Link>
                    <button
                        onClick={() => { setMatchedWith(null); setIndex((i) => i + 1); setLastMatchId(null); }}
                        className="px-10 py-4 rounded-full bg-white/10 text-white border border-white/20 font-black text-xs tracking-widest uppercase hover:bg-white/20 transition-all"
                    >
                        Keep Swiping
                    </button>
                </div>
            </div>
        );
    }

    /* ── Empty state ── */
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

    return (
        <div className="flex flex-col w-full gap-4 pb-32">
            {/* Reuse the shared ProfileCard component */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <ProfileCard user={current} />
            </div>

            {/* Progress indicator */}
            <p className="text-center text-xs font-bold text-gray-400">
                {index + 1} of {cards.length}
            </p>

            {/* ── Action buttons — equal size ── */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-8">
                <button
                    onClick={() => handleSwipe("pass")}
                    disabled={swiping}
                    className="group flex flex-col items-center gap-1.5 disabled:opacity-50"
                    aria-label="Pass"
                >
                    <div className="size-16 rounded-full flex items-center justify-center bg-white text-red-500 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-gray-100 hover:bg-red-50 hover:scale-110 transition-all">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-400 transition-colors">Pass</span>
                </button>

                <button
                    onClick={() => handleSwipe("like")}
                    disabled={swiping}
                    className="group flex flex-col items-center gap-1.5 disabled:opacity-50"
                    aria-label="Like"
                >
                    <div className="size-16 rounded-full flex items-center justify-center bg-primary text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:scale-110 transition-all">
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">Like</span>
                </button>
            </div>
        </div>
    );
}
