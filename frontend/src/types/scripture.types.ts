export type UID = string;

/**
 * Canonical identity
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
 * Translation derivative
 */
export interface TranslationLayer {
  id: string;            // e.g. prabhupada-en
  language: string;      // en, hi
  author?: string;
  content: string;
}

/**
 * Commentary derivative
 */
export interface CommentaryLayer {
  id: string;            // prabhupada, sridhara
  language: string;
  author?: string;
  tradition?: string;
  content: string;
}

/**
 * Derivative attachment model
 */
export interface DerivativeLayers {
  translations?: TranslationLayer[];
  commentaries?: CommentaryLayer[];
  synonyms?: unknown;
  editorial?: unknown;
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
  derivatives?: DerivativeLayers;
}
