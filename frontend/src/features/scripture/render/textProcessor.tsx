"use client";

import React from "react";

/**
 * Regex to detect Sanskrit diacritics
 */
const SANSKRIT_REGEX =
  /\b[\w\-]*[āīūṛṅñṭḍṇśṣḥṁ]+[\w\-]*\b/gi;

/**
 * Known scripture titles (Phase 1 hardcoded list)
 */
const TITLES = [
  "Bhagavad-gītā",
  "Mahābhārata",
  "Vedas",
  "Upaniṣads",
];

/**
 * Wrap Sanskrit terms
 */
function highlightSanskrit(text: string) {
  return text.replace(SANSKRIT_REGEX, (match) => {
    return `<span class="sanskrit-term">${match}</span>`;
  });
}

/**
 * Italicize known titles
 */
function italicizeTitles(text: string) {
  TITLES.forEach((title) => {
    const regex = new RegExp(title, "g");
    text = text.replace(
      regex,
      `<em class="scripture-title">${title}</em>`
    );
  });

  return text;
}

/**
 * Main render function
 */
export function renderRichText(content: string) {
  const paragraphs = content.split("\n\n");

  return paragraphs.map((para, index) => {
    let processed = highlightSanskrit(para);
    processed = italicizeTitles(processed);

    return (
      <p
        key={index}
        dangerouslySetInnerHTML={{ __html: processed }}
      />
    );
  });
}
