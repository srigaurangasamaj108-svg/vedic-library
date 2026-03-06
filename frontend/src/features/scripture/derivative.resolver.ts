import fs from "fs/promises";
import path from "path";

import { VerseIndex } from "./index.loader";

/**
 * Generic derivative layer result
 */
export interface DerivativeResult {
  type: string;
  file: string;
  data: any;
}

/**
 * Resolve scripture root
 */
function resolveRoot(index: VerseIndex): string {
  return path
    .join(
      index.work.corpus,
      index.work.text,
      index.work.section ?? "",
      index.work.subwork ?? ""
    )
    .replace(/\/+/g, "/");
}

/**
 * Load a derivative file
 */
async function loadFile(filePath: string) {
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

/**
 * Resolve derivative paths
 */
export async function resolveDerivatives(
  index: VerseIndex,
  scriptureRoot: string
): Promise<DerivativeResult[]> {

  const results: DerivativeResult[] = [];

  if (!index.derivatives) return results;

  const derivatives = index.derivatives;

  /**
   * SYNONYMS
   */
  if (derivatives.synonyms?.available) {

    for (const ref of derivatives.synonyms.refs) {

      const editor = ref.split(".")[3];

      const filePath = path.join(
        scriptureRoot,
        "derivatives",
        "synonyms",
        editor,
        `${ref}.json`
      );

      try {
        const data = await loadFile(filePath);

        results.push({
          type: "synonyms",
          file: filePath,
          data
        });
      } catch {}
    }
  }

  /**
   * TRANSLATIONS
   */
  if (derivatives.translations?.available) {

    for (const ref of derivatives.translations.refs) {

      const parts = ref.split(".");
      const editor = parts[3];
      const language = parts[4];

      const filePath = path.join(
        scriptureRoot,
        "derivatives",
        "translations",
        language,
        editor,
        `${ref}.json`
      );

      try {
        const data = await loadFile(filePath);

        results.push({
          type: "translation",
          file: filePath,
          data
        });
      } catch {}
    }
  }

  /**
   * EXPOSITION
   */
  if (derivatives.exposition?.available) {

    for (const ref of derivatives.exposition.refs) {

      const parts = ref.split(".");
      const editor = parts[3];

      const filePath = path.join(
        scriptureRoot,
        "derivatives",
        "exposition",
        "en",
        editor,
        `${ref}.json`
      );

      try {
        const data = await loadFile(filePath);

        results.push({
          type: "exposition",
          file: filePath,
          data
        });
      } catch {}
    }
  }

  return results;
}
