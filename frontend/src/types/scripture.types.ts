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
 * Verse translation
 */
export interface TranslationLayer {
  id: string;
  language: string;
  author?: string;
  content: string;
}

/**
 * Word-for-word synonyms
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
 * Commentary layer
 * Primary commentary text (any language)
 */
export interface CommentaryLayer {
  id: string;
  language: string;
  author?: string;
  tradition?: string;
  content: string;
}

/**
 * Translation of a commentary
 */
export interface CommentaryTranslationLayer {
  id: string;
  language: string;
  author?: string;
  commentary_author?: string;
  content: string;
}

/**
 * Exposition / Purport
 * Teaching-style explanation
 */
export interface ExpositionLayer {
  id: string;
  language: string;
  author?: string;
  type?: string;
  content: string;
}

/**
 * Editorial Unit
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
    has_commentary?: boolean;
  };

  content: {
    synonyms_ref?: string;
    translation_ref?: string;
    exposition_ref?: string;
    commentary_ref?: string;
  };
}

/**
 * Canonical verse
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
 * Full verse composition
 */
export interface VerseComposition {
  canonical: CanonicalUnit;

  editorial?: {
    unit: EditorialUnit;

    layers: {
      synonyms?: SynonymLayer;
      translation?: TranslationLayer;
      exposition?: ExpositionLayer;

      commentary?: CommentaryLayer[];
      commentary_translations?: CommentaryTranslationLayer[];
    };
  };
}

/**
 * Legacy wrapper
 */
export interface ScripturalUnit {
  canonical: CanonicalUnit;
}
