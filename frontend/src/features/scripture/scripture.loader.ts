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
  CommentaryLayer,
  CommentaryTranslationLayer
} from "@/types/scripture.types";

import {
  loadVerseIndex,
  resolveCanonicalPath,
  resolveEditorialPaths,
  VerseIndex
} from "./index.loader";

import {
  loadCommentaries,
  loadCommentaryTranslations
} from "./commentary.loader";

/* -------------------------------------------------------------------------- */
/*                          SCRIPTURE ROOT RESOLUTION                         */
/* -------------------------------------------------------------------------- */

function resolveScriptureRoot(index: VerseIndex) {

  const { corpus, text, section, subwork } = index.work;

  return path.join(
    process.cwd(),
    "..",
    "data",
    corpus,
    text,
    section ?? "",
    subwork ?? ""
  );
}

/* -------------------------------------------------------------------------- */
/*                               CANONICAL LOAD                               */
/* -------------------------------------------------------------------------- */

async function loadCanonical(
  index: VerseIndex,
  scriptureRoot: string
): Promise<CanonicalUnit> {

  const canonicalPath =
    resolveCanonicalPath(index, scriptureRoot);

  const file = await fs.readFile(canonicalPath, "utf-8");

  const raw = JSON.parse(file);

  return {
    identity: {
      uid: raw.uid,
      corpus: raw.work.corpus,
      text: raw.work.text,
      section: raw.work.section,
      subwork: raw.work.subwork
    },
    location: raw.location,
    scripts: [
      {
        script: raw.text.script,
        content: raw.text.content
      },
      {
        script: raw.transliteration.scheme,
        content: raw.transliteration.content
      }
    ],
    schema: raw.schema
  };
}

/* -------------------------------------------------------------------------- */
/*                             EDITORIAL UNIT LOAD                            */
/* -------------------------------------------------------------------------- */

async function loadEditorialUnit(
  index: VerseIndex,
  scriptureRoot: string
): Promise<EditorialUnit | null> {

  const editorialPaths =
    resolveEditorialPaths(index, scriptureRoot);

  if (!editorialPaths?.length) return null;

  for (const p of editorialPaths) {

    try {

      const file = await fs.readFile(p, "utf-8");

      return JSON.parse(file);

    } catch {
      continue;
    }
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*                          DERIVATIVE LAYER LOADERS                          */
/* -------------------------------------------------------------------------- */

async function loadSynonyms(
  index: VerseIndex,
  editor: string,
  scriptureRoot: string
): Promise<SynonymLayer | null> {

  const filePath = path.join(
    scriptureRoot,
    "derivatives",
    "synonyms",
    editor,
    `${index.verse_uid}.${editor}.synonyms.json`
  );

  try {

    const file = await fs.readFile(filePath, "utf-8");

    const raw = JSON.parse(file);

    return {
      id: `${editor}-synonyms`,
      language: raw.synonyms.language,
      author: raw.synonyms.author,
      items: raw.synonyms.items.items
    };

  } catch {
    return null;
  }
}

async function loadTranslation(
  index: VerseIndex,
  editor: string,
  language: string,
  scriptureRoot: string
): Promise<TranslationLayer | null> {

  const filePath = path.join(
    scriptureRoot,
    "derivatives",
    "translations",
    language,
    editor,
    `${index.verse_uid}.${editor}.translation.json`
  );

  try {

    const file = await fs.readFile(filePath, "utf-8");

    const raw = JSON.parse(file);

    return {
      id: `${editor}-${language}`,
      language: raw.translation.language,
      author: raw.translation.translator,
      content: raw.translation.content
    };

  } catch {
    return null;
  }
}

async function loadExposition(
  index: VerseIndex,
  editor: string,
  language: string,
  scriptureRoot: string
): Promise<ExpositionLayer | null> {

  const filePath = path.join(
    scriptureRoot,
    "derivatives",
    "exposition",
    language,
    editor,
    `${index.verse_uid}.${editor}.exposition.json`
  );

  try {

    const file = await fs.readFile(filePath, "utf-8");

    const raw = JSON.parse(file);

    return {
      id: `${editor}-exposition`,
      language: raw.exposition.language,
      author: raw.exposition.author,
      type: raw.exposition.type,
      content: raw.exposition.content
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

  const index = await loadVerseIndex(uid);

  const scriptureRoot = resolveScriptureRoot(index);

  const canonical =
    await loadCanonical(index, scriptureRoot);

  return { canonical };
}

/* -------------------------------------------------------------------------- */
/*                       FULL VERSE COMPOSITION ENGINE                        */
/* -------------------------------------------------------------------------- */

export async function loadVerseComposition(
  uid: string,
  editor: string = "prabhupada",
  language: string = "en"
): Promise<VerseComposition> {

  const index = await loadVerseIndex(uid);

  const scriptureRoot = resolveScriptureRoot(index);

  const canonical =
    await loadCanonical(index, scriptureRoot);

  const editorialUnit =
    await loadEditorialUnit(index, scriptureRoot);

  if (!editorialUnit) {
    return { canonical };
  }

  const layers: {
    synonyms?: SynonymLayer;
    translation?: TranslationLayer;
    exposition?: ExpositionLayer;
    commentary?: CommentaryLayer[];
    commentary_translations?: CommentaryTranslationLayer[];
  } = {};

  const synonyms =
    await loadSynonyms(index, editor, scriptureRoot);

  if (synonyms) layers.synonyms = synonyms;

  const translation =
    await loadTranslation(index, editor, language, scriptureRoot);

  if (translation) layers.translation = translation;

  const exposition =
    await loadExposition(index, editor, language, scriptureRoot);

  if (exposition) layers.exposition = exposition;

  const commentaries =
    await loadCommentaries(index, scriptureRoot);

  if (commentaries.length)
    layers.commentary = commentaries;

  const commentaryTranslations =
    await loadCommentaryTranslations(index, scriptureRoot);

  if (commentaryTranslations.length)
    layers.commentary_translations =
      commentaryTranslations;

  return {
    canonical,
    editorial: {
      unit: editorialUnit,
      layers
    }
  };
}
