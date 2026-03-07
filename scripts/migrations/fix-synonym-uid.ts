import fs from "fs/promises";
import path from "path";

const ROOT = "data";

async function walk(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }

    if (!entry.name.endsWith(".synonyms.en.json")) continue;

    const raw = await fs.readFile(full, "utf-8");
    const json = JSON.parse(raw);

    if (!json.uid) continue;

    if (json.uid.endsWith(".synonyms.prabhupada")) {
      json.uid = json.uid.replace(".synonyms.prabhupada", ".synonyms.en");

      await fs.writeFile(full, JSON.stringify(json, null, 2));

      console.log("Fixed UID:", full);
    }
  }
}

async function main() {
  await walk(ROOT);
  console.log("Synonym UID migration complete.");
}

main();
