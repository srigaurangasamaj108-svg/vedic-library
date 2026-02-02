import Link from "next/link";

export function TopBar() {
    return (
        <header className="w-full bg-[var(--header-bg)] text-[#2b2218] shadow-sm">
            <div className="container mx-auto max-w-[1200px] px-4 h-16 flex items-center justify-between">

                {/* Left: Brand Identity */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="font-serif text-xl font-semibold tracking-tight">
                        Bhaktivedanta VedaBase™
                    </span>
                </Link>

                {/* Center: Primary Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium font-serif">
                    <Link href="/" className="hover:text-black hover:underline decoration-[var(--text-secondary)] underline-offset-4">Library</Link>
                    <span className="cursor-pointer hover:text-black">Search</span>
                    <span className="cursor-pointer hover:text-black">Support Us</span>
                    <span className="cursor-pointer hover:text-black">Tools</span>
                    <span className="cursor-pointer hover:text-black">Contact</span>
                </nav>

                {/* Right: Utility Controls */}
                <div className="flex items-center gap-4 text-sm">
                    <button className="hidden sm:block hover:bg-[rgba(0,0,0,0.05)] p-2 rounded-full">
                        Settings
                    </button>
                    <div className="relative">
                        {/* Mock search input */}
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-8 pr-3 py-1.5 text-sm rounded-full bg-[rgba(255,255,255,0.4)] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:bg-white placeholder-[#5c4d3c] w-32 md:w-48 transition-all"
                        />
                        <span className="absolute left-2.5 top-1.5 opacity-50">🔍</span>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Placeholder (could be a hamburger menu in real implementation) */}
            <div className="md:hidden border-t border-[rgba(0,0,0,0.1)] py-2 px-4 flex gap-4 text-xs font-medium justify-center overflow-x-auto">
                <Link href="/">Library</Link>
                <span>Search</span>
                <span>Tools</span>
            </div>
        </header>
    );
}
