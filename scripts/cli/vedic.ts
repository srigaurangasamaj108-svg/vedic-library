#!/usr/bin/env ts-node

import { loadVerseComposition } from "../../frontend/src/features/scripture/scripture.loader";

/* -------------------------------------------------------------------------- */
/*                              RENDER VERSE CLI                              */
/* -------------------------------------------------------------------------- */

async function renderVerse(uid: string) {

  const verse = await loadVerseComposition(uid);

  console.log("\n==============================");
  console.log(`UID: ${uid}`);
  console.log("==============================\n");

  /* ---------------------------------------------------------------------- */
  /*                               SANSKRIT                                 */
  /* ---------------------------------------------------------------------- */

  const sanskrit = verse.canonical.scripts.find(
    (s) => s.script === "devanagari"
  );

  if (sanskrit) {

    console.log("SANSKRIT:\n");
    console.log(sanskrit.content);
    console.log("");
  }

  /* ---------------------------------------------------------------------- */
  /*                            TRANSLITERATION                             */
  /* ---------------------------------------------------------------------- */

  const transliteration = verse.canonical.scripts.find(
    (s) => s.script === "iast"
  );

  if (transliteration) {

    console.log("TRANSLITERATION:\n");
    console.log(transliteration.content);
    console.log("");
  }

  if (!verse.editorial) return;

  const layers = verse.editorial.layers;

  /* ---------------------------------------------------------------------- */
  /*                                SYNONYMS                                */
  /* ---------------------------------------------------------------------- */

  if (layers.synonyms) {

    console.log("SYNONYMS:\n");

    for (const item of layers.synonyms.items) {

      console.log(`${item.sanskrit} — ${item.meaning}`);

    }

    console.log("");
  }

  /* ---------------------------------------------------------------------- */
  /*                              TRANSLATION                               */
  /* ---------------------------------------------------------------------- */

  if (layers.translation) {

    console.log("TRANSLATION:\n");

    console.log(layers.translation.content);

    console.log("");
  }

  /* ---------------------------------------------------------------------- */
  /*                               EXPOSITION                               */
  /* ---------------------------------------------------------------------- */

  if (layers.exposition) {

    console.log("EXPOSITION:\n");

    console.log(layers.exposition.content);

    console.log("");
  }

  /* ---------------------------------------------------------------------- */
  /*                              COMMENTARIES                              */
  /* ---------------------------------------------------------------------- */

  if (layers.commentary && layers.commentary.length) {

    console.log("COMMENTARIES:\n");

    for (const c of layers.commentary) {

      console.log(`— ${c.author} (${c.language})\n`);

      console.log(c.content);

      console.log("");
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                        COMMENTARY TRANSLATIONS                         */
  /* ---------------------------------------------------------------------- */

  if (layers.commentary_translations && layers.commentary_translations.length) {

    console.log("COMMENTARY TRANSLATIONS:\n");

    for (const c of layers.commentary_translations) {

      console.log(`— ${c.commentary_author} (${c.language})\n`);

      console.log(c.content);

      console.log("");
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                              CLI ENTRYPOINT                                */
/* -------------------------------------------------------------------------- */

async function main() {

  const command = process.argv[2];

  if (command === "verse") {

    const uid = process.argv[3];

    if (!uid) {

      console.error("Usage: vedic verse <uid>");
      process.exit(1);

    }

    await renderVerse(uid);

    return;
  }

  console.log("Available commands:");
  console.log("  vedic verse <uid>");
}

main();
