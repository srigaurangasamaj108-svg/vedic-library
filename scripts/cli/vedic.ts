import { loadVerseComposition } from "@/features/scripture/scripture.loader";

async function renderVerse(uid: string) {

  const verse = await loadVerseComposition(uid);

  console.log("\n==============================");
  console.log(`UID: ${uid}`);
  console.log("==============================\n");

  /*
  ==============================
  CANONICAL
  ==============================
  */

  console.log("SANSKRIT:\n");
  console.log(verse.canonical.text.sanskrit);
  console.log("");

  console.log("TRANSLITERATION:\n");
  console.log(verse.canonical.text.transliteration);
  console.log("");

  /*
  ==============================
  SYNONYMS
  ==============================
  */

  if (verse.synonyms) {

    console.log("SYNONYMS:\n");

    verse.synonyms.items.forEach((item: any) => {
      console.log(`${item.sanskrit} — ${item.meaning}`);
    });

    console.log("");

  }

  /*
  ==============================
  TRANSLATION
  ==============================
  */

  if (verse.translation) {

    console.log("TRANSLATION:\n");
    console.log(verse.translation.content);
    console.log("");

  }

  /*
  ==============================
  EXPOSITION
  ==============================
  */

  if (verse.exposition) {

    console.log("EXPOSITION:\n");
    console.log(verse.exposition.content);
    console.log("");

  }

  /*
  ==============================
  COMMENTARIES
  ==============================
  */

  if (verse.commentaries?.length) {

    console.log("COMMENTARIES:\n");

    verse.commentaries.forEach((c: any) => {

      console.log(`— ${c.author} (${c.language})`);
      console.log(c.content);
      console.log("");

    });

  }

  /*
  ==============================
  COMMENTARY TRANSLATIONS
  ==============================
  */

  if (verse.commentaryTranslations?.length) {

    console.log("COMMENTARY TRANSLATIONS:\n");

    verse.commentaryTranslations.forEach((c: any) => {

      console.log(`— ${c.commentary_author} → ${c.language}`);
      console.log(c.content);
      console.log("");

    });

  }

}

/*
================================
CLI
================================
*/

async function main() {

  const args = process.argv.slice(2);

  if (args[0] === "verse") {

    const uid = args[1];

    if (!uid) {
      console.log("Usage: vedic verse <uid>");
      return;
    }

    await renderVerse(uid);

  }

}

main();
