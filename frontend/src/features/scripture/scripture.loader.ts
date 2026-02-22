import fs from "fs/promises";
import path from "path";
import { ScripturalUnit } from "@/types/scripture.types";

export async function loadScripturalUnit(
  uid: string
): Promise<ScripturalUnit> {
  const [text, chapter, verse] = uid.split(".");

  if (text !== "bg") {
    throw new Error(`Unsupported UID: ${uid}`);
  }

  const filePath = path.join(
    process.cwd(),
    "../data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical",
    `bg.${chapter}.${verse}.json`
  );

  const file = await fs.readFile(filePath, "utf-8");
  const raw = JSON.parse(file);

  return {
    canonical: {
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
    },
  };
}
