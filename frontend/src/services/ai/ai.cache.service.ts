import fs from "fs/promises";
import path from "path";

import { CanonicalUnit } from "@/types/scripture.types";

/**
 * Resolve scripture root
 */
function resolveRoot(canonical: CanonicalUnit): string {

  const { corpus, text, section, subwork } =
    canonical.identity;

  return path.join(
    process.cwd(),
    "data",
    corpus,
    text,
    section ?? "",
    subwork ?? ""
  );
}

/**
 * Ensure directory exists
 */
async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Save AI translation
 */
export async function cacheAITranslation(
  canonical: CanonicalUnit,
  language: string,
  content: string
) {

  const root = resolveRoot(canonical);

  const editor = "ai";

  const uid = canonical.identity.uid;

  const dir = path.join(
    root,
    "derivatives",
    "translations",
    language,
    editor
  );

  await ensureDir(dir);

  const filePath = path.join(
    dir,
    `${uid}.ai.translation.json`
  );

  const json = {
    uid: `${uid}.ai.translation.${language}`,
    translation: {
      language,
      translator: "AI Generated",
      content
    }
  };

  await fs.writeFile(
    filePath,
    JSON.stringify(json, null, 2)
  );
}

/**
 * Save AI synonyms
 */
export async function cacheAISynonyms(
  canonical: CanonicalUnit,
  items: any[]
) {

  const root = resolveRoot(canonical);

  const editor = "ai";

  const uid = canonical.identity.uid;

  const dir = path.join(
    root,
    "derivatives",
    "synonyms",
    editor
  );

  await ensureDir(dir);

  const filePath = path.join(
    dir,
    `${uid}.ai.synonyms.json`
  );

  const json = {
    uid: `${uid}.ai.synonyms`,
    synonyms: {
      language: "en",
      author: "AI Generated",
      items: {
        language: "en",
        items
      }
    }
  };

  await fs.writeFile(
    filePath,
    JSON.stringify(json, null, 2)
  );
}

/**
 * Save AI exposition
 */
export async function cacheAIExposition(
  canonical: CanonicalUnit,
  language: string,
  content: string
) {

  const root = resolveRoot(canonical);

  const editor = "ai";

  const uid = canonical.identity.uid;

  const dir = path.join(
    root,
    "derivatives",
    "exposition",
    language,
    editor
  );

  await ensureDir(dir);

  const filePath = path.join(
    dir,
    `${uid}.ai.exposition.json`
  );

  const json = {
    uid: `${uid}.ai.exposition.${language}`,
    exposition: {
      type: "ai-generated",
      language,
      author: "AI Generated",
      content
    }
  };

  await fs.writeFile(
    filePath,
    JSON.stringify(json, null, 2)
  );
}
