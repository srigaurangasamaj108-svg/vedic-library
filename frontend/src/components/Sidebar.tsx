"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:block w-70 h-screen overflow-y-auto sticky top-0 border-r border-[#dcbfa3] bg-[#f0e4b8] font-sans">
            <div className="p-6">
                <Link href="/" className="block mb-8">
                    <h1 className="text-xl font-bold text-[#333] tracking-tight">
                        Vedic Library
                    </h1>
                    <p className="text-sm text-[#666]">Bhagavad-gītā As It Is</p>
                </Link>

                <nav className="space-y-1">
                    <div className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                        Chapters
                    </div>
                    {CHAPTERS.map((chapter) => {
                        const isActive = pathname.startsWith(`/bg/${chapter.id}`);
                        return (
                            <Link
                                key={chapter.id}
                                href={`/bg/${chapter.id}`}
                                className={`block px-3 py-2 rounded-sm text-sm transition-colors ${isActive
                                        ? "bg-[#e6a75a] text-[#000] font-bold shadow-sm"
                                        : "text-[#555] hover:bg-[#faeec8] hover:text-[#a63410]"
                                    }`}
                            >
                                <span className={`mr-2 ${isActive ? "opacity-100" : "opacity-50"}`}>{chapter.id}.</span>
                                {chapter.sanskritTitle}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
