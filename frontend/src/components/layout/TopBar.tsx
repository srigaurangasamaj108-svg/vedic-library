// src/components/layout/TopBar.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TopBar() {
  return (
    <header className="w-full bg-[var(--header-bg)] text-[#2b2218] shadow-sm">
      <div className="container mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          Bhaktivedanta VedaBase™
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-serif">
          <Link href="/" className="hover:underline underline-offset-4">
            Library
          </Link>
          <span className="cursor-pointer hover:underline underline-offset-4">
            Search
          </span>
          <span className="cursor-pointer hover:underline underline-offset-4">
            Support Us
          </span>
          <span className="cursor-pointer hover:underline underline-offset-4">
            Tools
          </span>
          <span className="cursor-pointer hover:underline underline-offset-4">
            Contact
          </span>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Settings
          </Button>

          <div className="hidden md:block w-48">
            <Input
              placeholder="Search..."
              className="bg-white/40 border-black/10 placeholder:text-[var(--text-secondary)]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-black/10 py-2 px-4 flex gap-4 text-xs font-medium justify-center overflow-x-auto">
        <Link href="/">Library</Link>
        <span>Search</span>
        <span>Tools</span>
      </div>
    </header>
  )
}
