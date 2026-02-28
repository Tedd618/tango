"use client";

import { UserProfile, UserPrompt } from "@/lib/api";

interface ProfileViewProps {
    user: UserProfile;
}

export default function ProfileView({ user }: ProfileViewProps) {
    const mainPhoto = user.photos?.find((p) => p.order === 0);

    return (
        <div className="flex flex-col gap-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Large Main Photo: Hinge Style */}
            <div className="w-full h-[500px] md:h-[600px] border-b-4 border-gray-100 relative bg-gray-200 shrink-0">
                {mainPhoto ? (
                    <div
                        className="w-full h-full bg-center bg-cover"
                        style={{ backgroundImage: `url("${mainPhoto.url}")` }}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                        <span className="material-symbols-outlined text-6xl">account_circle</span>
                        <p className="font-bold text-sm">No photo uploaded</p>
                    </div>
                )}

                {/* Name & Age Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-6 text-white text-shadow-sm pointer-events-none">
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-4xl font-black">{user.name}</h1>
                    </div>
                </div>
            </div>

            {/* --- Dynamic Content Ordering based on Role --- */}
            <div className="flex flex-col">
                {user.role === "applicant" && user.prompts && user.prompts.length > 0 && (
                    <div className="px-6 py-10 bg-white">
                        <div className="flex flex-col gap-6">
                            {user.prompts.map((p) => (
                                <div key={p.id} className="bg-[#fbfbfb] rounded-2xl p-6 border border-gray-100 shadow-sm relative">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-2xl opacity-80" />
                                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-3 leading-snug">
                                        {p.template.text}
                                    </h4>
                                    <p className="text-[1.35rem] font-serif italic text-[#111] leading-relaxed">
                                        &ldquo;{p.answer}&rdquo;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="px-6 py-10 bg-[#fbfbfb] border-t border-gray-100">
                    <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest mb-6">Details</h3>
                    <div className="grid grid-cols-1 gap-6">

                        {user.role === "recruiter" ? (
                            <>
                                {user.company_name && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">business</span>
                                        <span className="text-base font-bold text-[#111]">{user.company_name}</span>
                                    </div>
                                )}
                                {user.job_title && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">badge</span>
                                        <span className="text-base font-bold text-[#111]">{user.job_title}</span>
                                    </div>
                                )}
                                {user.industry && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">work</span>
                                        <span className="text-base font-bold text-[#111]">{user.industry}</span>
                                    </div>
                                )}
                                {user.job_description && (
                                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-xs font-black uppercase text-gray-400">Job Description</span>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{user.job_description}</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {user.location && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">location_on</span>
                                        <span className="text-base font-bold text-[#111]">{user.location}</span>
                                    </div>
                                )}

                                {user.nationality && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">language</span>
                                        <span className="text-base font-bold text-[#111]">{user.nationality}</span>
                                    </div>
                                )}

                                {user.gender && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">person</span>
                                        <span className="text-base font-bold text-[#111] capitalize">{user.gender}</span>
                                    </div>
                                )}

                                {user.education && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">school</span>
                                        <span className="text-base font-bold text-[#111]">{user.education}</span>
                                    </div>
                                )}

                                {user.industry && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">work</span>
                                        <span className="text-base font-bold text-[#111]">{user.industry}</span>
                                    </div>
                                )}

                                {user.previous_occupation && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">history</span>
                                        <span className="text-base font-bold text-[#111]">{user.previous_occupation} (Previous)</span>
                                    </div>
                                )}

                                {(user.salary_min || user.salary_max) && (
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-300">payments</span>
                                        <span className="text-base font-bold text-[#111]">
                                            {user.salary_min ? `$${user.salary_min}k` : ""}
                                            {user.salary_min && user.salary_max ? " - " : ""}
                                            {user.salary_max ? `$${user.salary_max}k` : ""}
                                        </span>
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                    {user.role === "applicant" && user.resume_url && (
                        <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-gray-100">
                            <h4 className="text-[10px] font-black uppercase text-gray-400">Resume / Portfolio</h4>
                            <a
                                href={user.resume_url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-colors group cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">link</span>
                                <span className="font-bold shrink-0 line-clamp-1">{user.resume_url}</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {user.role === "recruiter" && user.prompts && user.prompts.length > 0 && (
                <div className="px-6 py-10 bg-white border-t border-gray-100">
                    <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest mb-6">Prompts</h3>
                    <div className="flex flex-col gap-6">
                        {user.prompts.map((p) => (
                            <div key={p.id} className="bg-[#fbfbfb] rounded-2xl p-6 border border-gray-100 shadow-sm relative">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-2xl opacity-80" />
                                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-3 leading-snug">
                                    {p.template.text}
                                </h4>
                                <p className="text-[1.35rem] font-serif italic text-[#111] leading-relaxed">
                                    &ldquo;{p.answer}&rdquo;
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
