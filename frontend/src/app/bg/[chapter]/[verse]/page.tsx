import { loadVerse } from "@/lib/loadVerse";
import { CHAPTER_VERSE_COUNT } from "@/lib/chapterMap";
import { VerseNavigation } from "@/components/VerseNavigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ViewOptions } from "@/components/ViewOptions";

/**
 * Required for dynamic routes in App Router
 */
export async function generateStaticParams() {
  return [];
}

/**
 * Compute Previous / Next verse safely
 */
function getPrevNext(chapter: number, verse: number) {
  const lastVerseOfChapter = CHAPTER_VERSE_COUNT[chapter];

  let prev: { chapter: number; verse: number } | null = null;
  let next: { chapter: number; verse: number } | null = null;

  // Previous verse
  if (verse > 1) {
    prev = { chapter, verse: verse - 1 };
  } else if (chapter > 1) {
    const prevChapter = chapter - 1;
    prev = {
      chapter: prevChapter,
      verse: CHAPTER_VERSE_COUNT[prevChapter],
    };
  }

  // Next verse
  if (verse < lastVerseOfChapter) {
    next = { chapter, verse: verse + 1 };
  } else if (chapter < 18) {
    next = { chapter: chapter + 1, verse: 1 };
  }

  return { prev, next };
}

export default async function BhagavadGitaVersePage({
  params,
}: {
  params: Promise<{ chapter: string; verse: string }>;
}) {
  const { chapter, verse } = await params;
  const chapterNum = Number(chapter);
  const verseNum = Number(verse);

  const uid = `bg.${chapterNum}.${verseNum}`;
  const verseData = await loadVerse(uid);

  const { prev, next } = getPrevNext(chapterNum, verseNum);

  return (
    <main className="min-h-screen font-serif pb-32 pt-8">
      <div className="max-w-[720px] mx-auto px-6">
        <Breadcrumbs />
        <ViewOptions />

        {/* Verse Header */}
        <div className="mb-16 text-center">
          <h1 className="text-[32px] md:text-[40px] font-bold mb-10 text-[#2b2218]">
            Bg. {chapter}.{verse}
          </h1>

          {/* Sanskrit (Devanāgarī) */}
          <div className="text-[26px] md:text-[30px] font-medium leading-[1.8] text-[#2b2218] whitespace-pre-line mb-8">
            {verseData.devanagari}
          </div>

          {/* Transliteration (IAST) */}
          <div className="text-[20px] md:text-[24px] italic text-[#2b2218] leading-[1.8] whitespace-pre-line mb-8">
            {verseData.iast}
          </div>
        </div>

        <div className="space-y-16">
          {/* Synonyms */}
          {verseData.synonyms && (
            <section>
              <h3 className="text-xl font-bold text-center mb-6 text-[#2b2218]">Synonyms</h3>
              <div className="leading-[1.9] text-[19px] text-justify text-[#2b2218]">
                {verseData.synonyms.map((item, index) => (
                  <span key={index} className="inline mr-1.5">
                    <span className="text-[#a63410] italic font-medium">{item.sanskrit}</span> — {item.meaning};
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Translation */}
          {verseData.translation && (
            <section>
              <h3 className="text-xl font-bold text-center mb-6 text-[#2b2218]">Translation</h3>
              <div className="px-0 md:px-4">
                <p className="text-[21px] leading-[1.8] text-[#2b2218] font-bold text-justify">
                  {verseData.translation.text}
                </p>
              </div>
            </section>
          )}

          {/* Purport */}
          {verseData.purport && (
            <section>
              <h3 className="text-xl font-bold text-center mb-6 text-[#2b2218]">Purport</h3>
              <div className="prose prose-lg max-w-none text-[#2b2218] leading-[1.8] whitespace-pre-wrap text-justify font-serif text-[19px]">
                {verseData.purport.text}
              </div>
            </section>
          )}
        </div>

        <div className="mt-24">
          <VerseNavigation prev={prev} next={next} />
        </div>
      </div>
    </main>
  );
}
