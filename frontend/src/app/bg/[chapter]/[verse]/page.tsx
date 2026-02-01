import { loadVerse } from "@/lib/loadVerse";
import { CHAPTER_VERSE_COUNT } from "@/lib/chapterMap";

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
    <main style={{ padding: 40 }}>
      {/* Work title */}
      <p>Bhagavad-gītā</p>

      {/* UID */}
      <p>{verseData.uid}</p>

      {/* Sanskrit (Devanāgarī) */}
      <div style={{ marginTop: 24, fontSize: "1.4rem" }}>
        {verseData.devanagari}
      </div>

      {/* Transliteration (IAST) */}
      <div
        style={{
          marginTop: 16,
          fontStyle: "italic",
          color: "#444",
        }}
      >
        {verseData.iast}
      </div>

      {/* Synonyms */}
      {verseData.synonyms && (
        <div style={{ marginTop: 24 }}>
          <strong>Synonyms</strong>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            {verseData.synonyms.map((item, index) => (
              <li key={index} style={{ marginBottom: 4 }}>
                <em>{item.sanskrit}</em> — {item.meaning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Translation */}
      {verseData.translation && (
        <div style={{ marginTop: 24 }}>
          <strong>Translation</strong>
          <p style={{ marginTop: 8 }}>
            {verseData.translation.text}
          </p>
        </div>
      )}

      {/* Purport / Exposition */}
      {verseData.purport && (
        <div style={{ marginTop: 32 }}>
          <strong>Purport</strong>
          <p style={{ marginTop: 8 }}>
            {verseData.purport.text}
          </p>
        </div>
      )}

      {/* Previous / Next Navigation */}
      <div
        style={{
          marginTop: 48,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {prev ? (
          <a href={`/bg/${prev.chapter}/${prev.verse}`}>
            ← BG {prev.chapter}.{prev.verse}
          </a>
        ) : (
          <span />
        )}

        {next ? (
          <a href={`/bg/${next.chapter}/${next.verse}`}>
            BG {next.chapter}.{next.verse} →
          </a>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}

