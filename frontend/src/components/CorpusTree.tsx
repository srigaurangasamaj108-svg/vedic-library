"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CORPUS_STRUCTURE, CorpusNode } from "@/lib/corpus.structure";
import { CHAPTERS } from "@/lib/constants";
import { ChevronRight, ChevronDown } from "lucide-react";

/**
 * CorpusTree
 * ----------------------------------------
 * Recursive canonical navigation.
 * Reads exclusively from CORPUS_STRUCTURE.
 */

export function CorpusTree() {
  const pathname = usePathname();

  return (
    <div className="text-sm font-serif leading-relaxed text-[#3b3126]">
      {CORPUS_STRUCTURE.map((node) => (
        <CorpusNodeItem
          key={node.id}
          node={node}
          pathname={pathname}
          depth={0}
        />
      ))}
    </div>
  );
}

/* --------------------------------------- */
/* Recursive Node Renderer */
/* --------------------------------------- */

function CorpusNodeItem({
  node,
  pathname,
  depth,
}: {
  node: CorpusNode;
  pathname: string | null;
  depth: number;
}) {
  const hasChildren = node.children && node.children.length > 0;

  const isActive =
    node.route && pathname?.startsWith(node.route);

  const isDescendantActive = useMemo(() => {
    if (!node.children) return false;

    return node.children.some((child) =>
      child.route
        ? pathname?.startsWith(child.route)
        : false
    );
  }, [node.children, pathname]);

  const [open, setOpen] = useState(
    Boolean(isActive || isDescendantActive)
  );

  const paddingLeft = depth * 14;

  return (
    <div style={{ paddingLeft }}>

      {/* Node Header */}
      <div
        onClick={() => hasChildren && setOpen(!open)}
        className={`flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer transition-colors hover:bg-[#e4dbc7] ${
          isActive ? "font-semibold text-[#2b2218]" : ""
        }`}
      >
        {hasChildren && (
          open ? (
            <ChevronDown className="w-4 h-4 text-[#8c7a5a]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[#8c7a5a]" />
          )
        )}

        {node.route ? (
          <Link href={node.route} className="flex-1">
            {node.label}
          </Link>
        ) : (
          <span className="flex-1">{node.label}</span>
        )}
      </div>

      {/* Children */}
      {hasChildren && open && (
        <div>
          {node.children!.map((child) => (
            <CorpusNodeItem
              key={child.id}
              node={child}
              pathname={pathname}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {/* Chapter Injection (only for chaptered texts) */}
      {node.chaptered && open && node.route && (
        <div style={{ paddingLeft: 18 }}>
          {CHAPTERS.map((chapter) => (
            <ChapterNode
              key={chapter.id}
              chapter={chapter}
              pathname={pathname}
              baseRoute={node.route}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------- */
/* Chapter + Verse Renderer */
/* --------------------------------------- */

function ChapterNode({
  chapter,
  pathname,
  baseRoute,
}: {
  chapter: { id: number; verseCount: number };
  pathname: string | null;
  baseRoute: string;
}) {
  const chapterRoute = `${baseRoute}/${chapter.id}`;
  const isActiveChapter =
    pathname?.startsWith(chapterRoute);

  const [expanded, setExpanded] = useState(
    Boolean(isActiveChapter)
  );

  return (
    <div>

      {/* Chapter Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-[#e4dbc7]"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-[#a08d6a]" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[#a08d6a]" />
        )}

        <Link href={chapterRoute} className="flex-1">
          Chapter {chapter.id}
        </Link>
      </div>

      {/* Verses */}
      {expanded && (
        <div className="ml-6 space-y-1">
          {Array.from({ length: chapter.verseCount }).map((_, i) => {
            const verse = i + 1;
            const href = `${baseRoute}/${chapter.id}/${verse}`;
            const active = pathname === href;

            return (
              <Link
                key={verse}
                href={href}
                className={`block px-2 py-1 rounded-md text-xs transition-colors ${
                  active
                    ? "bg-[#d8cbb2] font-semibold text-[#2b2218]"
                    : "hover:bg-[#e4dbc7] text-[#6b5b45]"
                }`}
              >
                {chapter.id}.{verse}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
