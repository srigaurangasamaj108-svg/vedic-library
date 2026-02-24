"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: "Library", href: "/library/bg" },
    { label: "Education", href: "/education" },
    { label: "Guidance", href: "/guidance" },
    { label: "Community", href: "/community" },
  ];

  return (
    <header className="glass-panel sticky top-4 mx-4 mt-4 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">

      {/* Left: Logo */}
      <Link
        href="/"
        className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
      >
        Vedic Library
      </Link>

      {/* Center: Primary Navigation */}
      <nav className="hidden md:flex gap-8 text-sm font-medium">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors ${
                active
                  ? "text-[var(--text-primary)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Reserved for future (search, theme, user) */}
      <div className="text-sm text-[var(--text-secondary)]">
        {/* Future controls */}
      </div>

    </header>
  );
}
