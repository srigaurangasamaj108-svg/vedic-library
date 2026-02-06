/**
 * Browser-safe verse loader
 * Used ONLY by the frontend (GitHub Pages compatible)
 */

export async function loadVerse(uid: string) {
  // Example UID: bg.2.47
  const [text, chapter, verse] = uid.split(".");

  if (text !== "bg") {
    throw new Error(`Unsupported UID in frontend: ${uid}`);
  }

  // Must match basePath in next.config.ts
  const basePath = "/vedic-library";

  const url = `${basePath}/data/itihasa/mahabharata/bg/${chapter}/${verse}.json`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch verse ${uid}`);
  }

  return res.json();
}
