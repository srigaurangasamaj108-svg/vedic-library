import fs from "fs/promises";
import path from "path";

const PROJECT_ROOT = path.resolve(
  process.cwd(),
  process.cwd().endsWith("frontend") ? ".." : "."
);

const REGISTRY_PATH = path.join(
  PROJECT_ROOT,
  "registry",
  "scriptures.registry.json"
);

export interface ScriptureRegistryEntry {
  name: string;
  corpus: string;
  text: string;
  section?: string;
  subwork?: string;
}

interface ScriptureRegistry {
  schema: string;
  version: string;
  scriptures: Record<string, ScriptureRegistryEntry>;
}

let cachedRegistry: ScriptureRegistry | null = null;

/**
 * Load scripture registry
 */
export async function loadScriptureRegistry(): Promise<ScriptureRegistry> {
  if (cachedRegistry) return cachedRegistry;

  const file = await fs.readFile(REGISTRY_PATH, "utf-8");
  const registry: ScriptureRegistry = JSON.parse(file);

  cachedRegistry = registry;

  return registry;
}

/**
 * Resolve scripture root from UID
 */
export async function resolveScriptureFromUID(uid: string) {
  const prefix = uid.split(".")[0];

  const registry = await loadScriptureRegistry();

  const entry = registry.scriptures[prefix];

  if (!entry) {
    throw new Error(`Unknown scripture prefix: ${prefix}`);
  }

  return entry;
}

/**
 * Resolve full data path for a scripture
 */
export async function resolveScripturePath(uid: string) {
  const entry = await resolveScriptureFromUID(uid);

  const parts = [
    PROJECT_ROOT,
    "data",
    entry.corpus,
    entry.text
  ];

  if (entry.section) parts.push(entry.section);
  if (entry.subwork) parts.push(entry.subwork);

  return path.join(...parts);
}
