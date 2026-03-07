import fs from "fs/promises";
import path from "path";

import {
  CanonicalVerse,
  SynonymLayer,
  TranslationLayer,
  ExpositionLayer,
  CommentaryLayer,
  CommentaryTranslationLayer,
} from "@/types/scripture.types";

import { loadVerseIndex } from "./index.loader";
import {
  loadCommentaries,
  loadCommentaryTranslations,
} from "./commentary.loader";

const DATA_ROOT = path.resolve(process.cwd(), "data");

/* ------------------------------------------------ */
/* Utility                                           */
/* ------------------------------------------------ */

async function readJSON(filePath: string) {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

/* ------------------------------------------------ */
/* Canonical Verse                                   */
/* ------------------------------------------------ */

async function loadCanonical(
  uid: string,
  scriptureRoot: string
): Promise<CanonicalVerse> {

  const parts = uid.split(".");
  const chapter = parts[1];
  const verse = parts[2];

  const canonicalPath = path.join(
    scriptureRoot,
    "canonical",
    `bg.${chapter}.${verse}.json`
  );

  const raw = await readJSON(canonicalPath);

  return {
    uid: raw.uid || uid,

    text: {
      sanskrit:
        raw.text?.content ||
        raw.verse?.sanskrit ||
        raw.text?.sanskrit ||
        raw.sanskrit ||
        "",

      transliteration:
        raw.transliteration?.content ||
        raw.verse?.transliteration ||
        raw.text?.transliteration ||
        raw.transliteration ||
        "",
    },
  };
}

/* ------------------------------------------------ */
/* Synonyms                                          */
/* ------------------------------------------------ */

async function loadSynonyms(
  index: any,
  scriptureRoot: string
): Promise<SynonymLayer | null> {

  const ref = index.derivatives?.synonyms?.refs?.[0];
  if (!ref) return null;

  const filePath = path.join(
    scriptureRoot,
    "derivatives",
    "synonyms",
    "en",
    "prabhupada",
    `${ref}.json`
  );

  try {
    const raw = await readJSON(filePath);

    return {
      id: raw.uid,
      language: raw.synonyms.language,
      author: raw.synonyms.author,
      items: raw.synonyms.items.items,
    };
  } catch {
    return null;
  }
}

/* ------------------------------------------------ */
/* Translation                                       */
/* ------------------------------------------------ */

async function loadTranslation(
  index: any,
  scriptureRoot: string
): Promise<TranslationLayer | null> {

  const ref = index.derivatives?.translations?.refs?.[0];
  if (!ref) return null;

  const filePath = path.join(
    scriptureRoot,
    "derivatives",
    "translations",
    "en",
    "prabhupada",
    `${ref}.json`
  );

  try {
    const raw = await readJSON(filePath);

    return {
      id: raw.uid,
      language: raw.translation.language,
      author: raw.translation.translator,
      content: raw.translation.content,
    };
  } catch {
    return null;
  }
}

/* ------------------------------------------------ */
/* Exposition                                        */
/* ------------------------------------------------ */

async function loadExposition(
  index: any,
  scriptureRoot: string
): Promise<ExpositionLayer | null> {

  const ref = index.derivatives?.exposition?.refs?.[0];
  if (!ref) return null;

  const filePath = path.join(
    scriptureRoot,
    "derivatives",
    "exposition",
    "en",
    "prabhupada",
    `${ref}.json`
  );

  try {
    const raw = await readJSON(filePath);

    return {
      id: raw.uid,
      type: raw.exposition.type,
      language: raw.exposition.language,
      author: raw.exposition.author,
      content: raw.exposition.content,
    };
  } catch {
    return null;
  }
}

/* ------------------------------------------------ */
/* Verse Composition Engine                          */
/* ------------------------------------------------ */

export async function loadVerseComposition(uid: string) {

  /* 1 — Load index */
  const index = await loadVerseIndex(uid);

  /* 2 — Resolve scripture root dynamically */
  const scriptureRoot = path.join(
    DATA_ROOT,
    index.work.corpus,
    index.work.text,
    index.work.section,
    index.work.subwork
  );

  /* 3 — Load canonical */
  const canonical = await loadCanonical(uid, scriptureRoot);

  /* 4 — Load editorial layers */
  const synonyms = await loadSynonyms(index, scriptureRoot);
  const translation = await loadTranslation(index, scriptureRoot);
  const exposition = await loadExposition(index, scriptureRoot);

  /* 5 — Load commentaries */
  const commentaries: CommentaryLayer[] =
    await loadCommentaries(uid, scriptureRoot);

  const commentaryTranslations: CommentaryTranslationLayer[] =
    await loadCommentaryTranslations(uid, scriptureRoot);

  return {
    canonical,
    synonyms,
    translation,
    exposition,
    commentaries,
    commentaryTranslations,
  };
}
