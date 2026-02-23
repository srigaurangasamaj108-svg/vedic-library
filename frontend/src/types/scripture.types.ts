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
 * Synonym derivative
 */
export interface SynonymItem {
  sanskrit: string;
  meaning: string;
}

export interface SynonymLayer {
  id: string;
  language: string;
  author?: string;
  items: SynonymItem[];
}

/**
 * Exposition / Purport / Bhasya derivative
 */
export interface ExpositionLayer {
  id: string;
  language: string;
  author?: string;
  type?: string; // purport, tika, bhasya, exposition
  content: string;
}

/**
 * Editorial Unit (composition blueprint)
 */
export interface EditorialUnit {
  uid: UID;
  author: {
    id: string;
    name: string;
    tradition?: string;
  };
  covers: {
    chapter: number;
    from_verse: number;
    to_verse: number;
  };
  scope: {
    has_synonyms?: boolean;
    has_translation?: boolean;
    has_exposition?: boolean;
  };
  content: {
    synonyms_ref?: string;
    translation_ref?: string;
    exposition_ref?: string;
  };
}

/**
 * Derivative attachment model (legacy model – keep for now)
 */
export interface DerivativeLayers {
  translations?: TranslationLayer[];
  commentaries?: CommentaryLayer[];
  synonyms?: SynonymLayer[];
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
 * Full scriptural unit (legacy – still used by old loader)
 */
export interface ScripturalUnit {
  canonical: CanonicalUnit;
  derivatives?: DerivativeLayers;
}

/**
 * New Composition Model (future-proof)
 */
export interface VerseComposition {
  canonical: CanonicalUnit;
  editorial?: {
    unit: EditorialUnit;
    layers: {
      synonyms?: SynonymLayer;
      translation?: TranslationLayer;
      exposition?: ExpositionLayer;
    };
  };
}
