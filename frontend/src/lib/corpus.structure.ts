// src/lib/corpus.structure.ts

/**
 * Canonical Metadata Registry
 * ----------------------------------------
 * This file defines the structural hierarchy
 * of the Vedic corpus for navigation purposes.
 *
 * It contains NO content.
 * It contains NO editorial logic.
 * It contains NO filesystem access.
 *
 * It is purely structural metadata.
 */

export type CorpusNodeType =
  | "domain"      // śruti, smṛti, etc.
  | "text"        // Mahābhārata, Ṛgveda, etc.
  | "section"     // Bhīṣma Parva, Skandha, Kāṇḍa
  | "subwork"     // Bhagavad-gītā inside Mahābhārata
  | "chaptered"   // Text with chapters
  | "standalone"; // Single-layer text (future)

export interface CorpusNode {
  id: string;
  label: string;
  type: CorpusNodeType;

  description?: string;

  /**
   * Base route for navigation.
   * Example: "/library/bg"
   */
  route?: string;

  /**
   * Structural capabilities
   */
  chaptered?: boolean;
  verseBased?: boolean;

  /**
   * Feature flags (future-safe)
   */
  supportsCommentaries?: boolean;
  curriculumEligible?: boolean;
  comparable?: boolean;

  /**
   * Nested hierarchy
   */
  children?: CorpusNode[];
}

/**
 * Root Registry
 * ----------------------------------------
 * Baseline B implementation includes:
 * - Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā
 *
 * Other domains are declared but not yet populated.
 */

export const CORPUS_STRUCTURE: CorpusNode[] = [
  {
    id: "sruti",
    label: "Śruti",
    type: "domain",
    children: [
      {
        id: "rigveda",
        label: "Ṛgveda",
        type: "text",
        children: [],
      },
      {
        id: "yajurveda",
        label: "Yajurveda",
        type: "text",
        children: [],
      },
      {
        id: "samaveda",
        label: "Sāmaveda",
        type: "text",
        children: [],
      },
      {
        id: "atharvaveda",
        label: "Atharvaveda",
        type: "text",
        children: [],
      },
    ],
  },

  {
    id: "smrti",
    label: "Smṛti",
    type: "domain",
    children: [],
  },

  {
    id: "itihasa",
    label: "Itihāsa",
    type: "domain",
    children: [
      {
        id: "mahabharata",
        label: "Mahābhārata",
        type: "text",
        children: [
          {
            id: "bhisma-parva",
            label: "Bhīṣma Parva",
            type: "section",
            children: [
              {
                id: "bg",
                label: "Bhagavad-gītā",
                type: "chaptered",
                route: "/library/bg",
                chaptered: true,
                verseBased: true,
                supportsCommentaries: true,
                curriculumEligible: true,
                comparable: true,
              },
            ],
          },
        ],
      },
      {
        id: "ramayana",
        label: "Rāmāyaṇa",
        type: "text",
        children: [],
      },
    ],
  },

  {
    id: "purana",
    label: "Purāṇa",
    type: "domain",
    children: [],
  },

  {
    id: "agama",
    label: "Āgama",
    type: "domain",
    children: [],
  },

  {
    id: "darsana",
    label: "Darśana",
    type: "domain",
    children: [],
  },
];
