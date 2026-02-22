import Link from "next/link";
import { notFound } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";
import { loadScripturalUnit } from "@/features/scripture/scripture.loader";

export async function generateStaticParams() {
  return CHAPTERS.map((c) => ({
    chapter: c.id.toString(),
  }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;

  const chapterId = Number(chapter);

  const chapterData = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapterData) notFound();

  const verses = [];

  for (let i = 1; i <= chapterData.verseCount; i++) {
    const unit = await loadScripturalUnit(`bg.${chapterId}.${i}`);

    const devanagari =
      unit.canonical.scripts.find((s) => s.script === "devanagari")
        ?.content ?? "";

    verses.push({
      verse: i,
      text: devanagari,
    });
  }

  return (
    <main className="min-h-screen pb-32">
      <div className="max-w-[720px] mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-16">
          <div className="text-sm text-gray-500 uppercase tracking-widest">
            Chapter {chapterId}
          </div>

          <h1 className="text-3xl font-semibold mt-3">
            {chapterData.englishTitle}
          </h1>

          <div className="mt-4 text-gray-600">
            {chapterData.summary}
          </div>
        </div>

        {/* Verse List */}
        <div className="space-y-10">
          {verses.map((v) => (
            <div key={v.verse}>
              <div className="text-sm text-gray-500 mb-2">
                Verse {v.verse}
              </div>

              <Link
                href={`/bg/${chapterId}/${v.verse}`}
                className="block text-xl leading-relaxed whitespace-pre-line hover:text-black transition-colors"
              >
                {v.text}
              </Link>

              <div className="border-b border-gray-200 mt-6" />
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
