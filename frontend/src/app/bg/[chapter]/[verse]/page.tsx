import { notFound } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";
import { loadScripturalUnit } from "@/features/scripture/scripture.loader";
import { VerseDisplay } from "@/features/scripture/components/organisms/VerseDisplay";

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

  const unit = await loadScripturalUnit(`bg.${chapterId}.${verseId}`);
  if (!unit) notFound();

  const hasPrevious = verseId > 1;
  const hasNext = verseId < chapterData.verseCount;

  // Canonical scripts
  const devanagari =
    unit.canonical.scripts.find((s) => s.script === "devanagari")?.content ??
    "";

  const transliteration =
    unit.canonical.scripts.find((s) => s.script === "iast")?.content ??
    "";

  // Translation layer (first available)
  const translationLayer =
    unit.derivatives?.translations?.[0];

  const translation = translationLayer
    ? {
        content: translationLayer.content,
        author: translationLayer.author,
      }
    : undefined;

  return (
    <main className="min-h-screen pb-32">
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <VerseDisplay
          chapter={chapterId}
          verse={verseId}
          title={chapterData.englishTitle}
          devanagari={devanagari}
          transliteration={transliteration}
          translation={translation}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      </div>
    </main>
  );
}
