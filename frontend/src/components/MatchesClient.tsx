"use client";

import { useState } from "react";
import { UserProfile, Match } from "@/lib/api";
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

    const selectedConvo = initialMatchedConversations.find(c => c.match.id === selectedMatchId);

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar */}
            <aside className="w-full md:w-[400px] flex flex-col border-r border-neutral-200 bg-white z-10 shrink-0">
                <div className="px-6 pt-6 pb-2">
                    <h3 className="tracking-tight text-3xl font-bold leading-tight mb-4">Matches</h3>
                </div>

                <div className="h-px bg-neutral-100 w-full mb-2" />

                {/* Conversations list */}
                <div className="flex-1 overflow-y-auto px-2">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-3">
                        {initialMatchedConversations.length > 0 ? "Messages" : "No matches yet"}
                    </div>
                    {initialMatchedConversations.map((convo) => {
                        const { match, otherUser } = convo;
                        const mainPhoto = otherUser.photos?.find(p => p.order === 0)?.url;
                        const isActive = selectedMatchId === match.id;

                        return (
                            <div
                                key={match.id}
                                onClick={() => setSelectedMatchId(match.id)}
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
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <p className={`text-[#111] text-base leading-normal truncate ${isActive ? "font-black" : "font-bold"}`}>
                                            {otherUser.name}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-normal truncate font-medium">
                                        {otherUser.role === "recruiter"
                                            ? [otherUser.job_title, otherUser.company_name].filter(Boolean).join(" · ")
                                            : otherUser.previous_occupation || "Applicant"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {initialMatchedConversations.length === 0 && (
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

            {/* Chat window space */}
            <main className="flex-1 flex flex-col bg-white">
                {selectedConvo ? (
                    <ChatWindow
                        matchId={selectedConvo.match.id}
                        currentUser={currentUser}
                        otherUser={selectedConvo.otherUser}
                    />
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
