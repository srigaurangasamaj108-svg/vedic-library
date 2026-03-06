import fs from "fs/promises";
import path from "path";

import { parseUID } from "@/lib/uid";
import { resolveScripturePath } from "@/lib/registry.loader";

/**
 * Verse Index Type
 */
export interface VerseIndex {
  schema: string;
  schema_version: string;

  verse_uid: string;

  work: {
    corpus: string;
    text: string;
    section?: string;
    subwork?: string;
  };

  location: {
    chapter: number;
    verse: number;
  };

  canonical_ref: string;

  /**
   * Old format (single commentary)
   */
  editorial_unit?: {
    uid: string;
    covers: {
      chapter: number;
      from_verse: number;
      to_verse: number;
    };
  };

  /**
   * New format (multiple commentaries)
   */
  editorial_units?: string[];

  derivatives?: {
    synonyms?: {
      available: boolean;
      refs: string[];
    };

    translations?: {
      available: boolean;
      refs: string[];
    };

    exposition?: {
      available: boolean;
      refs: string[];
    };
  };
}

/**
 * Load verse index using registry
 */
export async function loadVerseIndex(uid: string): Promise<VerseIndex> {
  const { chapter, verse } = parseUID(uid);

  const scriptureRoot = await resolveScripturePath(uid);

  const indexPath = path.join(
    scriptureRoot,
    "index",
    "verse",
    `${uid}.index.json`
  );

  const file = await fs.readFile(indexPath, "utf-8");

  return JSON.parse(file);
}

/**
 * Resolve canonical file path
 */
export function resolveCanonicalPath(
  index: VerseIndex,
  scriptureRoot: string
) {
  return path.join(
    scriptureRoot,
    "canonical",
    `${index.canonical_ref}.json`
  );
}

/**
 * Resolve editorial unit paths
 */
export function resolveEditorialPaths(
  index: VerseIndex,
  scriptureRoot: string
): string[] {
  const paths: string[] = [];

  /**
   * New multi-commentary format
   */
  if (index.editorial_units) {
    for (const uid of index.editorial_units) {
      const parts = uid.split(".");
      const editor = parts[parts.length - 1];

      paths.push(
        path.join(
          scriptureRoot,
          "derivatives",
          "editorial-units",
          editor,
          `${uid}.editorial-unit.json`
        )
      );
    }

    return paths;
  }

  /**
   * Backward compatibility
   */
  if (index.editorial_unit) {
    const uid = index.editorial_unit.uid;

    const parts = uid.split(".");
    const editor = parts[parts.length - 1];

    paths.push(
      path.join(
        scriptureRoot,
        "derivatives",
        "editorial-units",
        editor,
        `${uid}.editorial-unit.json`
      )
    );
  }

  return paths;
}
