"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function GlobalHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library/bg" },
    { label: "Education", href: "/education" },
    { label: "Guidance", href: "/guidance" },
    { label: "Community", href: "/community" },
  ];

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/15 bg-[#efe8d6]">
      <div className="max-w-screen-xl mx-auto px-10 py-5 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Vedic Library"
            width={34}
            height={34}
          />
          <span className="text-lg font-serif font-semibold tracking-tight text-[#2b2218]">
            Vedic Library
          </span>
        </Link>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex items-center gap-10 text-sm font-medium relative">

          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname?.startsWith(item.href + "/");

            const hasDropdown =
              item.label === "Library" ||
              item.label === "Education" ||
              item.label === "Guidance" ||
              item.label === "Community";

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenMenu(item.label)}
                onMouseLeave={() => hasDropdown && setOpenMenu(null)}
              >
                <button
                  onClick={() => hasDropdown && toggleMenu(item.label)}
                  className={`transition-colors ${
                    isActive
                      ? "text-[#2b2218] font-semibold"
                      : "text-[#6b5b45] hover:text-[#2b2218]"
                  }`}
                >
                  {item.label}
                </button>

                {/* ================= DROPDOWN ================= */}
                {hasDropdown && openMenu === item.label && (
                  <div className="absolute left-0 mt-4 bg-[#f7f1e4] border border-black/10 shadow-lg rounded-md p-5 min-w-[220px] space-y-2">

                    {item.label === "Library" && (
                      <>
                        <Link
                          href="/library/bg"
                          className="block text-sm text-[#6b5b45] hover:text-[#2b2218]"
                        >
                          Bhagavad-gītā
                        </Link>
                        <Link
                          href="/library"
                          className="block text-sm text-[#6b5b45] hover:text-[#2b2218]"
                        >
                          All Texts (Future)
                        </Link>
                      </>
                    )}

                    {item.label === "Education" && (
                      <>
                        <Link
                          href="/education/courses"
                          className="block text-sm text-[#6b5b45] hover:text-[#2b2218]"
                        >
                          Courses (Future)
                        </Link>
                        <Link
                          href="/education/paths"
                          className="block text-sm text-[#6b5b45] hover:text-[#2b2218]"
                        >
                          Learning Paths (Future)
                        </Link>
                      </>
                    )}

                    {item.label === "Guidance" && (
                      <>
                        <Link
                          href="/guidance/mentorship"
                          className="block text-sm text-[#6b5b45] hover:text-[#2b2218]"
                        >
                          Mentorship (Future)
                        </Link>
                      </>
                    )}

                    {item.label === "Community" && (
                      <>
                        <Link
                          href="/community/groups"
                          className="block text-sm text-[#6b5b45] hover:text-[#2b2218]"
                        >
                          Study Groups (Future)
                        </Link>
                      </>
                    )}

                  </div>
                )}
              </div>
            );
          })}

        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-8 text-sm">
          <button className="text-[#6b5b45] hover:text-[#2b2218] transition-colors">
            Search
          </button>

          <Link
            href="/login"
            className="text-[#6b5b45] hover:text-[#2b2218] transition-colors"
          >
            Login
          </Link>
        </div>

      </div>
    </header>
  );
}