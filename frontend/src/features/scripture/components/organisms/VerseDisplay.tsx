"use client";

import Link from "next/link";
import { useReadingMode } from "@/context/ReadingModeContext";

interface VerseDisplayProps {
  chapter: number;
  verse: number;
  title: string;
  devanagari?: string;
  transliteration?: string;
  translation?: string;
  synonyms?: any[];
  exposition?: string;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function VerseDisplay({
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

  const { scriptMode, showTranslation, studyMode } =
    useReadingMode();

  /* ========================================================= */
  /*                 VISUAL STUDY MODE DIFFERENCE              */
  /* ========================================================= */

  const studyBackground =
    studyMode === "devotional"
      ? "bg-white"
      : studyMode === "scholarly"
      ? "bg-gray-100"
      : "bg-yellow-100";

  const studyTypography =
    studyMode === "devotional"
      ? "font-serif text-[20px] leading-relaxed"
      : studyMode === "scholarly"
      ? "text-[15px] leading-snug"
      : "text-[17px] leading-relaxed";

  /* ========================================================= */
  /*                   SAFE SYNONYM RENDER                     */
  /* ========================================================= */

  function renderSynonyms() {
    if (!synonyms || !Array.isArray(synonyms)) return null;

    return (
      <div className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-3">
          Synonyms
        </h2>

        <p className="leading-relaxed text-gray-800">
          {synonyms.map((item: any, index: number) => {

            const term =
              item.term ??
              item.word ??
              item.sanskrit ??
              item.original ??
              "";

            const meaning =
              item.meaning ??
              item.definition ??
              item.english ??
              item.translation ??
              "";

            return (
              <span key={index}>
                <span className="italic">{term}</span>
                {" — "}
                {meaning}
                {index !== synonyms.length - 1 && "; "}
              </span>
            );
          })}
        </p>
      </div>
    );
  }

  /* ========================================================= */
  /*                         RENDER                            */
  /* ========================================================= */

  return (
    <div
      className={`max-w-4xl mx-auto p-8 rounded ${studyBackground} ${studyTypography}`}
    >

      <div className="mb-10">
        <p className="text-sm text-gray-500">
          Chapter {chapter}
        </p>

        <h1 className="text-4xl font-semibold mb-2">
          {title}
        </h1>

        <p className="text-lg text-gray-700">
          Verse {verse}
        </p>
      </div>

      {/* DEVANAGARI */}
      {devanagari &&
        (scriptMode === "devanagari" ||
          scriptMode === "both") && (
          <div className="mb-8 text-center">
            <p className="text-3xl font-serif">
              {devanagari}
            </p>
          </div>
        )}

      {/* IAST */}
      {transliteration &&
        (scriptMode === "iast" ||
          scriptMode === "both") && (
          <div className="mb-8 text-center">
            <p className="italic text-gray-600 text-lg">
              {transliteration}
            </p>
          </div>
        )}

      {renderSynonyms()}

      {translation && showTranslation && (
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-3">
            Translation
          </h2>
          <p className="text-red-900 leading-relaxed">
            {translation}
          </p>
        </div>
      )}

      {exposition && (
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-3">
            Purport
          </h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {exposition}
          </p>
        </div>
      )}

      <div className="flex justify-between mt-12 text-sm">
        {hasPrevious ? (
          <Link href={`/bg/${chapter}/${verse - 1}`}>
            ← Previous
          </Link>
        ) : (
          <span />
        )}

        {hasNext ? (
          <Link href={`/bg/${chapter}/${verse + 1}`}>
            Next →
          </Link>
        ) : (
          <span />
        )}
      </div>

    </div>
  );
}