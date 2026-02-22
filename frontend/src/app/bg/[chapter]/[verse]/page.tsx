import Link from "next/link";
import { notFound } from "next/navigation";
import { loadVerse } from "@/lib/loadVerse";
import { CHAPTERS } from "@/lib/constants";

export async function generateStaticParams() {
  const params = [];

  for (const chapter of CHAPTERS) {
    for (let i = 1; i <= chapter.verseCount; i++) {
      params.push({
        chapter: chapter.id.toString(),
        verse: i.toString(),
      });
    }
  }

  return params;
}

export default async function VersePage({
  params,
}: {
  params: Promise<{ chapter: string; verse: string }>;
}) {
  const { chapter, verse } = await params;

  const chapterId = Number(chapter);
  const verseId = Number(verse);

  const chapterData = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapterData) notFound();

  const verseData = await loadVerse(`bg.${chapterId}.${verseId}`);
  if (!verseData) notFound();

  const hasPrevious = verseId > 1;
  const hasNext = verseId < chapterData.verseCount;

  return (
    <main className="min-h-screen pb-32">
      <div className="max-w-[720px] mx-auto px-6 py-20">

        <div className="text-center mb-16">
          <div className="text-sm text-gray-500 uppercase tracking-widest">
            Chapter {chapterId}
          </div>

          <h1 className="text-3xl font-semibold mt-3">
            {chapterData.englishTitle}
          </h1>

          <div className="mt-4 text-sm text-gray-500">
            Verse {verseId}
          </div>
        </div>

        <div className="text-3xl text-center leading-loose whitespace-pre-line mb-12">
          {verseData.devanagari}
        </div>

        <div className="italic text-lg text-center text-gray-600 whitespace-pre-line mb-16">
          {verseData.transliteration}
        </div>

        <div className="flex justify-between text-sm">
          {hasPrevious ? (
            <Link href={`/bg/${chapterId}/${verseId - 1}`}>
              ← Previous
            </Link>
          ) : <div />}

          {hasNext && (
            <Link href={`/bg/${chapterId}/${verseId + 1}`}>
              Next →
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}
