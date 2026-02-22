import fs from "fs/promises";
import path from "path";

export async function loadVerse(uid: string) {
  // Example UID: bg.2.1
  const [text, chapter, verse] = uid.split(".");

  if (text !== "bg") {
    throw new Error(`Unsupported UID: ${uid}`);
  }

  // Absolute path to canonical JSON files
  const filePath = path.join(
    process.cwd(),
    "../data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical",
    `bg.${chapter}.${verse}.json`
  );

  const file = await fs.readFile(filePath, "utf-8");
  const canonical = JSON.parse(file);

  return {
    uid,
    chapter: canonical.location.chapter,
    verse: canonical.location.verse,
    devanagari: canonical.text.content,
    transliteration: canonical.transliteration.content,
  };
}
