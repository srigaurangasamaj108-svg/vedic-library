import fs from "fs/promises";
import path from "path";

import {
  ScripturalUnit,
  CanonicalUnit,
  TranslationLayer,
  EditorialUnit,
  SynonymLayer,
  ExpositionLayer,
  VerseComposition,
} from "@/types/scripture.types";

/* -------------------------------------------------------------------------- */
/*                               PATH RESOLUTION                              */
/* -------------------------------------------------------------------------- */

const PROJECT_ROOT = path.resolve(
  process.cwd(),
  process.cwd().endsWith("frontend") ? ".." : "."
);

const CANONICAL_ROOT = path.join(
  PROJECT_ROOT,
  "data/itihasa/mahabharata/bhisma-parva/bhagavad-gita"
);

/* -------------------------------------------------------------------------- */
/*                               CANONICAL LOAD                               */
/* -------------------------------------------------------------------------- */

async function loadCanonical(uid: string): Promise<CanonicalUnit> {
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

  return {
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
}

/* -------------------------------------------------------------------------- */
/*                         RANGE-AWARE EDITORIAL LOADER                       */
/* -------------------------------------------------------------------------- */

async function loadEditorialUnit(
  uid: string,
  editor: string
): Promise<EditorialUnit | null> {
  const [, chapterStr, verseStr] = uid.split(".");

  const chapter = Number(chapterStr);
  const verse = Number(verseStr);

  const dirPath = path.join(
    CANONICAL_ROOT,
    "derivatives/editorial-units",
    editor
  );

  try {
    const files = await fs.readdir(dirPath);

    for (const fileName of files) {
      if (!fileName.endsWith(".editorial-unit.json")) continue;

      const filePath = path.join(dirPath, fileName);
      const file = await fs.readFile(filePath, "utf-8");
      const raw: EditorialUnit = JSON.parse(file);

      if (
        raw.covers.chapter === chapter &&
        verse >= raw.covers.from_verse &&
        verse <= raw.covers.to_verse
      ) {
        return raw;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                         RANGE-AWARE TRANSLATION LOADER                     */
/* -------------------------------------------------------------------------- */

async function loadTranslation(
  uid: string,
  editor: string
): Promise<TranslationLayer | null> {
  const editorial = await loadEditorialUnit(uid, editor);
  if (!editorial) return null;

  const { chapter, from_verse, to_verse } = editorial.covers;

  const fileName =
    from_verse === to_verse
      ? `bg.${chapter}.${from_verse}.${editor}.translation.json`
      : `bg.${chapter}.${from_verse}-${to_verse}.${editor}.translation.json`;

  const filePath = path.join(
    CANONICAL_ROOT,
    "derivatives/translations/en",
    editor,
    fileName
  );

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const raw = JSON.parse(file);

    return {
      id: `${editor}-en`,
      language: raw.translation.language,
      author: raw.translation.translator,
      content: raw.translation.content,
    };
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                         RANGE-AWARE SYNONYMS LOADER                        */
/* -------------------------------------------------------------------------- */

async function loadSynonyms(
  uid: string,
  editor: string
): Promise<SynonymLayer | null> {
  const editorial = await loadEditorialUnit(uid, editor);
  if (!editorial) return null;

  const { chapter, from_verse, to_verse } = editorial.covers;

  const fileName =
    from_verse === to_verse
      ? `bg.${chapter}.${from_verse}.${editor}.synonyms.json`
      : `bg.${chapter}.${from_verse}-${to_verse}.${editor}.synonyms.json`;

  const filePath = path.join(
    CANONICAL_ROOT,
    "derivatives/synonyms",
    editor,
    fileName
  );

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const raw = JSON.parse(file);

    return {
      id: `${editor}-synonyms`,
      language: raw.synonyms.language,
      author: raw.synonyms.author,
      items: raw.synonyms.items.items,
    };
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                         RANGE-AWARE EXPOSITION LOADER                      */
/* -------------------------------------------------------------------------- */

async function loadExposition(
  uid: string,
  editor: string
): Promise<ExpositionLayer | null> {
  const editorial = await loadEditorialUnit(uid, editor);
  if (!editorial) return null;

  const { chapter, from_verse, to_verse } = editorial.covers;

  const fileName =
    from_verse === to_verse
      ? `bg.${chapter}.${from_verse}.${editor}.exposition.json`
      : `bg.${chapter}.${from_verse}-${to_verse}.${editor}.exposition.json`;

  const filePath = path.join(
    CANONICAL_ROOT,
    "derivatives/exposition/en",
    editor,
    fileName
  );

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const raw = JSON.parse(file);

    return {
      id: `${editor}-exposition`,
      language: raw.exposition.language,
      author: raw.exposition.author,
      type: raw.exposition.type,
      content: raw.exposition.content,
    };
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                      LEGACY SCRIPTURAL UNIT LOADER                         */
/* -------------------------------------------------------------------------- */

export async function loadScripturalUnit(
  uid: string
): Promise<ScripturalUnit> {
  const canonical = await loadCanonical(uid);
  return { canonical };
}

/* -------------------------------------------------------------------------- */
/*                       FULL VERSE COMPOSITION ENGINE                        */
/* -------------------------------------------------------------------------- */

export async function loadVerseComposition(
  uid: string,
  editor: string = "prabhupada"
): Promise<VerseComposition> {
  const canonical = await loadCanonical(uid);

  const editorialUnit = await loadEditorialUnit(uid, editor);

  if (!editorialUnit) {
    return { canonical };
  }

  const layers: {
    synonyms?: SynonymLayer;
    translation?: TranslationLayer;
    exposition?: ExpositionLayer;
  } = {};

  if (editorialUnit.scope?.has_translation) {
    const translation = await loadTranslation(uid, editor);
    if (translation) layers.translation = translation;
  }

  if (editorialUnit.scope?.has_synonyms) {
    const synonyms = await loadSynonyms(uid, editor);
    if (synonyms) layers.synonyms = synonyms;
  }

  if (editorialUnit.scope?.has_exposition) {
    const exposition = await loadExposition(uid, editor);
    if (exposition) layers.exposition = exposition;
  }

  return {
    canonical,
    editorial: {
      unit: editorialUnit,
      layers,
    },
  };
}
