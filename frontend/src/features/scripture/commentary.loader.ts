import fs from "fs/promises";
import path from "path";

import {
  CommentaryLayer,
  CommentaryTranslationLayer
} from "@/types/scripture.types";

/*
================================
Extract Author
================================
*/

function extractAuthor(uid: string): string {

  const parts = uid.split(".");
  return parts[parts.length - 1];

}

/*
================================
Load Sanskrit Commentaries
================================
*/

export async function loadCommentaries(
  index: any,
  scriptureRoot: string
): Promise<CommentaryLayer[]> {

  const layers: CommentaryLayer[] = [];

  const refs =
    index.derivatives?.commentary?.refs || [];

  for (const uid of refs) {

    const author = extractAuthor(uid);

    const filePath = path.join(
      scriptureRoot,
      "derivatives",
      "commentary",
      author,
      "sa",
      `${uid}.commentary.json`
    );

    try {

      const file = await fs.readFile(filePath, "utf-8");

      const raw = JSON.parse(file);

      layers.push({

        id: uid,

        language: raw.commentary.language || "sa",

        author:
          raw.commentary.author ||
          raw.commentary.commentator ||
          author,

        tradition: raw.commentary.tradition,

        content: raw.commentary.content

      });

    } catch {

      continue;

    }

  }

  return layers;

}

/*
================================
Load Commentary Translations
================================
*/

export async function loadCommentaryTranslations(
  index: any,
  scriptureRoot: string
): Promise<CommentaryTranslationLayer[]> {

  const layers: CommentaryTranslationLayer[] = [];

  const refs =
    index.derivatives?.commentary?.refs || [];

  for (const uid of refs) {

    const author = extractAuthor(uid);

    const root = path.join(
      scriptureRoot,
      "derivatives",
      "commentary",
      author
    );

    try {

      const langs = await fs.readdir(root);

      for (const lang of langs) {

        if (lang === "sa") continue;

        const filePath = path.join(
          root,
          lang,
          `${uid}.translation.${lang}.json`
        );

        try {

          const file = await fs.readFile(filePath, "utf-8");

          const raw = JSON.parse(file);

          layers.push({

            id: uid,

            language: raw.translation.language,

            commentary_author: author,

            author: raw.translation.translator,

            content: raw.translation.content

          });

        } catch {

          continue;

        }

      }

    } catch {

      continue;

    }

  }

  return layers;

}
