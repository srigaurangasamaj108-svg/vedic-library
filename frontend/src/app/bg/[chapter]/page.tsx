import Link from "next/link";
import { notFound } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadVerse } from "@/lib/loadVerse";

/**
 * REQUIRED for static export
 * Generates /bg/1 ... /bg/18
 */
export async function generateStaticParams() {
  return CHAPTERS.map((c) => ({
    chapter: c.id.toString(),
  }));
}

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: { chapter: string };
  searchParams?: { view?: string };
}) {
  const chapterId = Number(params.chapter);
  const isAdvanced = searchParams?.view === "advanced";

  const chapterData = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapterData) notFound();

  const verses = await Promise.all(
    Array.from({ length: chapterData.verseCount }, (_, i) =>
      loadVerse(`bg.${chapterId}.${i + 1}`)
    )
  );

  return (
    <main className="pb-32 min-h-screen font-serif">
      <div className="max-w-[720px] mx-auto px-6 py-12">
        <Breadcrumbs />

        <div className="mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {chapterData.englishTitle}
          </h1>
          <h2 className="text-xl italic">
            {chapterData.sanskritTitle}
          </h2>
        </div>

        {!isAdvanced && (
          <div className="space-y-6">
            {verses.map((v, i) => (
              <Link
                key={v.uid}
                href={`/bg/${chapterId}/${i + 1}`}
                className="block border-b py-4"
              >
                {v.translation?.text ?? "Translation not available"}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
