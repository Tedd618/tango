"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CandidateFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);

    const [industry, setIndustry] = useState(searchParams?.get("industry") || "");
    const [location, setLocation] = useState(searchParams?.get("location") || "");
    const [gender, setGender] = useState(searchParams?.get("gender") || "");
    const [salaryMin, setSalaryMin] = useState(searchParams?.get("salary_min") || "");

    const handleApply = () => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        if (industry) params.set("industry", industry); else params.delete("industry");
        if (location) params.set("location", location); else params.delete("location");
        if (gender) params.set("gender", gender); else params.delete("gender");
        if (salaryMin) params.set("salary_min", salaryMin); else params.delete("salary_min");

        setIsOpen(false);
        router.push(`/discover?${params.toString()}`);
    };

    const handleClear = () => {
        setIndustry("");
        setLocation("");
        setGender("");
        setSalaryMin("");
        setIsOpen(false);
        router.push("/discover");
    };

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all"
            >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Filter Candidates
            </button>

            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-full z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black">Filters</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#111] transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Industry</label>
                                <input
                                    type="text"
                                    value={industry}
                                    onChange={e => setIndustry(e.target.value)}
                                    placeholder="e.g. Tech"
                                    className="w-full bg-[#fbfbfb] rounded-xl px-4 py-3 text-sm font-bold outline-none border-2 border-transparent focus:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder="e.g. New York"
                                    className="w-full bg-[#fbfbfb] rounded-xl px-4 py-3 text-sm font-bold outline-none border-2 border-transparent focus:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Gender</label>
                                <input
                                    type="text"
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                    placeholder="e.g. Female"
                                    className="w-full bg-[#fbfbfb] rounded-xl px-4 py-3 text-sm font-bold outline-none border-2 border-transparent focus:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Min Salary</label>
                                <input
                                    type="number"
                                    value={salaryMin}
                                    onChange={e => setSalaryMin(e.target.value)}
                                    placeholder="e.g. 80000"
                                    className="w-full bg-[#fbfbfb] rounded-xl px-4 py-3 text-sm font-bold outline-none border-2 border-transparent focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleClear}
                                    className="flex-1 py-3 bg-gray-100 rounded-full text-xs font-black uppercase tracking-widest text-[#111] hover:bg-gray-200 transition-colors"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="flex-1 py-3 bg-primary rounded-full text-xs font-black uppercase tracking-widest text-white shadow-lg hover:scale-105 transition-all"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
