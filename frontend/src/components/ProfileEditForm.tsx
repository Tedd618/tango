"use client";

import { useState } from "react";
import {
    updateUser,
    uploadUserPhoto,
    addUserPrompt,
    deleteUserPrompt,
    UserProfile,
    PromptTemplate,
    UserPrompt,
} from "@/lib/api";
import { useRouter } from "next/navigation";

interface ProfileEditFormProps {
    user: UserProfile;
    templates: PromptTemplate[];
}

export default function ProfileEditForm({ user, templates }: ProfileEditFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: user.name || "",
        location: user.location || "",
        education: user.education || "",
        industry: user.industry || "",
        nationality: user.nationality || "",
        gender: user.gender || "",
        previous_occupation: user.previous_occupation || "",
        salary_min: user.salary_min?.toString() || "",
        salary_max: user.salary_max?.toString() || "",
        resume_url: user.resume_url || "",
        company_name: user.company_name || "",
        job_title: user.job_title || "",
        job_description: user.job_description || "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showPromptModal, setShowPromptModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
    const [promptAnswer, setPromptAnswer] = useState("");

    const mainPhoto = user.photos?.find((p) => p.order === 0)?.url;

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            await uploadUserPhoto(user.id, file);
            router.refresh();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload photo.");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveVitals = async () => {
        setIsSaving(true);
        try {
            const payload: Partial<UserProfile> = {};
            Object.keys(formData).forEach((key) => {
                const val = (formData as Record<string, string>)[key];
                if (key === "salary_min" || key === "salary_max") {
                    (payload as Record<string, string | number | null>)[key] = val ? parseInt(val) : null;
                } else {
                    (payload as Record<string, string | number | null>)[key] = val || null;
                }
            });

            await updateUser(user.id, payload);
            router.refresh();
            alert("Profile updated!");
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddPrompt = async () => {
        if (!selectedTemplate || !promptAnswer) return;
        setIsSaving(true);
        try {
            await addUserPrompt(user.id, selectedTemplate.id, promptAnswer);
            setShowPromptModal(false);
            setSelectedTemplate(null);
            setPromptAnswer("");
            router.refresh();
        } catch (error) {
            console.error("Failed to add prompt", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeletePrompt = async (id: number) => {
        if (!confirm("Delete this prompt?")) return;
        try {
            await deleteUserPrompt(user.id, id);
            router.refresh();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <div className="flex flex-col p-6 gap-10 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">

            {/* Photo Edit Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xs font-black uppercase text-gray-400 tracking-widest">Profile Photo</h2>
                <div className="relative aspect-square w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden group">
                    {mainPhoto ? (
                        <>
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${mainPhoto}")` }} />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="bg-white px-4 py-2 rounded-full text-xs font-bold cursor-pointer shadow-lg hover:scale-105 transition-transform">
                                    {uploading ? "Uploading..." : "Change Photo"}
                                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
                                </label>
                            </div>
                        </>
                    ) : (
                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-gray-300">add_a_photo</span>
                            <span className="text-[10px] font-black uppercase text-gray-400 mt-2">{uploading ? "Uploading..." : "Upload Photo"}</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
                        </label>
                    )}
                </div>
            </section>

            {/* Written Prompts Edit */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xs font-black uppercase text-gray-400 tracking-widest">Written Prompts ({user.prompts?.length}/3)</h2>
                <div className="flex flex-col gap-3">
                    {user.prompts?.map((p: UserPrompt) => (
                        <div key={p.id} className="p-5 border border-gray-100 rounded-2xl bg-gray-50 relative group">
                            <button onClick={() => handleDeletePrompt(p.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                            <p className="text-[9px] font-black uppercase text-gray-400 truncate mb-1">{p.template.text}</p>
                            <p className="text-sm font-bold text-[#111]">&ldquo;{p.answer}&rdquo;</p>
                        </div>
                    ))}
                    {user.prompts?.length < 3 && (
                        <button onClick={() => setShowPromptModal(true)} className="py-4 border-2 border-dashed border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:border-primary hover:text-primary transition-all">
                            + Add Prompt
                        </button>
                    )}
                </div>
            </section>

            {/* Vitals Edit */}
            <section className="flex flex-col gap-4 border-t border-gray-100 pt-8">
                <h2 className="text-xs font-black uppercase text-gray-400 tracking-widest">My Vitals</h2>
                <div className="flex flex-col gap-5">
                    {(user.role === "recruiter"
                        ? [
                            { label: "Name", name: "name", type: "text" },
                            { label: "Company", name: "company_name", type: "text" },
                            { label: "Job Title", name: "job_title", type: "text" },
                            { label: "Industry", name: "industry", type: "text" },
                            { label: "Job Description", name: "job_description", type: "text", isTextarea: true },
                        ]
                        : [
                            { label: "Name", name: "name", type: "text" },
                            { label: "Location", name: "location", type: "text" },
                            { label: "Nationality", name: "nationality", type: "text" },
                            { label: "Gender", name: "gender", type: "text" },
                            { label: "Education", name: "education", type: "text" },
                            { label: "Industry", name: "industry", type: "text" },
                            { label: "Prev. Occupation", name: "previous_occupation", type: "text" },
                        ]
                    ).map((field) => (
                        <div key={field.name} className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{field.label}</label>
                            {field.isTextarea ? (
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[120px]"
                                    value={(formData as Record<string, string>)[field.name]}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                />
                            ) : (
                                <input
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={(formData as Record<string, string>)[field.name]}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                />
                            )}
                        </div>
                    ))}

                    {user.role === "applicant" && (
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Min Salary ($k)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.salary_min}
                                    onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Max Salary ($k)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.salary_max}
                                    onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                                />
                            </div>
                        </div >
                    )
                    }

                    {
                        user.role === "applicant" && (
                            <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Resume Link (URL)</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/resume.pdf"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.resume_url}
                                    onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                                />
                            </div>
                        )
                    }

                    <button
                        onClick={handleSaveVitals}
                        disabled={isSaving}
                        className="mt-4 bg-[#111] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-black transition-colors disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Save Selection"}
                    </button>
                </div >
            </section >

            {/* Add Prompt Modal */}
            {
                showPromptModal && (
                    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-[2rem] max-w-[400px] w-full p-8 shadow-2xl overflow-y-auto max-h-[80vh]">
                            <h2 className="text-xl font-black mb-6">Answer a Prompt</h2>
                            <div className="flex flex-col gap-3">
                                {!selectedTemplate ? (
                                    templates.map((t) => (
                                        <button key={t.id} onClick={() => setSelectedTemplate(t)} className="text-left p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold hover:bg-primary/5 hover:border-primary transition-colors">
                                            {t.text}
                                        </button>
                                    ))
                                ) : (
                                    <div className="flex flex-col gap-5">
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Question</p>
                                            <p className="text-lg font-black text-[#111] tracking-tight">{selectedTemplate.text}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Your Answer</p>
                                            <textarea
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                value={promptAnswer}
                                                onChange={(e) => setPromptAnswer(e.target.value)}
                                                placeholder="Be unforgettable..."
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setSelectedTemplate(null)} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-gray-400">Back</button>
                                            <button onClick={handleAddPrompt} disabled={isSaving || !promptAnswer} className="flex-[2] bg-primary text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-secondary disabled:opacity-50">Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    );
}
