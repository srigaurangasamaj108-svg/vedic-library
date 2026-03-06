import fs from "fs/promises";
import path from "path";

interface CommentaryEntry {
  author: string;
  languages: string[];
}

interface CommentaryIndex {
  schema: string;
  schema_version: string;
  verse_uid: string;
  commentaries: CommentaryEntry[];
}

async function buildIndex(scriptureRoot: string) {

  const commentaryRoot = path.join(
    scriptureRoot,
    "derivatives",
    "commentary"
  );

  const indexRoot = path.join(
    scriptureRoot,
    "index",
    "commentary"
  );

  await fs.mkdir(indexRoot, { recursive: true });

  const authors = await fs.readdir(commentaryRoot);

  const verseMap: Record<string, CommentaryEntry[]> = {};

  for (const author of authors) {

    const authorDir = path.join(commentaryRoot, author);

    const languages = await fs.readdir(authorDir);

    for (const lang of languages) {

      const langDir = path.join(authorDir, lang);

      const files = await fs.readdir(langDir);

      for (const file of files) {

        const parts = file.split(".");
        const verse_uid = `${parts[0]}.${parts[1]}.${parts[2]}`;

        if (!verseMap[verse_uid]) {
          verseMap[verse_uid] = [];
        }

        let entry = verseMap[verse_uid].find(
          e => e.author === author
        );

        if (!entry) {

          entry = {
            author,
            languages: []
          };

          verseMap[verse_uid].push(entry);
        }

        if (!entry.languages.includes(lang)) {
          entry.languages.push(lang);
        }
      }
    }
  }

  for (const verse_uid of Object.keys(verseMap)) {

    const index: CommentaryIndex = {
      schema: "vedic-library.commentary.index",
      schema_version: "1.0.0",
      verse_uid,
      commentaries: verseMap[verse_uid]
    };

    const filePath = path.join(
      indexRoot,
      `${verse_uid}.commentaries.index.json`
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(index, null, 2)
    );

    console.log(`Index written → ${filePath}`);
  }
}

async function main() {

  const scriptureRoot =
    "data/itihasa/mahabharata/bhisma-parva/bhagavad-gita";

  await buildIndex(scriptureRoot);

  console.log("Commentary index generation complete.");
}

main();
