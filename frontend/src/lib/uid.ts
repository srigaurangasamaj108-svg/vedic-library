/**
 * UID parsing utilities
 *
 * Current UID format examples:
 *
 * bg.1.1
 * bg.2.47
 *
 * Future examples (other scriptures):
 *
 * rv.1.1.1
 * ys.2.3
 * ms.1.2.10
 */

export interface ParsedUID {
  text: string;
  chapter: number;
  verse: number;
}

/**
 * Parse scripture UID
 *
 * Example:
 * bg.2.47 → { text: "bg", chapter: 2, verse: 47 }
 */
export function parseUID(uid: string): ParsedUID {
  const parts = uid.split(".");

  if (parts.length !== 3) {
    throw new Error(`Invalid UID format: ${uid}`);
  }

  const [text, chapterStr, verseStr] = parts;

  const chapter = Number(chapterStr);
  const verse = Number(verseStr);

  if (Number.isNaN(chapter) || Number.isNaN(verse)) {
    throw new Error(`Invalid UID numbers: ${uid}`);
  }

  return {
    text,
    chapter,
    verse,
  };
}
