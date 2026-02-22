export type UID = string;

/**
 * Canonical identity of a unit
 */
export interface ScriptureIdentity {
  uid: UID;
  corpus: string;
  text: string;
  section?: string;
  subwork?: string;
}

/**
 * Structural location
 */
export interface ScriptureLocation {
  chapter?: number;
  verse?: number;
  sutra?: number;
  mantra?: number;
}

/**
 * Script representation
 */
export interface ScriptVariant {
  script: string;
  content: string;
}

/**
 * Canonical immutable spine
 */
export interface CanonicalUnit {
  identity: ScriptureIdentity;
  location: ScriptureLocation;
  scripts: ScriptVariant[];
  schema?: {
    name: string;
    version: string;
  };
}

/**
 * Full scriptural unit
 */
export interface ScripturalUnit {
  canonical: CanonicalUnit;
}
