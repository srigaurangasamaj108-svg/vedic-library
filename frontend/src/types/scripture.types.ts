/*
========================================
Canonical Verse
========================================
*/

export interface CanonicalVerse {

  uid: string;

  text: {
    sanskrit: string;
    transliteration: string;
  };

}


/*
========================================
Synonyms Layer
========================================
*/

export interface SynonymItem {

  sanskrit: string;
  meaning: string;

}

export interface SynonymLayer {

  id: string;
  language: string;
  author: string;
  items: SynonymItem[];

}


/*
========================================
Translation Layer
========================================
*/

export interface TranslationLayer {

  id: string;
  language: string;
  author: string;
  content: string;

}


/*
========================================
Exposition Layer (Purport)
========================================
*/

export interface ExpositionLayer {

  id: string;
  type: string;
  language: string;
  author: string;
  content: string;

}


/*
========================================
Commentary Layer (Sanskrit)
========================================
*/

export interface CommentaryLayer {

  id: string;
  language: string;
  author: string;
  tradition?: string;
  content: string;

}


/*
========================================
Commentary Translation Layer
========================================
*/

export interface CommentaryTranslationLayer {

  id: string;
  language: string;
  commentary_author: string;
  author: string;
  content: string;

}


/*
========================================
Full Verse Composition
========================================
*/

export interface VerseComposition {

  canonical: CanonicalVerse;

  synonyms?: SynonymLayer;

  translation?: TranslationLayer;

  exposition?: ExpositionLayer;

  commentaries?: CommentaryLayer[];

  commentaryTranslations?: CommentaryTranslationLayer[];

}
