import fs from "fs/promises";
import path from "path";
import {
  ScripturalUnit,
  CanonicalUnit,
  TranslationLayer,
} from "@/types/scripture.types";

/**
 * Resolve project root safely in both:
 * - Local dev (running from /frontend)
 * - Production (running from repo root)
 */
const PROJECT_ROOT = path.resolve(
  process.cwd(),
  process.cwd().endsWith("frontend") ? ".." : "."
);

/**
 * Canonical root path (absolute, production-safe)
 */
const CANONICAL_ROOT = path.join(
  PROJECT_ROOT,
  "data/itihasa/mahabharata/bhisma-parva/bhagavad-gita"
);

/**
 * Load Prabhupada English translation if available
 */
async function loadPrabhupadaEnglishTranslation(
  uid: string
): Promise<TranslationLayer | null> {
  const [text, chapter, verse] = uid.split(".");

  const filePath = path.join(
    CANONICAL_ROOT,
    "derivatives/translations/en/prabhupada",
    `bg.${chapter}.${verse}.prabhupada.translation.json`
  );

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const raw = JSON.parse(file);

    return {
      id: "prabhupada-en",
      language: "en",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      content: raw.text,
    };
  } catch {
    return null;
  }
}

/**
 * Core Scripture Engine Loader
 */
export async function loadScripturalUnit(
  uid: string
): Promise<ScripturalUnit> {
  const [text, chapter, verse] = uid.split(".");

  if (text !== "bg") {
    throw new Error(`Unsupported UID: ${uid}`);
  }

  const canonicalPath = path.join(
    CANONICAL_ROOT,
    "canonical",
    `bg.${chapter}.${verse}.json`
  );

  const file = await fs.readFile(canonicalPath, "utf-8");
  const raw = JSON.parse(file);

  const canonical: CanonicalUnit = {
    identity: {
      uid: raw.uid,
      corpus: raw.work.corpus,
      text: raw.work.text,
      section: raw.work.section,
      subwork: raw.work.subwork,
    },
    location: raw.location,
    scripts: [
      {
        script: raw.text.script,
        content: raw.text.content,
      },
      {
        script: raw.transliteration.scheme,
        content: raw.transliteration.content,
      },
    ],
    schema: raw.schema,
  };

  const translation = await loadPrabhupadaEnglishTranslation(uid);

  return {
    canonical,
    derivatives: {
      translations: translation ? [translation] : [],
      commentaries: [],
    },
  };
}
