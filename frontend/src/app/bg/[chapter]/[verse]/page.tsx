import { notFound } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";
import { loadVerseComposition } from "@/features/scripture/scripture.loader";
import { VerseDisplay } from "@/features/scripture/components/organisms/VerseDisplay";

interface PageProps {
  params: Promise<{
    chapter: string;
    verse: string;
  }>;
}

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
}: PageProps) {
  const { chapter, verse } = await params;

  const chapterId = Number(chapter);
  const verseId = Number(verse);

  const chapterData = CHAPTERS.find(
    (c) => c.id === chapterId
  );
  if (!chapterData) notFound();

  const composition = await loadVerseComposition(
    `bg.${chapterId}.${verseId}`,
    "prabhupada"
  );

  const hasPrevious = verseId > 1;
  const hasNext =
    verseId < chapterData.verseCount;

  const devanagari =
    composition.canonical.scripts.find(
      (s) => s.script === "devanagari"
    )?.content ?? "";

  const transliteration =
    composition.canonical.scripts.find(
      (s) => s.script === "iast"
    )?.content ?? "";

  const translation =
    composition.editorial?.layers.translation
      ?.content ?? "";

  const synonyms =
    composition.editorial?.layers.synonyms
      ?.items ?? [];

  const exposition =
    composition.editorial?.layers.exposition
      ?.content ?? "";

  return (
    <VerseDisplay
      chapter={chapterId}
      verse={verseId}
      title={chapterData.englishTitle}
      devanagari={devanagari}
      transliteration={transliteration}
      translation={translation}
      synonyms={synonyms}
      exposition={exposition}
      hasPrevious={hasPrevious}
      hasNext={hasNext}
    />
  );
}