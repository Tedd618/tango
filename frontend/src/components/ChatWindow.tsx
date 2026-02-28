"use client";

import { useEffect, useRef, useState } from "react";
import { Message, UserProfile, fetchMessages, sendMessage, markMessagesAsRead } from "@/lib/api";

interface ChatWindowProps {
    matchId: number;
    currentUser: UserProfile;
    otherUser: UserProfile;
}

export default function ChatWindow({ matchId, currentUser, otherUser }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Initial load + polling
    useEffect(() => {
        const load = async () => {
            try {
                const msgs = await fetchMessages(matchId);
                setMessages(msgs);

                // If any messages are from the other user and are unread, mark them as read
                const hasUnread = msgs.some(m => m.sender_id !== currentUser.id && !m.is_read);
                if (hasUnread) {
                    await markMessagesAsRead(matchId, currentUser.id);
                }
            } catch {
                // silent — polling will retry
            }
        };
        load();
        const interval = setInterval(load, 3000);
        return () => clearInterval(interval);
    }, [matchId, currentUser.id]);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || sending) return;
        setSending(true);
        setInput("");
        try {
            const msg = await sendMessage(matchId, currentUser.id, text);
            setMessages((prev) => [...prev, msg]);
        } catch {
            setInput(text); // restore on failure
        } finally {
            setSending(false);
        }
    };

    const otherPhoto = otherUser.photos?.find((p) => p.order === 0)?.url;

    return (
        <div className="flex flex-col h-full bg-[#fbfbfb]">

            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-100 shrink-0">
                {otherPhoto ? (
                    <img src={otherPhoto} alt={otherUser.name} className="size-10 rounded-full object-cover" />
                ) : (
                    <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-400 text-xl">account_circle</span>
                    </div>
                )}
                <div className="min-w-0">
                    <p className="font-black text-sm text-[#111] truncate">{otherUser.name}</p>
                    <p className="text-xs text-gray-400 font-bold truncate">
                        {otherUser.role === "recruiter"
                            ? [otherUser.job_title, otherUser.company_name].filter(Boolean).join(" · ")
                            : otherUser.previous_occupation || otherUser.industry || ""}
                    </p>
                </div>
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-3">
                {messages.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-12">
                        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-3xl">waving_hand</span>
                        </div>
                        <p className="text-sm font-black text-[#111]">Say hello!</p>
                        <p className="text-xs text-gray-400 font-bold">You matched with {otherUser.name}.<br />Start the conversation.</p>
                    </div>
                )}

                {messages.map((msg) => {
                    const isMine = msg.sender_id === currentUser.id;
                    return (
                        <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-bold leading-relaxed shadow-sm ${isMine
                                    ? "bg-primary text-white rounded-br-sm"
                                    : "bg-white text-[#111] border border-gray-100 rounded-bl-sm"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} className="h-4 shrink-0" />
            </div>

            {/* Input bar - No additional padding here; layout handled by parent overflow and pb */}
            <div className="shrink-0 px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-3 safe-bottom">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || sending}
                    className="size-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-all shadow-md"
                >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                </button>
            </div>
        </div>
    );
}
