import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Call Gemini API
 */
async function callGemini(prompt: string) {

  const response = await fetch(
    `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const json = await response.json();

  return json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

/**
 * Generate translation
 */
export async function generateTranslation(
  verse: string,
  language: string = "en"
) {

  const prompt = `
Translate the following Sanskrit verse into ${language}.
Provide only the translation.

Verse:
${verse}
`;

  return callGemini(prompt);
}

/**
 * Generate synonyms
 */
export async function generateSynonyms(
  verse: string
) {

  const prompt = `
Provide word-by-word Sanskrit synonyms and meanings for the verse below.

Return JSON in the form:

[
 { "sanskrit": "...", "meaning": "..." }
]

Verse:
${verse}
`;

  const result = await callGemini(prompt);

  try {
    return JSON.parse(result);
  } catch {
    return [];
  }
}

/**
 * Generate exposition
 */
export async function generateExposition(
  verse: string,
  translation: string
) {

  const prompt = `
Explain the philosophical meaning of the verse below in a short paragraph.

Verse:
${verse}

Translation:
${translation}
`;

  return callGemini(prompt);
}
