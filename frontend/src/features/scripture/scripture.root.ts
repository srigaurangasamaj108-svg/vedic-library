import path from "path";
import { resolveScripturePath } from "@/lib/registry.loader";
import { VerseIndex } from "./index.loader";

/**
 * Resolve scripture root directory from index
 *
 * Example result:
 * data/itihasa/mahabharata/bhisma-parva/bhagavad-gita
 */
export async function resolveScriptureRoot(
  index: VerseIndex
): Promise<string> {

  const uid = index.verse_uid;

  const scriptureRoot = await resolveScripturePath(uid);

  return scriptureRoot;
}

/**
 * Canonical directory
 */
export function canonicalDir(root: string) {
  return path.join(root, "canonical");
}

/**
 * Derivatives directory
 */
export function derivativesDir(root: string) {
  return path.join(root, "derivatives");
}

/**
 * Index directory
 */
export function indexDir(root: string) {
  return path.join(root, "index");
}
