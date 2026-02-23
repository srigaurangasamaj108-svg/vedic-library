"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";
import { ChevronRight, ChevronDown } from "lucide-react";

export function CorpusTree() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <div className="text-sm leading-relaxed">

      {/* Root */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer font-semibold py-2 px-2 hover:bg-gray-100 rounded"
      >
        {open ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
        <span className="tracking-wide">Bhagavad-gītā</span>
      </div>

      {open && (
        <div className="ml-3 border-l border-gray-200 pl-3 space-y-1">
          {CHAPTERS.map((chapter) => (
            <ChapterNode
              key={chapter.id}
              chapter={chapter}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ChapterNode({
  chapter,
  pathname,
}: {
  chapter: (typeof CHAPTERS)[0];
  pathname: string | null;
}) {
  const isActiveChapter = pathname?.startsWith(`/bg/${chapter.id}`);
  const [expanded, setExpanded] = useState(isActiveChapter);

  return (
    <div>

      {/* Chapter */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-100 rounded"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
        <span className="font-medium text-gray-800">
          Chapter {chapter.id}
        </span>
      </div>

      {/* Verses */}
      {expanded && (
        <div className="ml-5 space-y-0.5">
          {Array.from({ length: chapter.verseCount }).map((_, i) => {
            const verseNumber = i + 1;
            const href = `/bg/${chapter.id}/${verseNumber}`;
            const active = pathname === href;

            return (
              <Link
                key={verseNumber}
                href={href}
                className={`block px-2 py-0.5 rounded text-xs transition-all ${
                  active
                    ? "bg-amber-100 border-l-4 border-amber-600 text-gray-900 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {chapter.id}.{verseNumber}
              </Link>
            );
          })}
        </div>
      )}

    </div>
  );
}