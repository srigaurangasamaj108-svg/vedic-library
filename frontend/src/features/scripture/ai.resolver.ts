import {
  SynonymLayer,
  TranslationLayer,
  ExpositionLayer,
  CanonicalUnit
} from "@/types/scripture.types";

import {
  generateSynonyms,
  generateTranslation,
  generateExposition
} from "@/services/ai/gemini.service";

import {
  cacheAITranslation,
  cacheAISynonyms,
  cacheAIExposition
} from "@/services/ai/ai.cache.service";

/**
 * AI fallback resolver
 *
 * If a derivative layer is missing,
 * generate it using Gemini and cache it.
 */
export async function resolveAILayers(
  canonical: CanonicalUnit,
  layers: {
    synonyms?: SynonymLayer;
    translation?: TranslationLayer;
    exposition?: ExpositionLayer;
  },
  language: string = "en"
) {

  const verseText =
    canonical.scripts?.[0]?.content ?? "";

  /**
   * TRANSLATION
   */
  if (!layers.translation) {

    const translation = await generateTranslation(
      verseText,
      language
    );

    layers.translation = {
      id: `${canonical.identity.uid}.ai.translation`,
      language,
      author: "AI Generated",
      content: translation
    };

    await cacheAITranslation(
      canonical,
      language,
      translation
    );

  }

  /**
   * SYNONYMS
   */
  if (!layers.synonyms) {

    const items = await generateSynonyms(
      verseText
    );

    layers.synonyms = {
      id: `${canonical.identity.uid}.ai.synonyms`,
      language: "en",
      author: "AI Generated",
      items
    };

    await cacheAISynonyms(
      canonical,
      items
    );

  }

  /**
   * EXPOSITION
   */
  if (!layers.exposition && layers.translation) {

    const exposition = await generateExposition(
      verseText,
      layers.translation.content
    );

    layers.exposition = {
      id: `${canonical.identity.uid}.ai.exposition`,
      language,
      author: "AI Generated",
      type: "ai-generated",
      content: exposition
    };

    await cacheAIExposition(
      canonical,
      language,
      exposition
    );

  }

  return layers;
}
