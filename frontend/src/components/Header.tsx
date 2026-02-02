import Link from "next/link";

export function Header() {
    return (
        <header className="glass-panel sticky top-4 mx-4 mt-4 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
                    Vedic Library
                </Link>
                <span className="text-sm text-[var(--text-secondary)]">Bhagavad-gītā</span>
            </div>
            {/* Search or other Nav items can go here */}
        </header>
    );
}
