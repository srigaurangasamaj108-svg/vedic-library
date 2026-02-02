"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <nav className="text-xs font-sans text-[var(--text-secondary)] mb-6 flex items-center space-x-2 uppercase tracking-wide">
            <Link href="/" className="hover:underline hover:text-[#000]">
                Library
            </Link>
            <span className="text-[#a63410]">»</span>
            {segments.map((segment, index) => {
                const isLast = index === segments.length - 1;
                const href = `/${segments.slice(0, index + 1).join("/")}`;

                // Generic label fallbacks
                let label = segment;
                if (segment === 'bg') label = 'Bhagavad-gītā As It Is';

                // Simple numeric heuristic for chapters/verses
                if (!isNaN(Number(segment))) {
                    const isVerse = index === 2; // bg / chapter / verse
                    if (isVerse) {
                        label = `Bg. ${segments[1]}.${segment}`;
                    } else {
                        label = `Chapter ${segment}`; // ideally titles would be looked up here
                    }
                }

                return (
                    <div key={href} className="flex items-center space-x-2 whitespace-nowrap">
                        {isLast ? (
                            <span className="font-bold text-[var(--text-primary)] cursor-default">{label}</span>
                        ) : (
                            <>
                                <Link href={href} className="hover:underline hover:text-[#000]">
                                    {label}
                                </Link>
                                <span className="text-[#a63410]">»</span>
                            </>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
