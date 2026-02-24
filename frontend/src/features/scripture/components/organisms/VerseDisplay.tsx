"use client";

import Link from "next/link";
import { ScriptBlock } from "../atoms/ScriptBlock";
import { useReadingMode } from "@/context/ReadingModeContext";

interface VerseDisplayProps {
  canon: string;
  chapter: number;
  verse: number;
  title: string;
  devanagari: string;
  transliteration: string;
  translation: string;
  synonyms: any[];
  exposition: string;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function VerseDisplay({
  canon,
  chapter,
  verse,
  title,
  devanagari,
  transliteration,
  translation,
  synonyms,
  exposition,
  hasPrevious,
  hasNext,
}: VerseDisplayProps) {
  const { scriptMode, showTranslation } = useReadingMode();

  const currentLabel = `${chapter}.${verse}`;

  return (
    <div className="max-w-3xl mx-auto px-6 pb-32">

      {/* Verse Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif font-bold">
          Bg. {currentLabel}
        </h1>
        <p className="text-sm text-[#6b5b45] mt-2">
          {title}
        </p>
      </div>

      {/* Sanskrit */}
      <div className="text-center space-y-6 leading-relaxed mb-12">
        {scriptMode !== "iast" && (
          <ScriptBlock content={devanagari} />
        )}
        {scriptMode !== "devanagari" && (
          <ScriptBlock content={transliteration} />
        )}
      </div>

      {/* Synonyms */}
      {synonyms.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-semibold text-center mb-4">
            Synonyms
          </h2>
          <div className="text-base leading-7">
            {synonyms.map((item, i) => (
              <span key={i}>
                <span className="italic">{item.sanskrit}</span>
                {" — "}
                {item.meaning}
                {"; "}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Translation */}
      {showTranslation && translation && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-semibold text-center mb-4">
            Translation
          </h2>
          <div className="text-lg leading-8">
            {translation}
          </div>
        </div>
      )}

      {/* Purport */}
      {exposition && (
        <div className="mb-20">
          <h2 className="text-2xl font-serif font-semibold text-center mb-4">
            Purport
          </h2>
          <div className="text-lg leading-9 font-serif">
            {exposition}
          </div>
        </div>
      )}

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#e8e2d3] border-t border-black/10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between px-6 text-sm">

          {hasPrevious ? (
            <Link
              href={`/library/${canon}/${chapter}/${verse - 1}`}
              className="hover:underline"
            >
              ← {chapter}.{verse - 1}
            </Link>
          ) : <div />}

          {hasNext && (
            <Link
              href={`/library/${canon}/${chapter}/${verse + 1}`}
              className="hover:underline"
            >
              {chapter}.{verse + 1} →
            </Link>
          )}

        </div>
      </div>

    </div>
  );
}
