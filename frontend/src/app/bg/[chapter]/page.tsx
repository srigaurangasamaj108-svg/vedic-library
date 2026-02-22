import Link from "next/link";
import { notFound } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";
import { loadVerse } from "@/lib/loadVerse";

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

  const verses = await Promise.all(
    Array.from({ length: chapterData.verseCount }, (_, i) =>
      loadVerse(`bg.${chapterId}.${i + 1}`)
    )
  );

  return (
    <main className="min-h-screen pb-32">
      <div className="max-w-[720px] mx-auto px-6 py-20">

        <div className="text-center mb-20">
          <div className="text-sm uppercase tracking-widest text-gray-500">
            Chapter {chapterId}
          </div>

          <h1 className="text-4xl font-bold mt-4">
            {chapterData.englishTitle}
          </h1>

          <div className="italic text-gray-600 mt-3">
            {chapterData.sanskritTitle}
          </div>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {chapterData.summary}
          </p>
        </div>

        <div className="space-y-20">
          {verses.map((v) => (
            <Link
              key={v.uid}
              href={`/bg/${v.chapter}/${v.verse}`}
              className="block group"
            >
              <div className="text-sm text-gray-500 mb-4">
                Verse {v.verse}
              </div>

              <div className="text-2xl text-center leading-loose whitespace-pre-line group-hover:opacity-80 transition">
                {v.devanagari}
              </div>

              <div className="border-b border-gray-300 mt-10"></div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
