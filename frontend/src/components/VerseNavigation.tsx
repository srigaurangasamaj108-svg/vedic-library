import Link from "next/link";

interface VerseNavProps {
    prev: { chapter: number; verse: number } | null;
    next: { chapter: number; verse: number } | null;
}

export function VerseNavigation({ prev, next }: VerseNavProps) {
    return (
        <div className="flex justify-between items-center mt-16 w-full max-w-2xl mx-auto font-sans">
            {prev ? (
                <Link
                    href={`/bg/${prev.chapter}/${prev.verse}`}
                    className="px-6 py-2.5 bg-[#e6a75a] bg-opacity-30 border border-[#d6ccb5] hover:bg-[#e6a75a] hover:bg-opacity-40 rounded-sm text-[#2b2218] text-sm font-bold tracking-wide uppercase transition-colors shadow-sm flex items-center gap-2"
                >
                    <span>←</span>
                    <span>Text {prev.verse}</span>
                </Link>
            ) : (
                <div />
            )}

            {next ? (
                <Link
                    href={`/bg/${next.chapter}/${next.verse}`}
                    className="px-6 py-2.5 bg-[#e6a75a] bg-opacity-30 border border-[#d6ccb5] hover:bg-[#e6a75a] hover:bg-opacity-40 rounded-sm text-[#2b2218] text-sm font-bold tracking-wide uppercase transition-colors shadow-sm flex items-center gap-2"
                >
                    <span>Text {next.verse}</span>
                    <span>→</span>
                </Link>
            ) : (
                <div />
            )}
        </div>
    );
}
