import fs from "fs/promises";
import path from "path";

const DATA_ROOT = path.resolve(process.cwd(), "data");

async function readJSON(filePath: string) {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

/*
Resolve scripture root from UID
Example UID: bg.1.1
*/

function resolveScriptureRoot(uid: string) {

  if (uid.startsWith("bg")) {

    return path.join(
      DATA_ROOT,
      "itihasa",
      "mahabharata",
      "bhisma-parva",
      "bhagavad-gita"
    );

  }

  throw new Error(`Unknown scripture UID: ${uid}`);

}

/*
Load verse index
*/

export async function loadVerseIndex(uid: string) {

  const scriptureRoot = resolveScriptureRoot(uid);

  const indexPath = path.join(
    scriptureRoot,
    "index",
    "verse",
    `${uid}.index.json`
  );

  const raw = await readJSON(indexPath);

  return raw;

}
