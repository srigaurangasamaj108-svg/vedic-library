// Core Types for Vedic Knowledge System

export type TreeNode = {
  id: string
  name: string
  sanskrit?: string
  type: 'corpus' | 'text_group' | 'section' | 'work' | 'chapter' | 'verse'
  children?: TreeNode[]
  verseCount?: number
}

export type Verse = {
  id: string
  chapter: number
  verse: number
  sanskrit: string
  transliteration: string
  synonyms: Synonym[]
  translations: {
    en: string
    hi?: string
    sa?: string
  }
  commentaries: Commentary[]
  relations?: Relations
}

export type Synonym = {
  word: string
  meaning: string
}

export type Commentary = {
  sampradaya: 'gaudiya' | 'madhva' | 'sri_vaishnava' | 'advaita' | 'general'
  author: string
  content: {
    en: string
    hi?: string
    sa?: string
  }
}

export type Relations = {
  related_verses: string[]
  courses: Course[]
  guidance: GuidanceTopic[]
  seva_domains: SevaDomain[]
}

export type Course = {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  ageGroups: AgeGroup[]
  verseCount: number
}

export type GuidanceTopic = {
  id: string
  title: string
  category: string
  description: string
}

export type SevaDomain = {
  id: string
  sanskrit: string
  english: string
  description: string
  icon?: string
}

export type AgeGroup = 'kids' | 'students' | 'professionals' | 'elders'
export type Category = 'dharma' | 'vedanta' | 'yoga' | 'ayurveda' | 'jyotish' | 'nyaya'
export type Language = 'en' | 'hi' | 'sa'

export type Filters = {
  ageGroup?: AgeGroup
  category?: Category
  sevaDomain?: string
}

export type ContentTab = 'shloka' | 'transliteration' | 'synonyms' | 'translation' | 'commentary'
