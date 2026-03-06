import {
  SynonymLayer,
  TranslationLayer,
  ExpositionLayer,
} from "@/types/scripture.types";

import { DerivativeResult } from "./derivative.resolver";

/**
 * Convert generic derivative results into structured layers
 */
export function mapDerivatives(results: DerivativeResult[]) {

  const layers: {
    synonyms?: SynonymLayer;
    translation?: TranslationLayer;
    exposition?: ExpositionLayer;
  } = {};

  for (const result of results) {

    const raw = result.data;

    switch (result.type) {

      case "synonyms":

        layers.synonyms = {
          id: raw.uid,
          language: raw.synonyms.language,
          author: raw.synonyms.author,
          items: raw.synonyms.items.items,
        };

        break;

      case "translation":

        layers.translation = {
          id: raw.uid,
          language: raw.translation.language,
          author: raw.translation.translator,
          content: raw.translation.content,
        };

        break;

      case "exposition":

        layers.exposition = {
          id: raw.uid,
          language: raw.exposition.language,
          author: raw.exposition.author,
          type: raw.exposition.type,
          content: raw.exposition.content,
        };

        break;
    }
  }

  return layers;
}
