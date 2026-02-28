"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileTabs() {
    const pathname = usePathname();
    const isEdit = pathname.includes("/edit");

    return (
        <div className="flex w-full border-b border-gray-100">
            <Link
                href="/profile/edit"
                className={`flex-1 text-center py-3 text-sm font-bold transition-colors ${isEdit ? "text-[#111] border-b-2 border-[#111]" : "text-gray-400 hover:text-gray-600"
                    }`}
            >
                Edit
            </Link>
            <Link
                href="/profile"
                className={`flex-1 text-center py-3 text-sm font-bold transition-colors ${!isEdit ? "text-[#111] border-b-2 border-[#111]" : "text-gray-400 hover:text-gray-600"
                    }`}
            >
                View
            </Link>
        </div>
    );
}
