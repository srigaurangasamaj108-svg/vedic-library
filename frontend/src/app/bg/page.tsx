"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { CHAPTERS } from "@/lib/constants";
import { loadVerse } from "@/lib/loadVerse";
import { Breadcrumbs } from "@/components/Breadcrumbs";

/* -----------------------------
 * Types (frontend-only, minimal)
 * ----------------------------- */

type SynonymItem = {
  sanskrit: string;
  meaning: string;
};

type VerseData = {
  uid: string;
  devanagari: string;
  iast: string;
  synonyms?: SynonymItem[];
  translation?: {
    language: string;
    text: string;
  };
  purport?: {
    language: string;
    text: string;
  };
};

/* -----------------------------
 * Inner Page (uses search params)
 * ----------------------------- */

function BhagavadGitaPage() {
  const searchParams = useSearchParams();

  const chapterId = Number(searchParams.get("chapter") ?? "1");
  const view = searchParams.get("view");
  const isAdvanced = view === "advanced";

  const chapterData = CHAPTERS.find((c) => c.id === chapterId);

  const [verses, setVerses] = useState<VerseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterData) return;

    setLoading(true);

    const requests = Array.from(
      { length: chapterData.verseCount },
      (_, i) => loadVerse(`bg.${chapterId}.${i + 1}`)
    );

    Promise.all(requests)
      .then(setVerses)
      .finally(() => setLoading(false));
  }, [chapterId, chapterData]);

  if (!chapterData || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif text-xl">
        Loading…
      </div>
    );
  }

  return (
    <main className="pb-32 min-h-screen font-serif">
      <div className="max-w-[720px] mx-auto px-6 py-12">
        <Breadcrumbs />

        {/* Chapter Header */}
        <div className="mb-20 text-center">
          <span className="text-[#a63410] font-bold uppercase text-xs block mb-3">
            Chapter {chapterData.id}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#2b2218]">
            {chapterData.englishTitle}
          </h1>

          <h2 className="text-xl italic text-[#5c4d3c] mb-8">
            {chapterData.sanskritTitle}
          </h2>

          <p className="text-[19px] leading-relaxed text-[#2b2218] mb-12 max-w-xl mx-auto">
            {chapterData.summary}
          </p>

          {/* View Toggle */}
          <div className="flex justify-center gap-4 text-sm">
            <Link
              href={`/bg?chapter=${chapterId}`}
              className={`px-5 py-2 rounded transition ${
                !isAdvanced
                  ? "bg-[#e6a75a]/20 text-[#5c4d3c]"
                  : "text-[#888]"
              }`}
            >
              Translations
            </Link>

            <Link
              href={`/bg?chapter=${chapterId}&view=advanced`}
              className={`px-5 py-2 rounded transition ${
                isAdvanced
                  ? "bg-[#e6a75a]/20 text-[#5c4d3c]"
                  : "text-[#888]"
              }`}
            >
              Advanced View
            </Link>
          </div>
        </div>

        {/* Content */}
        {!isAdvanced && (
          <div>
            {verses.map((v, i) => (
              <Link
                key={v.uid}
                href={`/bg-verse?chapter=${chapterId}&verse=${i + 1}`}
                className="block py-5 px-4 -mx-4 hover:bg-[#e6a75a]/5 rounded"
              >
                <div className="flex gap-6">
                  <div className="text-[#a63410] font-bold w-10 text-right">
                    {i + 1}
                  </div>
                  <p className="text-[19px] text-[#2b2218]">
                    {v.translation?.text ?? "Translation not available."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {isAdvanced && (
          <div className="space-y-32">
            {verses.map((v, i) => (
              <article key={v.uid}>
                <div className="text-center mb-10">
                  <Link
                    href={`/bg-verse?chapter=${chapterId}&verse=${i + 1}`}
                    className="text-2xl font-bold text-[#2b2218] hover:underline"
                  >
                    Bg. {chapterId}.{i + 1}
                  </Link>

                  <div className="text-[26px] leading-[1.8] mt-8">
                    {v.devanagari}
                  </div>

                  <div className="text-[22px] italic mt-6">
                    {v.iast}
                  </div>
                </div>

                {v.translation && (
                  <p className="text-[21px] leading-[1.8] text-justify">
                    {v.translation.text}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* -----------------------------
 * Wrapper (required for export)
 * ----------------------------- */

export default function BhagavadGitaPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-serif text-xl">
          Loading…
        </div>
      }
    >
      <BhagavadGitaPage />
    </Suspense>
  );
}
