// lib/data-loader.ts

export type Verse = {
  uid: string
  chapter: number
  verse: number
  sanskrit: string
  transliteration: string
  synonyms: { word: string; meaning: string }[]
  translations: Record<string, string>
  commentaries: {
    sampradaya: string
    author: string
    content: Record<string, string>
  }[]
}

const BASE =
  "/data/itihasa/mahabharata/bhisma-parva/bhagavad-gita"

async function safeFetch(path: string) {
  try {
    const res = await fetch(path)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function getVerse(chapter: number, verse: number) {
  const id = `bg.${chapter}.${verse}`

  // 🔹 Canonical
  const canonical = await safeFetch(`${BASE}/canonical/${id}.json`)
  if (!canonical) return null

  // 🔹 Synonyms (Prabhupāda)
  const synonyms = await safeFetch(
    `${BASE}/derivatives/synonyms/en/prabhupada/${id}.prabhupada.synonyms.en.json`
  )

  // 🔹 Translation (Prabhupāda)
  const translation = await safeFetch(
    `${BASE}/derivatives/translations/en/prabhupada/${id}.prabhupada.translation.en.json`
  )

  // 🔹 Commentary (Madhva EN)
  const commentary = await safeFetch(
    `${BASE}/derivatives/commentary/madhva/en/${id}.madhva.translation.json`
  )

  return {
    uid: canonical.uid,
    chapter: canonical.location.chapter,
    verse: canonical.location.verse,

    sanskrit: canonical.text?.content || "",
    transliteration: canonical.transliteration?.content || "",

    // ✅ Synonyms mapping
    synonyms:
      synonyms?.data?.map((item: any) => ({
        word: item.word || "",
        meaning: item.meaning || "",
      })) || [],

    // ✅ Translation mapping
    translations: {
      en:
        translation?.data?.content ||
        translation?.content ||
        "",
    },

    // ✅ Commentary mapping
    commentaries: commentary
      ? [
          {
            sampradaya: "madhva",
            author: "Madhva",
            content: {
              en:
                commentary?.data?.content ||
                commentary?.content ||
                "",
            },
          },
        ]
      : [],
  }
}
