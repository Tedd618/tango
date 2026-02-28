"use client";

import { useState, useEffect } from "react";
import { UserProfile, Match, markMessagesAsRead, fetchMatches, fetchUserById } from "@/lib/api";
import ChatWindow from "./ChatWindow";

interface MatchedConversation {
    match: Match;
    otherUser: UserProfile;
}

interface MatchesClientProps {
    currentUser: UserProfile;
    initialMatchedConversations: MatchedConversation[];
    initialSelectedMatchId?: number;
}

export default function MatchesClient({
    currentUser,
    initialMatchedConversations,
    initialSelectedMatchId
}: MatchesClientProps) {
    const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>(initialSelectedMatchId);
    const [conversations, setConversations] = useState<MatchedConversation[]>(initialMatchedConversations);

    const selectedConvo = conversations.find(c => c.match.id === selectedMatchId);

    // Polling for new matches / unread counts
    useEffect(() => {
        const poll = async () => {
            try {
                const matches = await fetchMatches(currentUser.id);

                // For each match, if not in current local state, fetch user info too
                const updatedConvos = await Promise.all(
                    matches.map(async (m) => {
                        const existing = conversations.find(c => c.match.id === m.id);
                        if (existing) {
                            return { ...existing, match: m };
                        }
                        // New match found during polling
                        const otherUserId = currentUser.role === "applicant" ? m.recruiter_id : m.applicant_id;
                        const otherUser = await fetchUserById(otherUserId);
                        return { match: m, otherUser: otherUser! };
                    })
                );
                setConversations(updatedConvos);
            } catch (e) {
                console.error("Polling matches failed", e);
            }
        };

        const interval = setInterval(poll, 5000);
        return () => clearInterval(interval);
    }, [currentUser.id, currentUser.role, conversations]); // Re-subscribe if user changes

    const handleSelectMatch = (matchId: number) => {
        setSelectedMatchId(matchId);
        // Promptly clear unread count in local state for immediate feedback
        setConversations(prev => prev.map(c =>
            c.match.id === matchId ? { ...c, match: { ...c.match, unread_count: 0 } } : c
        ));
        // Mark as read on backend
        markMessagesAsRead(matchId, currentUser.id).catch(() => { });
    };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar - hidden on mobile if a chat is selected */}
            <aside className={`w-full md:w-[400px] flex flex-col border-r border-neutral-200 bg-white z-10 shrink-0 ${selectedMatchId ? "hidden md:flex" : "flex"}`}>
                <div className="px-6 pt-6 pb-2">
                    <h3 className="tracking-tight text-3xl font-bold leading-tight mb-4">Matches</h3>
                </div>

                <div className="h-px bg-neutral-100 w-full mb-2" />

                {/* Conversations list - pad the bottom for nav bar */}
                <div className="flex-1 overflow-y-auto px-2 pb-[90px] md:pb-6">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-3 flex justify-between items-center">
                        <span>{conversations.length > 0 ? "Messages" : "No matches yet"}</span>
                    </div>
                    {conversations.map((convo) => {
                        const { match, otherUser } = convo;
                        const mainPhoto = otherUser.photos?.find(p => p.order === 0)?.url;
                        const isActive = selectedMatchId === match.id;
                        const hasUnread = match.unread_count > 0;

                        return (
                            <div
                                key={match.id}
                                onClick={() => handleSelectMatch(match.id)}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer transition-all border-l-4 ${isActive
                                    ? "bg-primary/5 border-primary shadow-sm"
                                    : "hover:bg-gray-50 border-transparent"
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    {mainPhoto ? (
                                        <img
                                            src={mainPhoto}
                                            alt={otherUser.name}
                                            className="size-14 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                    ) : (
                                        <div className="size-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm">
                                            <span className="material-symbols-outlined text-gray-400 text-2xl">person</span>
                                        </div>
                                    )}
                                    {hasUnread && !isActive && (
                                        <div className="absolute -top-1 -right-1 size-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                                            <div className="size-1.5 bg-white rounded-full" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <p className={`text-[#111] text-base leading-normal truncate ${isActive || hasUnread ? "font-black" : "font-bold"}`}>
                                            {otherUser.name}
                                        </p>
                                        {hasUnread && !isActive && (
                                            <span className="bg-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                                                {match.unread_count}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm leading-normal truncate font-medium ${hasUnread && !isActive ? "text-primary" : "text-gray-400"}`}>
                                        {otherUser.role === "recruiter"
                                            ? [otherUser.job_title, otherUser.company_name].filter(Boolean).join(" · ")
                                            : otherUser.previous_occupation || "Applicant"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {conversations.length === 0 && (
                        <div className="p-8 text-center flex flex-col items-center gap-4">
                            <div className="size-20 rounded-full bg-gray-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-300 text-4xl">favorite</span>
                            </div>
                            <p className="text-sm font-bold text-gray-400 leading-relaxed">
                                When you match with someone,<br />they&apos;ll appear here!
                            </p>
                        </div>
                    )}
                </div>
            </aside>

            {/* Chat window space - hidden on mobile if no chat selected */}
            <main className={`flex-1 flex flex-col bg-white ${!selectedMatchId ? "hidden md:flex" : "flex"}`}>
                {selectedConvo ? (
                    <div className="flex flex-col h-full bg-white">
                        {/* Mobile Back Button */}
                        <div className="md:hidden px-4 pt-4 shrink-0 bg-white">
                            <button
                                onClick={() => setSelectedMatchId(undefined)}
                                className="flex items-center gap-1 text-primary font-black text-sm"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                                Back to Matches
                            </button>
                        </div>
                        {/* Chat content needs its own bottom padding for nav bar */}
                        <div className="flex-1 min-h-0 pb-[85px] md:pb-0">
                            <ChatWindow
                                matchId={selectedConvo.match.id}
                                currentUser={currentUser}
                                otherUser={selectedConvo.otherUser}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
                        <div className="size-24 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-primary text-5xl opacity-40">forum</span>
                        </div>
                        <h2 className="text-xl font-black text-[#111] mb-2">Select a match to start chatting</h2>
                        <p className="text-sm font-bold text-gray-400 max-w-xs">
                            Your conversations will appear here once you select a match from the sidebar.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
