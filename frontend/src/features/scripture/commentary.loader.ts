import fs from "fs/promises";
import path from "path";

import { VerseIndex } from "./index.loader";
import {
  CommentaryLayer,
  CommentaryTranslationLayer
} from "@/types/scripture.types";

/* -------------------------------------------------------------------------- */
/*                      LOAD ORIGINAL SANSKRIT COMMENTARIES                   */
/* -------------------------------------------------------------------------- */

export async function loadCommentaries(
  index: VerseIndex,
  scriptureRoot: string
): Promise<CommentaryLayer[]> {

  const layers: CommentaryLayer[] = [];

  const commentaryRoot = path.join(
    scriptureRoot,
    "derivatives",
    "commentary"
  );

  try {

    const acharyas = await fs.readdir(commentaryRoot);

    for (const acharya of acharyas) {

      const acharyaPath = path.join(commentaryRoot, acharya);

      const languages = await fs.readdir(acharyaPath);

      for (const lang of languages) {

        /* we only treat Sanskrit as original commentary */

        if (lang !== "sa") continue;

        const filePath = path.join(
          acharyaPath,
          lang,
          `${index.verse_uid}.${acharya}.commentary.json`
        );

        try {

          const file = await fs.readFile(filePath, "utf-8");
          const raw = JSON.parse(file);

          layers.push({
            id: `${acharya}-sa`,
            language: raw.commentary.language,
            author: raw.author.name,
            tradition: raw.author.tradition,
            content: raw.commentary.content
          });

        } catch {
          continue;
        }

      }

    }

  } catch {

    return [];

  }

  return layers;
}

/* -------------------------------------------------------------------------- */
/*                       LOAD COMMENTARY TRANSLATIONS                         */
/* -------------------------------------------------------------------------- */

export async function loadCommentaryTranslations(
  index: VerseIndex,
  scriptureRoot: string
): Promise<CommentaryTranslationLayer[]> {

  const layers: CommentaryTranslationLayer[] = [];

  const commentaryRoot = path.join(
    scriptureRoot,
    "derivatives",
    "commentary"
  );

  try {

    const acharyas = await fs.readdir(commentaryRoot);

    for (const acharya of acharyas) {

      const acharyaPath = path.join(commentaryRoot, acharya);

      const languages = await fs.readdir(acharyaPath);

      for (const lang of languages) {

        if (lang === "sa") continue;

        const filePath = path.join(
          acharyaPath,
          lang,
          `${index.verse_uid}.${acharya}.translation.json`
        );

        try {

          const file = await fs.readFile(filePath, "utf-8");
          const raw = JSON.parse(file);

          layers.push({
            id: `${acharya}-${lang}`,
            language: raw.translation.language,
            commentary_author: acharya,
            author: raw.translation.translator,
            content: raw.translation.content
          });

        } catch {
          continue;
        }

      }

    }

  } catch {

    return [];

  }

  return layers;
}
