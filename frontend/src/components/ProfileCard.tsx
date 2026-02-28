"use client";

import { UserProfile } from "@/lib/api";

interface ProfileCardProps {
    user: UserProfile;
}

/**
 * The canonical Hinge-style card shown in both the Discover feed and the
 * Profile → View tab so users can preview exactly how they appear to others.
 */
export default function ProfileCard({ user }: ProfileCardProps) {
    const photo = user.photos?.find((p) => p.order === 0);

    return (
        <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">

            {/* Hero photo — 3:4 portrait ratio */}
            <div className="w-full aspect-[3/4] relative bg-gray-100">
                {photo ? (
                    <img
                        src={photo.url}
                        alt={`${user.name}'s photo`}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                        <span className="material-symbols-outlined text-[8rem]">account_circle</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                    <h2 className="text-3xl font-black text-white leading-tight">{user.name}</h2>
                    {user.role === "recruiter" && (user.job_title || user.company_name) && (
                        <p className="text-sm font-bold text-white/80 mt-0.5">
                            {[user.job_title, user.company_name].filter(Boolean).join(" · ")}
                        </p>
                    )}
                    {user.role === "applicant" && user.previous_occupation && (
                        <p className="text-sm font-bold text-white/80 mt-0.5">{user.previous_occupation}</p>
                    )}
                </div>
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col gap-4">

                {/* Vital pills */}
                <div className="flex flex-wrap gap-2">
                    {user.industry && <Pill icon="work" label={user.industry} />}
                    {user.location && <Pill icon="location_on" label={user.location} />}
                    {user.education && <Pill icon="school" label={user.education} />}
                    {user.salary_min && user.salary_max && (
                        <Pill icon="payments" label={`$${user.salary_min}k – $${user.salary_max}k`} />
                    )}
                    {user.company_name && !user.industry && (
                        <Pill icon="business" label={user.company_name} />
                    )}
                </div>

                {/* Job description — recruiters */}
                {user.role === "recruiter" && user.job_description && (
                    <div className="flex flex-col gap-1 pt-1 border-t border-gray-100">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Role Description</span>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{user.job_description}</p>
                    </div>
                )}

                {/* Written prompts */}
                {user.prompts && user.prompts.length > 0 && (
                    <div className="flex flex-col gap-3 pt-1 border-t border-gray-100">
                        {user.prompts.slice(0, 2).map((p) => (
                            <div key={p.id} className="relative bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/60 rounded-l-2xl" />
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1 ml-1">{p.template.text}</p>
                                <p className="text-sm font-bold italic text-[#111] ml-1">&ldquo;{p.answer}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Resume link — applicants */}
                {user.role === "applicant" && user.resume_url && (
                    <a
                        href={user.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/20 bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">description</span>
                        View Resume / Portfolio
                    </a>
                )}
            </div>
        </div>
    );
}

function Pill({ icon, label }: { icon: string; label: string }) {
    return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-600">
            <span className="material-symbols-outlined text-[14px] text-gray-400">{icon}</span>
            {label}
        </span>
    );
}
