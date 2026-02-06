import { promises as fs } from "fs";
import path from "path";

/* -----------------------------
 * Types
 * ----------------------------- */

export type SynonymItem = {
  sanskrit: string;
  meaning: string;
};

export type Translation = {
  language: string;
  text: string;
};

export type Purport = {
  language: string;
  text: string;
};

export type CanonicalVerse = {
  uid: string;
  devanagari: string;
  iast: string;
  synonyms?: SynonymItem[];
  translation?: Translation;
  purport?: Purport;
};

export type LoadVerseOptions = {
  language?: string; // default: "en"
};

/* -----------------------------
 * Loader
 * ----------------------------- */

export async function loadVerse(
  uid: string,
  options: LoadVerseOptions = {}
): Promise<CanonicalVerse> {
  const language = options.language ?? "en";

  const basePath = path.join(
    process.cwd(),
    "..",
    "data",
    "itihasa",
    "mahabharata",
    "bhisma-parva",
    "bhagavad-gita"
  );

  /* -----------------------------
   * 1. Canonical verse
   * ----------------------------- */
  const canonical = JSON.parse(
    await fs.readFile(
      path.join(basePath, "canonical", `${uid}.json`),
      "utf-8"
    )
  );

  /* -----------------------------
   * 2. Verse index (authoritative)
   * ----------------------------- */
  const index = JSON.parse(
    await fs.readFile(
      path.join(basePath, "index", "verse", `${uid}.index.json`),
      "utf-8"
    )
  );

  /* -----------------------------
   * 3. Editorial Unit UID
   * ----------------------------- */
  const editorialUnitUid: string | undefined =
    index.editorial_unit?.uid;

  /* -----------------------------
   * 4. Synonyms (transitional, language-aware)
   * ----------------------------- */
  let synonyms: SynonymItem[] | undefined;

  if (
    editorialUnitUid &&
    index.derivatives?.synonyms?.available === true
  ) {
    try {
      const languageSpecificPath = path.join(
        basePath,
        "derivatives",
        "synonyms",
        "prabhupada",
        `${editorialUnitUid}.synonyms.${language}.json`
      );

      const json = JSON.parse(
        await fs.readFile(languageSpecificPath, "utf-8")
      );

      synonyms = json.synonyms.items.items;
    } catch {
      if (language === "en") {
        try {
          const fallbackPath = path.join(
            basePath,
            "derivatives",
            "synonyms",
            "prabhupada",
            `${editorialUnitUid}.synonyms.json`
          );

          const json = JSON.parse(
            await fs.readFile(fallbackPath, "utf-8")
          );

          synonyms = json.synonyms.items.items;
        } catch {
          // absence is valid
        }
      }
    }
  }

  /* -----------------------------
   * 5. Translation (language is structural)
   * ----------------------------- */
  let translation: Translation | undefined;

  if (
    editorialUnitUid &&
    index.derivatives?.translations?.available === true
  ) {
    try {
      const translationPath = path.join(
        basePath,
        "derivatives",
        "translations",
        language,
        "prabhupada",
        `${editorialUnitUid}.translation.json`
      );

      const json = JSON.parse(
        await fs.readFile(translationPath, "utf-8")
      );

      translation = {
        language,
        text: json.translation.content,
      };
    } catch {
      // absence is valid
    }
  }

  /* -----------------------------
   * 6. Purport / Exposition (Editorial-Unit governed)
   * ----------------------------- */
  let purport: Purport | undefined;

  if (
    editorialUnitUid &&
    index.derivatives?.exposition?.available === true
  ) {
    try {
      const purportPath = path.join(
        basePath,
        "derivatives",
        "exposition",
        language,
        "prabhupada",
        `${editorialUnitUid}.exposition.json`
      );

      const json = JSON.parse(
        await fs.readFile(purportPath, "utf-8")
      );

      purport = {
        language,
        text: json.exposition.content,
      };
    } catch {
      // absence is valid and silent
    }
  }

  /* -----------------------------
   * 7. Return normalized payload
   * ----------------------------- */
  return {
    uid: canonical.uid,
    devanagari: canonical.text.content,
    iast: canonical.transliteration.content,
    synonyms,
    translation,
    purport,
  };
}

